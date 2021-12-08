/* globals $ */
var initializeDatepicker = function() {
  var today = ('0' + new Date().getDate()).slice(-2) + '.' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '.' + new Date().getFullYear();

  var returnUserLanguageNumericCodeFromCookie = function(cookies, cname) {
    var name = cname + '=';
    var decodedCookies = decodeURIComponent(cookies);
    var splitCookies = decodedCookies.split(';');
    var i;
    var c;
    for (i = 0; i < splitCookies.length; i++) {
      c = splitCookies[i];
      if (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0 && c.indexOf('UL') > 0) {
        return c.substring(c.indexOf('UL') + 3);
      }
    }
    return null;
  };

  var returnLanguageCodeFromNumericCode = function(numeric) {
    var lang;
    switch (numeric) {
    // bokmål
    case '1044':
      return 'no';
    // engelsk
    case '1033':
      return 'en';
    // nynorsk
    case '2068':
      return 'nn';
    default:
      return 'no';
    }
  };

  var ulNumeric = returnUserLanguageNumericCodeFromCookie(document.cookie, 'altinnPersistentContext');
  var userLanguage = returnLanguageCodeFromNumericCode(ulNumeric);

  if ($('.a-overlay-container').length > 0) {
    $('.a-overlay-container').attr('id', 'picker-container');
  } else {
    $('body').attr('id', 'picker-container');
  }

  $('.form-control.date').each(function() {
    $(this).val($(this).val() || today);
  });
  $('.form-control.date').datepicker({
    format: 'dd.mm.yyyy',
    language: userLanguage,
    todayHighlight: true,
    orientation: 'bottom left',
    autoclose: true,
    maxViewMode: 0,
    container: '#picker-container',
    templates: {
      leftArrow: '<i class="ai ai-back"></i>',
      rightArrow: '<i class="ai ai-arrowright"></i>'
    }
  }).on('show', function(e) {
    $('.datepicker').find('table').attr('cellpadding', '0');
    $('.datepicker').find('table').attr('cellspacing', '0');
  });
  if ($('.form-control.date').length > 0) {
    $('body').on('click', function(e) {
      $('.datepicker').hide();
    });
    $('.form-control.date').on('click', function(e) {
      e.stopPropagation(); e.preventDefault();
    });
    $('.datepicker').on('click', function(e) {
      e.stopPropagation(); e.preventDefault();
    });
  }
};
