/* globals $ */
var propagateContent = function() {
  $('.a-js-propagatedContentDestination').each(function() {
    var prefix = '.a-js-propagatedContentOrigin.';
    if ($(this)[0].hasAttribute('data-maxwidth')) {
      if (window.innerWidth <= parseInt($(this).attr('data-maxwidth'), 10)) {
        if ($(this).hasClass('replace-me')) {
          $(this).before($(prefix + $(this).attr('data-refclass')).html());
          $(this).remove();
        } else {
          $(this).html($(prefix + $(this).attr('data-refclass')).html());
        }
      }
    } else if ($(this)[0].hasAttribute('data-minwidth')) {
      if (window.innerWidth >= parseInt($(this).attr('data-minwidth'), 10)) {
        if ($(this).hasClass('replace-me')) {
          $(this).before($(prefix + $(this).attr('data-refclass')).html());
          $(this).remove();
        } else {
          $(this).html($(prefix + $(this).attr('data-refclass')).html());
        }
      }
    } else if ($(this).hasClass('replace-me')) {
      $(this).before($(prefix + $(this).attr('data-refclass')).html());
      $(this).remove();
    } else {
      $(this).html($(prefix + $(this).attr('data-refclass')).html());
    }
  });
  $('.a-js-propagatedContentOrigin').html('');
};
