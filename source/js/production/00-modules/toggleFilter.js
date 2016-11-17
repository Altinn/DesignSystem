/* globals $ */
var toggleFilter = function() {
  $(document).on('mouseup', 'button[data-toggle="collapse"], .a-collapseTitle', function() {
    var actionRow = $(this).attr('data-target');
    if (!$(this).hasClass('collapsed')) {
      $(this).addClass('collapsed');
      $(actionRow).prev().removeClass('open');
      $(actionRow).css('display', 'none');
    } else {
      $('.a-collapseContent').removeClass('in');
      $('.a-collapse-title').addClass('collapsed');
      $(this).removeClass('collapsed');
      $('.open').next().css('display', 'none'); $('.open').removeClass('open');
      $(actionRow).css('display', 'table-row');
      $(actionRow).prev().addClass('open');
    }
  });
  $('.a-collapse-title').on('keyup', function(e) {
    var key = e.which;
    if (key === 13) {
      e.stopImmediatePropagation(); e.stopPropagation(); e.preventDefault();
      $(e.target).trigger('mouseup');
    } else if (key === 9) {
      if ($($(e.target).attr('data-target')).hasClass('in')) {
        $($(e.target).attr('data-target')).find('.a-switch').eq(0)
          .trigger('focus');
      }
    }
  });
};
