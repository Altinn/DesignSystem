/* globals $ */
var genericSearch = function() {
  var lastKeypress;
  var now;
  var iterate;
  var dataSource;
  var container;
  var base;
  var query;
  var afterRequest;
  var selected = {
    purposes: [], industries: []
  };
  var page = 1;
  var inputType = 'filter';
  var legend = $('.a-js-genericSearch').find('.a-legend');
  var loader = $('.a-js-genericSearch').find('.a-logo-anim');
  var empty = $('.a-js-genericSearch').find('.a-js-noResults');
  var onSuccess = function(data) {
    afterRequest(data, false);
  };
  var onSecondError = function() {
    $.getJSON(dataSource[2], onSuccess);
  };
  var onError = function() {
    $.ajax({
      type: 'GET', url: dataSource[1], success: onSuccess, error: onSecondError
    });
  };
  var matchTwoArrays = function(arr1, arr2) {
    var count = 0;
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
    if (selected.purposes.length === 0 && selected.industries.length === 0) {
      return true;
    }
    if (selected.purposes.length > 0 && selected.industries.length > 0) {
      return (
        matchTwoArrays(selected.purposes, item.Purposes) &&
        matchTwoArrays(selected.industries, item.Industries)
      );
    }
    return (
      matchTwoArrays(selected.purposes, item.Purposes) ||
      matchTwoArrays(selected.industries, item.Industries)
    );
  };
  loader.hide(); empty.hide(); legend.hide();
  if ($('.a-js-genericSearch').length > 0) {
    loader.show();
    $('.a-js-industries').find('.a-js-none').show().prev()
      .hide();
    $('.a-js-purposes').find('.a-js-none').show().prev()
      .hide();
    if ($('.a-js-genericSearch').find('input[type=search]').length > 0) {
      inputType = 'search';
    }
    if (inputType === 'search') {
      container = $('.a-js-genericSearch').find('.a-list');
    } else {
      container = $('.a-js-genericSearch').find('.a-js-results');
      $('.a-js-results').next().hide();
    }
    container.find('li:gt(0)').remove();
    container.find('article:gt(0)').remove();
    base = container.html(); container.html('');
    dataSource = $('.a-js-genericSearch').attr('data-source').split(',');
    afterRequest = function(data, paginating) {
      var count = 0; var newList = data.SubsidiesList.sort(dynamicSort('SubsidyName'));
      loader.hide();
      $('.a-js-genericSearch').find('.a-card-filter').show();
      $('.a-js-genericSearch').find('.a-js-results').show();
      if (inputType === 'search') {
        $('.a-js-genericSearch').find('form').on('keyup keypress', function(e) {
          var keyCode = e.keyCode || e.which;
          if (keyCode === 13) {
            e.preventDefault();
            return false;
          }
          return true;
        });
        $('.a-js-genericSearch').find('form').find('input[type=search]').on('keypress', function() {
          lastKeypress = new Date().getTime(); iterate = true;
          loader.show(); legend.hide(); empty.hide(); container.html('');
        });
        setInterval(function() {
          if ($('.a-js-genericSearch').find('form').find('input[type=search]').val() !==
            undefined) {
            query = $('.a-js-genericSearch').find('form').find('input[type=search]').val()
              .toLowerCase();
          } else {
            query = '';
          }
          now = new Date().getTime();
          if (query.length > 0 && (now - lastKeypress > 1500) && iterate) {
            iterate = false;
            data.items.forEach(function(item) {
              var method = 'append';
              if (item.name.toLowerCase().indexOf(query) !== -1 ||
                item.parent.toLowerCase().indexOf(query) !== -1) {
                if (
                  item.name.toLowerCase().indexOf(query) !== -1
                ) {
                  method = 'prepend';
                }
                container[method](
                  base.replace('%NAME%', item.name)
                    .replace('%PARENT%', item.parent)
                    .replace(/%URL%/g, item.url)
                    .replace('../..', '')
                );
              }
            });
            loader.hide(); legend.show();
            if (container.html() === '') {
              empty.show(); legend.hide();
            }
          }
        }, 2000);
      } else if (paginating) {
        page += 1;
        $('.a-js-results').find('article').hide();
        newList.filter(grinder).forEach(function(item, index) {
          if (index < 20 * page) {
            $('#' + item.id).show();
          } else {
            $('#' + item.id).hide();
          }
        });
        if (newList.filter(grinder).length < 20 * page) {
          $('.a-js-results').next().hide();
        } else {
          $('.a-js-results').next().show();
        }
      } else {
        $('.a-js-results').next().on('click', function() {
          afterRequest(data, true);
        });
        data.PurposeList.reverse().forEach(function(item) {
          $('.a-js-purposes').find('.text-sm-center').append(
            '<div class="a-switch">' +
            $('.a-js-purposes').find('.a-switch').eq(0).html()
              .replace(/%ID%/g, item.FilterId)
              .replace('%TITLE%', item.FilterName) +
            '</div>'
          );
        });
        data.IndustryList.forEach(function(item) {
          $('.a-js-industries').find('.d-block').prepend(
            '<div class="a-switch">' +
            $('.a-js-industries').find('.a-switch').eq(0).html()
              .replace(/%ID%/g, item.FilterId)
              .replace('%TITLE%', item.FilterName) +
            '</div>'
          );
        });
        $('.a-js-purposes').find('.a-switch').eq(0).hide();
        $('.a-js-industries').find('.a-switch').eq(0).hide();
        newList.forEach(function(item, index) {
          newList[index].id = 'stotte-' + index;
          container.append(
            base.replace('%NAME%', item.SubsidyName)
              .replace('%DESC%', item.SubsidyIntro || 'Ingen beskrivelse.')
              .replace(/%URL%/g, item.SubsidyURL)
              .replace(
                '%attributes%',
                ' data-purposes="' + (item.Purposes.toString() || '–') + '" data-industries="' +
                  (item.Industries.toString() || '–') + '"'
              )
              .replace(
                '%IDENTIFIER%',
                'stotte-' + index
              )
          );
        });
        $('.a-js-results').find('article').each(function(index, item) {
          if (index < 20 * page) {
            $(this).show();
          } else {
            $(this).hide();
          }
        });
        $('.a-js-results').next().show();
        $('.a-card-filter').find('input[type=checkbox]').on('change', function() {
          selected = {
            purposes: [], industries: []
          };
          $('.a-js-industries').find('.a-js-none').show().prev()
            .hide();
          $('.a-js-purposes').find('.a-js-none').show().prev()
            .hide();
          $('.a-js-purposes').find('input[type=checkbox]:checked').each(function(index) {
            selected.purposes.push($(this).attr('id').replace('filterID', ''));
            $('.a-js-purposes').find('.a-js-none').hide().prev()
              .show();
            $('.a-js-purposes').find('.a-js-none').prev().find('.badge')
              .html(index + 1);
          });
          $('.a-js-industries').find('input[type=checkbox]:checked').each(function(index) {
            selected.industries.push($(this).attr('id').replace('filterID', ''));
            $('.a-js-industries').find('.a-js-none').hide().prev()
              .show();
            $('.a-js-industries').find('.a-js-none').prev().find('.badge')
              .html(index + 1);
            if (index > 0) {
              $('.a-js-industries').find('.a-js-plural').html('r');
            } else {
              $('.a-js-industries').find('.a-js-plural').html('');
            }
          });
          legend.hide(); empty.hide(); page = 1;
          $('.a-js-results').find('article').hide();
          newList.filter(grinder).forEach(function(item, index) {
            if (index < 20 * page) {
              $('#' + item.id).show();
            } else {
              $('#' + item.id).hide();
            }
          });
          if (newList.filter(grinder).length < 20) {
            $('.a-js-results').next().hide();
          } else {
            $('.a-js-results').next().show();
          }
          if (selected.purposes.length === 0 && selected.industries.length === 0) {
            $('.a-js-results').next().show();
          }
          if (newList.filter(grinder).length === 0) {
            empty.show();
          }
        });
      }
    };
    $.ajax({ type: 'GET', url: dataSource[0], success: onSuccess, error: onError });
  }
};
