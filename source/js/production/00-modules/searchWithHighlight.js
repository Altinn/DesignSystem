var resetSearchTarget = function($targetTable) {
  $targetTable.find('tr').each(function() {
    $(this).show();
    $(this).find('td[data-searchable]').each(function() {
      var columnValue = $(this).text();
      columnValue = columnValue.replace('<mark>', '').replace('</mark>', '');
      $(this).text(columnValue);
    });
  });
};

var executeSearch = function($searchInput, $targetTable) {
  $targetTable.find('tbody>tr').each(function() {
    var $currentRow = $(this);
    var match = false;
    
    $(this).find('td[data-searchable]').each(function() {
      var src_str = $(this).html();
      var term = $searchInput.val();

      // Create a regex with the search term that ignores tags,
      // this enables the search text "test testing" to hit "<span>test</span> testing"
      term = term.replace(/(\s+)/, '(<[^>]+>)*$1(<[^>]+>)*');
      var pattern = new RegExp('(' + term + ')', 'gi');

      // Only perform the highlighting if there are matches
      var matches = pattern.exec(src_str);
      if (matches && matches.length > 0) {
        src_str = src_str.replace(pattern, '<mark>$1</mark>');

        // If a search for "test testing" made a hit in "<span>test</span> testing", the resulting
        // html would look like "<span><mark>test</span> testing</mark>", but we want 
        // "<span><mark>test</mark></span><mark> testing</mark>"
        src_str = src_str.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/, '$1</mark>$2<mark>$4');

        // Update the column with the highlighted content, and register that a match was made
        $(this).html(src_str);
        match = true;
      }
    });

    // If there was no match in any of the searchable columns, hide the current row
    if (!match) {
      $currentRow.hide();
    }
  });
};

var searchTableWithHighlight = function($searchInput, $targetTable) {
  $searchInput.on('input', function() {
    resetSearchTarget($targetTable);

    // Exit if no input has been given
    var searchTerm = $(this).val();
    if (searchTerm.length === 0) {
      return false;
    }
    
    executeSearch($searchInput, $targetTable);
  });
};

// Register the search-event for all input fields with the data attribute "search-algorithm" set to "show-and-highlight"
$(document).on('ready', function() {
  $('input[data-search-algorithm="show-and-highlight"]').each(function() {
    searchTableWithHighlight($(this), $('#' + this.dataset.searchTarget));
  });
});
