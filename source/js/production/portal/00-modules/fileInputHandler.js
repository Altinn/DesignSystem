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
    $('.a-js-certificateEdit').removeClass('hidden-xs-up');
    $('.a-js-certificateContainer1').removeClass('hidden-xs-up');
    $('.a-js-certificateUpload').addClass('hidden-xs-up');
  });

  $('.a-js-certificateStep1').on('click', function() {
    $('.a-js-certificateContainer1').addClass('hidden-xs-up');
    $('.a-js-certificateContainer2').removeClass('hidden-xs-up');
  });
  $('.a-js-certificateStep2').on('click', function() {
    $('.a-js-certificateEdit').addClass('hidden-xs-up');
    $('.a-js-certificateContainer1').addClass('hidden-xs-up');
    $('.a-js-certificateUpload').removeClass('hidden-xs-up');
  });
};

var onFileListDeleteClick = function(src) {
  var $fileListContainer = $(src).closest('.a-js-fileListContainer');
  $fileListContainer.prev().find('input').val('');
  $fileListContainer.hide();
  $fileListContainer.prev().show(); // show file upload btn
};
