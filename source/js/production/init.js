/* globals questionnaireInteraction, drilldownInteraction, handleFocus,
mobileNavigation, propagateContent, toggleExpand, toggleFilter, uniformHeight,
tooltip, popover, aTagSpaceExpand, initializeDatepicker, onboarding,
nameChecker, codeLookup, handleValidatorLibrary, setupDeletableRowsTable,
defaultSort, setupAddRightsHandler, onFileInputChange, toggleInstant */
window.altinnInit = function() {
  toggleExpand();
  drilldownInteraction();
  toggleFilter();
  uniformHeight();
  handleFocus();
  tooltip();
  popover();
  mobileNavigation();
  propagateContent();
  questionnaireInteraction();
  aTagSpaceExpand();
  initializeDatepicker();
  onboarding();
  nameChecker();
  codeLookup();
  handleValidatorLibrary();
  setupDeletableRowsTable();
  defaultSort();
  setupAddRightsHandler();
  onFileInputChange();
  toggleInstant();
};
window.altinnInit();
window.smoothStateMod = function() {
  // Old variant, targeting all a-tags and excluding specific ones:
  // $('#smoothState').find(
  //   'a:not(.a-js-hideFromSmoothState)' +
  //   ':not(.a-collapse-title)' +
  //   ':not(.a-collapseBtn)' +
  //   ':not(.sr-only-focusable)' +
  //   ':not(.a-colnav-item)' +
  //   ':not(.a-colnav-item-second)' +
  //   ':not(.a-colnav-item-third)')
  // .on('click', function(e) {
  // New variant, using explicit targeting:
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
$(document).foundation();
window.smoothState = $('#smoothState').smoothState({
  prefetch: true,
  debug: true,
  anchors: 'blink',
  cacheLength: 9,
  onStart: {
    duration: 250,
    render: function($container) {
      $container.addClass('is-exiting');
      window.smoothState.restartCSSAnimations();
      if ($container.find('.a-tempAnim').length > 0) {
        $container.find('.a-scene_element')
          .removeClass('a-scene_element--fadeinright')
          .removeClass('a-scene_element--fadeinleft')
          .addClass('a-scene_element--fadeoutright');
      } else {
        $container.find('.a-scene_element')
          .removeClass('a-scene_element--fadeinright')
          .removeClass('a-scene_element--fadeinleft')
          .addClass('a-scene_element--fadeoutleft');
      }
    }
  },
  onReady: {
    duration: 0,
    render: function($container, $newContent) {
      $container.removeClass('is-exiting');
      $newContent.find('.a-scene_element--fadeinright').hide();
      if ($container.find('.a-tempAnim').length > 0) {
        $newContent.find('.a-scene_element')
          .removeClass('a-scene_element--fadeinright')
          .addClass('a-scene_element--fadeinleft')
          .removeClass('a-tempAnim');
      }
      $container.html($newContent);
    }
  },
  onAfter: function() {
    $(document).foundation();
    window.altinnInit();
    window.altinnDev();
    window.smoothStateMod();
    $('.a-scene_element').show();
    $('form').validator();
  }
}).data('smoothState');
window.smoothStateMod();
