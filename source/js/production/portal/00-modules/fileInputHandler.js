var onFileInputChange = function() {
  $('.a-js-fileInputChangeHandler').on('change', function() {
    var $parent = $(this).parent();
    $parent.hide();
    $parent.next().show();
    $parent.next().find('.a-js-listItemText').text($(this).val().split('\\')[$(this).val().split('\\').length - 1]);
  });
};

var onFileListDeleteClick = function(src) {
  var $fileListContainer = $(src).closest('.a-js-fileListContainer');
  $fileListContainer.prev().find('input').val('');
  $fileListContainer.hide();
  $fileListContainer.prev().show();
};
