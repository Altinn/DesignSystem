/* globals $, onboardingStep, onboardingOnShow, onboardingSeek, onboardingHide,
  onboardingCrawl, onboardingBlank */
var onboarding = function() {
  var count = -1; var steps = onboardingCrawl();
  $('body').addClass($('.a-js-bodyClassPersist').attr('data-body'));
  $('.a-page').append('<span class="onboarding-wrapper"><span ' +
    'class="a-js-circle"></span></span><span class="onboarding-neutral"></span>'
  );
  if ($('body').width() < 576) {
    $('.onboarding-wrapper').css('position', 'fixed');
    $('.onboarding-neutral').css('position', 'fixed');
    $('.a-onboarding').css('top', '-260px');
  }
  $('body').css('overflow-x', 'hidden');
  $('.onboarding-neutral').hide();
  $('.onboarding-wrapper').hide();
  $('.onboarding-wrapper')
    .css('transform', 'translate3d(0, 0, 0) matrix(1, 0, 0, 1, 570, 700)');
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
        onboardingSeek(count, steps);
      } else {
        $('.a-js-circle').css('opacity', '0.9'); onboardingBlank(true, 576);
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
};
