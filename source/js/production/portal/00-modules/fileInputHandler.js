var onFileInputChange = function() {
  $('.a-js-fileInputChangeHandler').on('change', function() {
    var $parent = $(this).parent();
    $parent.hide();
    $parent.next().show();
    $parent.next().find('.a-js-listItemText').text($(this).val());
 //   $(this).closest('form[data-toggle="validator"]').trigger('validate.bs.validator');
  });
};

var onFileListDeleteClick = function(src) {
  var $fileListContainer = $(src).closest('.a-js-fileListContainer');
  $fileListContainer.prev().find('input').val('');
  $fileListContainer.hide();
  $fileListContainer.prev().show();
//  $(src).closest('form[data-toggle="validator"]').trigger('validate.bs.validator');
};
