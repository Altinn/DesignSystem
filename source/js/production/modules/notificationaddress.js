
$(document).ready(function() {
  var smsCount = $('div.a-phone').length;
  var emailCount = $('div.a-email').length;

  /* if (smsCount === 1) {
    $('#smsInput-1').find('.a-delete-phone').addClass('d-none');
  } */
  if (emailCount === 1) {
    $('#emailInput-1').find('.a-delete-email').addClass('d-none');
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
  var inputCount = $('div.a-phone:visible').length;
  var index = inputCount + 1;
  var inputTemplateId;

  if (inputCount === 0) {
    $('#smsInput-1').removeClass('d-none');
  } else if (inputCount === 1) {
    inputTemplateId = '#' + $('div.a-phone').attr('id');
    $(inputTemplateId).clone().attr('id', 'smsInput-' + index).insertAfter(inputTemplateId);
  } else {
    $('#smsInput-' + inputCount).clone().attr('id', 'smsInput-' + index).insertAfter('#smsInput-' + inputCount);
  }
  $('#smsInput-' + index).find('.a-delete').attr('id', 'smsDelete-' + index);
  $('div.a-phone').find('.a-delete-phone').removeClass('d-none');
});

$('body').on('click', '#link-addmore-email', function() {
  var inputCount = $('div.a-email').length;
  var index = inputCount + 1;
  var inputTemplateId;
  if (inputCount === 1) {
    inputTemplateId = '#' + $('div.a-email').attr('id');
    $(inputTemplateId).clone().attr('id', 'emailInput-' + index).insertAfter(inputTemplateId);
  } else {
    $('#emailInput-' + inputCount).clone().attr('id', 'emailInput-' + index).insertAfter('#emailInput-' + inputCount);
  }
  $('div.a-email').find('.a-delete-email').removeClass('d-none');
  $('#emailInput-' + index).find('.a-delete').attr('id', 'emailDelete-' + index);
});

$('body').on('click', 'div.a-phone .a-delete', function(e) {
  var index = (e.target.id).split('-')[1];
  var inputCount = 0;

  if (index === '1') {
    $('#smsInput-' + index).addClass('d-none');
  } else {
    $('#smsInput-' + index).remove();
  }

    /* inputCount = $('div.a-phone').length;
    if (inputCount === 1) {
    $('div.a-phone').find('.a-delete-phone').addClass('d-none');
  } */
});

$('body').on('click', 'div.a-email  .a-delete', function(e) {
  var index = (e.target.id).split('-')[1];
  var inputCount = 0;
  if (index === 1) {
    $('#emailInput-' + index).addClass('d-none');
  } else {
    $('#emailInput-' + index).remove();
  }
  inputCount = $('div.a-email').length;
  if (inputCount === 1) {
    $('div.a-email').find('.a-delete-email').addClass('d-none');
  }
});
