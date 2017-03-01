/* globals questionnaireInteraction,
  drilldownInteraction,
  handleFocus,
  mobileNavigation,
  propagateContent,
  toggleFilter,
  uniformHeight,
  tooltip,
  initializeDatepicker,
  onboarding,
  nameChecker,
  codeLookup,
  handleValidatorLibrary,
  setupAddRightsHandler,
  onFileInputChange,
  toggleInstant,
  switchForm,
  addListExpandHandler,
  addListSortHandler,
  setupListRowSelect,
  setupOnKeypress,
  genericSearch,
  toggleInstant,
  feedbackToggle,
  popoverLocalInit,
  popoverGlobalInit */

window.sharedInit = function() {
  addListExpandHandler();
  setupOnKeypress();
  handleFocus();
  initializeDatepicker();
  addListSortHandler();
  mobileNavigation();
  propagateContent();
  toggleFilter();
  tooltip();
  toggleInstant();
  feedbackToggle();
  popoverLocalInit();
  popoverGlobalInit();
};
window.sharedInit();
