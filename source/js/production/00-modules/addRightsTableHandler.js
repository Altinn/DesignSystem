var setupAddRightsHandler = function() {
  $('.a-js-confirmAddRightBtn').on('click', function() {
    $(this).closest('.a-collapseContent').prev().addClass('a-sortable-row-complete');

    var $actionsRow = $($(this).closest('tr'));
    console.log($actionsRow[0].dataset);
    var targetTable = $actionsRow[0].dataset.targetTable;
      console.log(targetTable);
    if (targetTable) {
      console.log(targetTable);

      var toBeCopied = $actionsRow.prev().clone();
      $(toBeCopied).find('.a-collapseTitle').toggleClass('toggle-collapse-text');

      $actionsRow.prev().addClass('a-sortable-row-complete');

      $('#' + targetTable + ' tbody').append(toBeCopied);
      $('#' + targetTable + ' tbody').append($actionsRow);

      toBeCopied.removeClass('a-sortable-row-complete');
    }
    toggleFilter();
  });
};
