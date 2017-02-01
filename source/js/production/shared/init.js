/* globals questionnaireInteraction, drilldownInteraction, handleFocus,
mobileNavigation, propagateContent, toggleExpand, toggleFilter, uniformHeight,
tooltip, popover, aTagSpaceExpand, initializeDatepicker, onboarding,
nameChecker, codeLookup, handleValidatorLibrary,
defaultSort, setupAddRightsHandler, onFileInputChange, toggleInstant, switchForm,
addListExpandHandler,
addListSortHandler, setupListRowSelect, setupOnKeypress,
genericSearch, formatOrgNr */

window.sharedInit = function() {
  addListExpandHandler();
  aTagSpaceExpand();
  setupOnKeypress();
  handleFocus();
  initializeDatepicker();
  addListSortHandler();
  mobileNavigation();
  popover();
  propagateContent();
  toggleExpand();
  toggleFilter();
  tooltip();
};
window.sharedInit();
$(document).foundation();
/* globals
  aTagSpaceExpand,
  handleFocus,
  initializeDatepicker,
  sortListAlphanumerically,
  mobileNavigation,
  popover,
  propagateContent,
  toggleExpand,
  toggleFilter,
  tooltip
*/
window.sharedInit = function() {
  aTagSpaceExpand();
  handleFocus();
  initializeDatepicker();
  sortListAlphanumerically();
  mobileNavigation();
  popover();
  propagateContent();
  toggleExpand();
  toggleFilter();
  tooltip();
};
window.sharedInit();
