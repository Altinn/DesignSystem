/* globals $ */
var fixPatternLinks = function() {
  if (window.location.pathname.indexOf('DesignSystem') === 1) {
    $('a').each(function() {
      if (typeof $(this).attr('href') !== typeof undefined && $(this).attr('href') !== false && $(this).attr('href').indexOf('DesignSystem') === -1) {
        $(this).attr('href', $(this).attr('href').replace('/patterns/', '/DesignSystem/public/patterns/'));
      }
    });
    $('*[onclick]').each(function() {
      if ($(this).attr('onclick').indexOf('location.href=\'/patterns/') > -1) {
        $(this).attr('onclick', $(this).attr('onclick').replace('location.href=\'/patterns/', 'location.href=\'/DesignSystem/public/patterns/'));
      }
    });
  }
};

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

/* globals $ */
var popoverLocalInit = function() {
  var options = {
    html: true,
    placement: function(context, source) {
      var position = $(source).offset();
      $(context).addClass($(source).attr('data-popover-class'));
      if ($(source).hasClass('a-js-popoverBig')) {
        return 'bottom';
      }
      if (position.left < 125) {
        return 'right';
      }
      if (position.left > ($(document).width() - $(source).width() - 125)) {
        return 'left';
      }
      return 'bottom';
    },
    content: function() {
      if ($(this).attr('data-popover-content')) {
        return $('#' + $(this).data('popover-content')).html();
      }
      return false;
    },
    template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><div class="popover-content"></div></div>'
  };

  $('[data-toggle="popover"]').popover(options);

  $('.a-js-togglePopoverIcons').each(function() {
    // $(this).find('i').eq(1).hide();
    $(this).find('.a-js-popoverIconExpanded').hide();
  });

  $('.a-js-popoverIconExpanded').on('click', function() {
    $('.a-js-popoverIconExpanded').hide();
    $('.a-js-popoverIconInitial').show();
    // $(this).hide();
    // $('.a-js-popoverIconInitial').show();
  });
  $('.a-js-popoverIconInitial').on('click', function() {
    $(this).hide();
    $(this).parent().find('.a-js-popoverIconExpanded').show();
  });
};

