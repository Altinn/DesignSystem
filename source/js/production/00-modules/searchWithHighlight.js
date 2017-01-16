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
    var target = '#' + this.toString();
    if ($(target).prop('nodeName') == 'table') {
      $(target + ' tbody>tr:not(.a-js-ignoreDuringSearch)').show();
      $(target).find('tfoot').hide();

      // Show information row if open before search
      $(target + ' tbody>tr.open:not(.a-js-ignoreDuringSearch)').each(function() {
        $(this).next().show();
        $(target).find('tfoot').hide();
      });

      $(target).find('tbody>tr>td[data-searchable="true"]').unmark().mark(input, options);

      // Hide unmarked rows
      if (input.length > 0) {
        $(target + ' tbody>tr:not(.a-js-ignoreDuringSearch)').each(function() {
          if ($(this).find('mark').length === 0) {
            $(this).hide();
            console.log('Hiding');
            // Hide preceding information row
            if ($(this).next().hasClass('a-collapseContent')) {
              $(this).next().hide();
            }
          }
        });

        if ($(target + ' tbody>tr:not(.a-js-ignoreDuringSearch):visible').length === 0) {
          $(target).find('tfoot').show();
        } else {
          $(target).find('tfoot').hide();
        }
      }
    } else {
      $(target + ' li:not(.a-js-ignoreDuringSearch):not(.a-list-header)').show();

      // Show information row if open before search
      // TODO for list
      // $(target + ' tbody>tr.open:not(.a-js-ignoreDuringSearch)').each(function() {
      //   $(this).next().show();
      //   $(target).find('tfoot').hide();
      // });

      $(target).find('*[data-searchable="true"]').unmark().mark(input, options);

      // Hide unmarked rows
      if (input.length > 0) {
        $(target + ' li:not(.a-js-ignoreDuringSearch):not(.a-list-header)').each(function() {
          if ($(this).find('mark').length === 0) {
            $(this).hide();
            // Hide preceding information row
            // TODO for list
            // if ($(this).next().hasClass('a-collapseContent')) {
            //   $(this).next().hide();
            // }
          }
        });
      }
    }
  });
};
$('input[data-search-algorithm="show-and-highlight"]').on('input', mark);
