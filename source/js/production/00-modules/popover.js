/* globals $ */
var popover = function() {
  var acceptHideBigPop = false;
  $('[data-toggle="popover"]').popover(); $('#example').popover();
  $('.a-js-persistPopover').on('click', function() {
    $('.a-js-persistPopover').popover('hide');
    acceptHideBigPop = true;
  });
  $('.a-js-persistPopover').on('hide.bs.popover', function(e) {
    if (acceptHideBigPop) {
      acceptHideBigPop = false;
    } else {
      e.preventDefault(); e.stopPropagation();
    }
  });
};
