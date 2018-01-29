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

$('body').on('click', '#link-sms', function() {
  $('#link-sms').addClass('d-none');
  $('#additionalContactInfo').removeClass('d-none');
  $('#addmore-sms').removeClass('d-none');
});

$('body').on('click', '#link-sms-addmore', function() {
  var clone = $('#notificationInfoSMSTemplate').clone();
  $('#addmore-sms').before(clone.html());
});

$('body').on('click', '#link-addmore-email', function() {
  // var index = $('li').length;
  // var clone = $('#phoneNumber-1').clone();
  var clone = $('#notificationInfoEmailTemplate').clone();
  // clone.html($(clone).html().replace(/\[#\]/g, '[' + index + ']'));
  // clone.html($(clone).html().replace(/%/g, index));
  $('#addmore-email').before(clone.html());
});
