/* globals
  drilldownInteraction,
  switchForm,
  genericSearch,
  handleValidatorLibrary,
  questionnaireInteraction,
  uniformHeight
*/
window.infoportalInit = function() {
  drilldownInteraction();
  switchForm();
  genericSearch();
  handleValidatorLibrary();
  questionnaireInteraction();
  uniformHeight();
};
window.infoportalInit();
// $(document).foundation();
