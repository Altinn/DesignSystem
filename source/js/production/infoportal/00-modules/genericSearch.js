/* globals $ */
var genericSearch = function() {
  var dimensions;
  var dimensionsAliases;
  var dataSource;
  var container;
  var altContainer;
  var base;
  var afterRequest;
  var page = 1;
  var legend;
  var loader;
  var empty;
  var inputBy;
  var selected = {};
  var onSuccess = function(data) {
    afterRequest(data, false);
  };
  var onSecondError = function() {
    $.getJSON(dataSource[2] + '/' + $('html').attr('lang'), onSuccess);
  };
  var onError = function() {
    $.ajax({
      type: 'GET', url: dataSource[1] + '/' + $('html').attr('lang'), success: onSuccess, error: onSecondError
    });
  };
  var match = function(arr1, arr2, allowEmpty) {
    var count = 0;
    if (arr2.length === 0 && allowEmpty) {
      return true;
    }
    arr1.forEach(function(item) {
      count += arr2.indexOf(parseInt(item, 10)) !== -1 ? 1 : 0;
    });
    return count > 0;
  };
  var dynamicSort = function(property) {
    return function(a, b) {
      if (a[property] < b[property]) {
        return -1;
      } else if (a[property] > b[property]) {
        return 1;
      }
      return 0;
    };
  };
  var grinder = function(item) {
    if (selected[dimensions[0]].length === 0 && selected[dimensions[1]].length === 0) {
      return true;
    }
    if (selected[dimensions[0]].length > 0 && selected[dimensions[1]].length > 0) {
      return (
        match(selected[dimensions[0]], item[dimensions[0]]) &&
        match(selected[dimensions[1]], item[dimensions[1]], true));
    }
    if (selected[dimensions[0]].length > 0) {
      if (selected[dimensions[1]].length === 0) {
        return (
          match(selected[dimensions[0]], item[dimensions[0]])
        );
      }
      return (
        match(selected[dimensions[0]], item[dimensions[0]]) &&
        match(selected[dimensions[1]], item[dimensions[1]], true)
      );
    }
    return (
      match(selected[dimensions[0]], item[dimensions[0]]) ||
      match(selected[dimensions[1]], item[dimensions[1]], true)
    );
  };
  if ($('.a-js-genericSearch').length > 0) {
    if ($('.a-js-expandResults').length > 0) {
      $('.a-js-results').addClass('a-js-forceHidden');
      $('.a-js-alternativeResults').addClass('a-js-forceHidden');
      $('.a-js-moreResults').addClass('a-js-forceHidden');
      $('.a-js-expandResults').attr('disabled', 'disabled');
      $('.a-js-expandResults').on('click', function() {
        $('.a-collapse-title').not('.collapsed').click();
        $('.a-js-results').removeClass('a-js-forceHidden');
        $('.a-js-alternativeResults').removeClass('a-js-forceHidden');
        $('.a-js-moreResults').removeClass('a-js-forceHidden');
        $('.a-js-expandResults').hide();
        $('body').scrollTop($('.a-js-filterDim1').offset().top - 12);
      });
    }
    $('.a-js-none').show().prev().hide();
    inputBy = $('.a-js-genericSearch').find('input[type=search]').length > 0 ? 'search' : 'filter';
    container = inputBy === 'search' ?
      $('.a-js-genericSearch').find('.a-list') : $('.a-js-genericSearch').next().find('.a-js-results');
    altContainer = inputBy === 'search' ?
      null : $('.a-js-genericSearch').next().find('.a-js-alternativeResults');
    container.find('li:gt(0)').remove();
    container.find('.a-js-result:gt(0)').remove();
    base = container.html();
    container.html('');
    legend = inputBy === 'search' ?
      $('.a-js-genericSearch').find('.a-legend') :
      $('.a-js-genericSearch').next().find('.a-legend');
    loader = inputBy === 'search' ?
      $('.a-js-genericSearch').find('.a-loader') :
      $('.a-js-genericSearch').next().find('.a-loader');
    empty = inputBy === 'search' ?
      $('.a-js-genericSearch').find('.a-js-noResults') :
      $('.a-js-genericSearch').next().find('.a-js-noResults');
    loader.hide();
    empty.hide();
    legend.hide();
    if (altContainer) {
      altContainer.html('');
    }
    dataSource = $('.a-js-genericSearch').attr('data-source').split(',');
    afterRequest = function(data, paginating) {
      var lastKeypress;
      var iterate;
      var count = 0;
      var mappedKeys = {};
      var aboveCount;
      var belowCount;
      var newList;
      if (inputBy === 'filter') {
        newList = data.SubsidiesList.sort(dynamicSort('SubsidyName'));
      }
      loader.hide();
      $('.a-js-genericSearch').next().find('.a-card-filter').show();
      container.show();
      if (altContainer) {
        altContainer.show();
      }
      if (inputBy === 'search') {
        loader.hide();
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
            container.html('');
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
                container[item.name.toLowerCase().indexOf(query) !== -1 ? 'prepend' : 'append'](
                  base.replace('%NAME%', item.name).replace('%PARENT%', item.parent)
                    .replace(/%URL%/g, item.url).replace('../..', '')
                );
              }
            });
            loader.hide();
            empty[container.html() === '' ? 'show' : 'hide']();
            legend[container.html() === '' ? 'hide' : 'show']();
          }
        }, 2000);
      } else if (paginating) {
        aboveCount = 0;
        belowCount = 0;
        page += 1;
        container.find('.a-js-result').hide();
        altContainer.find('.a-js-result').hide();
        newList.filter(grinder).forEach(function(item, index) {
          $('#' + item.id)[index < 20 * page ? 'show' : 'hide']();
          if (item.isAbove) {
            aboveCount += 1;
            $('#' + item.altId)[aboveCount < 20 * page ? 'show' : 'hide']();
          }
        });
        newList.filter(grinder).forEach(function(item, index) {
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
        container.next().next()[newList.filter(grinder).length < 20 * page ? 'hide' : 'show']();
        if (selected[dimensions[1]].length > 0) {
          container.hide();
          altContainer.show();
        } else {
          container.show();
          altContainer.hide();
        }
      } else {
        dimensions = $('.a-js-genericSearch').attr('data-dimensions').split(',');
        dimensionsAliases = $('.a-js-genericSearch').attr('data-dimensionsaliases').split(',');
        selected[dimensions[0]] = [];
        selected[dimensions[1]] = [];
        $('.a-js-genericSearch').attr('data-mappedkeys').split(',').forEach(function(pair) {
          mappedKeys[pair.split('=')[0]] = pair.split('=')[1];
        });
        container.next().next().on('click', function() {
          afterRequest(data, true);
        });
        dimensions.forEach(function(dimension, index) {
          var hasNote = $('.a-js-filterDim' + (index + 1)).find('.d-block').length > 0;
          var where = data[dimension + 'List'] ?
            data[dimension + 'List'] : data[dimensionsAliases[index] + 'List'];
          where.reverse().forEach(function(item) {
            $('.a-js-filterDim' + (index + 1))
              .find(hasNote ? '.d-block' : '.text-sm-center')[hasNote ? 'before' : 'append'](
              '<div class="a-switch">' +
              $('.a-js-filterDim' + (index + 1)).find('.a-switch').eq(0).html()
                .replace(/%ID%/g, item[mappedKeys.ID])
                .replace('%TITLE%', item[mappedKeys.TITLE]) + '</div>'
            );
          });
          $('.a-js-filterDim' + (index + 1)).find('.a-switch').eq(0).hide();
        });
        altContainer.append('<span class="a-js-top"></span>');
        altContainer.append(altContainer.attr('data-extraresultsheading'));
        altContainer.append('<span class="a-js-bottom"></span>');
        newList.forEach(function(item, index) {
          newList[index].id = 'result-' + index;
          newList[index].altId = 'altResult-' + index;
          container.append(
            base.replace('%NAME%', item[mappedKeys.NAME]).replace(/%URL%/g, item[mappedKeys.URL])
              .replace('%DESC%', item[mappedKeys.DESC] || 'Ingen beskrivelse.')
              .replace('%IDENTIFIER%', 'result-' + index)
              .replace('a-linkArticle', 'a-linkArticle a-js-result'));
          if (item.Industries.length !== 0) {
            newList[index].isAbove = true;
            altContainer.find('.a-js-extraHeading').before(
              base.replace('%NAME%', item[mappedKeys.NAME]).replace(/%URL%/g, item[mappedKeys.URL])
                .replace('%DESC%', item[mappedKeys.DESC] || 'Ingen beskrivelse.')
                .replace('%IDENTIFIER%', 'altResult-' + index)
                .replace('a-linkArticle', 'a-linkArticle a-js-result'));
          } else {
            newList[index].isBelow = true;
            altContainer.find('.a-js-bottom').before(
              base.replace('%NAME%', item[mappedKeys.NAME]).replace(/%URL%/g, item[mappedKeys.URL])
                .replace('%DESC%', item[mappedKeys.DESC] || 'Ingen beskrivelse.')
                .replace('%IDENTIFIER%', 'altResult-' + index)
                .replace('a-linkArticle', 'a-linkArticle a-js-result a-js-underneath'));
          }
        });
        container.find('.a-js-result').each(function(index, item) {
          $(this)[index < 20 * page ? 'show' : 'hide']();
        });
        container.next().next().show();
        altContainer.hide();
        $('.a-card-filter').find('input[type=checkbox]').on('change', function() {
          if ($('.a-js-expandResults').length > 0) {
            $('.a-js-expandResults').removeAttr('disabled');
            $('.a-js-results').addClass('a-js-forceHidden');
            $('.a-js-alternativeResults').addClass('a-js-forceHidden');
            $('.a-js-moreResults').addClass('a-js-forceHidden');
            $('.a-js-expandResults').show();
          }
          aboveCount = 0;
          belowCount = 0;
          page = 1;
          $('.a-js-none').show().prev().hide();
          container.find('.a-js-result').hide();
          altContainer.find('.a-js-result').hide();
          dimensions.forEach(function(dimension, index) {
            selected[dimension] = [];
            $('.a-js-filterDim' + (index + 1)).find('input[type=checkbox]:checked').each(
              function(_index) {
                selected[dimension].push($(this).attr('id')
                  .replace('filterDim' + (index + 1) + 'ID', ''));
                $('.a-js-filterDim' + (index + 1)).find('.a-js-none').hide().prev()
                  .show()
                  .find('.badge')
                  .html(_index + 1);
              }
            );
            if ($('.a-js-filterDim' + (index + 1)).find('.a-js-plural')) {
              $('.a-js-filterDim' + (index + 1))
                .find('.a-js-plural')[selected[dimension].length > 1 ? 'show' : 'hide']();
            }
            if ($('.a-js-filterDim' + (index + 1)).find('.a-js-singular')) {
              $('.a-js-filterDim' + (index + 1))
                .find('.a-js-singular')[selected[dimension].length > 1 ? 'hide' : 'show']();
            }
          });
          newList.filter(grinder).forEach(function(item, index) {
            $('#' + item.id)[index < 20 ? 'show' : 'hide']();
            if (item.isAbove) {
              aboveCount += 1;
              $('#' + item.altId)[aboveCount < 20 ? 'show' : 'hide']();
            }
          });
          newList.filter(grinder).forEach(function(item, index) {
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
          container.next().next()[newList.filter(grinder).length < 20 ? 'hide' : 'show']();
          empty[newList.filter(grinder).length === 0 ? 'show' : 'hide']();
          if (selected[dimensions[1]].length > 0) {
            container.hide();
            altContainer.show();
          } else {
            container.show();
            altContainer.hide();
          }
        });
      }
    };
    $.ajax({ type: 'GET', url: dataSource[0] + '/' + $('html').attr('lang'), success: onSuccess, error: onError });
  }
};
