/**
 * RFC Bot - turns a drafts.json payload into real Gmail drafts.
 *
 * Never sends. See the note at the bottom of Config.gs for why that holds and
 * what it does NOT rest on.
 */


/**
 * Entry point. Called from the sidebar.
 *
 * @param {string} jsonText   the contents of outreach/<slug>/drafts.json
 * @param {boolean} confirmedReal  the reporter ticked "these are real press
 *                                 addresses". Ignored while TEST_MODE is on.
 * @param {string} deadline   typed into the sidebar every run. Required.
 * @return {Object} a report the sidebar renders. Never throws for a bad draft;
 *                  each recipient reports its own outcome.
 */
function createDrafts(jsonText, confirmedReal, deadline) {
  var data;
  try {
    data = JSON.parse(jsonText);
  } catch (e) {
    return { fatal: 'That is not valid JSON. ' + e.message };
  }

  var emails = data.emails || [];
  if (!emails.length) {
    return { fatal: 'No "emails" array in that JSON.' };
  }

  // R4: the deadline is never invented and never defaulted. It used to be the
  // skill's rule, which meant it held only as long as whoever ran the skill
  // followed it. Now the tool cannot produce a deadline-less email at all.
  //
  // It is typed fresh every run rather than read from drafts.json on purpose.
  // A deadline is a promise to a source, and the person making that promise
  // should be typing it, not inheriting it from a file written earlier.
  deadline = (deadline || '').trim();
  if (!deadline) {
    return { fatal: 'Fill in the deadline. Every email needs one, and it is ' +
                    'never assumed - see R4.' };
  }

  if (!TEST_MODE && !confirmedReal) {
    return {
      fatal: 'TEST_MODE is off, so these drafts would be addressed to real ' +
             'press desks. Tick the confirmation box first.'
    };
  }

  // R4 again: a deadline with no time zone is the case the rule calls out by
  // name. Warned rather than blocked -- "end of day Friday, Eastern" is a real
  // thing a reporter writes, and the tool should not argue with the wording.
  // But it must not go out unnoticed either.
  var TZ = /\b(ET|EDT|EST|CT|CDT|CST|MT|MDT|MST|PT|PDT|PST|AKT|HST|UTC|GMT|BST|CET|CEST|Eastern|Central|Mountain|Pacific)\b/i;

  var report = {
    testMode: TEST_MODE,
    story: data.story_slug || '(no slug)',
    deadline: deadlineSentence_(deadline),
    deadlineWarning: TZ.test(deadline) ? '' :
      'That deadline has no time zone. A source reading "5 p.m." will assume ' +
      'their own.',
    created: 0,
    skipped: 0,
    results: []
  };

  for (var i = 0; i < emails.length; i++) {
    report.results.push(createOne_(emails[i], report, deadline));
  }

  return report;
}


/**
 * The deadline as it will read in the email.
 *
 * Takes the reporter's words as typed. It does not reword, reformat or
 * normalize them -- what they typed is what a source will be held to.
 */
function deadlineSentence_(deadline) {
  var d = deadline.trim().replace(/[.\s]+$/, '');
  if (/^my deadline is/i.test(d)) {
    return d + '.';
  }
  return 'My deadline is ' + d + '.';
}


/**
 * Puts the deadline on its own last line, replacing whatever was there.
 *
 * R4: greeting / one paragraph / deadline, nothing after it. If a body somehow
 * arrives without a deadline block, one is added rather than the email going
 * out without it.
 */
function applyDeadline_(body, deadline) {
  var blocks = body.split(/\n\s*\n/).filter(function (b) { return b.trim(); });
  var line = deadlineSentence_(deadline);
  if (blocks.length >= 3) {
    blocks[blocks.length - 1] = line;
  } else {
    blocks.push(line);
  }
  return blocks.join('\n\n');
}


