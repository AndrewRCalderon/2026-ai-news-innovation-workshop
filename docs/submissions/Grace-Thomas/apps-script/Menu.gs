/**
 * RFC Bot - the menu that opens the sidebar.
 *
 * This project is STANDALONE and installed as an editor add-on, not bound to
 * one Document. That is the whole reason it appears in every Doc you open
 * rather than only in the one it was written against. A bound script can only
 * ever run in its own container.
 *
 * createAddonMenu() rather than createMenu(): an installed add-on puts its menu
 * under Extensions, and Google reserves that placement for add-on menus.
 *
 * The scope is still documents.currentonly. The add-on can read the Doc you
 * have open and no other file in the account.
 */

function onOpen(e) {
  DocumentApp.getUi()
    .createAddonMenu()
    .addItem('Draft requests for comment...', 'showSidebar')
    .addToUi();
}


/**
 * Runs once, when the add-on is installed. Without this the menu does not
 * appear until the next time a document is opened, which reads as "it didn't
 * work."
 */
function onInstall(e) {
  onOpen(e);
}


function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('Sidebar').setTitle('RFC Bot');
  DocumentApp.getUi().showSidebar(html);
}


/** The sidebar asks for this so it can show which mode it is in. */
function getMode() {
  return {
    testMode: TEST_MODE,
    testRecipient: TEST_RECIPIENT,
    account: activeAccount_()
  };
}


/**
 * Which Google account authorized this add-on -- i.e. whose Drafts folder the
 * drafts land in. Worth showing: the reporter is signed into more than one
 * account, which is why config/profile.md carries a Gmail account index at all.
 *
 * Never let this break the sidebar. It is a nicety, not the feature.
 */
function activeAccount_() {
  try {
    return Session.getActiveUser().getEmail() || 'this account';
  } catch (e) {
    return 'this account';
  }
}
