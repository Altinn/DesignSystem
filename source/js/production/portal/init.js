/* globals
  formatOrgNr,
  onConfirmDeletionClick,
  setupListRowSelect,
  initSearchWithHighlight,
  toggleSwitch
*/
window.portalInit = function() {
  formatOrgNr();
  onConfirmDeletionClick();
  setupListRowSelect();
  initSearchWithHighlight();
  toggleSwitch();
};
window.portalInit();
