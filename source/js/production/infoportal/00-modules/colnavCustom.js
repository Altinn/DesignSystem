/* globals $, Foundation */
var colnavCustom = function() {
  var levels = ['a-colnav-firstLevel', 'a-colnav-secondLevel', 'a-colnav-thirdLevel']; // Classnames
  var open = []; // Array to hold open levels
  var isSmall = $('.a-contentOverview').width() < 900; // Boolean for determining screen size
  var movedDuringTouch = false; // Boolean to determine whether there was movement during touch
  var shifted; // Boolean to determine if shift key was pressed
  var savedResults = {}; // Object to hold saved results
  var pluginInstance; // Variable to hold Foundation plugin instance
  $('.a-js-drilldownLoader').hide(); // Hide loader
  function urlQuery(query) { // Parse current URL for query value
    var _query = query.replace(/[[]/, '[').replace(/[\]]/, '\\]');
    var expr = '[\\?&]' + _query + '=([^&#]*)';
    var regex = new RegExp(expr);
    var results = regex.exec(window.location.href);
    if (results !== null) {
      return results[1];
    }
    return false;
  }
  function calc(x, y, z) { // Perform various calculations to determine placements and widths
    var a = $('.a-contentOverview').width();
    if (isSmall) {
      return (x === parseInt(x, 10) || x === parseFloat(x, 10)) ?
        ((a - ((z + 1) * 40)) - (1.5 * (z + 1))) + 'px' : x.css('left', '40px');
    }
    return (x === parseInt(x, 10) || x === parseFloat(x, 10)) ?
      parseInt(a / x / (y || 1), 10) : x.css('left', parseInt(a / y / (z || 1), 10) + 'px');
  }
  function whenKey(e, classToQuery) { // Logic for keypresses on items
    var code = e.keyCode || e.which;
    if (code === 27 || code === 37 || code === 38 || code === 39 || code === 40) {
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
    }
    if (code === 13 || code === 32) {
      if (classToQuery !== '.a-colnav-item-third') {
        e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
        $(e.target).trigger('mouseup').trigger('focus');
      }
    } else if (code === 9 && !$(e.target).hasClass('open')) {
      if (shifted) {
        if ($(e.target).blur().parent().prev().length !== 0) {
          e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
          $(e.target).blur().parent().prev()
            .find(classToQuery)
            .trigger('focus');
        }
      } else if ($(e.target).blur().parent().next().length !== 0) {
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
  function whenClick(eventOrElement, alt) { // Logic for clicks on items
    var el = alt === undefined ? $(eventOrElement.target) : eventOrElement; // Determine element
    // Determine li-element:
    var li = el.closest('li').hasClass('is-dropdown-submenu-parent') ? el.closest('li') : el;
    var newurl; // Variable to hold generated URL
    // Variable to hold text for heading and URL query, set to item name:
    var text = li.find('h2').length > 0 ? li.find('h2').text() : li.find('h3').text();
    if (li.children('a').hasClass('a-js-colnavLinkAlt')) { // If item holds an actual link, redirect
      window.location = li.children('a').attr('href');
    }
    levels.forEach(function(str, index) { // Iterate through levels
      var wasStacked; // Boolean to determine if level was stacked
      if (el.closest('ul').hasClass(str)) { // Check if element exists
        if (isSmall && el.closest('ul').hasClass('stacked')) {
          text = el.closest('ul').prev().find('h2').text() || ''; // Get name from parent
          if (history.pushState) { // Modify the browser history object
            newurl = window.location.protocol + '//' + window.location.host +
              window.location.pathname + '?position=' + text.toLowerCase().replace(/ /g, '-');
            window.history.pushState({ path: newurl }, '', newurl);
          }
          open = []; // Clear array for open levels
          // Hide lower levels:
          $('.' + levels[index + 1]).removeClass('noTrans').css('left', '250%');
          $('.' + levels[2]).removeClass('noTrans').css('left', '250%');
          calc(index > 0 ? el.closest('ul') : 0, 3 / index); // Calculate left position for parent
          // Reset markup:
          el.closest('ul').removeClass('stacked').find('.open').removeClass('open');
          el.closest('ul').find('.dim').removeClass('dim');
        // Check it item is already open:
        } else if (el.closest('a').hasClass('open') || el.find('a').hasClass('open') ||
          el.hasClass('open')) {
          text = el.closest('ul').prev().find('h2').text() || ''; // Get name from parent
          if (history.pushState) { // Modify the browser history object
            newurl = window.location.protocol + '//' + window.location.host +
              window.location.pathname + '?position=' + text.toLowerCase().replace(/ /g, '-');
            window.history.pushState({ path: newurl }, '', newurl);
          }
          open = []; // Clear array for open levels
          // Hide lower levels:
          $('.' + levels[index + 1]).removeClass('noTrans').css('left', '250%');
          $('.' + levels[2]).removeClass('noTrans').css('left', '250%');
          calc(index > 0 ? el.closest('ul') : 0, 3 / index); // Calculate left position for parent
          // Reset markup:
          el.closest('ul').removeClass('stacked').find('.open').removeClass('open');
          el.closest('ul').find('.dim').removeClass('dim');
        // If item is not open:
        } else {
          if (history.pushState) { // Modify the browser history object
            newurl = window.location.protocol + '//' + window.location.host +
              window.location.pathname + '?position=' + text.toLowerCase().replace(/ /g, '-');
            window.history.pushState({ path: newurl }, '', newurl);
          }
          if (index === 0) { // If on first level, reset markup and hide lower levels
            el.closest('ul').find('.dim').removeClass('dim');
            $('.' + levels[1]).removeClass('stacked').removeClass('noTrans').css('left', '250%');
            $('.' + levels[2]).removeClass('stacked').removeClass('noTrans').css('left', '250%');
          }
          wasStacked = el.closest('ul').hasClass('stacked'); // Check if parent was stacked
          el.closest('ul').children('li').children('a').addClass('dim'); // Dim other items
          // Stack parent and reset any open items:
          el.closest('ul').addClass('stacked').find('.open').removeClass('open');
          $('.' + levels[index + 1]).hide().addClass('noTrans'); // Adjust markup of lower level
          // Adjust item markup:
          el.addClass('open').closest('a').addClass('open');
          el.find('a').eq(0).addClass('open');
          if (open.indexOf(levels[index + 1]) === -1) { // If lower level is not open
            // Prepare lower level and add it to array:
            li.find('.' + levels[index + 1]).removeClass(wasStacked ? '' : 'noTrans')
              .css('left', '250%').show();
            open.push(levels[index + 1]);
          }
          if (index > 0) { // If level is second or lower, calculate left position and width
            calc(el.closest('ul'), 3, index + 1).removeClass('noTrans')
              .css('width', calc(1.5, null, index)).show();
          }
          // Calculate left position and width for lower level
          calc(li.find('.' + levels[index + 1]), 3, index + 1).css('width', calc(1.5, null, index))
            .show();
        }
      }
    });
    // Perform markup adjustments to stacked view:
    if ($('.a-colnav-firstLevel').hasClass('stacked')) {
      $('.a-js-backButton').show();
      if (isSmall) {
        $('.switch-container').hide();
        $('.a-containerColnav-top').css('padding-bottom', '0px');
        $('.a-js-backButton').css('margin-top', '-4px');
        $('.a-js-colnavTitleBold').text('');
        $('.a-js-colnavTitleRegular').text(text);
      }
    // Perform markup adjustments to unstacked view:
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
    // Adjust the height of container:
    $('.a-colnav-firstLevel').css('height', 'auto');
    if (
      parseInt($('.a-colnav-thirdLevel:visible').height(), 10) >
      parseInt($('.a-colnav-firstLevel').height(), 10) ||
      parseInt($('.a-colnav-secondLevel:visible').height(), 10) >
      parseInt($('.a-colnav-firstLevel').height(), 10)) {
      $('.a-colnav-firstLevel')
        .css('height',
          parseInt($('.a-colnav-thirdLevel:visible').height(), 10) >
          parseInt($('.a-colnav-secondLevel:visible').height(), 10) ?
            (parseInt($('.a-colnav-thirdLevel:visible').height(), 10) - 2) :
            (parseInt($('.a-colnav-secondLevel:visible').height(), 10) - 2)
          + 'px');
    }
  }
  function getDrilldownSource(str) { // Drilldown logic
    var url = $('[name="js-switchForm"]').parent().parent().parent()
      .attr('data-switchEndpoint') + str + '.json';
    var afterRequest = function(data) { // Populating logic
      var depth = 3; // Assume a depth of three levels
      var markup = []; // Array to store markup
      $('.a-colnav').html(''); // Wipe previous markup
      setTimeout(function() {
        savedResults[str] = data; // Save results for later
        data.forEach(function(item) { // Parse and generate markup
          var level2 = [];
          var li = document.createElement('li');
          var a = document.createElement('a');
          var h2 = document.createElement('h2');
          var p = document.createElement('p');
          var ul = document.createElement('ul');
          item[item.SubCategory ? 'SubCategory' : 'List'].forEach(function(_item) {
            var level3 = [];
            var _li = document.createElement('li');
            var _a1 = document.createElement('a');
            var _a2 = document.createElement('a');
            var _h3 = document.createElement('h3');
            var _h4 = document.createElement('h4');
            var _ul = document.createElement('ul');
            if (_item[_item.SchemaList ? 'SchemaList' : 'List']) {
              _item[_item.SchemaList ? 'SchemaList' : 'List'].forEach(function(__item) {
                var __li = document.createElement('li');
                var __a = document.createElement('a');
                var __h4 = document.createElement('h4');
                var __span = document.createElement('span');
                $(__h4).text(__item.Heading || __item.Title).appendTo($(__a));
                $(__span).addClass('a-colnav-rightText').text(__item.Provider || '–')
                  .appendTo($(__a));
                $(__a).attr('href', __item.Url).addClass('a-colnav-item-third').appendTo($(__li));
                level3.push(__li);
              });
            } else {
              depth = 2;
            }
            $(_h3).text(_item.Heading || _item.Title).appendTo($(_a1));
            $(_h4).text(_item.Heading || _item.Title).appendTo($(_a2));
            $(_a1).attr('href', '#').addClass('a-colnav-item-second').addClass('a-js-colnavLink')
              .appendTo($(_li));
            $(_a2).attr('href', _item.Url).addClass('a-colnav-item-second')
              .addClass('a-js-colnavLinkAlt')
              .appendTo($(_li));
            $(_ul).addClass('a-colnav').addClass('a-colnav-vertical')
              .addClass('a-colnav-thirdLevel')
              .append(level3)
              .appendTo($(_li));
            level2.push(_li);
          });
          $(h2).text(item.Heading).appendTo($(a));
          $(p).text(item.Description).addClass('a-leadText').appendTo($(a));
          $(a).attr('href', '#').addClass('a-colnav-item').appendTo($(li));
          $(ul).addClass('a-colnav').addClass('a-colnav-vertical').addClass('a-colnav-secondLevel')
            .append(level2)
            .appendTo($(li));
          markup.push(li);
        });
        $('.a-colnav').html(markup); // Append markup
        setTimeout(function() {
          // (Re)initialize Foundation library logic:
          if ($('.a-colnav').attr('data-dropdown-menu')) {
            pluginInstance.destroy();
            pluginInstance = new Foundation.DropdownMenu($('.a-colnav').eq(0));
          } else {
            pluginInstance = new Foundation.DropdownMenu($('.a-colnav').eq(0));
          }
          if ($('.a-colnav-wrapper').length > 0) { // Conditional logic for different screen sizes
            if (isSmall) {
              $('.a-colnav-wrapper').html($('.a-colnav-wrapper').html()
                .replace(/drilldown/g, 'dropdown'));
              $('.a-colnav').find('a').on('mouseup', function(event) { // Apply action logic
                if (!movedDuringTouch) {
                  whenClick(event);
                }
              });
            } else {
              $('.a-colnav-wrapper')
                .html($('.a-colnav-wrapper').html().replace(/drilldown/g, 'dropdown'))
                .show().children()
                .on('mouseup', function(event) { // Apply action logic
                  whenClick(event); return false;
                });
            }
          }
          $(document).on('keyup keydown', function(e) { // Detect shift key
            shifted = e.shiftKey;
          });
          // Set tabindexes:
          $('.a-colnav-item-second').attr('tabindex', '0');
          $('.a-colnav-item-third').attr('tabindex', '0');
          // Apply remaining action logic:
          $('.a-colnav-item').on('keydown', function(event) {
            whenKey(event, '.a-colnav-item');
          });
          $('.a-colnav-item-second').on('keydown', function(event) {
            whenKey(event, '.a-colnav-item-second');
          });
          $('.a-colnav-item-third').on('keydown', function(event) {
            whenKey(event, '.a-colnav-item-third');
          });
          $('.a-colnav-item').on('click', function(event) {
            if ($(window).scrollTop() > $('.a-colnav').offset().top) {
              $('html,body').animate({ scrollTop: $('.a-colnav').offset().top }, 300);
            }
          });
          $('.a-colnav-item').attr('tabindex', '0').on('focus', function() {
            if ($('.a-colnav-secondLevel.submenu.is-active').length === 1) {
              $(this).off('keydown.zf.drilldown').parent().find('.a-colnav-item-second')
                .eq(0)
                .focus();
            }
          });
          $('.a-js-backButton').on('click', function() {
            whenClick($('a.open').last(), true);
          });
          $('.a-colnav').find('a').on('touchstart', function(event) {
            event.stopPropagation(); movedDuringTouch = false;
          });
          $('.a-colnav').find('a').on('touchmove', function(event) {
            movedDuringTouch = true; event.stopPropagation();
          });
          // Perform depth specific markup changes:
          if (depth === 2) {
            $('.a-colnav').find('.a-colnav-thirdLevel').remove();
            $('.a-colnav').find('.a-js-colnavLink').remove();
            $('.a-colnav').find('.a-leadText').remove();
          } else {
            $('.a-colnav').find('.a-js-colnavLinkAlt').remove();
          }
          if (urlQuery('position')) { // Check if position is included in URL, and navigate to it
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
        }, 0);
      }, 0);
    };
    if (savedResults[str]) { // Get stored results if present
      afterRequest(savedResults[str]);
    } else { // Perform request
      $.ajax({
        type: 'GET',
        url: url,
        success: function(data) {
          afterRequest(data); // Perform populating logic
        }
      });
    }
  }
  function resizedWindow() { // What happens upon window resize
    isSmall = $('.a-contentOverview').width() < 900; // Redefine boolean for determining screen size
    // Perform drilldown logic with currently selected source:
    getDrilldownSource($('[name="js-switchForm"]:checked').attr('data-switchUrl'));
    // Ensure reset of markup
    $('.switch-container').show(); $('.a-js-colnavTitleRegular').text('Alle skjemaer');
  }
  $(document).ready(function() {
    var resizeTimeout; // Timeout variable for resizing
    if ($('.a-colnav').length > 0) { // Check if drilldown markup is present
      if (isSmall) { // Small screen specific style (can be moved to stylesheet)
        $('.a-contentOverview').css('overflow-x', 'hidden');
      }
      getDrilldownSource('getcategory'); // Get data from specific source
      window.onresize = function() { // Perform resize logic after resize events
        clearTimeout(resizeTimeout); resizeTimeout = setTimeout(resizedWindow, 100);
      };
      $('[name="js-switchForm"]').each(function(index) { // Set switchUrl attribute
        $(this).attr('data-switchUrl',
          $(this).parent().parent().parent()
            .attr('data-switchUrl' + (index + 1))
        );
      });
      $('[name="js-switchForm"]').change(function() { // Detect change of selected source
        if ($(this).is(':checked')) { // Get data from selected source
          getDrilldownSource($(this).attr('data-switchUrl'));
        }
      });
      $('body').on('click', function(e) {
        var arr = [];
        if (!isSmall) {
          if ($(e.target).closest('.a-colnav-firstLevel').length === 0) {
            $('a.open').each(function() {
              arr.push($(this));
            });
            arr.reverse();
            arr.forEach(function(item) {
              item.parent().trigger('mouseup');
            });
          }
        }
      });
    }
  });
};
