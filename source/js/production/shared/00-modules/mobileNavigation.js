/* globals $ */
var mobileNavigation = function() {
  window.langTriggerClick = function(e) {
    var key = e.which;
    if (key === 13) {
      $(e.target).trigger('mousedown');
    } else if (key === 9) {
      if (!$('#exCollapsingNavbar').find('.a-dropdown-languages').hasClass('expand')) {
        $('#exCollapsingNavbar').find('.a-dropdown-languages').find('a').attr('tabindex', '-1');
      } else {
        $('#exCollapsingNavbar').find('.a-dropdown-languages').find('a').attr('tabindex', '0');
      }
    }
  };
};
