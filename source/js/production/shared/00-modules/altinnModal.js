/* globals currentRequest */
var closeModal = function(target) {
  $(target).modal('hide');
};

var loadModal = function(url, target) {
  var currentRequest = $.ajax({
    url: url,
    beforeSend: function() {
      if (typeof currentRequest !== 'undefined') {
        currentRequest.abort();
      }
    }
  }).always(function() {
    // TODO: Set loading screen / spinner
  }).done(function(data) {
    var modalPage = $('<div/>', {
      class: 'modalPage',
      html: data
    });
    var page = $('<div/>', {
      class: 'a-page a-current-page',
      data: {
        'page-index': 1
      },
      html: modalPage
    });

    // TODO: Remove loading screen

    // if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    //   goToModalHeader();
    // }

    $(target + ' .a-modal-content-target').append(page);

    // Initialize with backdrop: static to prevent modal from closing when clicking outside,
    // and keyboard: false to prevent ESC from closing the modal
    $(target).modal({
      backdrop: 'static',
      keyboard: false
    });

    $(target).on('hidden.bs.modal', function() {
      $(target + ' .a-modal-content-target').empty();
      $(target).attr('aria-hidden', true);
    });

    $(target).on('shown.bs.modal', function() {
      $(target).attr('aria-hidden', false);
    });
  });
};

var nextModalPage = function(url, target) {
  var currentRequest = $.ajax({
    url: url,
    beforeSend: function() {
      if (typeof currentRequest !== 'undefined') {
        currentRequest.abort();
      }
    }
  }).always(function() {
    // TODO: Set loading screen / spinner
  }).done(function(data) {
    // TODO: Remove loading screen
    var current;
    var modalPage = $('<div/>', {
      class: 'modalPage',
      html: data
    });
    var existingPages = $(target + ' :data(page-index)');
    var newPage = $('<div/>', {
      class: 'a-page a-next-page',
      data: {
        'page-index': existingPages.length + 1
      },
      html: modalPage
    });

    // if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    //   goToModalHeader();
    // }

    $(target + ' .a-modal-content-target').append(newPage);

    $(target).animate({
      scrollTop: 0
    }, 20);

    current = $(target + ' .a-current-page');

    setTimeout(function() {
      current.removeClass('a-current-page').addClass('a-previous-page');
      newPage.removeClass('a-next-page').addClass('a-current-page');
    }, 0);

    current.on('transitionend', function() {
      current.hide().off();
    });
  });
};

var previousModalPage = function(target, pagesToPopParam) {
  var current;
  var allPages;
  var previous;
  var pagesToPop;

  if (!pagesToPopParam) {
    pagesToPop = 1;
  } else {
    pagesToPop = pagesToPopParam;
  }

  if ($(target + ' .a-current-page').data('page-index') - pagesToPop <= 0) {
    $(target).modal('hide');
    return;
  }

  current = $(target + ' .a-current-page');
  allPages = $(target + ' :data(page-index)');
  previous = allPages.filter(function() {
    return $(this).data('page-index') === allPages.length - pagesToPop;
  });

  previous.show();
  current.addClass('a-next-page');
  current.removeClass('a-current-page');

  // if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
  //   goToModalHeader();
  // }

  setTimeout(function() {
    previous.addClass('a-current-page').removeClass('a-previous-page');
  }, 0);

  current.on('transitionend', function() {
    var previousPages = allPages.filter(function() {
      return $(this).data('page-index') > allPages.length - pagesToPop;
    });
    previousPages.remove();
  });
};

$('body').on('click', '[data-toggle="altinn-modal"]', function() {
  var $source = $(this);
  if ($source[0].dataset.action === 'load') {
    loadModal($source[0].dataset.url, $source[0].dataset.target);
  } else if ($source[0].dataset.action === 'next') {
    nextModalPage($source[0].dataset.url, $source[0].dataset.target);
  } else if ($source[0].dataset.action === 'back') {
    previousModalPage($source[0].dataset.target, $source[0].dataset.pages);
  } else if ($source[0].dataset.action === 'close') {
    closeModal($source[0].dataset.target);
  }
});
