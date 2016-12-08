var onboardingBlank = function(bool, delay) {
  $('.onboarding-wrapper')
    .css('transform', 'translate3d(0, 0, 0) matrix(1, 0, 0, 1, 570, 700)');
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
    $('.onboarding-neutral').fadeIn(200, 'linear');
    $('.onboarding-wrapper').show(); $('body').css('overflow-y', 'hidden');
    $('body').css('overflow-x', 'hidden');
    if (fn) {
      fn();
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
  var count = _count; var steps = _steps;
  var horizontalJiggle; var verticalJiggle; var ratio;
  if (count === 0) {
    $('.a-js-circle').css('background-color', 'rgba(2, 47, 81, 1)');
    setTimeout(function() {
      $('.onboarding-neutral').css('opacity', '0');
      $('.onboarding-wrapper').css('opacity', '0.9');
      if ($('body').width() < 768) {
        $('.a-js-circle').css('background-color', 'rgba(2, 47, 81, 0.67)');
      } else {
        $('.a-js-circle').css('background-color', 'rgba(2, 47, 81, 0)');
      }
    }, 250);
  } else {
    onboardingBlank(false);
  }
  ratio = (steps[count].width() / 7.5);
  if (ratio > 12.5) {
    ratio = 12.5;
  }
  if (steps[count - 1]) {
    console.log(steps[count - 1].offset().top);
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
    $('.onboarding-wrapper').css(
      'transform',
      'translate3d(0, 0, 0) matrix(' + (ratio / 5) + ', 0, 0, ' + (ratio / 5) + ',' +
      (
        ratio === 15 ?
        steps[count].offset().left + 95 :
        steps[count].offset().left + (steps[count].width() / 2)
      ) + ',' +
      (
        ratio === 15 ?
        steps[count].offset().top + 30 :
        steps[count].offset().top + (steps[count].height() / 2)
      ) +
      ')'
    );
    $('.onboarding-wrapper').css('top', '1px').css('left', '1px');
    $('html, body').animate({
      scrollTop: steps[count].offset().top - (440)
    }, 200);
  } else {
    $('.onboarding-wrapper').css(
      'transform',
      'translate3d(0, 0, 0) matrix(' + (ratio / 5) + ', 0, 0, ' + (ratio / 5) + ',' +
      (
        ratio === 15 ?
        steps[count].offset().left + 95 :
        steps[count].offset().left + (steps[count].width() / 2)
      ) + ',' +
      (
        ratio === 15 ?
        steps[count].offset().top + 30 :
        steps[count].offset().top + (steps[count].height() / 2)
      ) +
      ')'
    ).css('top', verticalJiggle + 'px').css('left', horizontalJiggle + 'px');
    setTimeout(function() {
      $('.onboarding-wrapper')
      .css('top', (verticalJiggle * -0.5) + 'px')
      .css('left', (horizontalJiggle * -0.5) + 'px');
      setTimeout(function() {
        $('.onboarding-wrapper')
        .css('top', (verticalJiggle * 0.25) + 'px')
        .css('left', (horizontalJiggle * 0.25) + 'px');
        setTimeout(function() {
          $('.onboarding-wrapper')
          .css('top', (verticalJiggle * -0.125) + 'px')
          .css('left', (horizontalJiggle * -0.125) + 'px');
          setTimeout(function() {
            $('.onboarding-wrapper').css('top', '1px').css('left', '1px');
          }, 100);
        }, 100);
      }, 100);
    }, 450);
    $('html, body').animate({
      scrollTop: steps[count].offset().top - (100)
    }, 200);
  }
};
