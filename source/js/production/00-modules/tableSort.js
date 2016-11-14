var sortAlphanumerically;
var defaultSort;
var compareTo = function(firstItem, secondItem) {
  var first;
  var second;
  if (firstItem === undefined && secondItem === undefined) {
    return 0;
  }
  if (firstItem === undefined) {
    return 1;
  }
  if (secondItem === undefined) {
    return -1;
  }

  first = firstItem.toString();
  second = secondItem.toString();
  if (first < second) {
    return -1;
  }

  if (first > second) {
    return 1;
  }
  return 0;
};

sortAlphanumerically = function(src, sortIndex) {
  var $table = $(src).closest('table');
  var rows = $table.find('tbody tr');
  $($table.find('th')).removeClass('active');
  $(src).addClass('active');
  rows.sort(function(a, b) {
    var A = $($(a).find('td')[sortIndex]).text()
      .toUpperCase();
    var B = $($(b).find('td')[sortIndex]).text()
      .toUpperCase();
    return compareTo(A, B);
  });


  $.each(rows, function(index, row) {
    $table.children('tbody').append(row);
  });
};

defaultSort = function() {
  var tables = $('table.a-js-sortable');
  tables.each(function() {
    sortAlphanumerically($(this).find('th')[1], 1);
  });
};
