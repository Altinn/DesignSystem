/* globals $ */
var toggleFilter = function() {
  $('.a-collapseTitle').on('mouseup', function() {
    var actionRow = $(this).attr('data-target');
    if (!$(this).hasClass('collapsed')) {
      $(this).addClass('collapsed');
      if ($(this).parent().is('td')) {
        $(actionRow).prev().removeClass('open');
        $(actionRow).css('display', 'none');
      }
    } else {
      $('.a-collapseContent').removeClass('in');
      $('.a-collapseTitle').addClass('collapsed');
      $(this).removeClass('collapsed');
      if ($(this).parent().is('td')) {
        $('.open').next().css('display', 'none'); $('.open').removeClass('open');
        $(actionRow).css('display', 'table-row');
        $(actionRow).prev().addClass('open');
      }
    }
  });
  $('.a-collapseTitle').on('keyup', function(e) {
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
