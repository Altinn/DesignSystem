/* globals $ */
var drilldownInteraction = function() {
  var levels = ['a-colnav-firstLevel', 'a-colnav-secondLevel', 'a-colnav-thirdLevel'];
  var open = [];
  var isSmall = $(window).width() < 992;
  var drilldownLegendDefault = $('.a-js-drilldownLegend').html();

  function calc(x, y, z) {
    var a = $('.a-contentOverview').width();
    return (x === parseInt(x, 10) || x === parseFloat(x, 10)) ?
      parseInt(a / (isSmall ? (x / 1.363636363636) : x) / (y || 1), 10) + (isSmall ? 30 : 0) :
      x.css('left', (parseInt(a / (isSmall ? 10 : y) / (z || 1), 10) - (isSmall ? 2 : 0)) + 'px');
  }
  $('.a-colnav-wrapper').on('click', function(event) {
    if (!$(event.target).closest('ul').hasClass('a-colnav-thirdLevel')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
    }
  });
  if ($('.a-colnav-wrapper').length > 0) {
    $('.a-colnav-wrapper').html($('.a-colnav-wrapper').html().replace(/drilldown/g, 'dropdown'))
      .show().on('mouseup', function(event) {
        var el = $(event.target);
        var li = el.closest('li').hasClass('is-dropdown-submenu-parent') ? el.closest('li') : el;
        levels.forEach(function(str, index) {
          var wasStacked;
          if (el.closest('ul').hasClass(str)) {
            if (el.closest('a').hasClass('open') || el.find('a').hasClass('open') ||
              el.hasClass('open')) {
              open = [];
              if (index === 0) {
                $('.a-js-drilldownLegend').html(drilldownLegendDefault);
              }
              $('.' + levels[index + 1]).removeClass('noTrans').css('left', '250%');
              $('.' + levels[2]).removeClass('noTrans').css('left', '250%');
              calc(index > 0 ? el.closest('ul') : 0, 3 / index);
              el.closest('ul').removeClass('stacked').find('.open').removeClass('open');
              el.closest('ul').find('.dim').removeClass('dim');
            } else if (!el.hasClass('a-colnav-secondLevel') && !el.hasClass('a-colnav-thirdLevel')) {
              if (el.closest('li').find('h2').length > 0 || el.closest('li').find('h3').length > 0) {
                $('.a-js-drilldownLegend').html(
                  el.closest('li').find('h2').length > 0 ?
                    el.closest('li').find('h2').text() : el.closest('li').find('h3').text()
                );
              }
              if (index === 0) {
                $('.' + levels[1]).removeClass('stacked').removeClass('noTrans').css('left', '250%');
                $('.' + levels[2]).removeClass('stacked').removeClass('noTrans').css('left', '250%');
                el.closest('ul').find('.dim').removeClass('dim');
              }
              wasStacked = el.closest('ul').hasClass('stacked');
              el.closest('ul').children('li').children('a').addClass('dim');
              el.closest('ul').addClass('stacked').find('.open').removeClass('open');
              $('.' + levels[index + 1]).hide().addClass('noTrans');
              el.addClass('open').closest('a').addClass('open');
              el.find('a').eq(0).addClass('open');
              if (open.indexOf(levels[index + 1]) === -1) {
                li.find('.' + levels[index + 1]).removeClass(wasStacked ? '' : 'noTrans')
                  .css('left', '250%').show();
                open.push(levels[index + 1]);
              }
              if (index > 0) {
                calc(el.closest('ul'), 3, index + 1).removeClass('noTrans').css('width', calc(1.5))
                  .show();
              }
              calc(li.find('.' + levels[index + 1]), 3, index + 1).css('width', calc(1.5)).show();
            }
          }
        });
        if ($('.a-colnav-firstLevel').hasClass('stacked')) {
          $('.a-js-backButton').show();
        } else {
          $('.a-js-backButton').hide();
        }
      }
    );
  }
  $('.a-colnav-item-second').attr('tabindex', '0');
  $('.a-colnav-item-third').attr('tabindex', '0');
  $('.a-colnav-item').attr('tabindex', '0').on('focus', function() {
    if ($('.a-colnav-secondLevel.submenu.is-active').length === 1) {
      $(this).off('keydown.zf.drilldown').parent().find('.a-colnav-item-second')
        .eq(0)
        .focus();
    }
  });
  $('.a-js-backButton').on('click', function() {
    $('a.open').last().trigger('mouseup');
  });
};
