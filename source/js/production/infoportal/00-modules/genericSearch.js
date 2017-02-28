/* globals $ */
var genericSearch = function() {
  var lastKeypress; var now; var iterate;
  var legend = $('.a-js-genericSearch').find('.a-legend');
  var loader = $('.a-js-genericSearch').find('.a-logo-anim');
  var empty = $('.a-js-genericSearch').find('.a-js-noResults');
  var container = $('.a-js-genericSearch').find('.a-list');
  var base; var query; container.find('li:gt(0)').remove();
  base = container.html(); container.html(''); loader.hide();
  empty.hide(); legend.hide();
  loader.css('margin-left', 'auto').css('margin-right', 'auto');
  if ($('.a-js-genericSearch').length > 0) {
    $.getJSON('../../data/skjenkebevilling.json', function(data) {
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
        if ($('.a-js-genericSearch').find('form').find('input[type=search]').val() !== undefined) {
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
    });
  }
};
