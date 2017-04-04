/* globals
  colnavCustom,
  switchForm,
  genericSearch,
  questionnaireInteraction,
  uniformHeight,
  articleAnchors
*/
window.infoportalInit = function() {
  colnavCustom();
  switchForm();
  genericSearch();
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
