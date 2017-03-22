/*
Search datatable with highlight using external package mark.js
Search field needs attribute data-search-algorithm="show-and-highlight"
Searchable elements need attribute data-searchable="true"
List elements that should be ignored during search need the class a-js-ignoreDuringSearch
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
    var target = '#' + this.toString();

    $(target + ' li:not(.a-js-ignoreDuringSearch):not(.a-list-header)').show();

    $(target).find('*[data-searchable="true"]').unmark().mark(input, options);

    // Hide unmarked rows
    if (input.length > 0) {
      $(target + ' li:not(.a-js-ignoreDuringSearch):not(.a-list-header)').each(function() {
        if ($(this).find('mark').length === 0) {
          $(this).hide();
        }
      });
    }
  });
};

var initSearchWithHighlight = function() {
  $('input[data-search-algorithm="show-and-highlight"]').on('input', mark);
};
