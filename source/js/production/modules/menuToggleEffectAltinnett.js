/* globals mobileNavigation */
var wasDark = $('header').hasClass('a-darkBackground');
var action = function(e) {
  if ($(e.target).closest('.a-globalNav-main').length === 0 &&
  $(e.target).closest('.navbar-toggler').length === 0) {
    if ($('.a-globalNav-main').is(':visible')) {
      $('.navbar-toggler').attr('data-jsexpanded', 'false');
      $('.a-globalNav-main').hide();
      $('body').css('background-color', '');
      if (wasDark) {
        $('header').addClass('a-darkBackground');
      }
      $('.a-page').children(':not(header)').removeClass('a-js-hidden');
    }
  } else if ($(e.target).closest('.navbar-toggler').length > 0) {
    if ($('.a-globalNav-main').is(':visible')) {
      $('.navbar-toggler').attr('data-jsexpanded', 'false');
      $('.a-globalNav-main').hide();
      $('body').css('background-color', '');
      if (wasDark) {
        $('header').addClass('a-darkBackground');
      }
      $('.a-page').children(':not(header)').removeClass('a-js-hidden');
    } else {
      $('.navbar-toggler').attr('data-jsexpanded', 'true');
      $('.a-globalNav-main').show();
      $('body').css('background-color', '#000');
      if (wasDark) {
        $('header').removeClass('a-darkBackground');
      }
      $('.a-page').children(':not(header)').addClass('a-js-hidden');
    }
  }
};
function menuHandler() {
  // enable tabbing and mouse click on mobile menu btn
  if ($('body').width() < 768) {
    $('body').on('click', action);
  }
}
menuHandler();
$(window).on('resize', function() {
  $('body').off('click', action);
  menuHandler();
});
