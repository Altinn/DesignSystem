/* globals $ */
var mobileNavigation = function() {
  $('.a-globalNav .dropdown').on('show.bs.dropdown', function(e) {
    var that = this;
    setTimeout(function() {
      $(that).find('.a-dropdown-languages').addClass('expand');
      $(that).find('.a-dropdown-languages a').removeAttr('tabindex');
      $(that).find('.a-dropdown-languages a').removeAttr('aria-hidden');
    }, 0);
  });

  $('.a-globalNav .dropdown').on('hide.bs.dropdown', function(e) {
    $(this).find('.a-dropdown-languages').removeClass('expand');
    $(this).find('.a-dropdown-languages a').attr('tabindex', '-1');
    $(this).find('.a-dropdown-languages a').attr('aria-hidden', 'true');
  });
};
