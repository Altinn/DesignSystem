if ($('body').width() < 768) {
  $('.navbar-toggler').on('click', function() {
    if ($('.a-globalNav-main').hasClass('show')) {
      $('.a-page').children(':not(header)').removeClass('a-js-hidden');
    } else {
      $('.a-page').children(':not(header)').addClass('a-js-hidden');
    }
  });
}
