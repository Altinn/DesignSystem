$(document).on('ready', function() {
  $('table[data-table-eventhandler="tableRowToggle"]').on('click', 'tr', function() {
    $(this).toggleClass('selected');
    $('.test').toggle();
  });
});
