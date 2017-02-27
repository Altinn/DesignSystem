if ($('.a-js-personSwitcherTriggerOutside').length > 0) {
  $('.a-dropdown-personswitchList').hide();
  $('.a-js-personSwitcherTriggerOutside').on('click', function() {
    setTimeout(function() {
      if (!$('.a-dropdown-personswitchList').is(':visible')) {
        $('.a-dropdown-personswitchList').show();
      } else {
        $('.a-dropdown-personswitchList').hide();
      }
    }, 0);
  });
  $('.a-js-loadMorePersonSwitcherInfo').next().hide();
  $('.a-js-loadMorePersonSwitcherInfo').on('click', function() {
    $(this).next().show();
    setTimeout(function() {
      $('.a-dropdown-personswitchList')
        .find('button:not(.a-js-loadMorePersonSwitcherInfo):hidden').each(function(index, item) {
          if (index < 3) {
            $(this).show();
          }
        });
      $('.a-js-loadMorePersonSwitcherInfo').next().hide();
      if (
        $('.a-dropdown-personswitchList')
          .find('button:not(.a-js-loadMorePersonSwitcherInfo):hidden').length === 0
        ) {
        $('.a-js-loadMorePersonSwitcherInfo').hide();
      }
    }, 500);
  });
  $('.a-dropdown-personswitchList').find('button:not(.a-js-loadMorePersonSwitcherInfo)')
    .each(function(index, item) {
      if (index > 3) {
        $(this).hide();
      }
    });
}
