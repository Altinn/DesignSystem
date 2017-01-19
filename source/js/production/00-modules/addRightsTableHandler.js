/* globals defaultSort */

var moveRowToTable = function(tableId, $row, rowCopiedClass) {
  var $rowCopy = $row.clone();
  var $existingRowCopy = $('#copy-' + $row.attr('id'));
  var $action = $row.find('a.a-fullWidthLink span');

  if ($action.text().trim() === 'Gi rettigheter') {
    $action.text('Gi og fjerne rettigheter');
  } else {
    $action.text('Gi rettigheter');
  }

  // replace original row with dummy row in source list
  $rowCopy.insertAfter($row);

  // check if target list has corresponding deleted row
  if ($existingRowCopy.length > 0) {
    // replace dummy row with original row in target list
    $row.insertAfter($existingRowCopy);
    $existingRowCopy.remove();
  } else {
    // add row to list
    $('#' + tableId).append($row);
  }

  // change styling for source list and set id
  $rowCopy.addClass(rowCopiedClass).addClass('a-disabled');
  $rowCopy.attr('id', 'copy-' + $row.attr('id'));
  $('#' + $rowCopy.attr('id') + ' .a-js-removeMe').remove();

  defaultSort();
};

var setupAddRightsHandler = function() {
  var $row;
  var targetTableId;
  var sourceTableId;
  var currentTableId;

  function editingSourceTable() {
    return targetTableId && currentTableId && currentTableId !== targetTableId;
  }

  function editingTargetTable() {
    return targetTableId && currentTableId && currentTableId === targetTableId;
  }

  function actionsRowHasSelectedElements() {
    return $row.has('.a-switch input[type="checkbox"]:checked').length > 0;
  }

  $('.a-list .collapse').on('hide.bs.collapse', function() {
    $(this).addClass('a-js-removeMe');
    return $(this).closest('li').removeClass('a-expanded');
  });

  $('.a-list .collapse').on('show.bs.collapse', function() {
    return $(this).closest('li').addClass('a-expanded');
  });

  $('.a-list').on('click', '.a-js-confirmAddRightBtn', function() {
    $row = $(this).closest('li').removeClass('a-expanded');
    currentTableId = $(this).closest('ul').attr('id');
    targetTableId = $row[0].dataset.targetTable;
    sourceTableId = $row[0].dataset.sourceTable;

    $row.find('.collapse').collapse('hide');
    $row.removeClass('a-expanded');

    if (actionsRowHasSelectedElements() && editingSourceTable()) {
      moveRowToTable(targetTableId, $($row), 'a-completed');
    } else if (!actionsRowHasSelectedElements() && editingTargetTable()) {
      moveRowToTable(sourceTableId, $($row), 'a-deleted');
    }
  });
};
