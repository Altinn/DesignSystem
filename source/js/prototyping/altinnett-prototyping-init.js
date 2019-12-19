/* globals
  _anchors,
  articleAnchors,
  autoFootnotes,
  AltinnDropdown,
  fixPatternLinks,
  initSearchWithHighlight,
  AltinnModal,
  addListSortHandler,
  initializeDatepicker,
  compareTo,
  feedbackToggle,
  handleFocus,
  addListExpandHandler,
  listenForAttachmentChanges,
  newsArchive,
  popoverGlobalInit,
  popoverLocalInit,
  setupTruncateLines,
  subscribe,
  questionnaireInteraction,
  setupFormValidation,
  setValidatorSettings,
  setupSlickCarousel,
  searchFilterView
*/
window.altinnettInit = function() {
  // Only for prototyping
  fixPatternLinks();
  initSearchWithHighlight();
  _anchors();
  articleAnchors();
  autoFootnotes();
  AltinnDropdown.init();

  // Should also be included in production (dist)
  AltinnModal.init();
  addListSortHandler();
  initializeDatepicker();
  compareTo();
  feedbackToggle();
  handleFocus();
  addListExpandHandler();
  listenForAttachmentChanges();
  newsArchive();
  popoverGlobalInit();
  popoverLocalInit();
  setupTruncateLines();
  subscribe();
  questionnaireInteraction();
  searchFilterView();
  setupFormValidation();
  setValidatorSettings();

  function setupForm() {
    $('body').off('focus', '#contactForm', setupForm);
    setupFormValidation('#contactForm', '#a-js-contactForm-submit');
  }

  $('body').on('focus', '#contactForm', setupForm);
  setupSlickCarousel();

  function errorMessageCallback(type) {
    if (type === 'ext') {
      // Prefix to error message where the user tried to upload a forbidden file type
      return 'Tillatte filtyper';
    } else if (type === 'size') {
      // Prefix to error message where the user tried to upload a file which is too big
      return 'Maksimum filstørrelse';
    }
    return 'Det oppstod en feil';
  }
  listenForAttachmentChanges('#js-attachmentForm', errorMessageCallback);
};

window.altinnettInit();
