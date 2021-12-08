var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
var onboardingBlank = function(bool, delay) {
  $('.onboarding-wrapper')
    .css('transform', 'translate3d(0, 0, 0) matrix(1, 0, 0, 1, 570, 700)')
    .css('-webkit-transform', 'translate3d(0, 0, 0) matrix(1, 0, 0, 1, 570, 700)');
  setTimeout(function() {
    if (bool) {
      $('html, body').animate({ scrollTop: 0 }, 200);
      setTimeout(function() {
        $('.onboarding-neutral').css('opacity', '0.9');
        $('.onboarding-wrapper').css('opacity', '0');
      }, 200);
    } else {
      $('.onboarding-neutral').css('opacity', '0');
      $('.onboarding-wrapper').css('opacity', '0.9');
    }
  }, delay || 0);
};
var onboardingCrawl = function(callback) {
  var stepCrawlCount = 1; var arr = [];
  while (
    $('.a-page').find('.a-js-onboardingTarget-' + stepCrawlCount).length > 0
  ) {
    arr.push($('.a-page').find('.a-js-onboardingTarget-' + stepCrawlCount));
    stepCrawlCount += 1;
  }
  if (callback) {
    callback();
  }
  return arr;
};
var onboardingStep = function(i) {
  $('.a-onboarding').find('.modal-content').hide().eq(i)
    .show();
};
var onboardingOnShow = function(el, fn) {
  $(el).on('show.bs.modal', function() {
    if ($(el).hasClass('a-onboarding')) {
      $('.onboarding-neutral').fadeIn(200, 'linear');
      $('.onboarding-wrapper').show(); $('body').css('overflow-y', 'hidden');
      $('body').css('overflow-x', 'hidden');
      if (fn) {
        fn();
      }
    }
  });
};
var onboardingHide = function(fn) {
  if (fn) {
    setTimeout(function() {
      $('body').css('overflow-x', 'auto');
      fn();
    }, 200);
  } else {
    setTimeout(function() {
      $('body').css('overflow-x', 'auto');
    }, 200);
  }
  $('.a-js-modalLauncher').each(function() {
    $($(this).attr('data-target')).modal('hide');
    $('.onboarding-wrapper').hide();
  });
  $('.onboarding-neutral').fadeOut(200, 'linear');
  $('body').css('overflow-x', 'hidden');
  $('body').css('overflow-y', 'scroll');
};
var onboardingSeek = function(_count, _steps) {
  var count = _count; var steps = _steps; var mod; var horizontalJiggle; var verticalJiggle;
  var ratio;
  if (count === 0) {
    $('.a-js-circle').css('background-color', 'rgba(2, 47, 81, 1)');
    setTimeout(function() {
      $('.onboarding-neutral').css('opacity', '0');
      $('.onboarding-wrapper').css('opacity', '0.9');
      $('.a-js-circle').css('background-color', 'rgba(2, 47, 81, 0)');
    }, 250);
  } else {
    onboardingBlank(false);
  }
  ratio = (steps[count].width() / 7.5);
  if (ratio > 12.5) {
    ratio = 12.5;
  }
  if (steps[count - 1]) {
    if (steps[count - 1].offset().left < steps[count].offset().left) {
      horizontalJiggle = 10;
    } else if (
      steps[count - 1].offset().left > steps[count].offset().left
    ) {
      horizontalJiggle = -10;
    } else {
      horizontalJiggle = 0;
    }
    if (steps[count - 1].offset().top < steps[count].offset().top) {
      verticalJiggle = 10;
    } else if (
      steps[count - 1].offset().top > steps[count].offset().top
    ) {
      verticalJiggle = -10;
    } else {
      verticalJiggle = 0;
    }
  } else {
    horizontalJiggle = 10; verticalJiggle = 0;
  }
  if ($('body').width() < 768) {
    ratio = 7.5;
    if (steps[count].offset().top > 30) {
      mod = (steps[count].offset().top - (steps[count].offset().top - (50)));
    } else {
      mod = 31;
    }
    $('.onboarding-wrapper')
      .css(
        'transform',
        'translate3d(0, 0, 0) matrix(' + (ratio / 5) + ', 0, 0, ' + (ratio / 5) + ',' +
          (steps[count].offset().left + (isIE11 ? (570 * ((ratio / 5))) : 0) + (steps[count].width() / 2)) + ',' +
          ((steps[count].height() / 2)) + ')'
      )
      .css(
        '-webkit-transform',
        'translate3d(0, 0, 0) matrix(' + (ratio / 5) + ', 0, 0, ' + (ratio / 5) + ',' +
          (steps[count].offset().left + (isIE11 ? (570 * ((ratio / 5))) : 0) + (steps[count].width() / 2)) + ',' +
          ((steps[count].height() / 2)) + ')'
      )
      .css('top', mod + 'px')
      .css('left', '0.5px');
    $('html, body').animate({
      scrollTop: steps[count].offset().top - (50)
    }, 200);
  } else {
    if (steps[count].offset().top - (100) > 0) {
      mod = 141;
    } else {
      mod = -1;
    }
    $('.onboarding-wrapper')
      .css(
        'transform',
        'translate3d(0, 0, 0) matrix(' + (ratio / 5) + ', 0, 0, ' + (ratio / 5) + ',' +
          (steps[count].offset().left + (isIE11 ? (570 * ((ratio / 5))) : 0) + (steps[count].width() / 2)) + ',' +
          (steps[count].offset().top + (steps[count].height() / 2)) + ')'
      )
      .css(
        '-webkit-transform',
        'translate3d(0, 0, 0) matrix(' + (ratio / 5) + ', 0, 0, ' + (ratio / 5) + ',' +
          (steps[count].offset().left + (isIE11 ? (570 * ((ratio / 5))) : 0) + (steps[count].width() / 2)) + ',' +
          (steps[count].offset().top + (steps[count].height() / 2)) + ')'
      )
      .css('top', verticalJiggle + 'px')
      .css('left', horizontalJiggle + 'px');
    $('.onboarding-wrapper').css('top', (-1 - mod) + 'px').css('left', '2px');
    setTimeout(function() {
      $('.onboarding-wrapper')
        .css('top', ((verticalJiggle * -0.5) - mod) + 'px')
        .css('left', (horizontalJiggle * -0.5) + 'px');
      setTimeout(function() {
        $('.onboarding-wrapper')
          .css('top', ((verticalJiggle * 0.25) - mod) + 'px')
          .css('left', (horizontalJiggle * 0.25) + 'px');
        setTimeout(function() {
          $('.onboarding-wrapper')
            .css('top', ((verticalJiggle * -0.125) - mod) + 'px')
            .css('left', (horizontalJiggle * -0.125) + 'px');
          setTimeout(function() {
            $('.onboarding-wrapper').css('top', (-1 - mod) + 'px').css('left', '2px');
          }, 100);
        }, 100);
      }, 100);
    }, 450);
    $('html, body').animate({
      scrollTop: steps[count].offset().top - (100)
    }, 200);
  }
};
