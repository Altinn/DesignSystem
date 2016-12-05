/* globals $ */
var prototypingInteractionStarteENK = function() {
  var emptyField = 0; /* Counting the number of times the "bransje"-textfield is empty */
  /* Prototyping that place will be visible after typing in postnumber */
  $('#postnummer').keyup(function() {
    if (this.value === '0123') {
      $('.a-js-place').css('display', 'inline');
    } else {
      $('.a-js-place').css('display', 'none');
    }
  });
  /* Prototyping that radiobuttons for "Virksomhet" will be visible after typing in keywords */
  $('#bransje').keyup(function() {
    if (this.value === 'tekstil') {
      $('#a-js-radio-bransje').css('display', 'inline');
    } else {
      $('#a-js-radio-bransje').css('display', 'none');
    }
  });
  /* Step 3 will start when user has typed in three different keywords without success */
  $('#bransje').keyup(function() {
    if (this.value.length === 0) {
      emptyField += 1;
    }
    if (emptyField >= 3) {
      window.smoothState.load('../../patterns/04-sider-80-prosess-00-starte-enk-3/04-sider-80-prosess-00-starte-enk-3.html');
    }
  });
  /* Toggling chat */
  $('#link-chat').on('click', function() {
    $('#chat').css('display', 'block');
  });
  $('#close-chat').on('click', function() {
    $('#chat').css('display', 'none');
  });
};
