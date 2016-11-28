/* globals $ */
var popover = function() {
  var options = {
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
    trigger: 'manual'
  };
  $('[data-popover-content]').popover({
    html: true,
    content: function() {
      return $('#' + $(this).data('popover-content')).html();
    }
  });
  $('[data-toggle="popover"]').popover(options);
  $('#example').popover();
  $('.a-js-togglePopoverIcons').each(function() {
    $(this).find('i').eq(1).hide();
  });
  $('.a-js-persistPopover').find('i').eq(0).on('click', function() {
    $('.a-js-persistPopover').popover('show');
  });
  $('.a-js-persistPopover').find('i').eq(1).on('click', function() {
    $('.a-js-persistPopover').popover('hide');
  });
  $('.a-js-togglePopoverIcons').on('shown.bs.popover', function(e) {
    $(e.target).find('i').eq(0).hide();
    $(e.target).find('i').eq(1).show();
  });
  $('.a-js-persistPopover').on('shown.bs.popover', function() {
    $('.popover-big').attr('style',
      $('.popover-big').attr('style').replace(
        /translateX\(.*?\)/, 'translateX(0px)'
      )
    );
    $('.popover-big').find('.popover-arrow').css(
      'left', ($(this).offset().left + 9) + 'px'
    );
    $('html, body').animate({
      scrollTop: $('.a-js-persistPopover').offset().top - 50
    }, 250);
  });
  $('.a-js-togglePopoverIcons').on('hidden.bs.popover', function(e) {
    $(e.target).find('i').eq(0).show();
    $(e.target).find('i').eq(1).hide();
  });
  $(window).scroll(function() {
    if ($('.popover-big').length > 0) {
      $('.popover-big').attr('style',
        $('.popover-big').attr('style').replace(
          /translateX\(.*?\)/, 'translateX(0px)'
        )
      );
    }
  });
  $(window).resize(function() {
    if ($('.popover-big').length > 0) {
      $('.popover-big').attr('style',
        $('.popover-big').attr('style').replace(
          /translateX\(.*?\)/, 'translateX(0px)'
        )
      );
    }
  });
};
