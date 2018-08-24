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

/*
Search datatable with highlight using external package mark.js
Search field needs attribute data-search-algorithm="show-and-highlight"
Searchable elements need attribute data-searchable="true"
List elements that should be ignored during search need the class a-js-ignoreDuringSearch
*/
var mark = function() {
  var $elements;
  var input = $(this).val();
  var options = {
    // comment out to ignore html tags in searchable strings
    // ie: string1 <tag>string2</tag>
    separateWordSearch: false
  };

  $.each(this.dataset.searchTarget.split(','), function() {
    // Reset visibility of all rows
    var target = '#' + this.toString();

    $(target + ' li:not(.a-js-ignoreDuringSearch):not(.a-list-header)').show();

    $(target).find('*[data-searchable="true"]').unmark().mark(input, options);

    // Hide unmarked rows
    if (input.length > 0) {
      $elements = $(target + ' li:not(.a-js-ignoreDuringSearch):not(.a-list-header)');
      $elements.each(function() {
        if ($(this).find('mark').length === 0) {
          $(this).hide();
        }
      });
    } else {
      $elements = null;
    }

    if (!$elements || $elements.find('mark').length > 0) {
      $(target + ' .a-js-noSearchResults').closest('li').hide();
    } else {
      $(target + ' .a-js-noSearchResults-phrase').text(input);
      $(target + ' .a-js-noSearchResults').closest('li').show();
    }
  });
};

