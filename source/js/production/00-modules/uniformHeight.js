/* globals $ */
var uniformHeight = function () {
  var cardGroup = $('.a-card-group'); var maxheight = 0
  cardGroup.children().each(function () {
    if ($(this).height() > maxheight) maxheight = $(this).height()
  })
  cardGroup.children().children().css('min-height', maxheight)
}
