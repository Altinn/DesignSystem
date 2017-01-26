/* globals $ */
var toggleExpand = function() {
  $('.js-toggle').click(function() {
    var self = $(this);
    if (self.hasClass('show')) {
      self.parent().find('.js-hide').slideUp(300);
      self.removeClass('show');
    } else {
      self.addClass('show');
      self.parent().find('.js-hide').slideDown(300);
    }
    return false;
  });
};
