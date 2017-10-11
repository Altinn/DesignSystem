/* globals $ */
var genericSearch = function() {
  var dimensions;
  var base;
  var page = 0;
  var articlesPerPage = 20;
  var inputBy;
  var selection = [];
  var dataList;
  var elements = {};

  var keys = {
    forceHiddenClass: 'a-js-forceHidden',
    genericSearchSelector: '.a-js-genericSearch',
    showResultsButtonSelector: '.a-js-expandResults',
    tagFilterSectionSelector: '.a-card-filter',
    generalArticleSelector: 'a-js-underneath'
  };

  function grinder(item) {
    var i;
    var j;
    var itemDimension;
    var isMatch = false;
    var itemDimensionsCount = 0;

    for (i = 0; i < dimensions.length; i += 1) {
      itemDimensionsCount += item[dimensions[i].name].length;
      for (j = 0; j < item[dimensions[i].name].length; j += 1) {
        itemDimension = item[dimensions[i].name][j];
        if (selection.includes('d' + (i + 1) + '-' + itemDimension)) {
          isMatch = true;
          break;
        }
      }
    }

    // General item
    if (itemDimensionsCount === 0) {
      isMatch = true;
    }

    return isMatch;
  }

  function tags() {
    return $(keys.tagFilterSectionSelector).find('input[type="checkbox"].sr-only');
  }

  function selectedTags() {
    return $(keys.tagFilterSectionSelector).find('input[type="checkbox"]:checked.sr-only');
  }

  function urlFilterPrefix(id) {
    return id.replace('filterDim1ID', 'd1-').replace('filterDim2ID', 'd2-');
  }

  function resetPage() {
    page = 1;
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

  function getDataSource(index) {
    var dataSources = $(keys.genericSearchSelector).attr('data-source').split(',');
    var dataUrl = dataSources[index] + '/' + $('html').attr('lang');

    return dataUrl;
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

  function userHasSelectedTags() {
    return selection.length > 0;
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
      selection = urlQuery('filter').split(',');
    }
  }

  function hideContainers() {
    elements.$container.hide();
    elements.$altContainer.hide();
  }

  function showContainers() {
    if (dimensions[1].isSelected) {
      elements.$container.hide();
      elements.$altContainer.show();
      elements.$altContainer.removeClass(keys.forceHiddenClass);
    } else {
      elements.$container.show();
      elements.$container.removeClass(keys.forceHiddenClass);
      elements.$altContainer.hide();
    }
  }

  function setElementsVisibility(filteredList) {
    if (userHasSelectedTags()) {
      elements.$loadMoreButton[filteredList.length <= articlesPerPage * page ? 'hide' : 'show']();
      elements.$noResultsMessage[filteredList.length === 0 ? 'show' : 'hide']();
      elements.$showResultsButton.removeAttr('disabled');
      elements.$showResultsButton.removeClass(keys.forceHiddenClass);
      elements.$showResultsButton.show();
    } else {
      elements.$showResultsButton.hide();
    }
  }

  function showResults() {
    $('.a-collapse-title').not('.collapsed').click();
    elements.$container.removeClass(keys.forceHiddenClass);
    elements.$altContainer.removeClass(keys.forceHiddenClass);
    elements.$loadMoreButton.removeClass(keys.forceHiddenClass);
    elements.$showResultsButton.hide();
    showContainers();
    $('body').scrollTop($('.a-js-filterDim1').offset().top - 12);
  }

  function setDimenstionLabels() {
    var $dimensionSectionContainer = null;
    var $noSelectionLabel = null;
    var $selectionLabel = null;

    dimensions.forEach(function(dimension, index) {
      $dimensionSectionContainer = $('.a-js-filterDim' + (index + 1));
      $noSelectionLabel = $dimensionSectionContainer.find('.a-js-none');
      $selectionLabel = $noSelectionLabel.prev();
      $selectionLabel.find('.badge').html(dimension.selectedCount);
      switch (dimension.selectedCount) {
      case 0:
        $noSelectionLabel.show();
        $selectionLabel.hide();
        break;
      case 1:
        $noSelectionLabel.hide();
        $selectionLabel.show();
        break;
      default:
        $noSelectionLabel.hide();
        $selectionLabel.show();
        break;
      }
    });
  }

  function hideResultItems() {
    elements.$container.find('.a-js-result').hide();
    elements.$altContainer.find('.a-js-result').hide();
  }

  function setAboveItemsVisibility(filteredList, maxNumberOfItemsToDisplay) {
    var aboveCount = 0;
    var i = 0;
    var item;

    while (i < filteredList.length && aboveCount < maxNumberOfItemsToDisplay) {
      item = filteredList[i];
      $('#' + item.id).show();
      if (item.isAbove) {
        $('#' + item.altId).show();
        aboveCount += 1;
      }
      i += 1;
    }

    return aboveCount;
  }

  function setBelowItemsVisibility(filteredList, maxNumberOfItemsToDisplay) {
    var showExtraHeading = false;
    var belowCount = 0;
    var i = 0;
    var item;
    var $altItem = null;

    while (i < filteredList.length
      && belowCount < maxNumberOfItemsToDisplay) {
      item = filteredList[i];
      if (!item.isAbove) {
        $altItem = $('#' + item.altId);
        if ($altItem.hasClass(keys.generalArticleSelector)) {
          showExtraHeading = true;
        }
        $altItem.show();
        belowCount += 1;
      }
      i += 1;
    }

    return showExtraHeading;
  }

  function filterArticles() {
    var aboveCount = 0;
    var filteredList = [];
    var showExtraHeading;
    var maxNumberOfItemsToDisplay;

    getSelection();
    setHistoryState();
    setDimenstionLabels();
    hideResultItems();
    filteredList = dataList.filter(grinder);
    maxNumberOfItemsToDisplay = articlesPerPage * page;

    aboveCount = setAboveItemsVisibility(filteredList, maxNumberOfItemsToDisplay);
    if (aboveCount < maxNumberOfItemsToDisplay) {
      maxNumberOfItemsToDisplay -= aboveCount;
      showExtraHeading = setBelowItemsVisibility(filteredList, maxNumberOfItemsToDisplay);
    }

    if (showExtraHeading) {
      elements.$extraResultsHeading.show();
    } else {
      elements.$extraResultsHeading.hide();
    }

    setElementsVisibility(filteredList);
    hideContainers();
  }

  function appendExtraResultsHeading() {
    elements.$altContainer.append('<span class="a-js-top"></span>');
    elements.$altContainer.append(elements.$altContainer.attr('data-extraresultsheading'));
    elements.$altContainer.append('<span class="a-js-bottom"></span>');
    elements.$extraResultsHeading = $('.a-js-extraHeading');
  }

  function createResultElement(template, name, url, description, id, cssClasses) {
    return template.replace('%NAME%', name)
      .replace(/%URL%/g, url)
      .replace('%DESC%', description || 'Ingen beskrivelse.')
      .replace('%IDENTIFIER%', id)
      .replace('a-linkArticle', cssClasses);
  }

  function buildResultsList(mappedKeys) {
    var element;
    var name;
    var url;
    var description;
    var id;
    var cssClasses;

    dataList.forEach(function(item, index) {
      dataList[index].id = 'result-' + index;
      dataList[index].altId = 'altResult-' + index;
      if (item.Purposes.length !== 0 || item.Industries.length !== 0) {
        dataList[index].isAbove = true;
      } else {
        dataList[index].isAbove = false;
      }
      name = item[mappedKeys.NAME];
      url = item[mappedKeys.URL];
      description = item[mappedKeys.DESC] || 'Ingen beskrivelse.';
      id = 'result-' + index;
      cssClasses = 'a-linkArticle a-js-result';
      element = createResultElement(base, name, url, description, id, cssClasses);
      elements.$container.append(element);

      id = 'altResult-' + index;
      if (dataList[index].isAbove) {
        element = createResultElement(base, name, url, description, id, cssClasses);
        elements.$extraResultsHeading.before(element);
      } else {
        cssClasses = 'a-linkArticle a-js-result ' + keys.generalArticleSelector;
        element = createResultElement(base, name, url, description, id, cssClasses);
        elements.$altContainer.append(element);
      }
    });
    elements.$container.find('.a-js-result').each(function(index, item) {
      $(this)[index < articlesPerPage * page ? 'show' : 'hide']();
    });
    resetPage();
    elements.$loader.hide();
    filterArticles();
  }

  function toggleTag() {
    resetPage();
    filterArticles();
  }

  function getDimensionNames() {
    var dimensionNames;
    var dimensionAliases;
    var dimensionIndex;
    var parts;
    var i;

    dimensions = [];
    dimensionNames = $(keys.genericSearchSelector).attr('data-dimensions').split(',');
    dimensionAliases = $(keys.genericSearchSelector).attr('data-dimensionsaliases').split(',');
    for (i = 0; i < dimensionNames.length; i += 1) {
      dimensions.push({
        name: dimensionNames[i],
        alias: dimensionAliases[i],
        isSelected: false,
        selectedCount: 0
      });
    }
  }

  function getMappedKeys() {
    var mappedKeys = {};
    var parts;

    $(keys.genericSearchSelector).attr('data-mappedkeys').split(',').forEach(function(pair) {
      parts = pair.split('=');
      mappedKeys[parts[0]] = parts[1];
    });

    return mappedKeys;
  }

  function buildTagsAndDimensions(data) {
    var lastKeypress;
    var iterate;
    var mappedKeys;

    getDimensionNames();
    mappedKeys = getMappedKeys();

    dimensions.forEach(function(dimension, index) {
      var hasNote = $('.a-js-filterDim' + (index + 1)).find('.d-block').length > 0;
      var where = data[dimension.name + 'List'] ?
        data[dimension.name + 'List'] : data[dimensions[index].alias + 'List'];
      where.forEach(function(item) {
        var $tag = $('<div class="a-switch">' +
          $('.a-js-filterDim' + (index + 1)).find('.a-switch').eq(0).html()
            .replace(/%ID%/g, item[mappedKeys.ID])
            .replace('%TITLE%', item[mappedKeys.TITLE]) + '</div>');
        var $input = $tag.find('input[type="checkbox"]');
        var tagId = urlFilterPrefix($input.attr('id'));
        if (selection.includes(tagId)) {
          $input.attr('checked', true);
        }
        $('.a-js-filterDim' + (index + 1))
          .find(hasNote ? '.d-block' : '.text-sm-center')[hasNote ? 'before' : 'append']($tag);
      });
      $('.a-js-filterDim' + (index + 1)).find('.a-switch').eq(0).hide();
    });
    tags().on('change', toggleTag);
    // Give the browser time to update the UI
    setTimeout(function() {
      buildResultsList(mappedKeys);
    }, 0);
  }

  function processData(data) {
    var lastKeypress;
    var iterate;

    if (inputBy === 'filter') {
      // We keep the order the in the data sent by the server
      dataList = data.SubsidiesList;
    }
    $(keys.genericSearchSelector).next().find(keys.tagFilterSectionSelector).show();
    if (inputBy === 'search') {
      $(keys.genericSearchSelector).find('form').on('keyup keypress', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
          e.preventDefault();
          return false;
        }
        return true;
      });
      $(keys.genericSearchSelector).find('form').find('input[type=search]')
        .on('keypress', function() {
          lastKeypress = new Date().getTime();
          iterate = true;
          elements.$loader.show();
          elements.$legend.hide();
          elements.$noResultsMessage.hide();
          elements.$container.html('');
        }
      );
      setInterval(function() {
        var value = $(keys.genericSearchSelector).find('form').find('input[type=search]')
          .val();
        var query = value !== undefined ? value.toLowerCase() : '';
        if (query.length > 0 && (new Date().getTime() - lastKeypress > 1500) && iterate) {
          iterate = false;
          data.items.forEach(function(item) {
            if (item.name.toLowerCase().indexOf(query) !== -1 ||
              item.parent.toLowerCase().indexOf(query) !== -1) {
              elements.$container[item.name.toLowerCase().indexOf(query) !== -1 ? 'prepend' : 'append'](
                base.replace('%NAME%', item.name).replace('%PARENT%', item.parent)
                  .replace(/%URL%/g, item.url).replace('../..', '')
              );
            }
          });
          elements.$loader.hide();
          elements.$noResultsMessage[elements.$container.html() === '' ? 'show' : 'hide']();
          elements.$legend[elements.$container.html() === '' ? 'hide' : 'show']();
        }
      }, 2000);
    } else {
      buildTagsAndDimensions(data);
    }
  }

  function onSecondError() {
    $.getJSON(getDataSource(2), processData);
  }

  function onError() {
    $.ajax({
      type: 'GET', url: getDataSource(1), success: processData, error: onSecondError
    });
  }

  function addEventHandlers() {
    elements.$showResultsButton.on('click', showResults);
    elements.$loadMoreButton.on('click', function() {
      page += 1;
      filterArticles();
      showContainers();
    });
  }

  function findElements() {
    if (inputBy === 'search') {
      elements.$container = $(keys.genericSearchSelector).find('.a-list');
      elements.$altContainer = null;
    } else {
      elements.$container = $(keys.genericSearchSelector).next().find('.a-js-results');
      elements.$altContainer = $(keys.genericSearchSelector).next().find('.a-js-alternativeResults');
    }
    base = elements.$container.html();
    elements.$genericSearch = $(keys.genericSearchSelector);
    if (inputBy !== 'search') {
      elements.$genericSearch = elements.$genericSearch.next();
    }
    elements.$legend = elements.$genericSearch.find('.a-legend');
    elements.$loader = elements.$genericSearch.find('.a-loader');
    elements.$noResultsMessage = elements.$genericSearch.find('.a-js-noResults');
    elements.$showResultsButton = $(keys.showResultsButtonSelector);
    elements.$loadMoreButton = $('.a-js-moreResults');
  }

  function initialLayout() {
    elements.$container.find('li:gt(0)').remove();
    elements.$container.find('.a-js-result:gt(0)').remove();
    elements.$container.html('');
    elements.$altContainer.html('');
  }

  function getInputType() {
    inputBy = $(keys.genericSearchSelector).find('input[type=search]').length > 0 ? 'search' : 'filter';
  }

  function getData() {
    var dataUrl = getDataSource(0);
    // This line only for development, do not commit uncommented
    //dataUrl = '/data/getsubsidy.json';
    $.ajax({ type: 'GET', url: dataUrl, success: processData, error: onError });
  }

  if ($(keys.genericSearchSelector).length > 0) {
    getUrlFilter();
    getInputType();
    findElements();
    initialLayout();
    appendExtraResultsHeading();
    addEventHandlers();
    // Give the browser time to update the UI
    setTimeout(getData, 0);
  }
};
