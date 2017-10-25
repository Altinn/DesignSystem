/* globals
  formatOrgNr,
  cardsToggle,
  onConfirmDeletionClick,
  setupListRowSelect,
  toggleSwitch,
  truncateBoxButtonNames,
  onFileInputChange
*/
window.portalInit = function() {
  formatOrgNr();
  cardsToggle();
  onConfirmDeletionClick();
  setupListRowSelect();
  toggleSwitch();
  truncateBoxButtonNames();
  onFileInputChange();
};
window.portalInit();
