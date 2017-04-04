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
  articleAnchors,
  feedbackToggle,
  setValidatorSettings,
  popoverLocalInit,
  popoverGlobalInit,
  subscribe,
  setupSelectableCheckbox */


window.sharedInit = function() {
  setValidatorSettings();
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
  subscribe();
  popoverLocalInit();
  popoverGlobalInit();
  setupSelectableCheckbox();
};
window.sharedInit();
