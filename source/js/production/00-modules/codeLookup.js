/* globals $ */
var codeLookup = function() {
  var lastKeypress; var now; var iterate;
  var loader = $('.a-js-lookup').find('.modal-body').find('.a-logo-anim');
  var empty = $('.a-js-lookup').find('.modal-body').find('.a-logo-anim').next();
  var container = $('.a-js-lookup').find('.modal-body').find('.a-radioButtons');
  var query; var base = container.html(); container.html(''); loader.hide();
  empty.show();
  if ($('.a-js-lookup').length > 0) {
    $.getJSON('../../ssb.json', function(data) {
      function createPath(dest, str) {
        var _str = str; var _dest = data[dest.parentCode];
        if (_dest !== undefined) {
          if (dest.name === _dest.name) {
            return createPath(_dest, _str);
          }
          if (str.indexOf(_dest.name) !== -1) {
            return str;
          }
          _str = _dest.name + ' / ' + _str; return createPath(_dest, _str);
        }
        return str;
      }
      $('.a-js-lookup').find('input[type=text]').on('keypress', function() {
        lastKeypress = new Date().getTime(); iterate = true;
        loader.show(); empty.hide(); container.html('');
      });
      setInterval(function() {
        query = $('.a-js-lookup').find('input[type=text]').val();
        now = new Date().getTime();
        if (query.length > 0 && (now - lastKeypress > 1500) && iterate) {
          iterate = false;
          Object.keys(data).forEach(function(item) {
            if (
              (
                data[item].name.indexOf(query) !== -1 ||
                data[item].shortName.indexOf(query) !== -1 ||
                data[item].notes.indexOf(query) !== -1
              ) &&
              data[item].level === 5
            ) {
              container.append(base
                .replace('%NAME%', data[item].name)
                .replace('%DESCRIPTION%', data[item].notes)
                .replace('%ID%', data[item].shortName)
                .replace('%PATH%', createPath(data[item], ''))
              );
            }
          });
          loader.hide();
          if (container.html() === '') {
            empty.show();
          }
        }
      }, 2000);
    });
  }
};
