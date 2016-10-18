/* globals $ */
var popover = function() {
  $('[data-toggle="popover"]').popover(); $('#example').popover();
  $('.a-js-persistPopover').find('i').eq(1).hide();
  $('.a-js-persistPopover').find('i').eq(0).on('click', function() {
    $('.a-js-persistPopover').popover('show')
  })
  $('.a-js-persistPopover').find('i').eq(1).on('click', function() {
    $('.a-js-persistPopover').popover('hide')
  })
  $('.a-js-persistPopover').on('shown.bs.popover', function() {
    $('.a-js-persistPopover').find('i').eq(0).hide();
    $('.a-js-persistPopover').find('i').eq(1).show();
    // $('.a-js-persistPopover').blur();
    $('.popover-big').attr('style',
      $('.popover-big').attr('style').replace(
        /translateX\(.*?\)/, 'translateX(0px)'
      )
    );
    $('.popover-big').find('.popover-arrow').css(
      'left', ($(this).offset().left + 11) + 'px'
    );
  })
  $('.a-js-persistPopover').on('hidden.bs.popover', function() {
    $('.a-js-persistPopover').find('i').eq(0).show();
    $('.a-js-persistPopover').find('i').eq(1).hide();
  })
  $('window').on('scroll', function() {
    console.log('scrolling...')
  })
};
