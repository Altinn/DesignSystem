/* globals goBack */
var onConfirmDeletionClick = function() {
  var $table = $('table[data-table-eventhandler="tableRowToggle"]');
  var $segmentDone = $('.segment-done');
  var $selectedRows;
  var goToReceipt = false;

  if ($table.find('tbody>tr.selected').length === $table.find('tbody>tr').length) {
    goToReceipt = true;
  } else {
    $selectedRows = $table.find('tbody>tr.selected');
    $selectedRows.removeClass('selected').addClass('deleted');
    $selectedRows.find('td:last-child span').hide();
    $selectedRows.find('td:last-child span.deleted-action').show();
    $segmentDone.hide();
  }

  return goToReceipt;
};

var handleModalClose = function(src, targetUrl) {
  var hasSelectedRows = $('table[data-table-eventhandler="tableRowToggle"] tr.selected').length > 0;
  if (!hasSelectedRows) {
    $(src).popover('disable');
    location.href = targetUrl;
  }
};

var setupDeletableRowsTable = function() {
  var $table = $('table[data-table-eventhandler="tableRowToggle"]');
  var $segmentDone = $('.segment-done');
  var $selectedRows;
  $table.on('click', 'tbody>tr', function() {
    $(this).toggleClass('selected');
    if ($(this).hasClass('selected')) {
      $(this).find('td:last-child span').hide();
      $(this).find('td:last-child span.undo-action').show();
    } else {
      $(this).find('td:last-child span').hide();
      $(this).find('td:last-child span.remove-action').show();
    }
    if ($table.find('tr.selected').length > 0) {
      $segmentDone.show();
    } else {
      $segmentDone.hide();
    }
  });
  $('.add-remove-all').on('click', function() {
    if ($table.find('tbody>tr.selected').length === $table.find('tbody>tr').length) {
      $table.find('tbody>tr').removeClass('selected');
      $table.find('td:last-child span').hide();
      $table.find('th:last-child span').hide();
      $table.find('td:last-child span.remove-action').show();
      $table.find('th:last-child span.remove-action').show();
      $segmentDone.hide();
    } else {
      $table.find('tbody>tr').addClass('selected');
      $table.find('td:last-child span').hide();
      $table.find('th:last-child span').hide();
      $table.find('td:last-child span.undo-action').show();
      $table.find('th:last-child span.undo-action').show();
      $segmentDone.show();
    }
  });
  $('#cancel-deletion').on('click', function() {
    $table.find('tbody>tr').removeClass('selected').removeClass('deleted');
    $table.find('td:last-child span').hide();
    $table.find('th:last-child span').hide();
    $table.find('td:last-child span.remove-action').show();
    $table.find('th:last-child span.remove-action').show();
  });
};
