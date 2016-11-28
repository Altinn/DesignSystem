var resetSearchTarget = function($targetTable) {
  $targetTable.find('tr:not(.a-js-ignoreDuringSearch)').each(function() {
    $(this).show();
    $(this).find('td[data-searchable]').each(function() {
      var columnValue = $(this).html();
      columnValue = columnValue.replace(/<mark>/g, '').replace(/<\/mark>/g, '');
      $(this).html(columnValue);
    });
  });
};

var executeSearch = function($searchInput, $targetTable) {
  $targetTable.find('tbody>tr').each(function() {
    var $currentRow = $(this);
    var match = false;

    $(this).find('td[data-searchable]').each(function() {
      var matches;
      var pattern;
      var srcString = $(this).html();
      var term = $searchInput.val();

      // Create a regex with the search term that ignores tags,
      // this enables the search text "test testing" to hit "<span>test</span> testing"
      term = term.replace(/(\s+)/, '(<[^>]+>)*$1(<[^>]+>)*');
      pattern = new RegExp('(\<.*?\>)|(' + term + ')', 'gi');

      // Only perform the highlighting if there are matches
      matches = pattern.exec(srcString);
      if (matches && matches.length > 0) {
        srcString = srcString.replace(pattern, function(a, b, c) {
          if (c) {
            return '<mark>' + c + '</mark>';
          } else {
              return a;
          }
          });

        // If a search for "test testing" made a hit in "<span>test</span> testing", the resulting
        // html would look like "<span><mark>test</span> testing</mark>", but we want
        // "<span><mark>test</mark></span><mark> testing</mark>"
        srcString = srcString.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/, '$1</mark>$2<mark>$4');

        // Update the column with the highlighted content, and register that a match was made
        $(this).html(srcString);
        match = true;
      }
    });

    // If there was no match in any of the searchable columns, hide the current row
    if (!match && !$currentRow.hasClass('a-js-ignoreDuringSearch')) {
      $currentRow.hide();
    }
  });
};

var searchTableWithHighlight = function($searchInput, $targetTable) {
  $searchInput.on('input', function() {
    var searchTerm = $(this).val();
    resetSearchTarget($targetTable);

    // Exit if no input has been given
    if (searchTerm.length === 0) {
      return false;
    }

    executeSearch($searchInput, $targetTable);

    return true;
  });
};

// Register the search-event for all input fields with the data attribute
// "search-algorithm" set to "show-and-highlight"
$(document).on('ready', function() {
  $('input[data-search-algorithm="show-and-highlight"]').each(function() {
    var input = this;
    $.each(this.dataset.searchTarget.split(','), function() {
      searchTableWithHighlight($(input), $('#' + this.toString()));
    });
  });
});