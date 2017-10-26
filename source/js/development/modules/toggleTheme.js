/* globals $ */
var toggleTheme = function() {
  $(function() {
    var toggleStuff = function(className) {
      $('body', $('iframe').contents()[0]).removeClass('a-bgBlueLight');
      $('body', $('iframe').contents()[0]).removeClass('a-bgGreyLight');
      $('body', $('iframe').contents()[0]).removeClass('a-bgWhite');
      $('body', $('iframe').contents()[0]).addClass(className);
      $('body', '.ap-profile').attr('class', '');
    };
    $('#sg-switchtheme-blue', $('iframe').contents()[0]).off('change');
    $('#sg-switchtheme-grey', $('iframe').contents()[0]).off('change');
    $('#sg-switchtheme-white', $('iframe').contents()[0]).off('change');
    if ($('body').hasClass('a-bgBlueLight')) {
      $('#sg-switchtheme-blue', $('iframe').contents()[0])
        .prop('checked', true);
    } else if ($('body').hasClass('a-bgGreyLight')) {
      $('#sg-switchtheme-grey', $('iframe').contents()[0])
        .prop('checked', true);
    } else if ($('body').hasClass('a-bgWhite')) {
      $('#sg-switchtheme-white', $('iframe').contents()[0])
        .prop('checked', true);
    }
    $('#sg-switchtheme-blue', $('iframe').contents()[0]).on('change',
      function() {
        toggleStuff('a-bgBlueLight');
      });
    $('#sg-switchtheme-grey', $('iframe').contents()[0]).on('change',
      function() {
        toggleStuff('a-bgGreyLight');
      });
    $('#sg-switchtheme-white', $('iframe').contents()[0]).on('change',
      function() {
        toggleStuff('a-bgWhite');
      });
    $('body', '.ap-profile').attr('class', '');
  });
};
