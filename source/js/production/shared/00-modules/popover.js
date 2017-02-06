/* globals $ */
var popover = function() {
  var options = {
    html: true,
    placement: function(context, source) {
      var position = $(source).offset();
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
    trigger: 'click'
  };
  function adjustBig() {
    if ($('.popover-big').length > 0) {
      $('.popover-big').attr('style',
        $('.popover-big').attr('style').replace(
          /translateX\(.*?\)/, 'translateX(0px)'
        )
      );
    }
  }
  $('[data-toggle="popover"]').each(function() {
    if ($(this).attr('data-template')) {
      $(this).attr('data-template', $(this).attr('data-template').replace(/<!--[\s\S]*?-->/g, ''));
    }
  });
  $('[data-toggle="popover"]').popover(options);
  $('#example').popover();
  $('.a-js-togglePopoverIcons').each(function() {
    $(this).find('i').eq(1).hide();
  });
  $('.a-js-blurrablePopover').on('blur', function(e) {
    if ($(e.target).find('i').eq(1).is(':visible')) {
      $(e.target).trigger('click');
    }
  });
  $('body').on('mouseup', '.bs-tether-element *', function(e) {
    e.preventDefault(); e.stopPropagation();
  });
  $('body').on('mouseup', '.bs-tether-element', function(e) {
    e.preventDefault(); e.stopPropagation();
  });
  $('.a-js-togglePopoverIcons').on('shown.bs.popover', function(e) {
    $(e.target).find('i').eq(0).hide(); $(e.target).find('i').eq(1).show();
  });
  $('.a-js-togglePopoverIcons').on('hidden.bs.popover', function(e) {
    $(e.target).find('i').eq(0).show(); $(e.target).find('i').eq(1).hide();
  });
  $('.a-js-persistPopover').on('shown.bs.popover', function() {
    adjustBig();
    // $('.popover-big').find('.popover-arrow').css(
    //   'left', ($(this).offset().left + 9) + 'px'
    // );
    // $('.popover-big').attr('data-arrowleftadjust', ($(this).offset().left + 9) + 'px');
    $('body').append(
      '<style>.popover-big:after { left: ' + ($(this).offset().left + 10.5) + 'px !important; }</style>');
    $('html, body').animate({
      scrollTop: $('.a-js-persistPopover').offset().top - 50
    }, 250);
  });
  $(window).scroll(adjustBig); $(window).resize(adjustBig);
};
