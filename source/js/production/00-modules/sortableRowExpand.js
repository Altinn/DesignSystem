var setupSortableRowOnclick = function() {
  $('.a-js-sortable-clickable-row').on('click', function() {
    if (!$(this).hasClass('a-sortable-row-complete') && !$(this).hasClass('a-sortable-row-deleted')) {
      $(this).find('a[data-toggle]')[0].click();
    }
  });
};
