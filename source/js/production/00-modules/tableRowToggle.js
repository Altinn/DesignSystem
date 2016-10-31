$(document).on('ready', function() {
  var $table = $('table[data-table-eventhandler="tableRowToggle"]');
  $table.on('click', 'tbody>tr', function() {
    $(this).toggleClass('selected');
    if ($table.find('tr.selected').length > 0) {
      $('.segment-done').show();
    } else {
      $('.segment-done').hide();
    }
  });
});
