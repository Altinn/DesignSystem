/* globals $ */
var prototypingInteractionStarteENK = function() {
  /* Prototyping that place will be visible after typing in postnumber */
  $('#postnummer').keyup(function() {
    if (this.value === '0123') {
      $('#a-js-place').css('display', 'inline');
    } else {
      $('#a-js-place').css('display', 'none');
    }
  });
  /* Prototyping that radiobuttons for "Bransje" will be visible after typing in keywords */
  $('#bransje').keyup(function() {
    if (this.value === 'tekstil') {
      $('#a-js-radio-bransje').css('display', 'inline');
    } else {
      $('#a-js-radio-bransje').css('display', 'none');
    }
  });
};
