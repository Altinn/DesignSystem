/* globals
  fixPatternLinks,
  initSearchWithHighlight,
  AltinnModal,
  addListSortHandler,
  initializeDatepicker,
  compareTo,
  feedbackToggle,
  handleFocus,
  addListExpandHandler
  newsArchive,
  popoverGlobalInit,
  popoverLocalInit,
  setupTruncateLines,
  subscribe,
  questionnaireInteraction,
*/
window.altinnettInit = function() {
  // Only for prototyping
  fixPatternLinks();
  initSearchWithHighlight();

  // Should also be included in production (dist)
  AltinnModal.init();
  addListSortHandler();
  initializeDatepicker();
  compareTo();
  feedbackToggle();
  handleFocus();
  addListExpandHandler();
  newsArchive();
  popoverGlobalInit();
  popoverLocalInit();
  setupTruncateLines();
  subscribe();
  questionnaireInteraction();
};

window.altinnettInit();
