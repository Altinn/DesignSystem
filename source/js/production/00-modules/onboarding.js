/* globals $, onboardingStep, onboardingOnShow, onboardingSeek, onboardingHide,
  xmlToString, onboardingCrawl, onboardingBlank */
var onboarding = function() {
  var count = -1;
  $.get('../../images/flashlight.svg', function(data) {
    var steps = onboardingCrawl();
    if ($('.a-onboarding').length > 0 && $('.a-onboarding').is(':visible')) {
      $('body').css('overflow-y', 'hidden');
      $('.a-page').append('<span class="onboarding-wrapper"><span ' +
        'class="a-js-circle"></span>' + xmlToString(data) + '</span>' +
        '<span class="onboarding-neutral">' + xmlToString(data) + '</span>'
      );
      onboardingBlank(true);
      $('.a-onboarding').find('.a-btn').on('click', function(e) {
        e.preventDefault(); e.stopPropagation();
        if ($(this).hasClass('a-btn-success')) {
          onboardingHide('#modalOnboarding', onboardingStep(0));
        } else {
          if (count === -1) {
            $('.a-js-circle').css('opacity', '0');
          }
          count += 1;
          if (steps[count]) {
            onboardingSeek(count, steps);
          } else {
            $('.a-js-circle').css('opacity', '0.9'); onboardingBlank(true, 450);
          }
          onboardingStep(count + 1);
        }
      });
      $('.a-onboarding').find('.a-btn-link').on('click', function(e) {
        e.preventDefault(); e.stopPropagation();
        if (count === -1) {
          onboardingHide('#modalOnboarding', onboardingStep(0));
        } else {
          count = -1; onboardingBlank(true); onboardingStep(0);
        }
      });
    }
  });
  onboardingOnShow('#modalOnboarding', function() {
    count = -1; onboardingStep(0);
  });
  $('#modalOnboarding').modal('show');
};
