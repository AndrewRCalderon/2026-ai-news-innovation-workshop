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

// Where test drafts go. Your own address, so a test lands in the same inbox it
// was drafted from.
var TEST_RECIPIENT = 'tkc.intern2@journalism.cuny.edu';


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
  'tkc.intern2@journalism.cuny.edu'
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
