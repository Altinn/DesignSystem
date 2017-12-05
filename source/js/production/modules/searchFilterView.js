function searchFilterView() {
  var hideClass = 'd-none';

  function RepositionStickyHelp() {
    var searchFilters = $('.a-overlay-container');
    var searchFilerActionWrapper = $('.a-search-filter-action-wrapper');
    if (searchFilerActionWrapper.hasClass(hideClass) || searchFilters.hasClass(hideClass)) {
      $('.a-stickyHelp-container button').css('transform', 'translateY(0px)');
    } else {
      $('.a-stickyHelp-container button').css('transform', 'translateY(-38px)');
    }
  }

  $(document.body).on('click', '.a-js-searchFilterToggle', function(e) {
    var hideMainInbox = $('.a-js-hideElement');
    var searchField = $('.a-js-filterFocus');
    var searchFilters = $('.a-overlay-container');

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
  });

  $('.a-overlay-container').on('change', 'input', function(e) {
    var searchFilerActionWrapper = $('.a-search-filter-action-wrapper');
    setTimeout(RepositionStickyHelp, 0);
    if (searchFilerActionWrapper.hasClass(hideClass)) {
      searchFilerActionWrapper.removeClass(hideClass);
    }
  });
}
