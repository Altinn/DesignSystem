var certificateHandler = function() {
  $('.a-js-certificateContainer').on('focus', function() {
    $('.a-js-certificateContainer').closest('label').addClass('a-custom-fileupload--focused');
  });
  $('.a-js-certificateContainer').on('blur', function() {
    $('.a-js-certificateContainer').closest('label').removeClass('a-custom-fileupload--focused');
  });

  $('.a-js-fileInputChangeHandler').on('change', function() {
    var $parent = $(this).parent();
    var $fileListContainer = $parent.next();
    var $listItemText = $fileListContainer.find('.a-js-listItemText');
    var $listItem = $fileListContainer.find('li');
    var $listItemLabel = $fileListContainer.find('li').attr('aria-label');
    var fileName = $(this).val().split('\\')[$(this).val().split('\\').length - 1];

    $parent.hide();
    $fileListContainer.show();
    $listItemText.text(fileName);
    $listItem.attr('aria-label', $listItemLabel + fileName);
  });

  $('.a-js-certificateContainer').on('change', function() {
    $('.a-js-certificateEdit').removeClass('d-none');
    $('.a-js-certificateContainer1').removeClass('d-none');
    $('.a-js-certificateUpload').addClass('d-none');
  });

  $('.a-js-certificateStep1').on('click', function() {
    $('.a-js-certificateContainer1').addClass('d-none');
    $('.a-js-certificateContainer2').removeClass('d-none');
  });
  $('.a-js-certificateStep2').on('click', function() {
    $('.a-js-certificateEdit').addClass('d-none');
    $('.a-js-certificateContainer1').addClass('d-none');
    $('.a-js-certificateUpload').removeClass('d-none');
  });

  $('.a-js-addcertificate').on('click', function() {
    $('.a-js-certificateList').addClass('d-none');
    $('.a-js-certificateUpload').removeClass('d-none');
    $('.a-js-certificateUpload').find('input').focus();
  });
  $('.a-custom-certupload').on('change', function() {
    $('.a-js-certificateList').removeClass('d-none');
    $('.a-js-certificateUpload').addClass('d-none');
    $('#loginInfoEnterprisePanelHeader').find('a').first().focus();
  });
  $('#cancel-upload').on('click', function() {
    $('.a-js-certificateList').removeClass('d-none');
    $('.a-js-certificateUpload').addClass('d-none');
    $('#loginInfoEnterprisePanelHeader').find('a').first().focus();
  });
  $('.a-js-certificateEdit').on('click', function() {
    $('.a-js-edit-userpass').removeClass('d-none');
    $('.a-js-certificates').addClass('d-none');
  });
  $('.a-js-certificateSave').on('click', function() {
    $('.a-js-certificates').removeClass('d-none');
    $('.a-js-edit-userpass').addClass('d-none');
  });
};
