var wasDark = $('header').hasClass('a-darkBackground');
if ($('.a-js-personSwitcherTriggerOutside').length > 0) {
  if ($('.a-dropdown-personswitchList-large').length === 1) {
    $('.a-js-personSwitcherTriggerOutside').find('button').css('cursor', 'auto');
  }
  $('body').on('mouseup', function(e) {
    if (!$('.a-globalNav-main').is(':visible')) {
      $('.a-page').children(':not(header)').removeClass('a-js-hidden');
    }
    if ($('.a-dropdown-personswitchList-large').length === 0) {
      if ($(e.target).closest('.a-dropdown-personswitchList').length === 0 &&
      $(e.target).closest('.a-js-personSwitcherTriggerOutside').length === 0) {
        if ($('.a-dropdown-personswitchList').is(':visible')) {
          $('.a-dropdown-personswitchList').hide();
          $('body').css('background-color', '');
          if (wasDark) {
            $('header').addClass('a-darkBackground');
            $('.a-globalNav-logo').find('img')
              .attr('src', $('.a-globalNav-logo').find('img').attr('src').replace('blue', 'white'));
          }
          $('.a-page').children(':not(header)').removeClass('a-js-hidden');
        }
      } else if ($(e.target).closest('.a-js-personSwitcherTriggerOutside').length > 0) {
        if ($('.a-dropdown-personswitchList').is(':visible')) {
          $('.a-dropdown-personswitchList').hide();
          $('body').css('background-color', '');
          if (wasDark) {
            $('header').addClass('a-darkBackground');
            $('.a-globalNav-logo').find('img')
              .attr('src', $('.a-globalNav-logo').find('img').attr('src').replace('blue', 'white'));
          }
          $('.a-page').children(':not(header)').removeClass('a-js-hidden');
        } else {
          $('.a-dropdown-personswitchList').show();
          if ($('.a-globalNav-main').is(':visible')) {
            $('.navbar-toggler').trigger('click');
          }
        }
      }
    }
  });
  $('.a-js-loadMorePersonSwitcherInfo').prev().hide();
  $('.a-js-loadMorePersonSwitcherInfo').on('click', function() {
    $('.a-dropdown-personswitchList').addClass('a-dropdown-fullWidth');
    if ($('.a-dropdown-personswitchList-large').length === 0) {
      $('body').css('background-color', '#fff');
      if (wasDark) {
        $('header').removeClass('a-darkBackground');
        $('.a-globalNav-logo').find('img')
          .attr('src', $('.a-globalNav-logo').find('img').attr('src').replace('white', 'blue'));
      }
      $('.a-page').children().not('header').addClass('a-js-hidden');
    }
    $(this).prev().show();
    $('.a-js-loadMorePersonSwitcherInfo').hide();
    setTimeout(function() {
      $('.a-js-loadMorePersonSwitcherInfo').show();
      $('.a-dropdown-personswitchList')
        .find('.a-listWithSubLevels').find('button:hidden').each(function(index) {
          if (index < 3) {
            $(this).show();
          }
        });
      $('.a-dropdown-personswitchList')
        .find('.a-bgPanel:hidden').each(function(index) {
          if (index < 3) {
            $(this).show();
          }
        });
      $('.a-js-loadMorePersonSwitcherInfo').prev().hide();
      if (
        $('.a-dropdown-personswitchList')
          .find('.a-listWithSubLevels').find('button:hidden').length === 0 &&
        $('.a-dropdown-personswitchList').find('.a-bgPanel:hidden').length === 0
        ) {
        $('.a-js-loadMorePersonSwitcherInfo').hide();
      }
    }, 1500);
  });
  $('.a-dropdown-personswitchList').find('.a-listWithSubLevels').find('button')
    .each(function(index) {
      if (index > 3) {
        $(this).hide();
      }
    });
  $('.a-dropdown-personswitchList').find('.a-bgPanel')
    .each(function(index) {
      if (index > 3) {
        $(this).hide();
      }
    });
}
