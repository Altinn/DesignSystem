/* globals
  formatOrgNr,
  onConfirmDeletionClick,
  setupListRowSelect,
  initSearchWithHighlight
*/
window.portalInit = function() {
  formatOrgNr();
  onConfirmDeletionClick();
  setupListRowSelect();
  initSearchWithHighlight();
};
window.portalInit();
