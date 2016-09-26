/* globals $ */
var toggleExpand = function () {
  $('.js-toggle').click(function () {
    var self = $(this)
    if (self.hasClass('open')) {
      self.parent().find('.js-hide').slideUp(300); self.removeClass('open')
    } else self.addClass('open'); self.parent().find('.js-hide').slideDown(300)
    return false
  })
}
