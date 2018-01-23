/* globals
  AltinnModal
  feedbackToggle
  handleFocus
  addListExpandHandler
  initializeDatepicker
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
  addListExpandHandler();
  initializeDatepicker();
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
