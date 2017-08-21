function searchFilterView() {
  $(document.body).on('click', '.a-js-searchFilterToggle', function(e) {
    var hideClass = 'd-none';
    var searchField = $('.a-js-filterFocus');
    var inboxWrapper = $('.a-js-inbox-wrapper');
    var searchFilters = $('.a-overlay-container');

    if (searchFilters.hasClass(hideClass)) {
      searchFilters.removeClass(hideClass);
      inboxWrapper.addClass(hideClass);
      searchFilters.removeAttr('tabindex');
      inboxWrapper.attr('tabindex', '-1');
      searchField.attr('tabindex', '1').focus();
    } else {
      searchFilters.addClass(hideClass);
      inboxWrapper.removeClass(hideClass);
      searchFilters.attr('tabindex', '-1');
      inboxWrapper.removeAttr('tabindex');
    }
  });

  $('.a-overlay-container').on('click', 'input', function(e) {
    var hideClass = 'd-none';
    var searchFilerActionWrapper = $('.a-search-filer-action-wrapper');

    if (searchFilerActionWrapper.hasClass(hideClass)) {
      searchFilerActionWrapper.removeClass(hideClass);
    }
  });
}
