var setupTruncateLines = function() {
  setTimeout(function() {
    // Max two lines for all screen sizes
    $('.a-js-truncate-2').truncate({
      lines: 2
    });
    // Max two lines for screen sizes less than 768
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
    // Max two lines for all screen sizes
    $('.a-js-truncate-2').truncate('collapse');
    $('.a-js-truncate-2').truncate('update');

    // Max two lines for screen sizes less than 768
    if (window.innerWidth < 768) {
      $('.a-js-truncate-2-sm-down').truncate('collapse');
      $('.a-js-truncate-2-sm-down').truncate('update');
    } else {
      $('.a-js-truncate-2-sm-down').truncate('expand');
    }
  });

  $('.a-collapsePanel-body').on('shown.bs.collapse', function() {
    var el = $(this).siblings('.a-collapsePanel-heading').find('.a-js-truncate-2-sm-down');
    if (window.innerWidth < 768) {
      el.truncate('expand');
    }
  });

  $('.a-collapsePanel-body').on('hide.bs.collapse', function() {
    var el = $(this).siblings('.a-collapsePanel-heading').find('.a-js-truncate-2-sm-down');
    if (window.innerWidth < 768) {
      el.truncate('collapse');
    }
  });
};

/* globals
  setupTruncateLines
*/
window.brregInit = function() {
  setupTruncateLines();
};

window.brregInit();
