$('.a-js-index-heading').click(function() {
  if ($(this).hasClass('expanded')) {
    $(this).removeClass('expanded');
    $(this).addClass('collapsed');
    if ($('.a-js-index-heading.expanded').length === 0) {
      $('.a-js-index-heading').removeClass('dim');
    } else {
      $(this).addClass('dim');
    }
  } else {
    $('.a-js-index-heading').removeClass('expanded');
    $(this).removeClass('collapsed');
    $(this).addClass('expanded');
    $('.a-js-index-heading').addClass('dim');
    $('.a-js-index-heading.expanded').removeClass('dim');
  }
});
