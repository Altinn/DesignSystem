/* globals
  fixPatternLinks,
  initSearchWithHighlight,
  AltinnModal,
  newsArchive,
  setupTruncateLines
*/
window.altinnettInit = function() {
  // Only for prototyping
  fixPatternLinks();
  initSearchWithHighlight();

  // Should also be included in production (dist)
  AltinnModal.init();
  newsArchive();
  setupTruncateLines();
};

window.altinnettInit();
