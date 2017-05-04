/* globals
  formatOrgNr,
  cardsToggle,
  onConfirmDeletionClick,
  setupListRowSelect,
  toggleSwitch,
  searchWithAutocomplete,
  truncateBoxButtonNames,
  onFileInputChange
*/
window.portalInit = function() {
  formatOrgNr();
  cardsToggle();
  onConfirmDeletionClick();
  setupListRowSelect();
  toggleSwitch();
  searchWithAutocomplete();
  truncateBoxButtonNames();
  onFileInputChange();
};
window.portalInit();