/** Creates a single draft, or explains why it didn't. */
function createOne_(em, report, deadline) {
  var company = em.company || '(unnamed)';
  var row = {
    company: company,
    confidence: em.confidence || '',
    method: em.contact_method || 'email',
    warnings: []
  };

  // R1a: a form-only or unreachable company is never dropped, but there is no
  // draft for Gmail to hold. Say so and move on.
  var realTo = (em.to || '').trim();
  if (!realTo) {
    row.status = 'skipped';
    row.detail = row.method === 'form'
      ? 'No address - takes press requests through a web form. ' +
        'Use the .eml or compose.html copy-paste text: ' + (em.form_url || '')
      : 'No address found. This one is a blocker, not a draft.';
    report.skipped++;
    return row;
  }

  var subject = (em.subject || '').trim();
  var body = applyDeadline_((em.body || '').replace(/\s+$/, ''), deadline);

  row.warnings = checkDraft_(subject, body);

  // R8: below HIGH means nobody read this address off the company's own page
  // on this run. Mark it in the subject rather than refusing to draft it --
  // the marker has to be deleted by hand, so the check happens at the moment
  // of sending, which is the moment that matters. An empty confidence counts
  // as unverified; every address is supposed to carry one.
  var confidence = (em.confidence || '').trim().toUpperCase();
  if (confidence !== 'HIGH') {
    subject = UNVERIFIED_MARKER + ' ' + subject;
    row.marked = true;
  }

  var to = realTo;
  var cc = (em.cc || '').trim();
  var headers = [];

  if (TEST_MODE) {
    // Everything is redirected. The body is left byte-identical on purpose --
    // the whole point of a test draft is to read the exact text that would go
    // out, so nothing is injected into it.
    to = TEST_RECIPIENT;
    cc = '';
    subject = '[TEST] ' + subject;
    headers.push('X-RFC-Bot-Test-Original-To: ' + realTo);
    headers.push('X-RFC-Bot-Test-Company: ' + company);
    row.redirectedFrom = realTo;
  }

  var fullBody = EMBED_SIGNATURE ? body + '\n\n' + SIGNATURE + '\n' : body + '\n';

  try {
    Gmail.Users.Drafts.create(
      { message: { raw: buildRaw_(to, cc, subject, fullBody, headers) } },
      'me'
    );
  } catch (e) {
    row.status = 'error';
    row.detail = e.message;
    return row;
  }

  row.status = 'created';
  row.detail = to;
  report.created++;
  return row;
}


/**
 * Assembles RFC 822 and base64url-encodes it for the Gmail API.
 *
 * The Subject header is written on one unfolded line deliberately. Python's
 * email library folded a long subject immediately after "Subject:" here once,
 * which left the value starting with whitespace and some clients rendered a
 * leading space (see tasks.md, task 11). Subjects are ASCII by rule (R6) and
 * far under the 998-character line limit, so there is nothing to fold.
 */
function buildRaw_(to, cc, subject, body, extraHeaders) {
  var lines = ['To: ' + to];
  if (cc) {
    lines.push('Cc: ' + cc);
  }
  lines.push('Subject: ' + subject);
  (extraHeaders || []).forEach(function (h) { lines.push(h); });
  lines.push('MIME-Version: 1.0');
  lines.push('Content-Type: text/plain; charset="UTF-8"');

  var raw = lines.join('\r\n') + '\r\n\r\n' + body.replace(/\r?\n/g, '\r\n');
  return Utilities.base64EncodeWebSafe(raw, Utilities.Charset.UTF_8);
}


/**
 * A safety net, not the format check.
 *
 * scripts/build_drafts.py holds the full R4/R5 checks and should be run first.
 * What is repeated here is only what this script can break on its own, or what
 * is a hard rule rather than a style rule. Warnings never block.
 */
function checkDraft_(subject, body) {
  var warnings = [];

  // R6: a non-ASCII character in the subject gets MIME-encoded into gibberish.
  if (/[^\x00-\x7F]/.test(subject)) {
    warnings.push('subject has a non-ASCII character (an em dash?) - use a hyphen');
  }
  if (!/ request: /.test(subject)) {
    warnings.push('subject is not in the form "<Outlet> request: <topic>"');
  }

  // R7a: no phone number reaches an email. Ever.
  var phone = /(?:\+\d[\d\s().-]{8,}|\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4})/;
  if (phone.test(body)) {
    warnings.push('body contains a phone number - RFC Bot never puts one in an email');
  }
  if (EMBED_SIGNATURE && phone.test(SIGNATURE)) {
    warnings.push('SIGNATURE in Config.gs contains a phone number');
  }

  // R7: this script appends the signature, so one in the body signs twice.
  // Match the "--" delimiter line, not the reporter's name -- sentence 2 is
  // "My name is Grace Thomas...", so matching on the name fires on every
  // correct draft. It did, on all six, before this was fixed.
  if (EMBED_SIGNATURE && /(^|\n)--[ \t]*(\n|$)/.test(body)) {
    warnings.push('body already contains a signature block - it would appear twice');
  }

  // R4: greeting / one paragraph / deadline, and nothing after the deadline.
  var blocks = body.split(/\n\s*\n/).filter(function (b) { return b.trim(); });
  if (blocks.length !== 3) {
    warnings.push('has ' + blocks.length + ' blocks, expected 3 ' +
                  '(greeting / one paragraph / deadline)');
  }
  if (blocks.length && !/deadline/i.test(blocks[blocks.length - 1])) {
    warnings.push('last line is not the deadline');
  }

  return warnings;
}
