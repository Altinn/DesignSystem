/* globals
  colnavCustom,
  switchForm,
  genericSearch,
  questionnaireInteraction,
  uniformHeight,
  articleAnchors,
  subscribe,
  setupFormValidation
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
};
window.infoportalInit();
// $(document).foundation();
