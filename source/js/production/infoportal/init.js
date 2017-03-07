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
 // handleValidatorLibrary();
  questionnaireInteraction();
  uniformHeight();
  articleAnchors();
};
window.infoportalInit();
// $(document).foundation();
$(document).ready(function() {
  setTimeout(function() {
    $('.a-maxTwoLines').ellipsis({
      lines: 2,
      responsive: true
    });
    $('.a-maxThreeLines').ellipsis({
      lines: 3,
      responsive: true
    });
  }, 0);
});
