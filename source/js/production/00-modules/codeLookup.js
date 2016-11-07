/* globals $ */
var codeLookup = function() {
  var capIt = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  var lastKeypress; var now; var iterate;
  var legend = $('.a-js-lookup').find('.a-legend');
  var loader = $('.a-js-lookup').find('.modal-body').find('.a-logo-anim');
  var empty = $('.a-js-lookup').find('.a-js-noResults');
  var container = $('.a-js-lookup').find('.modal-body').find('.a-radioButtons');
  var check = function() {
    if ($('form').find('input[type=radio]:checked').length > 0) {
      $('form').find('button[type=submit]').removeAttr('disabled');
    } else {
      $('form').find('button[type=submit]').attr('disabled', 'disabled');
    }
  };
  var query; var base = container.html(); container.html(''); loader.hide();
  empty.hide(); legend.hide();
  if ($('.a-js-lookup').length > 0) {
    $('form').on('change', check);
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
        loader.show(); legend.hide(); empty.hide(); container.html(''); check();
      });
      setInterval(function() {
        if ($('.a-js-lookup').find('input[type=text]').val() !== undefined) {
          query = $('.a-js-lookup').find('input[type=text]').val();
        } else {
          query = '';
        }
        now = new Date().getTime();
        if (query.length > 0 && (now - lastKeypress > 1500) && iterate) {
          iterate = false;
          Object.keys(data).forEach(function(item) {
            var method; var var1 = ' ' + query + ' ';
            var var2 = '-' + query + ' '; var var3 = ' ' + query + '-';
            var var4 = ' ' + query; var var5 = query + ' ';
            var var6 = capIt(query); var re1 = new RegExp(var1, 'g');
            var re2 = new RegExp(var2, 'g'); var re3 = new RegExp(var3, 'g');
            var re4 = new RegExp(var4, 'g'); var re5 = new RegExp(var5, 'g');
            var re6 = new RegExp(var6, 'g');
            var out1 = ' <strong style="color:inherit">' + query + '</strong> ';
            var out2 = '-<strong style="color:inherit">' + query + '</strong> ';
            var out3 = ' <strong style="color:inherit">' + query + '</strong>-';
            var out4 = ' <strong style="color:inherit">' + query + '</strong>';
            var out5 = '<strong style="color:inherit">' + query + '</strong> ';
            var out6 = '<strong style="color:inherit">' + capIt(query) +
              '</strong>';
            if (
              (
                data[item].name.indexOf(var1) !== -1 ||
                data[item].name.indexOf(var2) !== -1 ||
                data[item].name.indexOf(var3) !== -1 ||
                data[item].name.indexOf(var4) !== -1 ||
                data[item].name.indexOf(var5) !== -1 ||
                data[item].name.indexOf(var6) !== -1 ||
                data[item].shortName.indexOf(var1) !== -1 ||
                data[item].shortName.indexOf(var2) !== -1 ||
                data[item].shortName.indexOf(var3) !== -1 ||
                data[item].shortName.indexOf(var4) !== -1 ||
                data[item].shortName.indexOf(var5) !== -1 ||
                data[item].shortName.indexOf(var6) !== -1 ||
                data[item].notes.indexOf(var1) !== -1 ||
                data[item].notes.indexOf(var2) !== -1 ||
                data[item].notes.indexOf(var3) !== -1 ||
                data[item].notes.indexOf(var4) !== -1 ||
                data[item].notes.indexOf(var5) !== -1 ||
                data[item].notes.indexOf(var6) !== -1
              ) &&
              data[item].level === 5
            ) {
              if (
                data[item].name.indexOf(var1) !== -1 ||
                data[item].name.indexOf(var2) !== -1 ||
                data[item].name.indexOf(var3) !== -1 ||
                data[item].name.indexOf(var4) !== -1 ||
                data[item].name.indexOf(var5) !== -1 ||
                data[item].name.indexOf(var6) !== -1
              ) {
                method = 'prepend';
              } else {
                method = 'append';
              }
              container[method](base
                .replace('%NAME%', data[item].name
                  .replace(re1, out1)
                  .replace(re2, out2)
                  .replace(re3, out3)
                  .replace(re4, out4)
                  .replace(re5, out5)
                  .replace(re6, out6)
                )
                .replace('%DESCRIPTION%', data[item].notes
                  .replace(re1, out1)
                  .replace(re2, out2)
                  .replace(re3, out3)
                  .replace(re4, out4)
                  .replace(re5, out5)
                  .replace(re6, out6)
                )
                .replace('%ID%', data[item].shortName)
                .replace('%PATH%', createPath(data[item], '')
                  .replace(re1, out1)
                  .replace(re2, out2)
                  .replace(re3, out3)
                  .replace(re4, out4)
                  .replace(re5, out5)
                  .replace(re6, out6)
                )
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
