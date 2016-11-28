/*
Search datatable with highlight using external package mark.js
*/
var mark = function() {
  var input = $(this).val();
  var options = {
    exclude: ['a-js-ignoreDuringSearch'],
    separateWordSearch: false
  };

  $.each(this.dataset.searchTarget.split(','), function() {
    // Reset visibility of all rows
    var table = '#' + this.toString();
    $(table + ' tr:not(.a-js-ignoreDuringSearch)').show();

    $(table).find('td[data-searchable="true"]').unmark().mark(input, options);

     // Hide unmarked rows
    if (input.length > 0) {
      $(table + ' tr:not(.a-js-ignoreDuringSearch)').each(function() {
        if ($(this).has('td mark').length === 0) {
          $(this).hide();
        }
      });
    }
  });
};
$('input[data-search-algorithm="show-and-highlight"]').on('input', mark);
