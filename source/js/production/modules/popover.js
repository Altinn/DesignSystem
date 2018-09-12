/* globals $ */
var popoverLocalInit = function() {
  var options = {
    html: true,
    placement: function(context, source) {
      var position = $(source).offset();
      $(context).addClass($(source).attr('data-popover-class'));
      if ($(source).hasClass('a-js-popoverBig')) {
        return 'bottom';
      }
      if (position.left < 125) {
        return 'right';
      }
      if (position.left > ($(document).width() - $(source).width() - 125)) {
        return 'left';
      }
      return 'bottom';
    },
    content: function() {
      if ($(this).attr('data-popover-content')) {
        return $('#' + $(this).data('popover-content')).html();
      }
      return false;
    },
    template: '<div class="popover" role="popover" tabindex="0"><div class="arrow"></div><div class="popover-body"></div></div>'
  };

  $('[data-toggle="popover"]').popover(options);

  $('.a-js-togglePopoverIcons').each(function() {
    // $(this).find('i').eq(1).hide();
    $(this).find('.a-js-popoverIconExpanded').hide();
  });

  $('.a-js-popoverIconExpanded').on('click', function() {
    $('.a-js-popoverIconExpanded').hide();
    $('.a-js-popoverIconInitial').show();
    // $(this).hide();
    // $('.a-js-popoverIconInitial').show();
  });
  $('.a-js-popoverIconInitial').on('click', function() {
    $(this).hide();
    $(this).parent().find('.a-js-popoverIconExpanded').show();
  });
};

var forceFocusTriggerElement;
var popoverGlobalInit = function() {
  $('[data-toggle="dropdown"]').on('click', function(e) {
    if (window.innerWidth < 992) {
      $('.a-dropdown-overflow-menu-right').removeClass('dropdown-menu-right');
    } else {
      $('.a-dropdown-overflow-menu-right').addClass('dropdown-menu-right');
    }
  });

  $('body').on('show.bs.popover', '[data-toggle="popover"].a-js-tabable-popover', function(e) {
    var triggerElement = this;
    $(triggerElement).closest('.a-modal').scrollTop(0);
  });

  $('body').on('shown.bs.popover', '[data-toggle="popover"].a-js-tabable-popover', function(e) {
    var triggerElement = this;
    setTimeout(function() {
      $(triggerElement).after($($(triggerElement).data('bs.popover').tip));
      $(triggerElement).closest('.a-modal').one('scroll', function() {
        $('[data-toggle="popover"]').popover('hide');
      });
    }, 0);
  });

  $('body').on('shown.bs.popover', '[data-toggle="popover"].a-js-popover-forceFocus', function(e) {
    $('body').append($('<button class="sr-only a-js-popoverTrick">ignoreme</button>'));
    forceFocusTriggerElement = this;
    $(forceFocusTriggerElement).one('blur', function() {
      var that = this;
      if (forceFocusTriggerElement) {
        $($(this).data('bs.popover').tip).find('button,input,a,textarea').filter(':visible:first').focus();
      }
    });
  });

  $('body').on('hidden.bs.popover', '[data-toggle="popover"].a-js-popover-forceFocus', function(e) {
    $('body').find('.a-js-popoverTrick').remove();
  });

  // hides popover when the checkbutton is checked
  $('body').on('focus', '[data-toggle="popover"].sr-only', function(e) {
    if ($(this).is(':checked')) {
      $(this).popover('hide');
    } else {
      $(this).popover('show');
    }
  });

  // show/hide popover on checkbutton change
  $('body').on('change', 'a-switch[data-toggle=popover]', function() {
    if ($(this).is(':checked')) {
      $(this).popover('hide');
    } else {
      $(this).popover('show');
    }
  });

  // Hide all existing popovers when opening a new popover
  $('body').on('click', '[data-toggle="popover"]', function(e) {
    $('[data-toggle="popover"]').not(this).popover('hide');
  });

  // Hide all existing popovers when focusing a new element
  // which is not the open popover or any of its content
  $('body').on('blur', '[data-toggle="popover"], .popover *', function(e) {
    setTimeout(function() {
      var $focused = $(':focus');
      if ((($focused.length !== 0 || forceFocusTriggerElement) && !$focused.hasClass('popover') && $focused.parents('.popover').length === 0) || $focused.hasClass('a-js-popoverTrick')) {
        // disable blur when in modal to allow use of non-original scrollbar
        if ($('.modal.show').length > 0) {
          $('.popover-big[data-toggle="popover"]').popover('hide');
        }
      }
    }, 0);
  });

  // Hide popovers when clicking on something else than the trigger element
  // and the popover itself
  $('body').on('click', function(e) {
    if ($(e.target).data('toggle') !== 'popover'
      && $(e.target).parents('[data-toggle="popover"]').length === 0
      && $(e.target).parents('.popover.show').length === 0) {
      $('[data-toggle="popover"]').popover('hide');
      forceFocusTriggerElement = false;
      $(this).parent().find('.a-js-popoverIconInitial').show();
      $(this).parent().find('.a-js-popoverIconExpanded').hide();
    }
  });

  function resetTranslate() {
    $('.popover-big').attr('style', $('.popover-big').attr('style').replace(/translateX\(.*?\)/, 'translateX(0px)'));
  }

  function adjustBig() {
    var modalHeight;
    var padding;
    if ($('.popover-big').length > 0) {
      if ($('.modal.show').length > 0) {
        // Add padding to make sure modal is big enough to contain popover
        modalHeight = $('.modal-dialog').height() + $('.modalPage').height();
        padding = ($('.popover').offset().top + $('.modal').scrollTop() + $('.popover').height() + 5) - modalHeight;
        $('.modalPage').css('padding-bottom', padding + 'px');
        // tranlate is somehow added by Bootstrap later when in modal??
        setTimeout(resetTranslate, 0);
      } else {
        resetTranslate();
      }
    }
  }

  $('body').on('shown.bs.popover', '.a-js-persistPopover', function() {
    $('.arrow').html('<style>.popover-big:after { left: ' + ($(this).offset().left + 10.5) + 'px !important; }</style>');
    $('html, body').animate({
      scrollTop: $('.a-js-persistPopover').offset().top - 50
    }, 250);

    adjustBig();
  });

  // clean up modal page fix
  $('body').on('hidden.bs.popover', 'a-js-persistPopover', function(e) {
    $('.modalPage').css('padding-bottom', '0px');
  });

  $(window).scroll(adjustBig);
  $('.modal').scroll(adjustBig);
  $(window).resize(adjustBig);
};