var initSearchWithHighlight = function() {
  $('.a-js-noSearchResults').closest('li').hide();
  $('input[data-search-algorithm="show-and-highlight"]').on('input', mark);
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
    template: '<div class="popover" role="popover" tabindex="0"><div class="arrow"></div><div class="popover-body"></div></div>'
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
  $('[data-toggle="dropdown"]').on('click', function(e) {
    if (window.innerWidth < 992) {
      $('.a-dropdown-overflow-menu-right').removeClass('dropdown-menu-right');
    } else {
      $('.a-dropdown-overflow-menu-right').addClass('dropdown-menu-right');
    }
  });

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

  // hides popover when the cehckbutton is checked
  $('body').on('focus', '[data-toggle="popover"].sr-only', function(e) {
    if ($(this).is(':checked')) {
      $(this).popover('hide');
    } else {
      $(this).popover('show');
    }
  });

  // show/hide popover on checkbutton change
  $('body').on('change', 'a-switch[data-toggle=popover]', function() {
    if ($(this).is(':checked')) {
      $(this).popover('hide');
    } else {
      $(this).popover('show');
    }
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
    $('.arrow').html('<style>.popover-big:after { left: ' + ($(this).offset().left + 10.5) + 'px !important; }</style>');
    $('html, body').animate({
      scrollTop: $('.a-js-persistPopover').offset().top - 50
    }, 250);

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
    $('button.a-modal-back').attr('disabled', true);
    $('button.a-modal-close').attr('disabled', true);
  },

  removeLoader: function($target) {
    $target.find('.loader-container').remove();
    $('button.a-modal-back').attr('disabled', false);
    $('button.a-modal-close').attr('disabled', false);
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

/* globals $ */
var feedbackToggle = function() {
  if ($('.a-js-feedbackToggle').length > 0) {
    $('.a-js-feedbackToggle').closest('fieldset').next().hide();
    $('.a-js-feedbackToggle').closest('fieldset').next().next()
      .hide();
    $('.a-js-feedbackToggle').closest('fieldset').next().next()
      .next()
      .hide();
    $('.a-js-feedbackToggle').each(function() {
      $(this).find('input[type=radio]').change(function() {
        if ($(this).val() === 'radio1' && $(this).is(':checked')) {
          $(this).closest('fieldset').next().show();
          $(this).closest('fieldset').next().next()
            .hide();
          $(this).closest('fieldset').next().next()
            .next()
            .hide();
        } else if ($(this).val() === 'radio2' && $(this).is(':checked')) {
          $(this).closest('fieldset').next().hide();
          $(this).closest('fieldset').next().next()
            .show();
          $(this).closest('fieldset').next().next()
            .next()
            .show();
        }
      });
      $(this).closest('form').find('button').on('click', function() {
        $(this).closest('fieldset').next().show();
        $(this).closest('fieldset').next().next()
          .hide();
        $(this).closest('fieldset').next().next()
          .next()
          .hide();
      }.bind(this));
    });
  }
};

/* globals $ */
var handleFocus = function() {
  // If state on input is 'focus', add class to a-input: 'a-input-focus'
  $('body').on('focus', 'input.form-control', function() {
    $(this).parent().addClass('a-input-focus');
  });

  $('body').on('blur', 'input.form-control', function() {
    $(this).parent().removeClass('a-input-focus');
  });

  $('.a-radioButtons-stackedList').find('input[type=radio]').change(function() {
    var me = $(this);
    if (me.is(':checked')) {
      me.parent().addClass('a-js-radioParentGray');
      $('input[type=radio]').each(function() {
        if ($(this).attr('id') !== me.attr('id') &&
          $(this).attr('name') === me.attr('name')) {
          $(this).parent().removeClass('a-js-radioParentGray');
        }
      });
    }
  });
};

/* globals compareTo */
var sortListAlphanumerically = function(src, sortIndex) {
  var $list = $(src).closest('.a-list-container').find('.a-list');
  var rows = $list.find('li:not(.a-list-header)');
  var reverse;

  var active = $(src).hasClass('a-active');
  if (!active) {
    $(src).closest('.a-list-container').find('.a-list-sortHeader').removeClass('a-active')
      .removeClass('a-js-reverse-sort');
    $(src).addClass('a-active');
  } else {
    $(src).toggleClass('a-js-reverse-sort');
  }

  reverse = $(src).hasClass('a-js-reverse-sort');

  rows.sort(function(a, b) {
    var A = $($($($(a).children()[0]).children()[sortIndex]).find('.a-js-sortValue')[0]).text()
      .toUpperCase();
    var B = $($($($(b).children()[0]).children()[sortIndex]).find('.a-js-sortValue')[0]).text()
      .toUpperCase();
    return reverse ? compareTo(B, A) : compareTo(A, B);
  });

  $.each(rows, function(index, row) {
    if ($(row).find('.a-js-sortValue').length > 0) {
      $list.append(row);
    }
  });

    // handles load more row
  $.each(rows, function(index, row) {
    if ($(row).find('.a-js-sortValue').length === 0) {
      $list.append(row);
    }
  });
};

var defaultListSort = function() {
  $('.a-list-container').each(function() {
    var sortHeader = $(this).find('.a-list-sortHeader')[0];
    var index = $(sortHeader).index();
    sortListAlphanumerically(sortHeader, index);
  });
};

var addListSortHandler = function() {
  $('.a-list-sortHeader').on('click', function() {
    var index = $(this).index();
    sortListAlphanumerically(this, index);
  });

  defaultListSort();
};

var addListExpandHandler = function() {
  $('body').on('click', '.a-list *[data-toggle="collapse"]', function() {
    // This script runs before the bootstrap collapse handler, so the collapsed-class will still be
    // present even though the content is about to be expanded
    if ($(this).hasClass('collapsed')) {
      $(this).closest('li').addClass('a-expanded');
      $(this).closest('li').siblings().removeClass('a-expanded');
    } else {
      $(this).closest('li').removeClass('a-expanded');
    }
  });
};

var compareTo = function(firstItem, secondItem) {
  var first;
  var second;
  if (firstItem === undefined && secondItem === undefined) {
    return 0;
  }
  if (firstItem === undefined) {
    return 1;
  }
  if (secondItem === undefined) {
    return -1;
  }

  first = firstItem.toString();
  second = secondItem.toString();
  if (first < second) {
    return -1;
  }

  if (first > second) {
    return 1;
  }
  return 0;
};

/* globals $ */

var newsArchive = function() {
  var page = 1;
  var numberOfItemsPerPage = 5;
  var rootSelector = '.a-newsArchive';
  var articleCssSelector = '.a-linkArticle';
  var $loadMoreButton = $('.a-btn-loadMore');
  var articlesCount = $(articleCssSelector).length;

  function visibleItems() {
    return page * numberOfItemsPerPage;
  }

  function setButtonVisibility() {
    if (articlesCount <= visibleItems()) {
      $loadMoreButton.hide();
    }
  }

  if ($(rootSelector).length > 0) {
    $loadMoreButton.on('click', function() {
      var articles;
      page += 1;
      $(':nth-child(n+' + (visibleItems() + 1) + ')' + articleCssSelector).hide();
      $(':nth-child(-n+' + visibleItems() + ')' + articleCssSelector).show();
      setButtonVisibility();
    });

    setButtonVisibility();
  }
};

/* globals mobileNavigation */
$('.an-dropdown-navigationMenu').on('click', 'button[data-toggle="collapse"]', function(event) {
  event.preventDefault();
  event.stopPropagation();
  $($(this).data('target')).collapse('toggle');
});

/* globals $ */
var subscribe = function() {
  var validate = function(elem, skipVal) {
    var re = new RegExp(elem.attr('data-val-regex-pattern'));
    if (re.test(elem.val())) {
      elem.closest('.a-card').find('button').removeAttr('disabled')
        .removeClass('disabled');
    } else {
      elem.closest('.a-card').find('button').attr('disabled', 'disabled')
        .addClass('disabled');
    }
  };
  if ($('.a-js-subscribe').length > 0) {
    $('.a-js-subscribe').each(function() {
      var _this = $(this);
      _this.closest('.a-card').find('.a-js-finishText').hide();
      _this.closest('.a-card').find('.a-js-altText').hide();
      _this.find('input').on('input', function() {
        validate($(this));
      });
      _this.find('input').on('keypress', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
          e.preventDefault();
          if (!_this.find('button').hasClass('disabled')) {
            _this.find('button').trigger('click');
          }
        }
      });
      _this.find('button').on('click', function() {
        var __this = $(this);
        _this.find('.a-form-group-items.input-group').addClass('disabled')
          .addClass('a-input-approved');
        _this.find('input').attr('disabled', 'disabled');
        _this.closest('.a-card').find('.a-js-finishText').show();
        _this.closest('.a-card').find('.a-js-altText').hide();
        __this.hide();
        $('.a-js-undo').on('click', function() {
          _this.find('.a-form-group-items.input-group').removeClass('disabled')
            .removeClass('a-input-approved');
          _this.find('input').removeAttr('disabled');
          _this.closest('.a-card').find('.a-js-finishText').hide();
          _this.closest('.a-card').find('.a-js-altText').show();
          __this.show();
        });
      });
    });
  }
};

/* globals
  setupExpandContent
*/
$('body').on('show.bs.collapse', '.a-collapsePanel-body', function(e) {
  var that = this;
  if ($(e.target).hasClass('a-collapsePanel-body')) {
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
  }
});

$('body').on('hide.bs.collapse', '.a-collapsePanel-body', function(e) {
  var that = this;
  if ($(e.target).hasClass('a-collapsePanel-body')) {
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
  }
});

$('.a-js-collapseInboxMessage').click(function() {
  $('div.card.a-accordion-card.a-collapsePanel.expanded a[data-toggle="collapse"]').click();
});

/* globals $ */
var questionnaireInteraction = function() {
  $('.a-trigger-question').each(function() {
    $(this).find('input').on('change', function() {
      $(this).parent().parent().parent()
        .parent()
        .next()
        .css('display', 'block');
    });
  });
};

/* globals $ */
var initializeDatepicker = function() {
  var today = ('0' + new Date().getDate()).slice(-2) + '.' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '.' + new Date().getFullYear();

  var returnUserLanguageNumericCodeFromCookie = function(cookies, cname) {
    var name = cname + '=';
    var decodedCookies = decodeURIComponent(cookies);
    var splitCookies = decodedCookies.split(';');
    var i;
    var c;
    for (i = 0; i < splitCookies.length; i++) {
      c = splitCookies[i];
      if (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0 && c.indexOf('UL') > 0) {
        return c.substring(c.indexOf('UL') + 3);
      }
    }
    return null;
  };

  var returnLanguageCodeFromNumericCode = function(numeric) {
    var lang;
    switch (numeric) {
    // bokmål
    case '1044':
      return 'no';
    // engelsk
    case '1033':
      return 'en';
    // nynorsk
    case '2068':
      return 'nn';
    default:
      return 'no';
    }
  };

  var ulNumeric = returnUserLanguageNumericCodeFromCookie(document.cookie, 'altinnPersistentContext');
  var userLanguage = returnLanguageCodeFromNumericCode(ulNumeric);

  if ($('.a-overlay-container').length > 0) {
    $('.a-overlay-container').attr('id', 'picker-container');
  } else {
    $('body').attr('id', 'picker-container');
  }

  $('.form-control.date').each(function() {
    $(this).val($(this).val() || today);
  });
  $('.form-control.date').datepicker({
    format: 'dd.mm.yyyy',
    language: userLanguage,
    todayHighlight: true,
    orientation: 'bottom left',
    autoclose: true,
    maxViewMode: 0,
    container: '#picker-container',
    templates: {
      leftArrow: '<i class="ai ai-back"></i>',
      rightArrow: '<i class="ai ai-arrowright"></i>'
    }
  }).on('show', function(e) {
    $('.datepicker').find('table').attr('cellpadding', '0');
    $('.datepicker').find('table').attr('cellspacing', '0');
  });
  if ($('.form-control.date').length > 0) {
    $('body').on('click', function(e) {
      $('.datepicker').hide();
    });
    $('.form-control.date').on('click', function(e) {
      e.stopPropagation(); e.preventDefault();
    });
    $('.datepicker').on('click', function(e) {
      e.stopPropagation(); e.preventDefault();
    });
  }
};

var setValidatorSettings = function() {
  var defaultOptions = {
    highlight: function(element, errorClass, validClass) {
      $(element).closest('.form-group').addClass(errorClass);
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).closest('.form-group').removeClass(errorClass);
    },
    focusInvalid: false
  };
  $.validator.setDefaults(defaultOptions);
  $.validator.unobtrusive.options = {
    errorClass: 'has-error'
  };
};

