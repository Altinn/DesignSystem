function searchFilterView() {
  $(document.body).on('click', '.searchFilterToggle', function(e) {
    var hideClass = 'hidden-xs-up';
    var inboxWrapper = $('.inbox-wrapper');
    var searchFilters = $('.a-overlay-container');

    if (searchFilters.hasClass(hideClass)) {
      searchFilters.removeClass(hideClass);
      inboxWrapper.addClass(hideClass);
      searchFilters.attr('tabindex', '1');
      inboxWrapper.attr('tabindex', '-1');
    } else {
      searchFilters.addClass(hideClass);
      inboxWrapper.removeClass(hideClass);
      searchFilters.attr('tabindex', '-1');
      inboxWrapper.attr('tabindex', '1');
    }
  });

  $('.a-overlay-container').on('click', 'input', function(e) {
    var hideClass = 'hidden-xs-up';
    var searchFilerActionWrapper = $('.search-filer-action-wrapper');

    if (searchFilerActionWrapper.hasClass(hideClass)) {
      searchFilerActionWrapper.removeClass(hideClass);
    }
  });
}
