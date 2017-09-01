/* globals
  colnavCustom,
  genericSearch,
  questionnaireInteraction,
  uniformHeight,
  articleAnchors,
  subscribe,
  setupFormValidation,
  autoFootnotes,
  listenForAttachmentChanges
*/
window.infoportalInit = function() {
  colnavCustom();
  genericSearch();
  questionnaireInteraction();
  uniformHeight();
  articleAnchors();
  subscribe();
  setupFormValidation();
  autoFootnotes();
  listenForAttachmentChanges();
  function setupForm1() {
    $('body').off('focus', '#contactForm', setupForm1);
    setupFormValidation('#contactForm', '#a-js-contactForm-submit');
  }
  function setupForm2() {
    $('body').off('focus', '#contactForm2', setupForm2);
    setupFormValidation('#contactForm2', '#a-js-contactForm-submit2');
  }
  $('body').on('focus', '#contactForm', setupForm1);
  $('body').on('focus', '#contactForm2', setupForm2);

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
  listenForAttachmentChanges('#contactForm2', errorMessageCallback);
};
window.infoportalInit();
// $(document).foundation();
