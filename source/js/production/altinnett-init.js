/* globals
  AltinnModal
  setupTruncateLines
  newsArchive
  menuToggleEffectAltinnett
  togglePanel
*/
window.altinnettInit = function() {
  AltinnModal.init();
  setupTruncateLines();
  newsArchive();
  menuToggleEffectAltinnett();
  togglePanel();
};

window.altinnettInit();
