/* globals $ */
var preOpenModals = function() {
  $('#modalExample').addClass('in');
};

/* Prototyping that place will be visible after typing in postnumber */
$(document).ready(function() {
  $('#postnummer').keyup(function() {
    if (this.value === '0123') {
      $('#a-js-place').css('display', 'inline');
    } else {
      $('#a-js-place').css('display', 'none');
    }
  });
});
