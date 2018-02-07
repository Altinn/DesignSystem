
function hideDeleteButton() {
  var emailInputCount = $('div.a-email:visible').length;
  var smsInputCount = $('div.a-sms:visible').length;
  if (emailInputCount === 0 && smsInputCount === 1) {
    $('div.a-sms').find('.a-delete-sms').addClass('d-none');
  } else if (emailInputCount === 1 && smsInputCount === 0) {
    $('div.a-email').find('.a-delete-email').addClass('d-none');
  } else {
    $('div.a-sms').find('.a-delete-sms').removeClass('d-none');
    $('div.a-email').find('.a-delete-email').removeClass('d-none');
  }
  if (emailInputCount === 0) {
    $('#emailTitle').addClass('d-none');
    $('#link-addmore-email').addClass('d-none');
    $('#link-email').removeClass('d-none');
  }
}

function addContact(contactType, index, inputCount, tempId) {
  var inputTemplateId;
  var contactId;
  var newContactId;
  var templateId;
  var deleteId;

  contactId = '#' + contactType + 'Input-' + inputCount;
  newContactId = contactType + 'Input-' + index;
  templateId = '#' + contactType + 'Input-1';
  deleteId = contactType + 'Delete-' + index;
  if (inputCount === 0) {
    $(templateId).removeClass('d-none');
    $(templateId).find('input[type=email]').val('');
    $(templateId).find('input.a-input-phonenumber').val('');
  } else {
    $(tempId).clone().attr('id', newContactId).insertAfter(tempId);
  }
  if (inputCount > 0) {
    $('#' + newContactId).find('.a-delete').attr('id', deleteId);
    $('#' + newContactId).find('.a-delete-email').removeClass('d-none');
    $('#' + newContactId).find('input[type=email]').val('');
    $('#' + newContactId).find('input.a-input-phonenumber').val('');
  }
}

function removeContact(contactType, index) {
  if (index === '1') {
    $('#' + contactType + 'Input-' + index).addClass('d-none');
  } else {
    $('#' + contactType + 'Input-' + index).remove();
  }
}

$('body').on('keyup', '#text-input-notification-epost', function(e) {
  var epostLength = $('#text-input-notification-epost').val().length;
  if (epostLength > 0) {
    $('.a-btn-success').removeAttr('disabled');
  } else {
    $('.a-btn-success').attr('disabled', 'disabled');
  }
});

$('body').on('click', '#link-email', function() {
  $('#link-email').addClass('d-none');
  $('#emailTitle').removeClass('d-none');
  $('#emailInput-1').removeClass('d-none');
  $('#link-addmore-email').removeClass('d-none');
  $('#emailInput-1').find('input[type=email]').val('');
  hideDeleteButton();
});

$('body').on('click', '#link-sms', function() {
  $('#link-sms').addClass('d-none');
  $('#phoneTitle').removeClass('d-none');
  $('#smsInput-1').removeClass('d-none');
  $('#smsInput-1').find('input.a-input-phonenumber').val('');
  $('#addmore-sms').removeClass('d-none');
  hideDeleteButton();
});

$('body').on('click', '#link-sms-addmore', function() {
  var inputCount = $('div.a-sms:visible').length;
  var index;
  var lastElement;
  var lastIndex;
  lastElement = $('div.a-sms:visible')[inputCount - 1];
  lastIndex = ($(lastElement).attr('id')).split('-')[1];
  index = parseInt(lastIndex, 10) + 1;

  addContact('sms', index, inputCount, ('#' + $(lastElement).attr('id')));
  hideDeleteButton();
});

$('body').on('click', '#link-addmore-email', function() {
  var inputCount = $('div.a-email:visible').length;
  var index;
  var lastElement;
  var lastIndex;
  lastElement = $('div.a-email:visible')[inputCount - 1];
  lastIndex = ($(lastElement).attr('id')).split('-')[1];
  index = parseInt(lastIndex, 10) + 1;

  addContact('email', index, inputCount, ('#' + $(lastElement).attr('id')));
  hideDeleteButton();
});

$('body').on('click', 'div.a-sms .a-delete', function(e) {
  var index = (e.target.id).split('-')[1];
  var inputCount = 0;

  removeContact('sms', index);
  inputCount = $('div.a-sms:visible').length;
  if (inputCount === 0) {
    $('#phoneTitle').addClass('d-none');
    $('#addmore-sms').addClass('d-none');
    $('#link-sms').removeClass('d-none');
  }
  hideDeleteButton();
});

$('body').on('click', 'div.a-email  .a-delete', function(e) {
  var index = (e.target.id).split('-')[1];

  removeContact('email', index);
  hideDeleteButton();
});

