/* globals $ */
var genericSearch = function() {
  var dimensions;
  var dataSource;
  var $container;
  var $altContainer;
  var $genericSearch;
  var base;
  var page = 1;
  var legend;
  var loader;
  var empty;
  var inputBy;
  var selection = [];
  var currentFilter = '';
  var dataList;

  var keys = {
    showResultsButtonClass: '.a-js-expandResults',
    tagFilterSectionClass: '.a-card-filter'
  };

  var grinder = function(item) {
    var i;
    var j;
    var itemDimension;
    var isMatch = false;

    for (i = 0; i < dimensions.length; i += 1) {
      for (j = 0; j < item[dimensions[i].name].length; j += 1) {
        itemDimension = item[dimensions[i].name][j];
        if (selection.includes('d' + (i + 1) + '-' + itemDimension)) {
          isMatch = true;
          break;
        }
      }
    }

    return isMatch;
  };

  function tags() {
    return $(keys.tagFilterSectionClass).find('input[type="checkbox"].sr-only');
  }

  function selectedTags() {
    return $(keys.tagFilterSectionClass).find('input[type="checkbox"]:checked.sr-only');
  }

  function loadMoreButton() {
    return $container.next().next();
  }

  function urlFilterPrefix(id) {
    return id.replace('filterDim1ID', 'd1-').replace('filterDim2ID', 'd2-');
  }

  // TODO: This method is copied from colnavCustom.js, should be put in a common
  // module
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

  function setHistoryState() {
    var newurl = window.location.pathname;
    var urlQueryString = '?filter=';
    if (selection.length > 0) {
      urlQueryString += selection.join(',');
      newurl += urlQueryString;
    }
    if (history.replaceState) {
      window.history.replaceState({
        path: newurl
      }, '', newurl);
    }
  }

  function getUrlFilter() {
    if (urlQuery('filter')) {
      currentFilter = urlQuery('filter');
    }
  }

  function setContainerVisibility() {
    if (dimensions[1].isSelected) {
      $container.hide();
      $altContainer.show();
    } else {
      $container.show();
      $altContainer.hide();
    }
  }

  function renderPaginatedResults(data) {
    var aboveCount;
    var belowCount;
    aboveCount = 0;
    belowCount = 0;
    page += 1;
    $container.find('.a-js-result').hide();
    $altContainer.find('.a-js-result').hide();
    dataList.filter(grinder).forEach(function(item, index) {
      $('#' + item.id)[index < 20 * page ? 'show' : 'hide']();
      if (item.isAbove) {
        aboveCount += 1;
        $('#' + item.altId)[aboveCount < 20 * page ? 'show' : 'hide']();
      }
    });
    dataList.filter(grinder).forEach(function(item, index) {
      if (item.isBelow) {
        belowCount += 1;
        $('#' + item.altId)[
          aboveCount < (20 * page) && belowCount < ((20 * page) - aboveCount) ? 'show' : 'hide'
        ]();
      }
    });
    setTimeout(function() {
      $('.a-js-extraHeading')[
        $('.a-js-underneath').is(':visible') ? 'show' : 'hide']();
    }, 1);
    loadMoreButton()[dataList.filter(grinder).length < 20 * page ? 'hide' : 'show']();
    setContainerVisibility();
  }

  function showResults() {
    var $showResultsButton = $(keys.showResultsButtonClass);
    if ($showResultsButton.length > 0) {
      $showResultsButton.removeAttr('disabled');
      $('.a-js-results').addClass('a-js-forceHidden');
      $('.a-js-alternativeResults').addClass('a-js-forceHidden');
      $('.a-js-moreResults').addClass('a-js-forceHidden');
      $showResultsButton.show();
    }
  }

  function getSelection() {
    var id;
    var idPattern = /d(\d+)-.*/;
    var match;
    var dimension;
    var dimensionIndex;
    var index;

    selection = [];
    for (index = 0; index < dimensions.length; index += 1) {
      dimension = dimensions[index];
      dimension.isSelected = false;
      dimension.selectedCount = 0;
    }
    selectedTags().each(function() {
      id = urlFilterPrefix($(this).attr('name'));
      match = idPattern.exec(id);
      if (match != null && match.length > 1) {
        dimensionIndex = match[1] - 1;
        dimensions[dimensionIndex].isSelected = true;
        dimensions[dimensionIndex].selectedCount += 1;
      }
      selection.push(id);
    });
  }

  function onTagChecked() {
    var aboveCount = 0;
    var belowCount = 0;
    var filteredList = [];

    showResults();
    page = 1;
    $('.a-js-none').show().prev().hide();
    $container.find('.a-js-result').hide();
    $altContainer.find('.a-js-result').hide();
    getSelection();
    setHistoryState();
    dimensions.forEach(function(dimension, index) {
      $('.a-js-filterDim' + (index + 1))
        .find('.a-js-none')
        .hide()
        .prev()
        .show()
        .find('.badge')
        .html(dimension.selectedCount);
      if ($('.a-js-filterDim' + (index + 1)).find('.a-js-plural')) {
        $('.a-js-filterDim' + (index + 1))
          .find('.a-js-plural')[dimension.selectedCount > 1 ? 'show' : 'hide']();
      }
      if ($('.a-js-filterDim' + (index + 1)).find('.a-js-singular')) {
        $('.a-js-filterDim' + (index + 1))
          .find('.a-js-singular')[dimension.selectedCount === 1 ? 'hide' : 'show']();
      }
    });
    filteredList = dataList.filter(grinder);
    filteredList.forEach(function(item, index) {
      $('#' + item.id)[index < 20 ? 'show' : 'hide']();
      if (item.isAbove) {
        aboveCount += 1;
        $('#' + item.altId)[aboveCount < 20 ? 'show' : 'hide']();
      }
    });
    filteredList.forEach(function(item, index) {
      if (item.isBelow) {
        belowCount += 1;
        $('#' + item.altId)[
          aboveCount < 20 && belowCount < (20 - aboveCount) ? 'show' : 'hide']();
      }
    });
    setTimeout(function() {
      $('.a-js-extraHeading')[
        $('.a-js-underneath').is(':visible') ? 'show' : 'hide']();
    }, 1);
    loadMoreButton()[filteredList.length < 20 ? 'hide' : 'show']();
    empty[filteredList.length === 0 ? 'show' : 'hide']();
    setContainerVisibility();
  }

  function appendExtraContentHeading() {
    $altContainer.append('<span class="a-js-top"></span>');
    $altContainer.append($altContainer.attr('data-extraresultsheading'));
    $altContainer.append('<span class="a-js-bottom"></span>');
  }

  function buildResultsList(mappedKeys) {
    var extraCssClass = '';
    dataList.forEach(function(item, index) {
      dataList[index].id = 'result-' + index;
      dataList[index].altId = 'altResult-' + index;
      $container.append(
        base.replace('%NAME%', item[mappedKeys.NAME]).replace(/%URL%/g, item[mappedKeys.URL])
          .replace('%DESC%', item[mappedKeys.DESC] || 'Ingen beskrivelse.')
          .replace('%IDENTIFIER%', 'result-' + index)
          .replace('a-linkArticle', 'a-linkArticle a-js-result'));
      if (item.Industries.length !== 0) {
        extraCssClass = '';
        dataList[index].isAbove = true;
      } else {
        dataList[index].isBelow = true;
        extraCssClass = ' a-js-underneath';
      }
      $altContainer.find('.a-js-extraHeading').before(
        base.replace('%NAME%', item[mappedKeys.NAME]).replace(/%URL%/g, item[mappedKeys.URL])
          .replace('%DESC%', item[mappedKeys.DESC] || 'Ingen beskrivelse.')
          .replace('%IDENTIFIER%', 'altResult-' + index)
          .replace('a-linkArticle', 'a-linkArticle a-js-result' + extraCssClass));
    });
    $container.find('.a-js-result').each(function(index, item) {
      $(this)[index < 20 * page ? 'show' : 'hide']();
    });
    loadMoreButton().show();
    $altContainer.hide();
  }

  function buildTagsAndDimensions(data) {
    var lastKeypress;
    var iterate;
    var mappedKeys = {};
    var dimensionNames;
    var dimensionAliases;
    var dimensionIndex;
    var parts;
    var i;

    dimensions = [];
    dimensionNames = $('.a-js-genericSearch').attr('data-dimensions').split(',');
    dimensionAliases = $('.a-js-genericSearch').attr('data-dimensionsaliases').split(',');
    for (i = 0; i < dimensionNames.length; i += 1) {
      dimensions.push({
        name: dimensionNames[i],
        alias: dimensionAliases[i],
        isSelected: false,
        selectedCount: 0
      });
    }

    $('.a-js-genericSearch').attr('data-mappedkeys').split(',').forEach(function(pair) {
      parts = pair.split('=');
      mappedKeys[parts[0]] = parts[1];
    });

    dimensions.forEach(function(dimension, index) {
      var hasNote = $('.a-js-filterDim' + (index + 1)).find('.d-block').length > 0;
      var where = data[dimension + 'List'] ?
        data[dimension + 'List'] : data[dimensions[index].alias + 'List'];
      where.forEach(function(item) {
        var $tag = $('<div class="a-switch">' +
          $('.a-js-filterDim' + (index + 1)).find('.a-switch').eq(0).html()
            .replace(/%ID%/g, item[mappedKeys.ID])
            .replace('%TITLE%', item[mappedKeys.TITLE]) + '</div>');
        var $input = $tag.find('input[type="checkbox"]');
        var tagId = urlFilterPrefix($input.attr('id'));
        if (currentFilter.indexOf(tagId) !== -1) {
          $input.attr('checked', true);
        }
        $('.a-js-filterDim' + (index + 1))
          .find(hasNote ? '.d-block' : '.text-sm-center')[hasNote ? 'before' : 'append']($tag);
      });
      $('.a-js-filterDim' + (index + 1)).find('.a-switch').eq(0).hide();
    });
    appendExtraContentHeading();
    // Give the browser time to update the UI
    setTimeout(function() {
      buildResultsList(mappedKeys);
    }, 0);
    tags().on('change', function() {
      onTagChecked();
    });
  }

  function afterRequest(data, paginating) {
    var lastKeypress;
    var iterate;

    if (inputBy === 'filter') {
      // Do we need to sort the results?
      dataList = data.SubsidiesList; // .sort(dynamicSort('SubsidyName'));
    }
    $('.a-js-genericSearch').next().find(keys.tagFilterSectionClass).show();
    $container.show();
    if ($altContainer) {
      $altContainer.show();
    }
    if (inputBy === 'search') {
      $('.a-js-genericSearch').find('form').on('keyup keypress', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
          e.preventDefault();
          return false;
        }
        return true;
      });
      $('.a-js-genericSearch').find('form').find('input[type=search]')
        .on('keypress', function() {
          lastKeypress = new Date().getTime();
          iterate = true;
          loader.show();
          legend.hide();
          empty.hide();
          $container.html('');
        }
      );
      setInterval(function() {
        var value = $('.a-js-genericSearch').find('form').find('input[type=search]')
          .val();
        var query = value !== undefined ? value.toLowerCase() : '';
        if (query.length > 0 && (new Date().getTime() - lastKeypress > 1500) && iterate) {
          iterate = false;
          data.items.forEach(function(item) {
            if (item.name.toLowerCase().indexOf(query) !== -1 ||
              item.parent.toLowerCase().indexOf(query) !== -1) {
              $container[item.name.toLowerCase().indexOf(query) !== -1 ? 'prepend' : 'append'](
                base.replace('%NAME%', item.name).replace('%PARENT%', item.parent)
                  .replace(/%URL%/g, item.url).replace('../..', '')
              );
            }
          });
          loader.hide();
          empty[$container.html() === '' ? 'show' : 'hide']();
          legend[$container.html() === '' ? 'hide' : 'show']();
        }
      }, 2000);
    } else if (paginating) {
      renderPaginatedResults(data);
    } else {
      buildTagsAndDimensions(data);
    }

    loadMoreButton().on('click', function() {
      afterRequest(data, true);
    });
    loader.hide();
  }

  function onSuccess(data) {
    afterRequest(data, false);
  }

  function onSecondError() {
    $.getJSON(dataSource[2] + '/' + $('html').attr('lang'), onSuccess);
  }

  function onError() {
    $.ajax({
      type: 'GET', url: dataSource[1] + '/' + $('html').attr('lang'), success: onSuccess, error: onSecondError
    });
  }

  if ($('.a-js-genericSearch').length > 0) {
    getUrlFilter();
    dataSource = $('.a-js-genericSearch').attr('data-source').split(',');

    if ($(keys.showResultsButtonClass).length > 0) {
      $('.a-js-results').addClass('a-js-forceHidden');
      $('.a-js-alternativeResults').addClass('a-js-forceHidden');
      $('.a-js-moreResults').addClass('a-js-forceHidden');
      $(keys.showResultsButtonClass).attr('disabled', 'disabled');
      $(keys.showResultsButtonClass).on('click', function() {
        $('.a-collapse-title').not('.collapsed').click();
        $('.a-js-results').removeClass('a-js-forceHidden');
        $('.a-js-alternativeResults').removeClass('a-js-forceHidden');
        $('.a-js-moreResults').removeClass('a-js-forceHidden');
        $(keys.showResultsButtonClass).hide();
        $('body').scrollTop($('.a-js-filterDim1').offset().top - 12);
      });
    }
    $('.a-js-none').show().prev().hide();
    inputBy = $('.a-js-genericSearch').find('input[type=search]').length > 0 ? 'search' : 'filter';
    if (inputBy === 'search') {
      $container = $('.a-js-genericSearch').find('.a-list');
      $altContainer = null;
    } else {
      $container = $('.a-js-genericSearch').next().find('.a-js-results');
      $altContainer = $('.a-js-genericSearch').next().find('.a-js-alternativeResults');
    }
    $container.find('li:gt(0)').remove();
    $container.find('.a-js-result:gt(0)').remove();
    base = $container.html();
    $container.html('');
    $genericSearch = $('.a-js-genericSearch');
    if (inputBy !== 'search') {
      $genericSearch = $genericSearch.next();
    }
    legend = $genericSearch.find('.a-legend');
    loader = $genericSearch.find('.a-loader');
    empty = $genericSearch.find('.a-js-noResults');
    empty.hide();
    legend.hide();
    if ($altContainer) {
      $altContainer.html('');
    }

    // Give the browser time to update the UI
    setTimeout(function() {
      var dataUrl = dataSource[0];
      // dataUrl = '/data/getsubsidy.json';
      $.ajax({ type: 'GET', url: dataUrl, success: onSuccess, error: onError });
    }, 0);
  }
};
