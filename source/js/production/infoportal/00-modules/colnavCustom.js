/* globals $, Foundation */
var colnavCustom = function() {
    var levels = ['a-colnav-firstLevel', 'a-colnav-secondLevel', 'a-colnav-thirdLevel']; // Classnames
    var open = []; // Array to hold open levels
    var isSmall = $('.a-contentOverview').width() < 900; // Boolean for determining screen size
    var movedDuringTouch = false; // Boolean to determine whether there was movement during touch
    var shifted; // Boolean to determine if shift key was pressed
    var savedResults = {}; // Object to hold saved results
    var pluginInstance; // Variable to hold Foundation plugin instance
    var endPointUrl = '';
    var currentCategory = '';

    var keys = {
        category: 'category',
        checked: ':checked',
        dataId: 'data-id',
        colnavWrapper: '.a-colnav-wrapper',
        loaderClass: '.a-js-drilldownLoader',
        toggleInput: '[name="js-switchForm"]',
        switchurl: 'switchurl'
    }

    var category = {
        category: 'category',
        provider: 'provider'
    }

    function hideLoader() {
        $(keys.loaderClass).hide();
    }

    function showLoader() {
        $(keys.loaderClass).show();
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

    // This code awful. It can return a number or an element (!),
    // the argument name don't convey any information and there
    // a few magical numbers.
    // Should be the first target of a refactoring in the future.
    // Perform various calculations to determine placements and widths
    function calc(x, y, z) { 
        var returnValue = '';
        var contentOverviewWith = $('.a-contentOverview').width();
        if (isSmall) {
            if (isNaN(x)) {
                returnValue = x.css('left', '40px');
            }
            else {
                returnValue = ((contentOverviewWith - ((z + 1) * 40)) - (1.5 * (z + 1))) + 'px';
            }  
        }
        else {
            if (isNaN(x)) {
                var left = parseInt(x.css('left'), 10);
                if ((currentCategory == category.provider &&
                        x.hasClass('a-colnav-secondLevel') &&
                        left < 250) 
                    ||
                    (currentCategory == category.category &&
                        x.hasClass('a-colnav-thirdLevel') &&
                        left < 200)) {
                    return x;
                }
                else {
                    returnValue = x.css('left', parseInt(contentOverviewWith / y / (z || 1), 10) + 'px');
                }
            }
            else {
                returnValue = parseInt(contentOverviewWith / x / (y || 1), 10);
            }            
        }        

        return returnValue;
    }

    function setHistoryState(position) {
        currentCategory = $(keys.toggleInput + keys.checked).data(keys.switchurl).replace('get', '');
        if (history.replaceState) {
            var urlQuery = '?category=' + currentCategory;
            if (position != null && position != '') {
                urlQuery = urlQuery + '&position=' + position;
            }
            var newurl = window.location.pathname + urlQuery;
            console.log(newurl);
            window.history.replaceState({
                path: newurl
            }, '', newurl);
        }
    }

    function whenKey(e, classToQuery) { // Logic for keypresses on items
        var code = e.keyCode || e.which;
        if (code === 27 || code === 37 || code === 38 || code === 39 || code === 40) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
        if (code === 13 || code === 32) {
            if (classToQuery !== '.a-colnav-item-third') {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                $(e.target).trigger('mouseup').trigger('focus');
            }
        }
        else if (code === 9 && !$(e.target).hasClass('open')) {
            if (shifted) {
                if ($(e.target).blur().parent().prev().length !== 0) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    $(e.target).blur().parent().prev()
                        .find(classToQuery)
                        .trigger('focus');
                }
            }
            else if ($(e.target).blur().parent().next().length !== 0) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                $(e.target).blur().parent().next()
                    .find(classToQuery)
                    .trigger('focus');
            }
        }
        else if (code === 9 && $(e.target).hasClass('open')) {
            if (shifted) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                $(e.target).blur().parent().parent()
                    .parent()
                    .children('a')
                    .trigger('focus');
            }
            else {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                $(e.target).blur().next().children('li:eq(0)')
                    .children('a')
                    .trigger('focus');
            }
        }
    }

    function whenClick(eventOrElement, alt) { // Logic for clicks on items
        console.log('whenClick');
        console.log(eventOrElement.which);
        if (eventOrElement.which === 3) {
            // Right-click, stop processing the event
            // Ref.: http://api.jquery.com/event.which/
            return;
        }
        // Determine element
        var el = alt === undefined ? $(eventOrElement.target) : eventOrElement;
        var li = el.closest('li').hasClass('is-dropdown-submenu-parent') ? el.closest('li') : el;
        if (li.is('h4')) {
          li = li.parents().eq(1);
        }
        
        // If item holds an actual link, redirect
        if (li.children('a').hasClass('a-js-colnavLinkAlt')) { 
            window.location = li.children('a').prop('href');
            return;
        }
        var text = li.find('h2').length > 0 ? li.find('h2').text() : li.find('h3').text();
        var position = li.find('h2').length > 0 ? li.find('h2').attr(keys.dataId) : li.find('h3').attr(keys.dataId);
        // Iterate through levels
        levels.forEach(function(str, index) {
            var wasStacked;
            if (el.closest('ul').hasClass(str)) { // Check if element exists
                // Check if device is small and level is stacked
                if (isSmall && el.closest('ul').hasClass('stacked')) {
                    // Get name from parent
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
                    el.closest('ul').css('width', calc(1.5, null, index - 1));
                    //el.addClass('open').closest('a').addClass('open');
                    //calc(li.find('.' + levels[index + 1]), 3, index + 1).css('width', calc(1.5, null, index))
                    //    .show();
                }
                // Check if item is already open:
                else if (el.closest('a').hasClass('open') || el.find('a').hasClass('open') ||
                    el.hasClass('open')) {
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
                }
                // If item is not open:
                else {
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
                        var child = index + 1;
                        li.find('.' + levels[index + 1]).removeClass(wasStacked ? '' : 'noTrans')
                            .css('left', '250%').show();
                        open.push(levels[child]);
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
        }
        else {
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

    function attachHandlers(depth) {
        var queryHit = false;
        // (Re)initialize Foundation library logic:
        if ($('.a-colnav').prop('data-dropdown-menu')) {
            pluginInstance.destroy();
            pluginInstance = new Foundation.DropdownMenu($('.a-colnav').eq(0));
        }
        else {
            pluginInstance = new Foundation.DropdownMenu($('.a-colnav').eq(0));
        }
        if ($(keys.colnavWrapper).length > 0) { // Conditional logic for different screen sizes
            if (isSmall) {
                $(keys.colnavWrapper).html($(keys.colnavWrapper).html()
                    .replace(/drilldown/g, 'dropdown'));
                $('.a-colnav').find('a').on('mouseup', function(event) { // Apply action logic
                    if (!movedDuringTouch) {
                        whenClick(event);
                    }
                });
            }
            else {
                $(keys.colnavWrapper)
                    .html($(keys.colnavWrapper).html().replace(/drilldown/g, 'dropdown'))
                    .show().children()
                    .on('mouseup', function(event) { // Apply action logic
                        whenClick(event);
                        return false;
                    });
            }
        }
        $(document).on('keyup keydown', function(e) { // Detect shift key
            shifted = e.shiftKey;
        });
        // Set tabindexes:
        $('.a-colnav-item-second').prop('tabindex', '0');
        $('.a-colnav-item-third').prop('tabindex', '0');
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
            if ($(window).scrollTop() > $(keys.colnavWrapper).offset().top) {
                $('html,body').animate({
                    scrollTop: $(keys.colnavWrapper).offset().top
                }, 300);
            }
        });
        $('.a-colnav-item').prop('tabindex', '0').on('focus', function() {
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
            event.stopPropagation();
            movedDuringTouch = false;
        });
        $('.a-colnav').find('a').on('touchmove', function(event) {
            movedDuringTouch = true;
            event.stopPropagation();
        });
        // Perform depth specific markup changes:
        if (depth === 2) {
            $('.a-colnav').find('.a-colnav-thirdLevel').remove();
            $('.a-colnav').find('.a-js-colnavLink').remove();
            $('.a-colnav').find('.a-leadText').remove();
        }
        else {
            console.log(depth);
            $('.a-colnav').find('.a-colnav-item-second.a-js-colnavLinkAlt').remove();
        }
        // Check if position is included in URL, and navigate to it
        var positionUrlParameterValue = urlQuery('position');
        if (positionUrlParameterValue) { 
            $('.a-colnav').find('a.a-colnav-item').each(function() {
                if ($(this).find('h2').attr(keys.dataId) === positionUrlParameterValue) {
                    queryHit = true;
                    whenClick($(this), true);
                }
            });
            if (currentCategory == category.category) {
                $('.a-colnav').find('a.a-colnav-item-second').each(function() {
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
    }

    function populateNavigation(str, data) {
        var depth = 3; // Assume a depth of three levels
        var markup = []; // Array to store markup
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
                        $(__h4).attr(keys.dataId, __item.Id);
                        $(__span).addClass('a-colnav-rightText').text(__item.Provider || '–')
                            .appendTo($(__a));
                        $(__a).prop('href', __item.Url) 
                            .addClass('a-colnav-item-third')
                            .addClass('a-js-colnavLinkAlt')
                            .appendTo($(__li));
                        level3.push(__li);
                    });
                }
                else {
                    depth = 2;
                }
                $(_h3).text(_item.Heading || _item.Title).appendTo($(_a1));
                $(_h3).attr(keys.dataId, _item.Id);
                $(_h4).text(_item.Heading || _item.Title).appendTo($(_a2));
                $(_h4).attr(keys.dataId, _item.Id);
                $(_a1)
                    // .prop('href', '#')
                    .addClass('a-colnav-item-second').addClass('a-js-colnavLink')
                    .appendTo($(_li));
                $(_a2).prop('href', _item.Url).addClass('a-colnav-item-second')
                    .addClass('a-js-colnavLinkAlt')
                    .appendTo($(_li));
                $(_ul).addClass('a-colnav').addClass('a-colnav-vertical')
                    .addClass('a-colnav-thirdLevel')
                    .append(level3)
                    .appendTo($(_li));
                level2.push(_li);
            });
            $(h2).text(item.Heading).appendTo($(a));
            $(h2).attr(keys.dataId, item.Id);
            $(p).text(item.Description).addClass('a-leadText').appendTo($(a));
            $(a)
                // .prop('href', '#')
                .addClass('a-colnav-item').appendTo($(li));
            $(ul).addClass('a-colnav').addClass('a-colnav-vertical').addClass('a-colnav-secondLevel')
                .append(level2)
                .appendTo($(li));
            markup.push(li);
        });
        $('.a-colnav').html(markup); // Append markup
        hideLoader();
        setTimeout(function() { attachHandlers(depth) }, 0);
    }

    function afterRequest(str, data) { // Populating logic      
        $('.a-colnav').html(''); // Wipe previous markup
        $('.a-colnav').show();
        setTimeout(function() {
            populateNavigation(str, data);
        }, 0);
    };

    function getDrilldownSource(str) {
        console.log('getDrilldownSource called');
        showLoader();
        if (savedResults[str]) { // Get stored results if present
            afterRequest(str, savedResults[str]);
        }
        else {
            var url = endPointUrl + str;
            console.log(url);
            if (window.location.pathname.indexOf('DesignSystem') === 1 ||
                window.location.origin.indexOf('localhost') !== -1 ||
                window.location.origin.indexOf('192.168.10.153') !== -1) {
                url = url + '.json';
            }
            $.ajax({
                type: 'GET',
                url: url,
                success: function(data) {
                    afterRequest(str, data); // Perform populating logic
                }
            });
        }
    }

    function resizedWindow() {
        console.log('resizedWindow called');
        var wasSmall = isSmall;
         // Redefine boolean for determining screen size
        isSmall = $('.a-contentOverview').width() < 900;
        // No change required if the window is still big/small
        if (isSmall == wasSmall) {
            return;
        }
        if (!isSmall) {
            // Perform drilldown logic with currently selected source:
            getDrilldownSource($(keys.toggleInput + keys.checked).data(keys.switchurl));
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
        var resizeTimeout; // Timeout variable for resizing
        window.onresize = function() { // Perform resize logic after resize events
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
        // See if the URL contains the selected category already
        var urlCategory = urlQuery(keys.category);
        console.log(urlCategory);
        // Otherwise chose category/kategori by default
        currentCategory = (urlCategory != null && urlCategory != false) ? urlCategory : category.category;
        var selectedIndex = 1;
        if (currentCategory == category.provider) {
            selectedIndex = 2;
        }
        var dataSource = 'get' + currentCategory;
        $(keys.toggleInput).prop('checked', false);
        // Maybe not so robust to use the id, but it's the only way we have to
        // identify each checkbox at this point
        $('#atom-switch-cb' + selectedIndex).prop('checked', true);
        getDrilldownSource(dataSource);
    }

    $(document).ready(function() {
        endPointUrl = $(keys.toggleInput).parents().eq(3).data('switchendpoint');
        if ($('.a-colnav').length > 0) { // Check if drilldown markup is present
            if (isSmall) { // Small screen specific style (can be moved to stylesheet)
                $('.a-contentOverview').css('overflow-x', 'hidden');
            }
            loadDrillDownSource();
            performResizeLogicAfterResizeEvents();
            setSwitchUrlAttribute();
            detectSelectedSourceChange();
            $('body').on('click', onBodyClick);
        }
    });
};