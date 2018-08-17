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
  setupFormValidation
  setValidatorSettings
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
  setupFormValidation();
  setValidatorSettings();

  function setupForm() {
    $('body').off('focus', '#contactForm', setupForm);
    setupFormValidation('#contactForm', '#a-js-contactForm-submit');
  }

  $('body').on('focus', '#contactForm', setupForm);
};

window.altinnettInit();
