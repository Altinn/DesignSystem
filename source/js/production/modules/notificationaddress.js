/* $('body').on('change', '.form-control', function() {
  $('.a-btn-success').removeAttr('disabled');
  console.log('hi');
});*/

$('body').on('keyup', '#text-input-notification-epost', function(e) {
  var epostLength = $('#text-input-notification-epost').val().length;
  if (epostLength > 0) {
    $('.a-btn-success').removeAttr('disabled');
  } else {
    $('.a-btn-success').attr('disabled', 'disabled');
  }
});

$('body').on('click', '#link-sms-first', function() {
  $('#link-sms-first').addClass('d-none');
  $('#additionalContactInfo').removeClass('d-none');
});

// $('#additionalContactInfo').adde
