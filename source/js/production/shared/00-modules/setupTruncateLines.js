var setupTruncateLines = function() {
  setTimeout(function() {
    // Intit with 3 lines instead of 2 for IE11
    if (!!window.MSInputMethodContext
      && !!document.documentMode
      && window.innerWidth < 768) {
      $('.a-js-truncate-2-sm-down').truncate({
        lines: 3
      });
    } else {
      $('.a-js-truncate-2-sm-down').truncate({
        lines: 2
      });
    }
  }, 1);

  $(window).resize(function() {
    if (window.innerWidth < 768) {
      $('.a-js-truncate-2-sm-down').truncate('collapse');
      $('.a-js-truncate-2-sm-down').truncate('update');
    } else {
      $('.a-js-truncate-2-sm-down').truncate('expand');
    }
  });
};
