/* globals
  drilldownInteraction,
  switchForm,
  genericSearch,
  handleValidatorLibrary,
  questionnaireInteraction,
  uniformHeight,
  articleAnchors
*/
window.infoportalInit = function() {
  drilldownInteraction();
  switchForm();
  genericSearch();
  handleValidatorLibrary();
  questionnaireInteraction();
  uniformHeight();
  articleAnchors();
};
window.infoportalInit();
// $(document).foundation();