var forceFocusTriggerElement;
var popoverGlobalInit = function() {
  $('body').on('show.bs.popover', '[data-toggle="popover"].a-js-tabable-popover', function(e) {
    var triggerElement = this;
    $(triggerElement).closest('.a-modal').scrollTop(0);
  });

  $('body').on('shown.bs.popover', '[data-toggle="popover"].a-js-tabable-popover', function(e) {
    var triggerElement = this;
    setTimeout(function() {
      $(triggerElement).after($($(triggerElement).data('bs.popover').tip));
      $(triggerElement).closest('.a-modal').one('scroll', function() {
        $('[data-toggle="popover"]').popover('hide');
      });
    }, 0);
  });

  $('body').on('shown.bs.popover', '[data-toggle="popover"].a-js-popover-forceFocus', function(e) {
    $('body').append($('<button class="sr-only a-js-popoverTrick">ignoreme</button>'));
    forceFocusTriggerElement = this;
    $(forceFocusTriggerElement).one('blur', function() {
      var that = this;
      if (forceFocusTriggerElement) {
        $($(this).data('bs.popover').tip).find('button,input,a,textarea').filter(':visible:first').focus();
      }
    });
  });

  $('body').on('hidden.bs.popover', '[data-toggle="popover"].a-js-popover-forceFocus', function(e) {
    $('body').find('.a-js-popoverTrick').remove();
  });

  // Hide all existing popovers when opening a new popover
  $('body').on('click', '[data-toggle="popover"]', function(e) {
    $('[data-toggle="popover"]').not(this).popover('hide');
  });

  // Hide all existing popovers when focusing a new element
  // which is not the open popover or any of its content
  $('body').on('blur', '[data-toggle="popover"], .popover *', function(e) {
    setTimeout(function() {
      var $focused = $(':focus');
      if ((($focused.length !== 0 || forceFocusTriggerElement)
        && !$focused.hasClass('popover')
        && !$focused.parents('.popover').length >= 1) || $focused.hasClass('a-js-popoverTrick')) {
        if (forceFocusTriggerElement) {
          $(forceFocusTriggerElement).focus();
          forceFocusTriggerElement = false;
        }
        // disable blur when in modal to allow use of non-original scrollbar
        if ($('.modal.show').length > 0) {
          $('.popover-big[data-toggle="popover"]').popover('hide');
        }
      }
    }, 0);
  });

  // Hide popovers when clicking on something else than the trigger element
  // and the popover itself
  $('body').on('click', function(e) {
    if ($(e.target).data('toggle') !== 'popover'
      && $(e.target).parents('[data-toggle="popover"]').length === 0
      && $(e.target).parents('.popover.show').length === 0) {
      $('[data-toggle="popover"]').popover('hide');
      forceFocusTriggerElement = false;
      $(this).parent().find('.a-js-popoverIconInitial').show();
      $(this).parent().find('.a-js-popoverIconExpanded').hide();
    }
  });

  function resetTranslate() {
    $('.popover-big').attr('style', $('.popover-big').attr('style').replace(/translateX\(.*?\)/, 'translateX(0px)'));
  }

  function adjustBig() {
    var modalHeight;
    var padding;
    if ($('.popover-big').length > 0) {
      if ($('.modal.show').length > 0) {
        // Add padding to make sure modal is big enough to contain popover
        modalHeight = $('.modal-dialog').height() + $('.modalPage').height();
        padding = ($('.popover').offset().top + $('.modal').scrollTop() + $('.popover').height() + 5) - modalHeight;
        $('.modalPage').css('padding-bottom', padding + 'px');
        // tranlate is somehow added by Bootstrap later when in modal??
        setTimeout(resetTranslate, 0);
      } else {
        resetTranslate();
      }
    }
  }

  $('body').on('shown.bs.popover', '.a-js-persistPopover', function() {
    $('.popover-arrow').html('<style>.popover-big:after { left: ' + ($(this).offset().left + 10.5) + 'px !important; }</style>');
    $('html, body').animate({
      scrollTop: $('.a-js-persistPopover').offset().top - 50
    }, 250);

    // bind scroll wheel to modal popover
    if ($('.modal.show').length > 0) {
      $('.popover-big').bind('wheel', function(e) {
        var scrollTo;
        if (e.originalEvent.deltaY > 0 || e.originalEvent.deltaY < 0) {
          scrollTo = (e.originalEvent.deltaY) + $('.modal').scrollTop();
          $('.modal').scrollTop(scrollTo);
        }
      });
    }

    adjustBig();
  });

  // clean up modal page fix
  $('body').on('hidden.bs.popover', 'a-js-persistPopover', function(e) {
    $('.modalPage').css('padding-bottom', '0px');
  });

  $(window).scroll(adjustBig);
  $('.modal').scroll(adjustBig);
  $(window).resize(adjustBig);
};

/* globals AltinnLoader:true */

AltinnLoader = {
  addLoader: function($target) {
    if ($target.find('.loader-container').length === 0) {
      $target.prepend('<div class="loader-container"><div class="loader loader-ellipsis"></div></div>');
    }
  },

  removeLoader: function($target) {
    $target.find('.loader-container').remove();
  }
};

