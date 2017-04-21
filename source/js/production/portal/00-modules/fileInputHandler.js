var onFileInputChange = function() {
  $('.a-js-fileInputChangeHandler').on('focus', function() {
    $('.a-js-fileInputChangeHandler').closest('label').addClass('a-custom-fileupload--focused');
  });
  $('.a-js-fileInputChangeHandler').on('blur', function() {
    $('.a-js-fileInputChangeHandler').closest('label').removeClass('a-custom-fileupload--focused');
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
    $('.a-js-certificateEdit').show();
    $('.a-js-certificateContainer1').show();
    $('.a-js-certificateUpload').hide();
  });

  $('.a-js-certificateStep1').on('click', function() {
    $('.a-js-certificateContainer1').hide();
    $('.a-js-certificateContainer2').show();
  });
  $('.a-js-certificateStep2').on('click', function() {
    $('.a-js-certificateEdit').hide();
    $('.a-js-certificateContainer1').hide();
    $('.a-js-certificateUpload').show();
  });
};

var onFileListDeleteClick = function(src) {
  var $fileListContainer = $(src).closest('.a-js-fileListContainer');
  $fileListContainer.prev().find('input').val('');
  $fileListContainer.hide();
  $fileListContainer.prev().show(); // show file upload btn
};
