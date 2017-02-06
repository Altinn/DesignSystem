/* globals compareTo */

var sortAlphanumerically;
var defaultSort;
var reappendChildRows;

sortAlphanumerically = function(src, sortIndex) {
  var $table = $(src).closest('table');
  var rows = $table.find('tbody tr:not(.a-sortable-action-row)');
  $($table.find('th')).removeClass('active');
  $(src).addClass('active');
  rows.sort(function(a, b) {
    var A = $($(a).find('td')[sortIndex]).text()
      .toUpperCase();
    var B = $($(b).find('td')[sortIndex]).text()
      .toUpperCase();
    return compareTo(A, B);
  });

  reappendChildRows($table, rows);
};

reappendChildRows = function($table, rows) {
  $.each(rows, function(index, row) {
    var prev = $(row).next('.a-sortable-action-row');
    $table.children('tbody').append(row);
    $table.children('tbody').append(prev);
  });
};

defaultSort = function() {
  var tables = $('table.a-js-sortable');
  tables.each(function() {
    sortAlphanumerically($(this).find('th')[1], 1);
  });
};
