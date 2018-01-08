/* globals
  fixPatternLinks,
  initSearchWithHighlight,
  AltinnModal,
  addListSortHandler,
  compareTo,
  newsArchive,
  setupTruncateLines
*/
window.altinnettInit = function() {
  // Only for prototyping
  fixPatternLinks();
  initSearchWithHighlight();

  // Should also be included in production (dist)
  AltinnModal.init();
  addListSortHandler();
  compareTo();
  newsArchive();
  setupTruncateLines();
};

window.altinnettInit();
