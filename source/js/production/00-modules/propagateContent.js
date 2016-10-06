/* globals $ */
var propagateContent = function () {
  $('.propagated-content-destination').each(function () {
    var prefix = '.a-js-propagatedContentOrigin.'
    if ($(this).hasClass('replace-me')) {
      $(this).before($(prefix + $(this).attr('data-refclass')).html())
      $(this).remove()
    } else $(this).html($(prefix + $(this).attr('data-refclass')).html())
  })
}
