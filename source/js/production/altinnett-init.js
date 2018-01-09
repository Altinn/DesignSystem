/* globals
  AltinnModal
  setupTruncateLines
  newsArchive
  menuToggleEffectAltinnett
  togglePanel
  questionnaireInteraction
*/
window.altinnettInit = function() {
  AltinnModal.init();
  setupTruncateLines();
  newsArchive();
  menuToggleEffectAltinnett();
  togglePanel();
  questionnaireInteraction();
};

window.altinnettInit();
