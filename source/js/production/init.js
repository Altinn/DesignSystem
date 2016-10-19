/* globals questionnaireInteraction, drilldownInteraction, handleFocus,
mobileNavigation, propagateContent, toggleExpand, toggleFilter, uniformHeight,
tooltip, popover, aTagSpaceExpand, initializeDatepicker */
window.altinnInit = function() {
  toggleExpand();
  drilldownInteraction();
  toggleFilter();
  uniformHeight();
  handleFocus();
  tooltip();
  popover();
  mobileNavigation();
  propagateContent();
  questionnaireInteraction();
  aTagSpaceExpand();
  initializeDatepicker();
};
window.altinnInit();
