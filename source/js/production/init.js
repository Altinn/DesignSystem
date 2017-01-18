/* globals questionnaireInteraction, drilldownInteraction, handleFocus,
mobileNavigation, propagateContent, toggleExpand, toggleFilter, uniformHeight,
tooltip, popover, aTagSpaceExpand, initializeDatepicker, onboarding,
nameChecker, codeLookup, handleValidatorLibrary,
defaultSort, setupAddRightsHandler, onFileInputChange, toggleInstant, switchForm,
setupSortableRowOnclick, addSelectedHandler, addListExpandHandler,
addListSortHandler, setupListRowSelect, setupOnKeypress */

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
  defaultSort();
  setupAddRightsHandler();
  onFileInputChange();
  toggleInstant();
  switchForm();
  setupSortableRowOnclick();
  addSelectedHandler();
  addListExpandHandler();
  addListSortHandler();
  setupListRowSelect();
  setupOnKeypress();
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
    $(document).foundation();
    window.altinnInit();
    window.altinnDev();
    window.smoothStateMod();
    // $('.a-scene-element').show();
    $('form').validator();
    $('.a-js-hideWhenSmoothStating').show();
  }
}).data('smoothState');
window.smoothStateMod();
