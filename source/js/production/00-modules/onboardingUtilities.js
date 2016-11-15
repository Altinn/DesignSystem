var xmlToString = function(xmlData) {
  var xmlString;
  if (window.ActiveXObject) {
    xmlString = xmlData.xml;
  } else {
    xmlString = (new XMLSerializer()).serializeToString(xmlData);
  }
  return xmlString;
};
var onboardingBlank = function(bool, delay) {
  $('.onboarding-wrapper')
    .css('transform', 'translate3d(0, 0, 0) matrix(3, 0, 0, 3, 570, 700)');
  setTimeout(function() {
    if (bool) {
      $('.onboarding-neutral').css('opacity', '1');
      $('.onboarding-wrapper').css('opacity', '0');
      $('html, body').animate({ scrollTop: 0 }, 200);
    } else {
      $('.onboarding-neutral').css('opacity', '0');
      $('.onboarding-wrapper').css('opacity', '1');
    }
  }, delay || 0);
};
var onboardingCrawl = function() {
  var stepCrawlCount = 1; var arr = [];
  while (
    $('.a-page').find('.a-js-onboardingTarget-' + stepCrawlCount).length > 0
  ) {
    arr.push($('.a-page').find('.a-js-onboardingTarget-' + stepCrawlCount));
    stepCrawlCount += 1;
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
    $($(this).attr('data-target')).modal('hide'); $('.onboarding-wrapper').hide();
  });
  $('.onboarding-neutral').fadeOut(200, 'linear');
  $('body').css('overflow-x', 'hidden');
  $('body').css('overflow-y', 'scroll');
};
var onboardingSeek = function(_count, _steps) {
  var count = _count; var steps = _steps;
  var horizontalJiggle; var verticalJiggle; var ratio;
  if (count === 0) {
    $('.a-js-circle').css('opacity', '0.9');
    setTimeout(function() {
      $('.onboarding-neutral').css('opacity', '0');
      $('.onboarding-wrapper').css('opacity', '1');
      $('.a-js-circle').css('opacity', '0');
    }, 250);
  } else {
    onboardingBlank(false);
  }
  ratio = (steps[count].width() / 7.5);
  if (ratio > 15) {
    ratio = 15;
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
  $('.onboarding-wrapper').css(
    'transform',
      'translate3d(0, 0, 0) matrix(' + ratio + ', 0, 0, ' + ratio + ',' +
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
          $('.onboarding-wrapper').css('top', '0px').css('left', '0px');
        }, 100);
      }, 100);
    }, 100);
  }, 450);
  $('html, body').animate({
    scrollTop: steps[count].offset().top - (140)
  }, 200);
};
