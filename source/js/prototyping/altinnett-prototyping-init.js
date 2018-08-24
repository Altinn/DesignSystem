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
  setupFormValidation,
  setValidatorSettings,
  setupSlickCarousel,
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
  setupFormValidation();
  setValidatorSettings();

  function setupForm() {
    $('body').off('focus', '#contactForm', setupForm);
    setupFormValidation('#contactForm', '#a-js-contactForm-submit');
  }

  $('body').on('focus', '#contactForm', setupForm);
  setupSlickCarousel();
};

window.altinnettInit();