/* globals $ */
function setupFormValidation(formId, buttonId) {
  var $submitBtn = $(buttonId);
  var wasSubmitted = false;
  var storedString = '';
  var validDropdown = function(el) {
    if (
      el.attr('required') !== undefined && el.attr('required') === 'required' &&
      el.attr('data-dropdowndefaultvalue') === el.find('.a-form-text').text()
    ) {
      el.closest('.a-form-group').addClass('has-error').find('.a-message-error').css('display', 'table');
    } else {
      el.closest('.a-form-group').removeClass('has-error').find('.a-message-error').css('display', 'none');
    }
  };
  var validAllDropdowns = function() {
    var invalids = [];
    $('.a-js-dropdownToValidate').each(function(index, el) {
      if (
        $(el).attr('required') !== undefined && $(el).attr('required') === 'required' &&
        $(el).attr('data-dropdowndefaultvalue') === $(el).find('.a-form-text').text()
      ) {
        invalids.push(index);
      }
    });
    return invalids.length === 0;
  };
  var validAllReferancials = function() {
    var invalids = [];
    $('.a-js-validateThisAgainstPrev').each(function(index, el) {
      if (
        $(el).closest('.a-form-group').hasClass('has-error')
      ) {
        invalids.push(index);
      }
    });
    return invalids.length === 0;
  };
  var validateBackwards = function(el) {
    if (el.prev().find('.a-js-dropdownToValidate').length > 0) {
      validDropdown(el.prev().find('.a-js-dropdownToValidate'));
      validateBackwards(el.prev());
    } else if (el.prev().hasClass('form-group')) {
      if (el.prev().find('input:not(.a-js-validateThisAgainstPrev)').length > 0) {
        el.prev().find('input:not(.a-js-validateThisAgainstPrev)').valid();
      }
      if (el.prev().find('.a-js-validateThisAgainstPrev').length > 0) {
        el.prev().find('.a-js-validateThisAgainstPrev').trigger('change');
      }
      if (el.prev().find('textarea').length > 0) {
        el.prev().find('textarea').valid();
      }
      validateBackwards(el.prev());
    }
  };
  var validateAgainstPrev = function() {
    if ($(this).closest('.form-group').prev().find('.a-message-error')
      .text() !== '') {
      $(this).closest('.form-group').find('.a-message-error').text(
        $(this).closest('.form-group').prev().find('.a-message-error')
          .text()
      );
      storedString = $(this).closest('.form-group').prev().find('.a-message-error')
        .text();
    } else {
      $(this).closest('.form-group').find('.a-message-error').text(
        storedString
      );
    }
    if ($(this).val() !==
      $(this).closest('.form-group').prev().find('input')
        .val() || $(this).val() === '') {
      setTimeout(function() {
        $(this).closest('.a-form-group').addClass('has-error').find('.a-message-error')
          .css('display', 'table');
      }.bind(this), 0);
    } else {
      $(this).closest('.a-form-group').removeClass('has-error').find('.a-message-error')
        .css('display', 'none');
    }
  };

  var validateForm = function() {
    var str;
    if ($(formId).validate().checkForm() && validAllDropdowns() && validAllReferancials()) {
      $submitBtn.prop('disabled', false);
      $submitBtn.removeClass('disabled');
    } else {
      $submitBtn.prop('disabled', 'disabled');
      $submitBtn.addClass('disabled');
    }

    if (!wasSubmitted) {
      $(formId).validate().submitted = {};
    }
  };

  $(formId + ' .a-js-dropdownToValidate').each(function() {
    $(this).attr('data-dropdowndefaultvalue', $(this).find('.a-form-text').text());
  });

  if (!buttonId) {
    $submitBtn = $(formId + ' button[type="submit"]');
  }
  $.validator.unobtrusive.parse($(formId));

  $submitBtn.addClass('disabled');
  $submitBtn.prop('disabled', 'disabled');

  $(formId).on('blur input change', '*', validateForm);

  $(formId + ' .a-js-dropdownToValidate').next().on('click', function() {
    setTimeout(function() {
      validDropdown($(this).prev());
    }.bind(this), 0);
    validateBackwards($(this).closest('.form-group'));
  });

  $(formId + ' .a-js-dropdownToValidate').on('blur', function() {
    validDropdown($(this));
    validateBackwards($(this).closest('.form-group'));
  });
  $('.a-js-certificateContainer').on('focus', function() {
    $('.a-js-certificateContainer').closest('label').addClass('a-custom-fileupload--focused');
  });
  $('.a-js-certificateContainer').on('blur', function() {
    $('.a-js-certificateContainer').closest('label').removeClass('a-custom-fileupload--focused');
  });
  $('.a-js-validateThisAgainstPrev').each(function() {
    storedString = $(this).closest('.form-group').prev().find('input')
      .attr('data-val-regex');
  });

  $(formId + ' .form-control').not('.a-js-validateThisAgainstPrev').on('blur change', function() {
    var $nextInput = $('#text-input-epost1').closest('.form-group').next().find('.a-js-validateThisAgainstPrev');
    if ($nextInput.length > 0 && $nextInput.val() !== '') {
      validateAgainstPrev.bind($nextInput)();
      setTimeout(function() {
        validateForm();
      }, 0);
    }
  });
  $('.a-js-validateThisAgainstPrev').on('keyup', function(e) {
    var hasError = $(this).closest('.form-group').hasClass('has-error');
    e.stopPropagation();
    if (hasError) {
      validateAgainstPrev.bind(this)();
    }
  });

  $('.a-js-validateThisAgainstPrev').on('change blur', function(e) {
    e.stopPropagation();
    validateAgainstPrev.bind(this)();
  });
}

