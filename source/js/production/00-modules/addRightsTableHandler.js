var setupAddRightsHandler = function() {
  $('.a-js-confirmAddRightBtn').on('click', function() {
    $(this).closest('.a-collapseContent').prev().addClass('a-sortable-row-complete');
  });
};
