/* globals $ */
var toggleFilter = function() {
  $('.a-sortable-action-row.a-collapseContent').on('hide.bs.collapse', function(e) {
    $(e.currentTarget).hide();
    $(e.currentTarget).prev().removeClass('open');
  });
  $('.a-sortable-action-row.a-collapseContent').on('show.bs.collapse', function(e) {
    $(e.currentTarget).show();
    $(e.currentTarget).prev().addClass('open');
    $('.a-sortable-action-row.a-collapseContent').each(function() {
      if ($(this)[0].id !== e.currentTarget.id) {
        $(this).hide();
        $(this).collapse('hide');
        $(this).prev().removeClass('open');
        $(this).prev().find('.a-collapse-title').addClass('collapsed');
      }
    });
  });

  $('.a-collapseTitle').on('mouseup', function() {
    var actionRow = $(this).attr('data-target');
    if (!$(this).hasClass('collapsed')) {
      $(this).addClass('collapsed');
      $(actionRow).prev().removeClass('open');
      $(actionRow).css('display', 'none');
    } else {
      $('.a-collapseContent').removeClass('in');
      $('.a-collapse-title').addClass('collapsed');
      $(this).removeClass('collapsed');
      $('.open').next().css('display', 'none');
      $('.open').removeClass('open');
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