var setupSlickCarousel = function() {
  if ($('.an-slideshow').length) {
    $(document).ready(function() {
      $('.an-slideshow__list').slick({
        infinite: false
      });
      $('.slick-prev').css('display', 'none');
      $('.slick-arrow').click(function() {
        $('.slick-prev').removeAttr('style');
        if (Number($('.slick-current').attr('data-slick-index')) === 0) {
          $('.slick-prev').css('display', 'none');
        }
        if ($('.slick-slide').length - 1 === Number($('.slick-current').attr('data-slick-index'))) {
          $('.slick-next').css('display', 'none');
        } else {
          $('.slick-next').removeAttr('style');
        }
      }
    );
    });
  }
};

/* globals
  fixPatternLinks,
  initSearchWithHighlight,
  AltinnModal,
  addListSortHandler,
  initializeDatepicker,
  compareTo,
  feedbackToggle,
  handleFocus,
  addListExpandHandler
  newsArchive,
  popoverGlobalInit,
  popoverLocalInit,
  setupTruncateLines,
  subscribe,
  questionnaireInteraction,
  setupFormValidation,
  setValidatorSettings,
  setupSlickCarousel,
*/
window.altinnettInit = function() {
  // Only for prototyping
  fixPatternLinks();
  initSearchWithHighlight();

  // Should also be included in production (dist)
  AltinnModal.init();
  addListSortHandler();
  initializeDatepicker();
  compareTo();
  feedbackToggle();
  handleFocus();
  addListExpandHandler();
  newsArchive();
  popoverGlobalInit();
  popoverLocalInit();
  setupTruncateLines();
  subscribe();
  questionnaireInteraction();
  setupFormValidation();
  setValidatorSettings();

  function setupForm() {
    $('body').off('focus', '#contactForm', setupForm);
    setupFormValidation('#contactForm', '#a-js-contactForm-submit');
  }

  $('body').on('focus', '#contactForm', setupForm);
  setupSlickCarousel();
};

window.altinnettInit();
