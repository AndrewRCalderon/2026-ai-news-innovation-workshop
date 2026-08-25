/**
 * RFC Bot - the menu in the Google Doc that opens the sidebar.
 *
 * The script is bound to a Doc rather than standing alone because the sidebar
 * reads the story draft out of that Doc (see Doc.gs). One project, one
 * authorization, one setup.
 *
 * One menu item, one sidebar, two steps: get the draft out to Claude, then
 * put the emails Claude wrote back into Gmail.
 */

function onOpen() {
  DocumentApp.getUi()
    .createMenu('RFC Bot')
    .addItem('Draft requests for comment...', 'showSidebar')
    .addToUi();
}


function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('Sidebar').setTitle('RFC Bot');
  DocumentApp.getUi().showSidebar(html);
}


/** The sidebar asks for this on load so it can show which mode it is in. */
function getMode() {
  return {
    testMode: TEST_MODE,
    testRecipient: TEST_RECIPIENT,
    account: activeAccount_()
  };
}


/**
 * Which Google account authorized this script -- i.e. whose Drafts folder the
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
