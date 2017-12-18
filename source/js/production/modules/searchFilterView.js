function searchFilterView() {
  function RepositionStickyHelp() {
    var searchFilters = $('.a-overlay-container');
    var searchFilerActionButton = $('.a-search-filter-action-wrapper button');
    if (searchFilters.is(':visible') && searchFilerActionButton.position().left === 0) {
      searchFilerActionButton.css('transform', 'translateY(-38px)');
    } else {
      searchFilerActionButton.css('transform', 'translateY(0px)');
    }
  }

  $(document.body).on('click', '.a-js-searchFilterToggle', function(e) {
    var hideMainInbox = $('.a-js-hideElement');
    var searchField = $('.a-js-filterFocus');
    var searchFilters = $('.a-overlay-container');
    var hideClass = 'd-none';

    if (searchFilters.hasClass(hideClass)) {
      searchFilters.removeClass(hideClass);
      hideMainInbox.addClass(hideClass);
      searchFilters.removeAttr('tabindex');
      hideMainInbox.attr('tabindex', '-1');
      searchField.attr('tabindex', '1').focus();
      $('input#inbox_search_filter').val($('input#inbox_search').val());
    } else {
      searchFilters.addClass(hideClass);
      hideMainInbox.removeClass(hideClass);
      searchFilters.attr('tabindex', '-1');
      hideMainInbox.removeAttr('tabindex');
      $('input#inbox_search').val($('input#inbox_search_filter').val());
    }
    setTimeout(RepositionStickyHelp, 0);

    $(window).off('resize', RepositionStickyHelp);
    $(window).resize(RepositionStickyHelp);
  });
}
