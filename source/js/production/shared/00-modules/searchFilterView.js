function searchFilterView() {
  $(document.body).on('click', '.a-js-searchFilterToggle', function(e) {
    var hideClass = 'd-none';
    var hideMainInbox = $('.a-js-hideElement');
    var searchField = $('.a-js-filterFocus');
    var searchFilters = $('.a-overlay-container');

    if (searchFilters.hasClass(hideClass)) {
      searchFilters.removeClass(hideClass);
      hideMainInbox.addClass(hideClass);
      searchFilters.removeAttr('tabindex');
      hideMainInbox.attr('tabindex', '-1');
      searchField.attr('tabindex', '1').focus();
    } else {
      searchFilters.addClass(hideClass);
      hideMainInbox.removeClass(hideClass);
      searchFilters.attr('tabindex', '-1');
      hideMainInbox.removeAttr('tabindex');
    }
  });

  $('.a-overlay-container').on('change', 'input', function(e) {
    var hideClass = 'd-none';
    var searchFilerActionWrapper = $('.a-search-filer-action-wrapper');

    if (searchFilerActionWrapper.hasClass(hideClass)) {
      searchFilerActionWrapper.removeClass(hideClass);
    }
  });
}
