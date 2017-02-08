/* globals $ */
var handleFocus = function() {
  // If state on input is 'focus', add class to a-input: 'a-input-focus'
  $('input.form-control').focus(function() {
    $(this).parent().addClass('a-input-focus');
  }).blur(function() {
    $(this).parent().removeClass('a-input-focus');
  });
  $('.a-radioButtons-stackedList').find('input[type=radio]').change(function() {
    var me = $(this);
    if (me.is(':checked')) {
      me.parent().addClass('a-js-radioParentGray');
      $('input[type=radio]').each(function() {
        if ($(this).attr('id') !== me.attr('id') &&
          $(this).attr('name') === me.attr('name')) {
          $(this).parent().removeClass('a-js-radioParentGray');
        }
      });
    }
  });
  // Prevent focus state styling on click
  $('body').on('mousedown', '*:not(input):not(textarea)', function(e) {
    e.stopPropagation();
    if ($(e.target).prop('nodeName') !== 'A' &&
      $(e.target).prop('nodeName') !== 'BUTTON' &&
      $(e.target).prop('nodeName') !== 'LABEL') {
      if ($(e.target).parent().prop('nodeName') === 'A' ||
        $(e.target).parent().prop('nodeName') === 'BUTTON' ||
        $(e.target).parent().prop('nodeName') === 'LABEL') {
        $(e.target).parent().trigger('mousedown');
      }
    }
    // Accomodate for popovers
    if ($(this).attr('data-toggle') !== 'popover' && !$(this).is('i')) {
      if (!$(this).hasClass('a-custom-select')) {
        $(this).addClass('override-focus');
        setTimeout(function() {
          this.blur(); this.removeClass('override-focus');
        }.bind($(this)), 1500);
      }
    }
    $(this).children('.custom-control-indicator').addClass('override-focus');
    setTimeout(function() {
      this.children('.custom-control-indicator').prev().blur();
      this.children('.custom-control-indicator').removeClass('override-focus');
    }.bind($(this)), 1500);
    $(this).children('.a-switch-label').addClass('override-focus');
    setTimeout(function() {
      this.children('.a-switch-label').prev().blur();
      this.children('.a-switch-label').removeClass('override-focus');
    }.bind($(this)), 1500);
    setTimeout(function() {
      $('.a-switch-label').prev().blur();
      $('.a-switch-label').removeClass('override-focus');
    }, 1500);
  });
};
