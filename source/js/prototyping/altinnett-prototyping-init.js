/* globals
  fixPatternLinks,
  AltinnModal,
  setupTruncateLines
*/
window.altinnettInit = function() {
  // Only for prototyping
  fixPatternLinks();

  // Should also be included in production (dist)
  AltinnModal.init();
  setupTruncateLines();
};

window.altinnettInit();
