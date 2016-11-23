var setupAddRightsHandler = function() {
  var $actionsRow;
  var targetTable;
  var toBeCopied;
  $('.a-js-confirmAddRightBtn').on('click', function() {
    $(this).closest('.a-collapseContent').collapse('hide');
    $(this).closest('.a-collapseContent').prev().addClass('a-sortable-row-complete');

    $actionsRow = $($(this).closest('tr'));
    targetTable = $actionsRow[0].dataset.targetTable;
    if (targetTable) {
      toBeCopied = $actionsRow.prev().clone();
      $(toBeCopied).find('.a-collapse-title').toggleClass('toggle-collapse-text');
      $(toBeCopied).find('.a-collapse-title').addClass('collapsed');

      $actionsRow.prev().addClass('a-sortable-row-complete');

      $('#' + targetTable + ' tbody').append(toBeCopied);
      $('#' + targetTable + ' tbody').append($actionsRow);

      toBeCopied.removeClass('a-sortable-row-complete');
    }
  });
};
