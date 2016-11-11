/* globals $ */
var onboarding = function() {
  var ratio; var count = -1; var originalWidth; var steps = [];
  var horizontalJiggle; var verticalJiggle; var stepCrawlCount = 1;
  function neutral() {
    $('.onboarding-wrapper').css('transform', 'matrix(4, 0, 0, 4, 0, 0)')
      .css('top', '-32px').css('left', '-32px');
  }
  function seek() {
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
      horizontalJiggle = 10; verticalJiggle = 10;
    }
    $('.onboarding-wrapper').css(
      'transform',
      'matrix(' + ratio + ', 0, 0, ' + ratio + ',' +
        (
          steps[count].offset().left + (steps[count].width() / 2)
        ) + ',' +
        (
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
  }
  $(document).ready(function() {
    if ($('.a-onboarding').length > 0 && $('.a-onboarding').is(':visible')) {
      if ($('.onboarding-wrapper').length > 0) {
        $('.onboarding-wrapper').remove();
      } else {
        $('body').css('overflow', 'hidden').append(
          '<span class="onboarding-wrapper">' +
            '<svg xmlns="http://www.w3.org/2000/svg width="1140" ' +
              'height="1140" version="1.1">' +
              '<path style="fill:#022F51;opacity:0.9" ' +
                'd="M 0 0 L 0 1140 L 1140 1140 L 1140 0 L 0 0 z M 570 562 A ' +
                  '8 8 0 0 1 578 570 A 8 8 0 0 1 570 578 A 8 8 0 0 1 562 570 ' +
                  'A 8 8 0 0 1 570 562 z" ' +
                'id="cutout" />' +
            '</svg>' +
          '</span>'
        );
      }
      neutral();
      $('.a-onboarding').find('.modal-content').hide();
      $('.a-onboarding').find('.modal-content').eq(0).show();
      while (
        $('.a-page').find('.a-js-onboardingTarget-' + stepCrawlCount)
          .length > 0) {
        steps.push($('.a-page').find('.a-js-onboardingTarget-' + stepCrawlCount));
        stepCrawlCount += 1;
      }
      $('.a-onboarding').find('.a-btn').on('click', function() {
        if ($(this).hasClass('a-btn-success')) {
          $('.onboarding-wrapper').css('transform', 'matrix(100, 0, 0, 100, 0, 0)')
            .css('top', '-32px').css('left', '-32px');
          setTimeout(function() {
            $('.onboarding-wrapper').remove();
          }, 450);
          $('.a-onboarding').hide();
          $('body').css('overflow', 'hidden');
          $('html, body').animate({
            scrollTop: 0
          }, 200);
        } else {
          count += 1;
          if (steps[count]) {
            seek();
          } else {
            neutral();
          }
          $('.a-onboarding').find('.modal-content').eq(count).hide();
          $('.a-onboarding').find('.modal-content').eq(count + 1).show();
        }
      });
      $('.a-onboarding').find('.a-btn-link').on('click', function() {
        if (count === -1) {
          $('.onboarding-wrapper').remove();
          $('.a-onboarding').find('.modal-content').hide();
          $('body').css('overflow', 'scroll');
          $('html, body').animate({
            scrollTop: 0
          }, 200);
        } else {
          count = -1;
          if (steps[count]) {
            seek();
          } else {
            neutral();
          }
          $('.a-onboarding').find('.modal-content').hide();
          $('.a-onboarding').find('.modal-content').eq(0).show();
        }
      });
    }
  });
};
