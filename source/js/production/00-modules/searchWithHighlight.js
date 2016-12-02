/*
Search datatable with highlight using external package mark.js
*/
var mark = function() {
  var input = $(this).val();
  var options = {
    // comment out to ignore html tags in searchable strings
    // ie: string1 <tag>string2</tag>
    separateWordSearch: false
  };

  $.each(this.dataset.searchTarget.split(','), function() {
    // Reset visibility of all rows
    var table = '#' + this.toString();
    $(table + ' tbody>tr:not(.a-js-ignoreDuringSearch)').show();

    // Show information row if open before search
    $(table + ' tbody>tr.open:not(.a-js-ignoreDuringSearch)').each(function() {
      $(this).next().show();
    });

    $(table).find('tbody>tr>td[data-searchable="true"]').unmark().mark(input, options);

     // Hide unmarked rows
    if (input.length > 0) {
      $(table + ' tbody>tr:not(.a-js-ignoreDuringSearch)').each(function() {
        if ($(this).has('td mark').length === 0) {
          $(this).hide();
          // Hide preceding information row
          if ($(this).next().hasClass('a-collapseContent')) {
            $(this).next().hide();
          }
        }
      });
    }
  });
};
$('input[data-search-algorithm="show-and-highlight"]').on('input', mark);
