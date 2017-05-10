/* globals
  colnavCustom,
  switchForm,
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
  switchForm();
  genericSearch();
  questionnaireInteraction();
  uniformHeight();
  articleAnchors();
  subscribe();
  setupFormValidation();
  autoFootnotes();
  AltinnQuickhelp.init();
};
window.infoportalInit();
// $(document).foundation();
