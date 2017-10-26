/* globals $ */
var uniformHeight = function() {
  var cardGroup = $('.a-card-group .row');
  var maxheight;
  if ($(window).width() >= 768) {
    maxheight = 0;
    cardGroup.children().each(function() {
      if ($(this).height() > maxheight) {
        maxheight = $(this).height();
      }
    });
    cardGroup.children().children().css('min-height', maxheight);
  } else {
    cardGroup.children().children().css('min-height', 'auto');
  }
};
