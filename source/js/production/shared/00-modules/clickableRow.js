var setupOnKeypress = function() {
  $('.a-clickable, .a-selectable').on('keypress', function(e) {
    var key = e.which;
    if ($(e.target).hasClass('a-clickable') || $(e.target).hasClass('a-selectable')) {
      if (key === 13) {
        $(this).click();
        return false;
      }
    }

    return true;
  });
};
