/* globals $ */
var drilldownInteraction = function() {
  var bpLarge = 992;
  // Add dim class to panels
  $(function() {
    $('.index-heading').click(function() {
      if ($(this).hasClass('expanded')) {
        $(this).removeClass('expanded');
        if ($('.panel-heading.expanded').length === 0) {
          $('.panel-heading').removeClass('dim');
        } else {
          $(this).addClass('dim');
        }
      } else {
        $('.panel-heading').removeClass('expanded');
        $(this).addClass('expanded');
        $('.panel-heading').addClass('dim');
        $('.panel-heading.expanded').removeClass('dim');
      }
    });
  });

  // Adjust position of second level menu upon click:
  $(function() {
    $('#colnav').on('mouseup', function(event) {
      var target = $(event.target);
      var second = $('.a-colnav-secondLevel');

      var getThird = function(el) {
        if (el.attr('class') === '.a-colnav-thirdLevel') {
          return el;
        }

        return el.find('.a-colnav-thirdLevel');
      };

      var findOpenThird = function(el) {
        var bool = false;
        el.find('.a-colnav-thirdLevel').each(function() {
          if ($(this).attr('data-ignore') === 'false') {
            bool = true;
          }
        });

        return bool;
      };

      var isOpen = function(el) {
        var x = 'expanded';
        return (el.closest('a').hasClass(x) || el.find('a').hasClass(x) ||
          el.hasClass(x));
      };

      var ul = target.closest('ul');
      if (ul.hasClass('a-colnav')) {
        second.css('margin-left', '-1px');
      }

      if (ul.hasClass('a-colnav-secondLevel' || 'a-colnav-thirdLevel')) {
        if (!findOpenThird(ul)) {
          if ($(window).width() >= bpLarge) {
            second.animate({ 'margin-left': '-78px' }, 125);
          }
        } else if ($(window).width() >= bpLarge) {
          second.css('margin-left', '-78px');
        }

        getThird(ul).css('margin-left', '-1px').css('left', '100%')
          .attr('data-ignore', 'false');

        if (ul.hasClass('a-colnav-secondLevel') &&
          $(window).width() >= bpLarge) {
          ul.children('li').children('a').addClass('dim-second');
          target.closest('a').removeClass('dim-second');
          target.children('a').removeClass('dim-second');
          target.removeClass('dim-second');
        }
      } else if (ul.hasClass('a-colnav') && isOpen(target)) {
        $('#a-js-suggestionList').css('display', 'block');
        $('.dim').removeClass('dim'); second.css('margin-left', '-10000px');
        getThird(ul).css('margin-left', '-10000px').attr('data-ignore', 'true');
        $('.col-md-3').removeClass('col-md-3').addClass('col-md-6')
          .removeClass('offset-md-4')
          .addClass('offset-md-1');
      } else {
        second.each(function() {
          getThird($(this)).attr('data-ignore', 'true');
        });
        $('#a-js-suggestionList').css('display', 'none');
        $('.dim-second').removeClass('dim-second');
        $('.col-md-6').removeClass('col-md-6').addClass('col-md-3')
          .removeClass('offset-md-1')
          .addClass('offset-md-4');
      }
    });
  });

  // Add dim class to colnav first level (the panels that are not active)
  $(function() {
    $('.a-colnav-item').click(function() {
      $(this).parent().find('.a-colnav-item-second')
        .eq(0)
        .focus();

      if ($(this).hasClass('expanded') && $(window).width() >= bpLarge) {
        $(this).removeClass('expanded');
        if ($('.a-colnav-item.expanded').length === 0) {
          $('.a-colnav-item').removeClass('dim-second-no');
        } else {
          $(this).addClass('dim');
        }
      } else if ($(window).width() >= bpLarge) {
        $('.a-colnav-item').removeClass('expanded');
        $(this).addClass('expanded');
        $('.a-colnav-item').addClass('dim');
        $('.a-colnav-item.expanded').removeClass('dim');
      }
    });
  });

  // Add dim class to colnav second level
  $(function() {
    $('.a-colnav-item-second').click(function() {
      $(this).parent().find('.a-colnav-item-third')
        .eq(0)
        .focus();

      if ($(this).hasClass('expanded-second') && $(window).width() >= bpLarge) {
        $(this).removeClass('expanded-second');
        if ($('.a-colnav-item-second.expanded-second').length === 0) {
          $('.a-colnav-item-second').removeClass('dim-second-no');
        } else {
          $(this).addClass('dim-second');
        }
      } else if ($(window).width() >= bpLarge) {
        $('.a-colnav-item-second').removeClass('expanded-second');
        $(this).addClass('expanded-second');
        $('.a-colnav-item-second').addClass('dim-second');
        $('.a-colnav-item-second.expanded-second').removeClass('dim-second');
      }
    });
  });

  // Repair drilldown navigation (keyboard/screen reader)
  $(function() {
    $('.a-colnav-item').attr('tabindex', '0');
    $('.a-colnav-item-second').attr('tabindex', '0');
    $('.a-colnav-item-third').attr('tabindex', '0');
    $('.a-colnav-item').on('focus', function() {
      if ($('.a-colnav-secondLevel.submenu.is-active').length === 1) {
        $(this).off('keydown.zf.drilldown');
        $(this).parent().find('.a-colnav-item-second')
          .eq(0)
          .focus();
      }
    });
  });
};
