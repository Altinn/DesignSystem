$(document).on('ready', function() {
  var $table = $('table[data-table-eventhandler="tableRowToggle"]');
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
      $('.segment-done').show();
    } else {
      $('.segment-done').hide();
    }
  });
  $('.add-remove-all').on('click', function() {
    if ($table.find('tbody>tr.selected').length === $table.find('tbody>tr').length) {
      $table.find('tbody>tr').removeClass('selected');
      $table.find('td:last-child span').hide();
      $table.find('td:last-child span.remove-action').show();
      $('.segment-done').hide();
    } else {
      $table.find('tbody>tr').addClass('selected');
      $table.find('td:last-child span').hide();
      $table.find('td:last-child span.undo-action').show();
      $('.segment-done').show();
    }
  });
});
