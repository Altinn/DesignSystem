/* globals $ */
var fixPatternLinks = function() {
  if (window.location.pathname.indexOf('DesignSystem') === 1) {
    $('a').each(function() {
      $(this).attr('href', $(this).attr('href').replace('/patterns/', '/DesignSystem/patterns/'));
    });
    $('*[onclick]').each(function() {
      if ($(this).attr('onclick').indexOf('location.href=\'/patterns/') > -1) {
        $(this).attr('onclick', $(this).attr('onclick').replace('location.href=\'/patterns/', 'location.href=\'/DesignSystem/patterns/'));
      }
    });
  }
};
