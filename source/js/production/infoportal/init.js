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
};
window.infoportalInit();
// $(document).foundation();
