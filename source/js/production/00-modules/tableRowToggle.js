$(document).on('ready', function() {
  var $table = $('table[data-table-eventhandler="tableRowToggle"]');
  $table.on('click', 'tbody>tr', function() {
    $(this).toggleClass('selected');
    if ($(this).hasClass('selected')) {
      $(this).find('td:last-child').html('Angre <i class="material-icons a-table-icon undo-icon red">history </i>');
    } else {
      $(this).find('td:last-child').html('Fjern <i class="material-icons a-table-icon remove-icon">remove_circle</i>');
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
      $('.segment-done').hide();
    } else {
      $table.find('tbody>tr').addClass('selected');
      $('.segment-done').show();
    }
  });
});
