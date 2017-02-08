/* globals questionnaireInteraction,
  drilldownInteraction,
  handleFocus,
  mobileNavigation,
  propagateContent,
  toggleExpand,
  toggleFilter,
  uniformHeight,
  tooltip,
  popover,
  aTagSpaceExpand,
  initializeDatepicker,
  onboarding,
  nameChecker,
  codeLookup,
  handleValidatorLibrary,
  defaultSort,
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
  feedbackToggle */

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
  toggleInstant();
  articleAnchors();
  feedbackToggle();
};
window.sharedInit();