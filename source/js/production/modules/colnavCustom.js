/* globals $, Foundation */
var colnavCustom = function() {
  var levels = ['a-colnav-firstLevel', 'a-colnav-secondLevel', 'a-colnav-thirdLevel']; // Classnames
  var open = []; // Array to hold open levels
  var isSmall = $('.a-contentOverview').width() < 900; // Boolean for determining screen size
  var movedDuringTouch = false; // Boolean to determine whether there was movement during touch
  var shifted; // Boolean to determine if shift key was pressed
  var savedResults = {}; // Object to hold saved results
  var currentData = {};
  var pluginInstance; // Variable to hold Foundation plugin instance
  var endPointUrl = '';
  var currentCategory = '';
  var menuHandlersAttached = false;
  var populateSublevel; // We need to declare this func. before defining it because of lint warnings

  var keys = {
    category: 'category',
    checked: ':checked',
    colnavSelector: '.a-colnav',
    colnavItemSelector: '.a-colnav-item',
    dataId: 'data-id',
    dataIndex: 'data-index',
    disabled: 'disabled',
    colnavWrapper: '.a-colnav-wrapper',
    dataLevel: 'data-level',
    loaderClass: '.a-js-drilldownLoader',
    radioClassSelector: '.radio',
    switchurl: 'switchurl',
    toggleInput: '[name="js-switchForm"]'
  };

  var elements = {
  };

  var category = {
    category: 'category',
    provider: 'provider'
  };

  function time(label) {
    // Comment this out before committing, used to measure performance in dev
    console.time(label);
  }

  function timeEnd(label) {
    // Comment this out before committing, used to measure performance in dev
    console.timeEnd(label);
  }

  function createElement(name) {
    return document.createElement(name);
  }

  function hideLoader() {
    $(keys.loaderClass).hide();
  }

  function showLoader() {
    $(keys.loaderClass).show();
  }

  function maxDepth() {
    var depth = 3;
    if (currentCategory === category.provider) {
      depth = 2;
    }

    return depth;
  }

  function getListProperty(item) {
    if (item.SubCategory) {
      return item.SubCategory;
    } else if (item.List) {
      return item.List;
    } else if (item.SchemaList) {
      return item.SchemaList;
    }

    return null;
  }

  function setHistoryState(position) {
    var urlQueryString = '?category=';
    var newurl = window.location.pathname;
    currentCategory = $(keys.toggleInput + keys.checked).data(keys.switchurl).replace('get', '');
    if (history.replaceState) {
      urlQueryString += currentCategory;
      if (position !== null && position !== '') {
        urlQueryString = urlQueryString + '&position=' + position;
      }
      newurl += urlQueryString;
      window.history.replaceState({
        path: newurl
      }, '', newurl);
    }
  }

  function stopEvent(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }

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

  function createSubMenuForClickedItem($li) {
    var $item = $li.closest('li');
    var level = $item.data('level');
    var dataIndex = $item.data('index');
    var data = null;
    var parentDataIndex = null;
    var parentData = null;

    if (level === 1) {
      data = getListProperty(currentData[dataIndex]);
    } else if (level === 2) {
      parentDataIndex = $item.parent().closest('li').data('index');
      parentData = currentData[parentDataIndex];
      data = getListProperty(parentData)[dataIndex];
      data = getListProperty(data);
    }

    populateSublevel(data, $item.find('ul'), level + 1);
  }

  // This code awful. It can return a number or an element (!),
  // the argument names don't convey any information and there
  // a few magical numbers.
  // Should be the first target of a refactoring in the future.
  // Perform various calculations to determine placements and widths
  function calc(x, y, z) {
    var returnValue = '';
    var left = null;
    var contentOverviewWith = $('.a-contentOverview').width();
    if (isSmall) {
      if (isNaN(x)) {
        returnValue = x.css('left', '50px');
      } else {
        returnValue = ((contentOverviewWith - ((z + 1) * 50)) - (1.5 * (z + 1))) + 'px';
      }
    } else if (isNaN(x)) {
      left = parseInt(x.css('left'), 10);
      if ((currentCategory === category.provider &&
          x.hasClass('a-colnav-secondLevel') &&
          left < 250)
          ||
          (currentCategory === category.category &&
              x.hasClass('a-colnav-thirdLevel') &&
              left < 200)) {
        returnValue = x;
      } else {
        returnValue = x.css('left', parseInt(contentOverviewWith / y / (z || 1), 10) + 'px');
      }
    } else {
      returnValue = parseInt(contentOverviewWith / x / (y || 1), 10);
    }

    return returnValue;
  }

  function whenClick(eventOrElement, alt) { // Logic for clicks on items
    var index = null;
    var level = null;
    var wasStacked = null;
    var str = null;
    var el = null;
    var li = null;
    var text = null;
    var position = null;

    if (eventOrElement.which === 2 || eventOrElement.which === 3) {
      // Middle-click or right-click, stop processing the event
      // Ref.: http://api.jquery.com/event.which/
      return;
    }

    if (eventOrElement.target && eventOrElement.target.tagName === 'UL') {
      return;
    }

    if (eventOrElement.stopPropagation) {
      stopEvent(eventOrElement);
    }

    // Determine element
    el = alt === undefined ? $(eventOrElement.target) : eventOrElement;
    li = el.closest('li').hasClass('is-dropdown-submenu-parent') ? el.closest('li') : el;
    if (li.is('h4')) {
      li = li.parents().eq(1);
    }

    // If item holds an actual link, redirect
    if (li.children('a').hasClass('a-js-colnavLinkAlt')) {
      window.location = li.children('a').prop('href');
      return;
    }
    text = li.find('h2').length > 0 ? li.find('h2').text() : li.find('h3').text();
    position = li.find('h2').length > 0 ? li.find('h2').attr(keys.dataId) : li.find('h3').attr(keys.dataId);
    createSubMenuForClickedItem(li);
    level = li.data('level');

    // Iterate through levels
    for (index = 0; index < level; index += 1) {
    // levels.forEach(function(str, index) {
      str = levels[index];
      // var wasStacked;
      if (el.closest('ul').hasClass(str)) { // Check if element exists
        // Check if item is already open
        if (el.closest('a').hasClass('open') || el.find('a').hasClass('open') || el.hasClass('open')) {
          position = el.closest('ul').prev().find('h2').attr(keys.dataId) || '';
          setHistoryState(position);
          open = []; // Clear array for open levels
          // Hide lower levels:
          $('.' + levels[index + 1]).removeClass('noTrans').css('left', '250%');
          $('.' + levels[2]).removeClass('noTrans').css('left', '250%');
          calc(index > 0 ? el.closest('ul') : 0, 3 / index); // Calculate left position for parent
          // Reset markup:
          el.closest('ul').removeClass('stacked').find('.open').removeClass('open');
          el.closest('ul').find('.dim').removeClass('dim');
          if (isSmall) {
            el.closest('ul').css('width', calc(1.5, null, index - 1));
          }
        } else { // If item is not open:
          setHistoryState(position);
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
    }
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
              (parseInt($('.a-colnav-secondLevel:visible').height(), 10) - 2) +
              'px');
    }
    if (!$('.a-colnav-firstLevel').hasClass('stacked')) {
      $('.a-colnav-firstLevel').css('height', 'auto');
    }
  }

  function attachEventHandlers() {
    $(document).on('keyup keydown', function(e) { // Detect shift key
      shifted = e.shiftKey;
    });

    $('.a-js-backButton').on('click', function() {
      whenClick($('a.open').last(), true);
    });
  }

  function disableToggles() {
    $(keys.toggleInput).closest(keys.radioClassSelector).addClass(keys.disabled);
    $(keys.toggleInput).attr(keys.disabled, true);
  }

  function enableToggles() {
    $(keys.toggleInput).closest(keys.radioClassSelector).removeClass(keys.disabled);
    $(keys.toggleInput).attr(keys.disabled, false);
  }

  function whenKey(e, classToQuery) { // Logic for keypresses on items
    var code = e.keyCode || e.which;
    if (code === 27 || code === 37 || code === 38 || code === 39 || code === 40) {
      stopEvent(e);
    }
    if (code === 13 || code === 32) {
      if (classToQuery !== '.a-colnav-item-third') {
        stopEvent(e);
        $(e.target).trigger('mouseup').trigger('focus');
      }
    } else if (code === 9 && !$(e.target).hasClass('open')) {
      if (shifted) {
        if ($(e.target).blur().parent().prev().length !== 0) {
          stopEvent(e);
          $(e.target).blur().parent().prev()
              .find(classToQuery)
              .trigger('focus');
        }
      } else if ($(e.target).blur().parent().next().length !== 0) {
        stopEvent(e);
        $(e.target).blur().parent().next()
            .find(classToQuery)
            .trigger('focus');
      }
    } else if (code === 9 && $(e.target).hasClass('open')) {
      if (shifted) {
        stopEvent(e);
        $(e.target).blur().parent().parent()
            .parent()
            .children('a')
            .trigger('focus');
      } else {
        stopEvent(e);
        $(e.target).blur().next().children('li:eq(0)')
            .children('a')
            .trigger('focus');
      }
    }
  }

  function createDropDown() {
    time('createDropDown');
    if (elements.$rootColnav.prop('data-dropdown-menu')) {
      pluginInstance.destroy();
    }

    pluginInstance = new Foundation.DropdownMenu(elements.$rootColnav);
    timeEnd('createDropDown');
  }

  function attachSubMenuEventHandlers($parentItem, depth) {
    time('attachSubMenuEventHandlers');
    $parentItem.find('.a-colnav-item-second').on('keydown', function(event) {
      whenKey(event, '.a-colnav-item-second');
    });
    $parentItem.find('.a-colnav-item-third').on('keydown', function(event) {
      whenKey(event, '.a-colnav-item-third');
    });
    timeEnd('attachSubMenuEventHandlers');
  }

  function attachMenuEventHandlers(depth) {
    var queryHit = false;
    var positionUrlParameterValue = null;

    time('attachMenuEventHandlers');

    if (isSmall) {
      $(keys.colnavSelector).find('a').on('mouseup', function(event) {
        if (!movedDuringTouch) {
          event.stopPropagation();
          whenClick(event);
        }
      });
    } else if (!menuHandlersAttached) {
      $(keys.colnavWrapper).on('mouseup', function(event) {
        event.stopPropagation();
        whenClick(event);
        return false;
      });
      menuHandlersAttached = true;
    }

    $(keys.colnavItemSelector).on('keydown', function(event) {
      whenKey(event, keys.colnavItemSelector);
    });

    $(keys.colnavItemSelector).on('click', function(event) {
      if ($(window).scrollTop() > $(keys.colnavWrapper).offset().top) {
        $('html,body').animate({
          scrollTop: $(keys.colnavWrapper).offset().top
        }, 300);
      }
    });
    $(keys.colnavItemSelector).on('focus', function() {
      if ($('.a-colnav-secondLevel.submenu.is-active').length === 1) {
        $(this).off('keydown.zf.drilldown').parent().find('.a-colnav-item-second')
          .eq(0)
          .focus();
      }
    });
    $(keys.colnavSelector).find('a').on('touchstart', function(event) {
      event.stopPropagation();
      movedDuringTouch = false;
    });
    $(keys.colnavSelector).find('a').on('touchmove', function(event) {
      event.stopPropagation();
      movedDuringTouch = true;
    });

    // Check if position is included in URL, and navigate to it
    positionUrlParameterValue = urlQuery('position');
    if (positionUrlParameterValue) {
      $(keys.colnavSelector).find('a.a-colnav-item').each(function() {
        if ($(this).find('h2').attr(keys.dataId) === positionUrlParameterValue) {
          queryHit = true;
          whenClick($(this), true);
        }
      });
      if (currentCategory === category.category) {
        $(keys.colnavSelector).find('a.a-colnav-item-second').each(function() {
          if ($(this).find('h3').attr(keys.dataId) === positionUrlParameterValue) {
            queryHit = true;
            whenClick($(this).closest('ul').prev(), true);
            setTimeout(function() {
              whenClick($(this), true);
            }.bind(this), 250);
          }
        });
      }
    }

    timeEnd('attachMenuEventHandlers');
  }

  function createMenuNodeFragment(item,
                          level,
                          index) {
    var liClasses = ['',
      'is-dropdown-submenu-parent is-submenu-item is-dropdown-submenu-item opens-right',
      'is-submenu-item is-dropdown-submenu-item'];
    var aClasses = ['a-colnav-item',
      'a-colnav-item-second',
      'a-colnav-item-third'];
    var ulClasses = ['a-colnav a-colnav-vertical a-colnav-secondLevel',
      'a-colnav a-colnav-vertical a-colnav-thirdLevel is-dropdown-submenu',
      ''];
    var span;

    var node = {
      li: createElement('li'),
      a: createElement('a'),
      h: createElement('h' + (level + 1)),
      p: createElement('p'),
      ul: createElement('ul')
    };

    if (level === 2 && maxDepth() === 2) {
      node.h = createElement('h4');
    }

    node.li.dataset.level = level;
    node.li.dataset.index = index;
    node.h.dataset.id = item.Id;

    node.h.textContent = item.Heading || item.Title;

    node.li.appendChild(node.a);
    node.a.appendChild(node.h);

    node.a.tabIndex = 0;

    node.li.className = liClasses[level - 1];
    node.a.className = aClasses[level - 1];
    node.p.className = 'a-leadText';
    node.ul.className = ulClasses[level - 1];

    if (level === 3) {
      span = createElement('span');
      span.className = 'a-colnav-rightText';
      span.textContent = item.Provider || 'Skatteetaten';
      node.a.appendChild(span);
    } else if (level === 1) {
      node.a.appendChild(node.p);
    }

    if (level < maxDepth()) {
      node.li.appendChild(node.ul);
      node.a.className += ' a-js-colnavLink';
    } else {
      node.a.className += ' a-js-colnavLinkAlt';
    }

    return node;
  }

  populateSublevel = function(items, $ul, level) {
    var i;
    var item = null;
    var fragmmentNode = null;
    var fragment = document.createDocumentFragment();

    if ($ul.children().length > 0) {
      return;
    }

    time('populateSublevel');
    for (i = 0; i < items.length; i += 1) {
      item = items[i];
      fragmmentNode = createMenuNodeFragment(item,
        level,
        i);
      if (item.Url) {
        fragmmentNode.a.href = item.Url;
      }
      if (item.Description) {
        fragmmentNode.p.textContent = item.Description;
      }
      fragment.appendChild(fragmmentNode.li);
    }

    $ul[0].appendChild(fragment);
    $('.a-colnav-wrapper > .a-colnav').show();
    timeEnd('populateSublevel');
    if (level === 1) {
      createDropDown();
      attachMenuEventHandlers(maxDepth());
    } else {
      attachSubMenuEventHandlers($ul, maxDepth());
    }
  };

  function populateDataObject(data, level) {
    var i = null;

    for (i = 0; i < data.length; i += 1) {
      currentData[i] = data[i];
    }
  }

  function populateNavigation(str, data) {
    time('populateNavigation');
    currentData = [];
    populateDataObject(data, 1);
    populateSublevel(currentData, elements.$rootColnav, 1);
    hideLoader();
    enableToggles();
    timeEnd('populateNavigation');
  }

  function afterRequest(str, data) {
    timeEnd('getDrilldownSource');
    time('afterRequest');
    elements.$rootColnav = $('.a-colnav-wrapper > .a-colnav');
    // empty() would be a safer way to remove the elements, but it's
    // slower
    // elements.$rootColnav.empty();
    elements.$rootColnav.html('');
    timeEnd('afterRequest');
    populateNavigation(str, data);
  }

  function getDrilldownSource(str) {
    var url = endPointUrl + str;
    time('getDrilldownSource');
    showLoader();
    disableToggles();
    if (savedResults[str]) { // Get stored results if present
      afterRequest(str, savedResults[str]);
    } else {
      // These hardcoded paths and IPs need to be fixed probably
      if (window.location.pathname.indexOf('DesignSystem') === 1
        || window.location.origin.indexOf('localhost') !== -1
        || window.location.origin.indexOf('192.168.') !== -1) {
        url += '.json';
      }
      $.ajax({
        type: 'GET',
        url: url,
        success: function(data) {
          savedResults[str] = data;
          afterRequest(str, data); // Perform populating logic
        }
      });
    }
  }

  function resizedWindow() {
    var wasSmall = isSmall;
    // Redefine boolean for determining screen size
    isSmall = $('.a-contentOverview').width() < 900;
    // No change required if the window is still big/small
    if (isSmall === wasSmall) {
      return;
    }
    getDrilldownSource($(keys.toggleInput + keys.checked).data(keys.switchurl));
    if (!isSmall) {
      // Ensure reset of markup
      $('.switch-container').show();
      $('.a-js-colnavTitleRegular').text('Alle skjemaer');
    }
    if (isSmall) { // Small screen specific style (can be moved to stylesheet)
      $('.a-contentOverview').css('overflow-x', 'hidden');
    }
  }

  function onBodyClick(e) {
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
  }

  function performResizeLogicAfterResizeEvents() {
    var resizeTimeout;
    window.onresize = function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizedWindow, 100);
    };
  }

  function setSwitchUrlAttribute() {
    $(keys.toggleInput).each(function(index) {
      $(this).data(keys.switchurl,
        $(this).parents().eq(2).data(keys.switchurl + (index + 1))
      );
      $(this).prop('data-' + keys.switchurl,
        $(this).parents().eq(2).data(keys.switchurl + (index + 1))
      );
    });
  }

  function onToggleChange() {
    if ($(this).is(keys.checked)) {
      setHistoryState(null);
      getDrilldownSource($(this).data(keys.switchurl));
    }
  }

  function detectSelectedSourceChange() {
    $(keys.toggleInput).change(onToggleChange);
  }

  function loadDrillDownSource() {
    var selectedIndex = 1;
    var dataSource = 'get';
    var urlCategory = urlQuery(keys.category);
    // Chose category/kategori by default
    currentCategory = category.category;
    // and see if the URL contains the selected category already
    if (urlCategory !== null && urlCategory !== false) {
      currentCategory = urlCategory;
    }
    if (currentCategory === category.provider) {
      selectedIndex = 2;
    }
    dataSource += currentCategory;
    $(keys.toggleInput).prop('checked', false);
    // Maybe not so robust to use the id, but it's the only way we have to
    // identify each checkbox at this point
    $('#atom-switch-cb' + selectedIndex).prop('checked', true);
    getDrilldownSource(dataSource);
  }

  function getElements() {
    elements.$rootColnav = $('.a-colnav-wrapper > .a-colnav');
  }

  $(document).ready(function() {
    endPointUrl = $(keys.toggleInput).parents().eq(3).data('switchendpoint');
    getElements();
    if (elements.$rootColnav.length > 0) { // Check if drilldown markup is present
      if (isSmall) { // Small screen specific style (can be moved to stylesheet)
        $('.a-contentOverview').css('overflow-x', 'hidden');
      }
      attachEventHandlers();
      loadDrillDownSource();
      performResizeLogicAfterResizeEvents();
      setSwitchUrlAttribute();
      detectSelectedSourceChange();
      $('body').on('click', onBodyClick);
    }
  });
};
