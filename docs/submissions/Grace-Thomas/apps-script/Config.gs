/**
 * RFC Bot - configuration.
 *
 * This is the only file you should need to edit.
 */

// ---------------------------------------------------------------------------
// TEST MODE
// ---------------------------------------------------------------------------
//
// While this is true, EVERY draft is addressed to TEST_RECIPIENT, no matter
// what is in drafts.json. A press desk cannot be reached by accident.
//
// Turn it off only when you are actually doing outreach, and the sidebar will
// make you confirm the addresses first.

var TEST_MODE = true;

// Where test drafts go. Deliberately NOT the account the drafts are written
// from: they are composed in graceathomas5@gmail.com and addressed here, so a
// test lands in a different inbox and actually proves the mail moved. An
// address that is your own but not the sending account is the useful case.
var TEST_RECIPIENT = 'tkc.intern2@journalism.cuny.edu';


// ---------------------------------------------------------------------------
// UNVERIFIED ADDRESS MARKER
// ---------------------------------------------------------------------------
//
// An address is HIGH only if it was read off the company's own press page on
// this run (requirements R8). Anything less -- a news article citing it, a
// search result, a page that could not be fetched -- is MEDIUM or LOW, and a
// MEDIUM address that is quietly wrong is a statement you never get.
//
// A draft with such an address still gets created, because dropping a company
// is worse than flagging one. Its subject is prefixed with this, so it cannot
// be sent looking normal until you have opened the source URL, checked the
// address, and deleted the marker by hand.

var UNVERIFIED_MARKER = '[UNVERIFIED ADDRESS - check source]';


// ---------------------------------------------------------------------------
// SIGNATURE
// ---------------------------------------------------------------------------
//
// Keep this identical to config/signature.txt in the repo.
//
// Why it is embedded here: Gmail inserts your configured signature when you
// open a NEW compose window. It does not insert one into a draft that already
// exists, which is what this script creates. So the script has to supply it,
// the same way the .eml files do (requirements R7).
//
// If your test draft comes out with the signature TWICE, Gmail's behavior is
// not what is described above -- set EMBED_SIGNATURE to false and re-run.
// Check this on the very first test draft.

var EMBED_SIGNATURE = true;

var SIGNATURE = [
  '--',
  'Grace Thomas',
  'Reporter | Semafor',
  'graceathomas5@gmail.com'
].join('\n');


// ---------------------------------------------------------------------------
// THE RULE THAT IS NOT CONFIGURABLE
// ---------------------------------------------------------------------------
//
// This script creates drafts. It never sends. There is no send call in this
// project, and there must never be one.
//
// Be clear about why that holds: it is NOT the OAuth scope. gmail.compose is
// documented by Google as "Manage drafts and send emails," and the Gmail API
// accepts it for users.messages.send. It is requested here because it is the
// narrowest scope that can write a draft at all -- not because it is a
// barrier. The barrier is that nothing here calls send.
//
// tasks.md has the standing grep that checks for one. Run it before every
// commit that touches this folder.