/* globals currentRequest, popoverLocalInit, AltinnModal */
/* globals AltinnModal:true, AltinnLoader */
AltinnModal = {
  closeModal: function(settings) {
    $('body').removeClass('a-modal-background-error a-displayNav');
    $('body').removeClass('a-modal-background-success');
    $(settings.target).modal('hide');
    $('body').append($('.a-stickyHelp-container'));
  },

  loadModal: function(settings) {
    var currentRequest = $.ajax({
      url: settings.url,
      beforeSend: function() {
        if (typeof currentRequest !== 'undefined') {
          currentRequest.abort();
        }

        AltinnLoader.addLoader($('body'));
      },
      data: settings.data
    }).always(function() {
    }).done(function(data) {
      var modalPage = $('<div/>', {
        class: 'modalPage',
        html: data
      });
      var page = $('<div/>', {
        class: 'a-page a-current-page',
        data: {
          pageIndex: 1,
          isSuccess: settings.isSuccess,
          isError: settings.isError,
          showModalNav: settings.showModalNav
        },
        html: modalPage
      });

      $('body').removeClass('a-modal-background-error a-displayNav');
      $('body').removeClass('a-modal-background-success');

      // if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      //   goToModalHeader();
      // }

      $(settings.target + ' .a-modal-content-target').append(page);
      $(settings.target).find('.a-current-page').first().data().enableDirtyPopover = settings.enableDirtyPopover;

      // Initialize with backdrop: static to prevent modal from closing when clicking outside,
      // and keyboard: false to prevent ESC from closing the modal
      $(settings.target).modal({
        backdrop: 'static',
        keyboard: false
      });

      $(settings.target).on('hidden.bs.modal', function() {
        $(settings.target + ' .a-modal-content-target').empty();
        $(settings.target).attr('aria-hidden', true);
        $('#altinnModal').siblings('.row').removeClass('d-none');
      });

      $(settings.target).on('shown.bs.modal', function() {
        $(settings.target).removeAttr('aria-hidden');
        $('#altinnModal').siblings('.row').addClass('d-none');
      });
      popoverLocalInit();

      if (settings.isError) {
        $('body').addClass('a-modal-background-error');
        if (settings.showModalNav) {
          $('body').addClass('a-displayNav');
        }
      } else if (settings.isSuccess) {
        $('body').addClass('a-modal-background-success');
      }

      AltinnLoader.removeLoader($('body'));
      // causes issues in IE11 (blinking quickhelp when modal is open)
      // $(settings.target).on('transitionend', function() {
      // $(settings.target).append($('.a-stickyHelp-container'));
      // });
    });
  },

  nextModalPageWithContent: function(settings) {
    var current;
    var modalPage = $('<div/>', {
      class: 'modalPage',
      html: settings.content
    });

    var existingPages;
    var newPage;
    var newPageIndex;

    existingPages = $(settings.target + ' :data(page-index)');

    if (settings.clearHistory) {
      newPageIndex = 1;
    } else {
      newPageIndex = existingPages.length + 1;
    }

    if (settings.clearHistory) {
      $(settings.target + ' :data(page-index)').not('.a-current-page').remove();
    }

    newPage = $('<div/>', {
      class: 'a-page a-next-page',
      data: {
        pageIndex: newPageIndex,
        isSuccess: settings.isSuccess,
        isError: settings.isError,
        showModalNav: settings.showModalNav
      },
      html: modalPage
    });

    // if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    //   goToModalHeader();
    // }

    $(settings.target + ' .a-modal-content-target').append(newPage);

    $(settings.target).animate({
      scrollTop: 0
    }, 20);

    current = $(settings.target + ' .a-current-page');

    setTimeout(function() {
      $('body').removeClass('a-modal-background-error a-displayNav');
      $('body').removeClass('a-modal-background-success');

      current.removeClass('a-current-page').addClass('a-previous-page');
      newPage.removeClass('a-next-page').addClass('a-current-page');
      $(newPage).data().enableDirtyPopover = settings.enableDirtyPopover;

      if (settings.isError) {
        $('body').addClass('a-modal-background-error');
        if (settings.showModalNav) {
          $('body').addClass('a-displayNav');
        }
      } else if (settings.isSuccess) {
        $('body').addClass('a-modal-background-success');
      }
    }, 0);

    current.on('transitionend', function() {
      if (settings.clearHistory) {
        $(settings.target + ' :data(page-index)').not('.a-current-page').remove();
      } else {
        current.hide().off();
      }
    });

    popoverLocalInit();
  },

  nextModalPage: function(settings) {
    var currentRequest = $.ajax({
      url: settings.url,
      beforeSend: function() {
        if (typeof currentRequest !== 'undefined') {
          currentRequest.abort();
        }
        AltinnLoader.addLoader($(settings.target).find('.a-current-page .a-modal-body'));
      },
      data: settings.data
    }).always(function() {
    }).done(function(data) {
      var current;
      var modalPage = $('<div/>', {
        class: 'modalPage',
        html: data
      });

      var existingPages;
      var newPage;
      var newPageIndex;

      existingPages = $(settings.target + ' :data(page-index)');

      if (settings.clearHistory) {
        newPageIndex = 1;
      } else {
        newPageIndex = existingPages.length + 1;
      }

      if (settings.clearHistory) {
        $(settings.target + ' :data(page-index)').not('.a-current-page').remove();
      }

      newPage = $('<div/>', {
        class: 'a-page a-next-page',
        data: {
          pageIndex: newPageIndex,
          isSuccess: settings.isSuccess,
          isError: settings.isError,
          showModalNav: settings.showModalNav
        },
        html: modalPage
      });

      // if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      //   goToModalHeader();
      // }

      $(settings.target + ' .a-modal-content-target').append(newPage);

      $(settings.target).animate({
        scrollTop: 0
      }, 20);

      current = $(settings.target + ' .a-current-page');

      setTimeout(function() {
        $('body').removeClass('a-modal-background-error a-displayNav');
        $('body').removeClass('a-modal-background-success');

        current.removeClass('a-current-page').addClass('a-previous-page');
        newPage.removeClass('a-next-page').addClass('a-current-page');
        $(newPage).data().enableDirtyPopover = settings.enableDirtyPopover;

        if (settings.isError) {
          $('body').addClass('a-modal-background-error');
          if (settings.showModalNav) {
            $('body').addClass('a-displayNav');
          }
        } else if (settings.isSuccess) {
          $('body').addClass('a-modal-background-success');
        }
      }, 0);

      current.on('transitionend', function() {
        if (settings.clearHistory) {
          $(settings.target + ' :data(page-index)').not('.a-current-page').remove();
        } else {
          current.hide().off();
        }

        AltinnLoader.removeLoader(current.find('.a-modal-body'));
      });

      popoverLocalInit();
    });
  },

  previousModalPage: function(settings) {
    var current;
    var allPages;
    var previous;
    var pagesToPop;
    var isError;
    var showModalNav;
    var isSuccess;

    if (!settings.pagesToPop) {
      pagesToPop = 1;
    } else {
      pagesToPop = settings.pagesToPop;
    }

    if ($(settings.target + ' .a-current-page').data('page-index') - pagesToPop <= 0) {
      $(settings.target).one('hidden.bs.modal', function() {
        $('body').removeClass('a-modal-background-error a-displayNav');
        $('body').removeClass('a-modal-background-success');
      });

      $(settings.target).modal('hide');
      return;
    }

    current = $(settings.target + ' .a-current-page');
    allPages = $(settings.target + ' :data(page-index)');
    previous = allPages.filter(function() {
      return $(this).data('page-index') === allPages.length - 1;
    });

    previous.show();
    isError = $(previous).data().isError;
    showModalNav = $(previous).data().showModalNav;
    isSuccess = $(previous).data().isSuccess;

    current.addClass('a-next-page');
    current.removeClass('a-current-page');

    // if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    //   goToModalHeader();
    // }

    setTimeout(function() {
      $('body').removeClass('a-modal-background-error a-displayNav');
      $('body').removeClass('a-modal-background-success');

      previous.addClass('a-current-page').removeClass('a-previous-page');

      if (isError) {
        $('body').addClass('a-modal-background-error');
        if (showModalNav) {
          $('body').addClass('a-displayNav');
        }
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
  },

  setCurrentPageIsDirty: function(target, state) {
    $(target).find('.a-current-page').first().data().isDirty = state;
  },

  init: function() {
    var that = this;
    $('body').on('click', '[data-toggle="altinn-modal"]', function() {
      var $source = $(this);
      if ($source.data().action === 'load') {
        that.loadModal({
          url: $source.data().url,
          target: $source.data().target,
          enableDirtyPopover: $source.data().enableDirtyPopover
        });
      } else if ($source.data().action === 'next') {
        that.nextModalPage({ url: $source.data().url,
          target: $source.data().target,
          isSuccess: $source.data().isSuccess,
          isError: $source.data().isError,
          showModalNav: $source.data().showModalNav,
          clearHistory: $source.data().clearHistory,
          enableDirtyPopover: $source.data().enableDirtyPopover });
      } else if ($source.data().action === 'back') {
        that.previousModalPage({
          target: $source.data().target,
          pagesToPop: $source.data().pages
        });
      } else if ($source.data().action === 'close') {
        that.closeModal({ target: $source.data().target });
      }
    });

    $('body').on('click', '.a-modal-back', function() {
      var $modal = $(this).closest('.a-modal');
      if ($modal.find('.a-current-page').first().data().enableDirtyPopover
        && $modal.find('.a-current-page').first().data().isDirty) {
        $(this).popover('show');
      } else {
        that.previousModalPage({ target: '#' + $modal[0].id });
      }
    });

    $('body').on('click', '.a-modal-close', function() {
      var $modal = $(this).closest('.a-modal');
      if ($modal.find('.a-current-page').first().data().enableDirtyPopover
        && $modal.find('.a-current-page').first().data().isDirty) {
        $(this).popover('show');
      } else {
        that.closeModal({ target: '#' + $modal[0].id });
      }
    });

    $('body').on('click', '.a-js-modal-dirtyBackBtn', function() {
      AltinnModal.previousModalPage({ target: '#' + $(this).closest('.a-modal')[0].id });
      $('button[aria-describedby=' + $(this).parent().parent().attr('id') + ']').popover('hide');
    });

    $('body').on('click', '.a-js-modal-dirtyCancelBtn', function() {
      $('button[aria-describedby=' + $(this).parent().parent().attr('id') + ']').popover('hide');
    });

    $('body').on('click', '.a-js-modal-dirtyCloseBtn', function() {
      AltinnModal.closeModal({ target: '#' + $(this).closest('.a-modal')[0].id });
      $('button[aria-describedby=' + $(this).parent().parent().attr('id') + ']').popover('hide');
    });

    function urlQuery(query) { // Parse current URL for query value
      var _query = query.replace(/[[]/, '[').replace(/[\]]/, '\\]');
      var expr = '[\\?&]' + _query + '=([^&#]*)';
      var regex = new RegExp(expr);
      var results = regex.exec(window.location.href);
      if (results !== null) {
        return results[1];
      }
      return false;
    }
    if (urlQuery('form') === '1') {
      AltinnModal.loadModal({
        url: '/hjelp/kontaktskjema-for-hjelp/',
        target: '#modal'
      });
    }
  }
};

/* globals
  setupExpandContent
*/
$('body').on('show.bs.collapse', '.a-collapsePanel-body', function() {
  var that = this;

  setTimeout(function() {
    var $collapsePanelHeader = $(that).siblings('.a-js-index-heading').first();
    var $msgIconWrapper = $collapsePanelHeader.find('.a-inboxHeadingContent')
    .find('.a-msgIconSecondary')
    .closest('.a-msgIconWrapper');

    $msgIconWrapper.find('.reg')
      .hide()
      .siblings('.a-msgIconSecondary')
      .show();

    $msgIconWrapper.find('span').attr('aria-hidden', true);
    $msgIconWrapper.find('span:last-of-type').removeAttr('aria-hidden');

    $('.a-collapsePanel').removeClass('expanded');
    $(that).closest('.a-collapsePanel').addClass('expanded');
    $('.a-js-index-heading').addClass('dim');
    $('.a-collapsePanel.expanded').find('.a-js-index-heading').removeClass('dim');
    setupExpandContent();
  }, 0);
});

$('body').on('hide.bs.collapse', '.a-collapsePanel-body', function() {
  var that = this;
  setTimeout(function() {
    var $collapsePanelHeader = $(that).siblings('.a-js-index-heading').first();
    $collapsePanelHeader.find('.a-inboxHeadingContent').removeClass('a-msgUnread');
    $(that).closest('.a-collapsePanel').removeClass('expanded');
    if ($('.a-collapsePanel.expanded').length === 0) {
      $('.a-js-index-heading').removeClass('dim');
    } else {
      $collapsePanelHeader.addClass('dim');
    }
  }, 0);
});

/* globals
  fixPatternLinks,
  AltinnModal,
  setupTruncateLines
*/
window.altinnettInit = function() {
  // Only for prototyping
  fixPatternLinks();

  // Should also be included in production (dist)
  AltinnModal.init();
  setupTruncateLines();
};

window.altinnettInit();
