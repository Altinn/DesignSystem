/* globals currentRequest, popoverLocalInit */
var closeModal = function(target) {
  $('body').removeClass('a-modal-background-error');
  $('body').removeClass('a-modal-background-success');
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
      $(target).removeAttr('aria-hidden');
    });
    popoverLocalInit();
    $('body').scrollTop(0);
  });
};


var nextModalPageWithContent = function(target, isSuccess, isError, content) {
  var current;
  var modalPage = $('<div/>', {
    class: 'modalPage',
    html: content
  });

  var existingPages = $(target + ' :data(page-index)');
  var newPage = $('<div/>', {
    class: 'a-page a-next-page',
    data: {
      'page-index': existingPages.length + 1,
      'is-success': isSuccess,
      'is-error': isError
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
    $('body').removeClass('a-modal-background-error');
    $('body').removeClass('a-modal-background-success');

    current.removeClass('a-current-page').addClass('a-previous-page');
    newPage.removeClass('a-next-page').addClass('a-current-page');

    if (isError) {
      $('body').addClass('a-modal-background-error');
    } else if (isSuccess) {
      $('body').addClass('a-modal-background-success');
    }
  }, 0);

  current.on('transitionend', function() {
    current.hide().off();
  });
  popoverLocalInit();
  $('body').scrollTop(0);
};

var nextModalPage = function(url, target, isSuccess, isError) {
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
        'page-index': existingPages.length + 1,
        'is-success': isSuccess,
        'is-error': isError
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
      $('body').removeClass('a-modal-background-error');
      $('body').removeClass('a-modal-background-success');

      current.removeClass('a-current-page').addClass('a-previous-page');
      newPage.removeClass('a-next-page').addClass('a-current-page');

      if (isError) {
        $('body').addClass('a-modal-background-error');
      } else if (isSuccess) {
        $('body').addClass('a-modal-background-success');
      }
    }, 0);

    current.on('transitionend', function() {
      current.hide().off();
    });
    popoverLocalInit();
    $('body').scrollTop(0);
  });
};

var previousModalPage = function(target, pagesToPopParam) {
  var current;
  var allPages;
  var previous;
  var pagesToPop;
  var isError;
  var isSuccess;

  if (!pagesToPopParam) {
    pagesToPop = 1;
  } else {
    pagesToPop = pagesToPopParam;
  }

  if ($(target + ' .a-current-page').data('page-index') - pagesToPop <= 0) {
    $('body').removeClass('a-modal-background-error');
    $('body').removeClass('a-modal-background-success');
    $(target).modal('hide');
    return;
  }

  current = $(target + ' .a-current-page');
  allPages = $(target + ' :data(page-index)');
  previous = allPages.filter(function() {
    return $(this).data('page-index') === allPages.length - pagesToPop;
  });

  previous.show();
  isError = $(previous).data().isError;
  isSuccess = $(previous).data().isSuccess;

  current.addClass('a-next-page');
  current.removeClass('a-current-page');

  // if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
  //   goToModalHeader();
  // }

  setTimeout(function() {
    $('body').removeClass('a-modal-background-error');
    $('body').removeClass('a-modal-background-success');

    previous.addClass('a-current-page').removeClass('a-previous-page');

    if (isError) {
      $('body').addClass('a-modal-background-error');
    } else if (isSuccess) {
      $('body').addClass('a-modal-background-success');
    }
  }, 0);

  current.on('transitionend', function() {
    var previousPages = allPages.filter(function() {
      return $(this).data('page-index') > allPages.length - pagesToPop;
    });
    previousPages.remove();
  });
  $('body').scrollTop(0);
};

$('body').on('click', '[data-toggle="altinn-modal"]', function() {
  var $source = $(this);
  if ($source[0].dataset.action === 'load') {
    loadModal($source[0].dataset.url, $source[0].dataset.target);
  } else if ($source[0].dataset.action === 'next') {
    nextModalPage($source[0].dataset.url, $source[0].dataset.target,
      $source[0].dataset.isSuccess, $source[0].dataset.isError);
  } else if ($source[0].dataset.action === 'back') {
    previousModalPage($source[0].dataset.target, $source[0].dataset.pages);
  } else if ($source[0].dataset.action === 'close') {
    closeModal($source[0].dataset.target);
  }
});
