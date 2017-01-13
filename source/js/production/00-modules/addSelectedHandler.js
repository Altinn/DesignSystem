var addSelectedHandler = function() {
  $('*[data-set-selected-target]').on('click', function() {
    var target = $(this)[0].dataset.setSelectedTarget;
    $(target).toggleClass('a-selected');
  });
};
