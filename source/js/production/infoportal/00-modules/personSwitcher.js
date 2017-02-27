if ($('.a-js-personSwitcherTriggerOutside').length > 0) {
  $('.a-js-personSwitcherTriggerOutside').on('click', function() {
    if ($('.a-globalNav-main').hasClass('show')) {
      $('.navbar-toggler').trigger('click');
    }
    $('.a-page').children().not('header').removeClass('a-js-hidden');
    setTimeout(function() {
      if (!$('.a-dropdown-personswitchList').is(':visible')) {
        $('.a-dropdown-personswitchList').show();
      } else {
        $('.a-dropdown-personswitchList').hide();
      }
    }, 0);
  });
  $('body').on('mouseup', function(e) {
    if ($(e.target).closest('.a-dropdown-personswitchList').length === 0 &&
      $(e.target).closest('.a-js-personSwitcherTriggerOutside').length === 0) {
      if ($('.a-dropdown-personswitchList').is(':visible')) {
        $('.a-dropdown-personswitchList').hide();
      }
    }
  });
  $('.a-js-loadMorePersonSwitcherInfo').prev().hide();
  $('.a-js-loadMorePersonSwitcherInfo').on('click', function() {
    $('.a-dropdown-personswitchList').addClass('a-dropdown-fullWidth');
    $('.a-page').children().not('header').addClass('a-js-hidden');
    $(this).prev().show();
    setTimeout(function() {
      $('.a-dropdown-personswitchList')
        .find('.a-listWithSubLevels').find('button:hidden').each(function(index, item) {
          if (index < 3) {
            $(this).show();
          }
        });
      $('.a-js-loadMorePersonSwitcherInfo').prev().hide();
      if (
        $('.a-dropdown-personswitchList')
          .find('.a-listWithSubLevels').find('button:hidden').length === 0
        ) {
        $('.a-js-loadMorePersonSwitcherInfo').hide();
      }
    }, 500);
  });
  $('.a-dropdown-personswitchList').find('.a-listWithSubLevels').find('button')
    .each(function(index, item) {
      if (index > 3) {
        $(this).hide();
      }
    });
}
