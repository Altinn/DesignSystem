/* globals
  AltinnModal
  setupTruncateLines
  newsArchive
  togglePanel
*/
window.altinnettInit = function() {
  AltinnModal.init();
  setupTruncateLines();
  newsArchive();
  togglePanel();
};

window.altinnettInit();
