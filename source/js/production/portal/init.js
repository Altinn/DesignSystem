/* globals
  formatOrgNr,
  cardsToggle,
  onConfirmDeletionClick,
  setupListRowSelect,
  initSearchWithHighlight,
  toggleSwitch
*/
window.portalInit = function() {
  formatOrgNr();
  cardsToggle();
  onConfirmDeletionClick();
  setupListRowSelect();
  initSearchWithHighlight();
  toggleSwitch();
};
window.portalInit();
