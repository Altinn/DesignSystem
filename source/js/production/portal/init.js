/* globals
  formatOrgNr,
  cardsToggle,
  onConfirmDeletionClick,
  setupListRowSelect,
  initSearchWithHighlight,
  toggleSwitch,
  searchWithAutocomplete,
  truncateBoxButtonNames
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
};
window.portalInit();
