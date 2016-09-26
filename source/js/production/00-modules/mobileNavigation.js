/* globals $ */
var mobileNavigation = function () {
  $('.ap-sideNav-mobilebar').click(function () {
    var self = $(this)
    var searchButton = $('.a-toggle-search').hasClass('open')
    if (self.hasClass('open')) {
      $('.ap-sideNav-collapse').slideUp(300); self.removeClass('open')
    } else {
      if (searchButton === true) {
        $('.a-search').slideUp(300); $('.a-toggle-search').removeClass('open')
      }
      self.addClass('open'); $('.ap-sideNav-collapse').slideDown(300)
    }
    return false
  })
}
