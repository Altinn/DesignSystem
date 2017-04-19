/* globals $ */
var mobileNavigation = function() {
  window.langTriggerClick = function(e) {
    var key = e.which;
    if (key === 13) { // return, enter
      $(e.target).trigger('mousedown');
    } else if (key === 9) { // tab
      if (!$('#exCollapsingNavbar').find('.a-dropdown-languages').hasClass('expand')) {
        $('#exCollapsingNavbar').find('.a-dropdown-languages').find('a').attr('tabindex', '-1');
      } else {
        $('#exCollapsingNavbar').find('.a-dropdown-languages').find('a').attr('tabindex', '0');
      }
    }
  };

  window.langTriggerClickMouse = function(e) {
    $('#exCollapsingNavbar').find('.a-dropdown-languages').find('a').attr('tabindex', '-1');
    if (!$('#exCollapsingNavbar').find('.a-dropdown-languages').hasClass('expand')) {
      $('#exCollapsingNavbar').find('.a-dropdown-languages').css('width', 'inherit').css('min-width', '160px');
      $('#exCollapsingNavbar').find('.a-dropdown-languages').removeClass('after-collapse');
      $('#exCollapsingNavbar').find('.a-dropdown-languages').find('a').attr('tabindex', '0');
    } else {
      setTimeout(function() {
        if (!$('#exCollapsingNavbar').find('.a-dropdown-languages').hasClass('expand')) {
          $('#exCollapsingNavbar').find('.a-dropdown-languages').toggleClass('after-collapse');
        }
        if (!$('#exCollapsingNavbar').find('.a-dropdown-languages').hasClass('after-collapse')) {
          $('#exCollapsingNavbar').find('.a-dropdown-languages').css('width', '0px').css('min-width', '0px');
        }
        $('#exCollapsingNavbar').find('.a-dropdown-languages').find('a').attr('tabindex', '-1');
      }, 250);
    }
    $('#exCollapsingNavbar').find('.a-dropdown-languages').toggleClass('expand');
    $('#exCollapsingNavbar').find('.indicator').toggleClass('flip');
  };
};
