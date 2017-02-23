/* globals _anchors, hideIntroInSubs, insetVariations, toggleArchivedState,
  selectAll, toggleTheme, fixPatternLinks,
  preOpenModals, prototypingInteractionStarteENK, $, onboarding, codeLookup, nameChecker,
  defaultSort, setupAddRightsHandler */
window.devInit = function() {
  _anchors();
  hideIntroInSubs();
  insetVariations();
  toggleArchivedState();
  selectAll();
  toggleTheme();
  fixPatternLinks();
  preOpenModals();
  prototypingInteractionStarteENK();
  onboarding();
  codeLookup();
  nameChecker();
  defaultSort();
  setupAddRightsHandler();
  selectAll();
  toggleTheme();
};
window.devInit();
$('.html-escape').each(function() {
  $(this).text($(this).html());
});
window.smoothStateMod = function() {
  $('#smoothState').find('.a-js-smoothStateEnabled').on('click', function(e) {
    if (
      !$(this).hasClass('a-js-smoothStateEnabled') ||
      $(this).hasClass('disabled')
    ) {
      return false;
    }
    if (
      location.pathname.replace(/\//g, '')
        === $(this).attr('href').replace(/\//g, '').replace(/\.\./g, '')
    ) {
      e.preventDefault(); e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    } else if ($(this).attr('href') !== '#') {
      e.preventDefault(); e.stopPropagation();
      e.stopImmediatePropagation();
      window.smoothState.load($(this).attr('href'));
    }
    return false;
  });
};
window.smoothState = $('#smoothState').smoothState({
  prefetch: true,
  debug: true,
  anchors: 'blink',
  cacheLength: 9,
  onStart: {
    duration: 250,
    render: function($container) {
      window.smoothState.restartCSSAnimations();
      if ($container.find('.a-tempAnim').length > 0) {
        $container.find('.a-scene-element')
          .removeClass('a-scene-element--fadeinright')
          .removeClass('a-scene-element--fadeinleft')
          .addClass('a-scene-element--fadeoutright');
      } else {
        $container.find('.a-scene-element')
          .removeClass('a-scene-element--fadeinright')
          .removeClass('a-scene-element--fadeinleft')
          .addClass('a-scene-element--fadeoutleft');
      }
    }
  },
  onReady: {
    duration: 250,
    render: function($container, $newContent) {
      window.smoothState.restartCSSAnimations();
      $container.removeClass('is-exiting');
      if ($container.find('.a-tempAnim').length > 0) {
        $newContent.find('.a-scene-element')
          .removeClass('a-scene-element--fadeoutright')
          .removeClass('a-scene-element--fadeoutleft')
          .addClass('a-scene-element--fadeinleft')
          .removeClass('a-tempAnim');
      } else {
        $newContent.find('.a-scene-element')
          .removeClass('a-scene-element--fadeoutright')
          .removeClass('a-scene-element--fadeoutleft')
          .addClass('a-scene-element--fadeinright');
      }
      $newContent.find('.a-js-hideWhenSmoothStating').hide();
      $container.html($newContent);
    }
  },
  onAfter: function() {
    // $(document).foundation();
    if (window.portalInit) {
      window.portalInit();
    }
    if (window.infoportalInit) {
      window.infoportalInit();
    }
    if (window.sharedInit) {
      window.sharedInit();
    }
    window.devInit();
    window.smoothStateMod();
    // $('.a-scene-element').show();
    $('form').validate();
    $('.a-js-hideWhenSmoothStating').show();
  }
}).data('smoothState');
window.smoothStateMod();
