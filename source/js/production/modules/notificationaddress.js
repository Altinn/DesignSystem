
$(document).ready(function() {
  var smsCount = $('div.a-phone').length;
  var emailCount = $('div.a-email').length;

  if (smsCount === 1) {
    $('div.a-phone').find('.a-delete-phone').addClass('d-none');
  }
  if (emailCount === 1) {
    $('div.a-email').find('.a-delete-email').addClass('d-none');
  }
});

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
  $('#phoneTitle').removeClass('d-none');
  $('#smsInput-1').removeClass('d-none');
  $('#addmore-sms').removeClass('d-none');
});

$('body').on('click', '#link-sms-addmore', function() {
  var index = $('div.a-phone').length;
  $('#smsInput-1').clone().attr('id', 'smsInput-' + index++).insertAfter('#smsInput-1');
  $('div.a-phone').find('.a-delete-phone').removeClass('d-none');
});

$('body').on('click', '#link-addmore-email', function() {
  var index = $('div.a-email').length;
  $('#emailInput-1').clone().attr('id', 'emailInput-' + index++).insertAfter('#emailInput-1');
  $('div.a-email').find('.a-delete-email').remvoveClass('d-none');
});

