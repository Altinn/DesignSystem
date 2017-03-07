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
    $parent.hide();
    $fileListContainer.show();
    $fileListContainer.find('.a-js-listItemText').text($(this).val().split('\\')[$(this).val().split('\\').length - 1]);
  });
};

var onFileListDeleteClick = function(src) {
  var $fileListContainer = $(src).closest('.a-js-fileListContainer');
  $fileListContainer.prev().find('input').val('');
  $fileListContainer.hide();
  $fileListContainer.prev().show(); // show file upload btn
};
