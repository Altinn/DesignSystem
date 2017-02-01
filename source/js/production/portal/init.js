/* globals
  formatOrgNr,
  cardsToggle,
  onConfirmDeletionClick,
  setupListRowSelect,
  initSearchWithHighlight
*/
window.portalInit = function() {
  formatOrgNr();
  cardsToggle();
  onConfirmDeletionClick();
  setupListRowSelect();
  initSearchWithHighlight();
};
window.portalInit();
