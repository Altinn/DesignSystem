/* globals $, onboardingStep, onboardingOnShow, onboardingSeek, onboardingHide,
  xmlToString, onboardingCrawl, onboardingBlank */
var onboarding = function() {
  var count = -1;
  $('body').addClass($('.a-js-bodyClassPersist').attr('data-body'));
  $.get('../../images/flashlight.svg', function(data) {
    var steps = onboardingCrawl();
    if ($('body').width() > 450) {
      $('.a-page').append('<span class="onboarding-wrapper"><span ' +
        'class="a-js-circle"></span>' + xmlToString(data) + '</span>' +
        '<span class="onboarding-neutral">' + xmlToString(data) + '</span>'
      );
    } else {
      $('.a-page').append('<span class="onboarding-wrapper"><span ' +
        'class="a-js-circle"></span>' +
          xmlToString(data)
            .replace('width="1140"', 'width="' + $('body').width() + '"') +
        '</span>' +
        '<span class="onboarding-neutral">' +
          xmlToString(data)
            .replace('width="1140"', 'width="' + $('body').width() + '"') +
        '</span>'
      );
      $('.onboarding-wrapper').css('width', $('body').width() + 'px');
      $('.onboarding-neutral').css('width', $('body').width() + 'px');
      $('.onboarding-neutral').css('transform', 'scale(1)');
      // $('.a-onboarding').css('width', $('body').width() + 'px');
      $('.a-onboarding').css('top', '-260px');
    }
    $('body').css('overflow-x', 'hidden');
    $('.onboarding-neutral').hide();
    $('.onboarding-wrapper').hide();
    $('.a-onboarding').find('.a-btn').on('click', function(e) {
      e.preventDefault(); e.stopPropagation();
      if ($(this).hasClass('a-btn-success')) {
        onboardingHide(onboardingStep(0));
      } else {
        if (count === -1) {
          $('.a-js-circle').css('opacity', '0');
        }
        count += 1;
        if (steps[count]) {
          onboardingSeek(count, steps, function(ratio) {
            onboardingStep(count + 1, function() {
              // console.log(ratio);
              // var width = $('body').width() / ratio;
              // $('.onboarding-wrapper').css('width', width + 'px');
              // $('.onboarding-neutral').css('width', width + 'px');
              // $('.onboarding-wrapper').html('<span class="a-js-circle">' +
              //   xmlToString(data)
              //     .replace('width="1140"', 'width="' + width + '"')
              //   + '</span>');
            });
          });
        } else {
          $('.a-js-circle').css('opacity', '0.9'); onboardingBlank(true, 450);
        }
        onboardingStep(count + 1);
      }
    });
    $('.a-onboarding').find('.a-btn-link').on('click', function(e) {
      e.preventDefault(); e.stopPropagation();
      if (count === -1) {
        onboardingHide(onboardingStep(0));
      } else {
        count = -1; onboardingBlank(true); onboardingStep(0);
      }
    });
    $('.a-js-modalLauncher').each(function() {
      onboardingOnShow($(this).attr('data-target'), function() {
        count = -1; onboardingStep(0);
      });
    });
    $('#modalOnboarding').modal('show');
  });
};
