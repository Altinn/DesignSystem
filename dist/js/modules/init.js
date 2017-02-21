/* globals
  formatOrgNr,
  cardsToggle,
  onConfirmDeletionClick,
  setupListRowSelect,
  initSearchWithHighlight,
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
  initSearchWithHighlight();
  toggleSwitch();
  searchWithAutocomplete();
  truncateBoxButtonNames();
  onFileInputChange();
};
window.portalInit();
