/* globals $ */
var popover = function() {
  $('[data-popover-content]').popover({
    html: true,
    content: function() {
      return $('#' + $(this).data('popover-content')).html();
    }
  });
  $('[data-toggle="popover"]').popover(); $('#example').popover();
  $('.a-js-persistPopover').find('i').eq(1).hide();
  $('.a-js-persistPopover').find('i').eq(0).on('click', function() {
    $('.a-js-persistPopover').popover('show');
  });
  $('.a-js-persistPopover').find('i').eq(1).on('click', function() {
    $('.a-js-persistPopover').popover('hide');
  });
  $('.a-js-persistPopover').on('shown.bs.popover', function() {
    $('.a-js-persistPopover').find('i').eq(0).hide();
    $('.a-js-persistPopover').find('i').eq(1).show();
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
  $('.a-js-persistPopover').on('hidden.bs.popover', function() {
    $('.a-js-persistPopover').find('i').eq(0).show();
    $('.a-js-persistPopover').find('i').eq(1).hide();
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
