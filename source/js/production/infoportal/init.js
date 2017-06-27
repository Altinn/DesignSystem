/* globals
  colnavCustom,
  genericSearch,
  questionnaireInteraction,
  uniformHeight,
  articleAnchors,
  subscribe,
  setupFormValidation,
  autoFootnotes,
  AltinnQuickhelp
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
  AltinnQuickhelp.init();
  $('body').on('focus', '#contactForm', function() {
    setupFormValidation('#contactForm', '#a-js-contactForm-submit');
  });
  $('body').on('focus', '#contactForm2', function() {
    setupFormValidation('#contactForm2', '#a-js-contactForm-submit2');
  });
};
window.infoportalInit();
// $(document).foundation();
