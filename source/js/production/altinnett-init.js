/* globals
  AltinnModal
  feedbackToggle
  handleFocus
  setupTruncateLines
  newsArchive
  menuToggleEffectAltinnett
  popoverGlobalInit
  popoverLocalInit
  subscribe
  togglePanel
  questionnaireInteraction
*/
window.altinnettInit = function() {
  AltinnModal.init();
  feedbackToggle();
  handleFocus();
  setupTruncateLines();
  newsArchive();
  menuToggleEffectAltinnett();
  popoverGlobalInit();
  popoverLocalInit();
  subscribe();
  togglePanel();
  questionnaireInteraction();
};

window.altinnettInit();
