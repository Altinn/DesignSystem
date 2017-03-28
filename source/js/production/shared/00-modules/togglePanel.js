$('.a-js-index-heading').click(function() {
  var $this = $(this);
  // console.log('id: ', $this);
  if ($this.hasClass('expanded')) {
    $this.removeClass('expanded');
    $this.addClass('collapsed');
    if ($('.a-js-index-heading.expanded').length === 0) {
      $('.a-js-index-heading').removeClass('dim');
    } else {
      $this.addClass('dim');
    }
  } else {
    $('.a-js-index-heading').removeClass('expanded').addClass('collapsed')
      .siblings('.a-collapsePanel-body')
      .collapse('hide');
    $this.addClass('expanded');
    $this.removeClass('collapsed');
    $('.a-js-index-heading').addClass('dim');
    $('.a-js-index-heading.expanded').removeClass('dim');
  }
});
