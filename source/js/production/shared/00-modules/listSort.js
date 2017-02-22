/* globals compareTo */
var sortListAlphanumerically = function(src, sortIndex) {
  var $list = $(src).closest('.a-list-container').find('.a-list');
  var rows = $list.find('li:not(.a-list-header)');
  $(src).closest('.a-list-container').find('.a-list-sortHeader').removeClass('a-active');
  $(src).addClass('a-active');
  rows.sort(function(a, b) {
    var A = $($($($(a).children()[0]).children()[sortIndex]).find('.a-js-sortValue')[0]).text()
      .toUpperCase();
    var B = $($($($(b).children()[0]).children()[sortIndex]).find('.a-js-sortValue')[0]).text()
      .toUpperCase();
    return compareTo(A, B);
  });

  $.each(rows, function(index, row) {
    if ($(row).find('.a-js-sortValue').length > 0) {
      $list.append(row);
    }
  });

  $.each(rows, function(index, row) {
    if ($(row).find('.a-js-sortValue').length === 0) {
      $list.append(row);
    }
  });
};

var addListSortHandler = function() {
  $('.a-list-sortHeader').on('click', function() {
    var index = $(this).index();
    sortListAlphanumerically(this, index);
  });

  $('.a-list-container').each(function() {
    var sortHeader = $(this).find('.a-list-sortHeader')[0];
    var index = $(sortHeader).index();
    sortListAlphanumerically(sortHeader, index);
  });
};
