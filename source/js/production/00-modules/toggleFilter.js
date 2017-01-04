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

  $('.a-collapseContent.a-js-instantCollapse').on('hide.bs.collapse', function(e) {
    $(e.target).hide();
  });

  $('.a-collapseContent.a-js-instantCollapse').on('show.bs.collapse', function(e) {
    $(e.target).show();
    $(e.currentTarget).css('display', 'initial');
  });

  $('.a-collapse-title').on('mouseup', function(e) {
    var actionRow = $(this).attr('data-target');

    if (e.which === 1) { // triggered on left mouse click
      if (!$(this).hasClass('collapsed')) {
        $(this).addClass('collapsed');
      } else {
        $(this).removeClass('collapsed');
      }
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
