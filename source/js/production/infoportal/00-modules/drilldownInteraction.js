/* globals $, Foundation */
var drilldownInteraction = function() {
  var levels = ['a-colnav-firstLevel', 'a-colnav-secondLevel', 'a-colnav-thirdLevel'];
  var open = [];
  var isSmall = $(window).width() < 992;
  var drilldownLegendDefault = $('.a-js-drilldownLegend').html();
  var movedDuringTouch = false;
  var shifted;
  function urlQuery(query) {
    var _query = query.replace(/[[]/, '[').replace(/[\]]/, '\\]');
    var expr = '[\\?&]' + _query + '=([^&#]*)';
    var regex = new RegExp(expr);
    var results = regex.exec(window.location.href);
    if (results !== null) {
      return results[1];
    }
    return false;
  }
  function calc(x, y, z) {
    var a = $('.a-contentOverview').width();
    return (x === parseInt(x, 10) || x === parseFloat(x, 10)) ?
      parseInt(a / (isSmall ? (x / 1.363636363636) : x) / (y || 1), 10) + (isSmall ? 30 : 0) :
      x.css('left', (parseInt(a / (isSmall ? 10 : y) / (z || 1), 10) - (isSmall ? 2 : 0)) + 'px');
  }
  function whenKey(e, classToQuery) {
    var code = e.keyCode || e.which;
    if (code === 27 || code === 37 || code === 38 || code === 39 || code === 40) {
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
    }
    if (code === 13 || code === 32) {
      if (classToQuery === '.a-colnav-item-third') {
        //
      } else {
        e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
        $(e.target).trigger('mouseup').trigger('focus');
      }
    } else if (code === 9 && !$(e.target).hasClass('open')) {
      if (shifted) {
        if ($(e.target).blur().parent().prev().length === 0) {
          //
        } else {
          e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
          $(e.target).blur().parent().prev()
            .find(classToQuery)
            .trigger('focus');
        }
      } else if ($(e.target).blur().parent().next().length === 0) {
        //
      } else {
        e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
        $(e.target).blur().parent().next()
          .find(classToQuery)
          .trigger('focus');
      }
    } else if (code === 9 && $(e.target).hasClass('open')) {
      if (shifted) {
        e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
        $(e.target).blur().parent().parent()
          .parent()
          .children('a')
          .trigger('focus');
      } else {
        e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
        $(e.target).blur().next().children('li:eq(0)')
          .children('a')
          .trigger('focus');
      }
    }
  }
  function whenClick(event, alt) {
    var el = alt === undefined ? $(event.target) : event;
    var li = el.closest('li').hasClass('is-dropdown-submenu-parent') ? el.closest('li') : el;
    var newurl;
    var text = li.find('h2').length > 0 ? li.find('h2').text() : li.find('h3').text();
    if (li.children('a').hasClass('a-js-colnavLinkAlt')) {
      window.location = li.children('a').attr('href');
    }
    levels.forEach(function(str, index) {
      var wasStacked;
      if (el.closest('ul').hasClass(str)) {
        if (el.closest('a').hasClass('open') || el.find('a').hasClass('open') ||
          el.hasClass('open')) {
          text = el.closest('ul').prev().find('h2').text() || '';
          if (history.pushState) {
            newurl = window.location.protocol + '//' + window.location.host +
              window.location.pathname + '?position=' + text.toLowerCase().replace(/ /g, '-');
            window.history.pushState({ path: newurl }, '', newurl);
          }
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
          if (history.pushState) {
            newurl = window.location.protocol + '//' + window.location.host +
              window.location.pathname + '?position=' + text.toLowerCase().replace(/ /g, '-');
            window.history.pushState({ path: newurl }, '', newurl);
          }
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
      if (isSmall) {
        $('.switch-container').hide();
        $('.a-containerColnav-top').css('padding-bottom', '0px');
        $('.a-js-backButton').css('margin-top', '-3px');
        $('.a-js-colnavTitleBold').text('');
        $('.a-js-colnavTitleRegular').text(text);
      }
    } else {
      $('.a-js-backButton').hide();
      if (isSmall) {
        $('.switch-container').show();
        $('.a-containerColnav-top').css('padding-bottom', '24px');
        $('.a-js-backButton').css('margin-top', '0px');
        $('.a-js-colnavTitleBold').text('');
        $('.a-js-colnavTitleRegular').text('Alle skjemaer');
      }
    }
  }
  window.drillDownGetSource = function(str) {
    var url = [
      'http://altinn-dev.dev.bouvet.no/api/' + str,
      '../../../data/' + str + '.json',
      '../../../DesignSystem/data/' + str + '.json'
    ];
    var act2 = function(event) {
      whenClick(event);
      return false;
    };
    var act3 = function(event) {
      whenKey(event, '.a-colnav-item');
    };
    var act4 = function(event) {
      whenKey(event, '.a-colnav-item-second');
    };
    var act5 = function(event) {
      whenKey(event, '.a-colnav-item-third');
    };
    var act6 = function(event) {
      if (!movedDuringTouch) {
        whenClick(event);
      }
    };
    var act7 = function() {
      if ($('.a-colnav-secondLevel.submenu.is-active').length === 1) {
        $(this).off('keydown.zf.drilldown').parent().find('.a-colnav-item-second')
          .eq(0)
          .focus();
      }
    };
    var act8 = function() {
      whenClick($('a.open').last(), true);
    };
    var act9 = function(event) {
      event.stopPropagation();
      movedDuringTouch = false;
    };
    var act10 = function(event) {
      movedDuringTouch = true;
      event.stopPropagation();
    };
    var afterRequest = function(data) {
      var depth = 3;
      var markup = '';
      data.forEach(function(item) {
        var level2 = '';
        item[item.SubCategory ? 'SubCategory' : 'List'].forEach(function(_item) {
          var level3 = '';
          if (_item[_item.SchemaList ? 'SchemaList' : 'List']) {
            _item[_item.SchemaList ? 'SchemaList' : 'List'].forEach(function(__item) {
              level3 += '<li>' +
                '<a href="' + __item.Url + '" class="a-colnav-item-third">' +
                  '<h4>' + (__item.Heading || __item.Title) + '</h4>' +
                  '<span class="a-colnav-rightText">' + __item.Provider + '</span>' +
                '</a>' +
              '</li>';
            });
          } else {
            depth = 2;
          }
          level2 += '<li>' +
            '<a href="#" class="a-colnav-item-second a-js-colnavLink">' +
              '<h3>' + (_item.Heading || _item.Title) + '</h3>' +
            '</a>' +
            '<a href="' + _item.Url + '" class="a-colnav-item-second a-js-colnavLinkAlt">' +
              '<h4>' + (_item.Heading || _item.Title) + '</h4>' +
            '</a>' +
            '<ul class="a-colnav a-colnav-vertical a-colnav-thirdLevel">' +
              level3 +
            '</ul>' +
          '</li>';
        });
        markup += (
          '<li>' +
            '<a href="#" class="a-colnav-item">' +
              '<h2>' + item.Heading + '</h2>' +
              '<p class="a-leadText">' +
                item.Description +
              '</p>' +
            '</a>' +
            '<ul class="a-colnav a-colnav-vertical a-colnav-secondLevel">' +
              level2 +
            '</ul>' +
          '</li>'
        );
      });
      $('.a-colnav-wrapper').off('mouseup', act2);
      $('.a-colnav-item').off('keydown', act3);
      $('.a-colnav-item-second').off('keydown', act4);
      $('.a-colnav-item-third').off('keydown', act5);
      $('.a-colnav').find('a').off('mouseup', act6);
      $('.a-colnav-item').off('focus', act7);
      $('.a-js-backButton').off('click', act8);
      $('.a-colnav').find('a').off('touchstart', act9);
      $('.a-colnav').find('a').off('touchmove', act10);
      $('.a-colnav').html(markup).foundation();
      if ($('.a-colnav-wrapper').length > 0 && !isSmall) {
        $('.a-colnav-wrapper')
          .html($('.a-colnav-wrapper').html().replace(/drilldown/g, 'dropdown'))
          .show().children()
          .on('mouseup', act2);
      }
      $(document).on('keyup keydown', function(e) {
        shifted = e.shiftKey;
      });
      $('.a-colnav-item').on('keydown', act3);
      $('.a-colnav-item-second').on('keydown', act4);
      $('.a-colnav-item-third').on('keydown', act5);
      if (isSmall) {
        if ($('.a-colnav-wrapper').length > 0) {
          $('.a-colnav-wrapper').html($('.a-colnav-wrapper').html()
            .replace(/drilldown/g, 'dropdown'));
          $('.a-colnav').find('a').on('mouseup', act6);
        }
      }
      $('.a-colnav-item-second').attr('tabindex', '0');
      $('.a-colnav-item-third').attr('tabindex', '0');
      $('.a-colnav-item').attr('tabindex', '0').on('focus', act7);
      $('.a-js-backButton').on('click', act8);
      $('.a-colnav').find('a').on('touchstart', act9);
      $('.a-colnav').find('a').on('touchmove', act10);
      // if ($('.a-colnav').attr('data-colnav-depth') === '2') {
      if (depth === 2) {
        $('.a-colnav').find('.a-colnav-thirdLevel').remove();
        $('.a-colnav').find('.a-js-colnavLink').remove();
      } else {
        $('.a-colnav').find('.a-js-colnavLinkAlt').remove();
      }
      if (urlQuery('position')) {
        $('.a-colnav').find('a.a-colnav-item').each(function() {
          if ($(this).find('h2').text().toLowerCase() ===
            urlQuery('position')
              .replace(/%C3%A6/g, 'æ')
              .replace(/%C3%B8/g, 'ø')
              .replace(/%C3%A5/g, 'å')
              .replace(/%C3%86/g, 'Æ')
              .replace(/%C3%98/g, 'Ø')
              .replace(/%C3%85/g, 'Å')
              .replace(/-/g, ' ')) {
            whenClick($(this), true);
          }
        });
        $('.a-colnav').find('a.a-colnav-item-second').each(function() {
          if ($(this).find('h3').text().toLowerCase() ===
            urlQuery('position')
              .replace(/%C3%A6/g, 'æ')
              .replace(/%C3%B8/g, 'ø')
              .replace(/%C3%A5/g, 'å')
              .replace(/%C3%86/g, 'Æ')
              .replace(/%C3%98/g, 'Ø')
              .replace(/%C3%85/g, 'Å')
              .replace(/-/g, ' ')) {
            whenClick($(this).closest('ul').prev(), true);
            setTimeout(function() {
              whenClick($(this), true);
            }.bind(this), 250);
          }
        });
      }
    };
    $.ajax({
      type: 'GET',
      url: url[0],
      success: function(data) {
        afterRequest(data);
      },
      error: function() {
        $.ajax({
          type: 'GET',
          url: url[1],
          success: function(data) {
            afterRequest(data);
          },
          error: function() {
            $.getJSON(url[2], function(data) {
              afterRequest(data);
            });
          }
        });
      }
    });
  };
  $(document).ready(function() {
    if ($('.a-colnav').length > 0) {
      $('.a-colnav-wrapper').on('click', function(event) {
        if (!$(event.target).closest('ul').hasClass('a-colnav-thirdLevel')) {
          event.preventDefault();
          event.stopImmediatePropagation();
          event.stopPropagation();
        }
      });
      window.drillDownGetSource('getcategory');
    }
  });
};
