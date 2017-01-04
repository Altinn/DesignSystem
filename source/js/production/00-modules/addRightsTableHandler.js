/* globals defaultSort */

var moveRowToTable = function(tableId, $actionsRow, rowCopiedClass) {
  var $actionsParentRow = $actionsRow.prev();
  var $actionsParentRowCopy = $actionsParentRow.clone();
  var $existingRowCopy = $('#copy-' + $actionsRow.attr('id'));
  var $action = $actionsParentRow.find('td:last-of-type > a');

  if ($action.text().trim() === 'Gi rettigheter') {
    $action.text('Gi og fjerne rettigheter');
  } else {
    $action.text('Gi rettigheter');
  }

  // replace original row with dummy row in source table
  $actionsParentRowCopy.insertAfter($actionsParentRow);

  // check if target table has corresponding deleted row
  if ($existingRowCopy.length > 0) {
    // replace dummy row with original row in target table
    $actionsParentRow.insertAfter($existingRowCopy);
    $actionsRow.insertAfter($actionsParentRow);
    $existingRowCopy.remove();
  } else {
    // add row to table
    $('#' + tableId + ' tbody').append($actionsParentRow);
    $('#' + tableId + ' tbody').append($actionsRow);
  }

  // change styling for source table and set id
  $actionsParentRowCopy.addClass(rowCopiedClass);
  $actionsParentRowCopy.attr('id', 'copy-' + $actionsRow.attr('id'));

  defaultSort();
};

var setupAddRightsHandler = function() {
  var $actionsRow;
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
    return $actionsRow.has('.a-switch input[type="checkbox"]:checked').length > 0;
  }

  $('.a-js-confirmAddRightBtn').on('click', function() {
    $actionsRow = $($(this).closest('tr'));
    currentTableId = $(this).closest('table').attr('id');
    targetTableId = $actionsRow[0].dataset.targetTable;
    sourceTableId = $actionsRow[0].dataset.sourceTable;

    $actionsRow.closest('.a-collapseContent').collapse('hide');

    if (actionsRowHasSelectedElements() && editingSourceTable()) {
      moveRowToTable(targetTableId, $actionsRow, 'a-sortable-row-complete');
    } else if (!actionsRowHasSelectedElements() && editingTargetTable()) {
      moveRowToTable(sourceTableId, $actionsRow, 'a-sortable-row-deleted');
    }
  });
};

