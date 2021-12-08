var cardsToggle = function() {
  $('.a-box-button').on('click', function() {
    $(this).blur(); // remove blue background on expanded cards
  });
};

var onFileInputChange = function() {
  $('.a-js-fileInputChangeHandler').on('focus', function() {
    $('.a-js-fileInputChangeHandler').closest('label').addClass('a-custom-fileupload--focused');
  });
  $('.a-js-fileInputChangeHandler').on('blur', function() {
    $('.a-js-fileInputChangeHandler').closest('label').removeClass('a-custom-fileupload--focused');
  });
};

var onFileListDeleteClick = function(src) {
  var $fileListContainer = $(src).closest('.a-js-fileListContainer');
  $fileListContainer.prev().find('input').val('');
  $fileListContainer.hide();
  $fileListContainer.prev().show(); // show file upload btn
};

/* globals $ */
var formatOrgNr = function() {
  $('.a-js-orgNr').on('keyup', function() {
    var number;
    this.value = this.value.replace(/ /g, '');
    number = this.value;
    this.value = number.replace(/(.{3})/g, '$1 ').trim();
  });
};

/* globals goBack */
var onConfirmDeletionClick = function() {
  var $list = $('ul[data-list-selectable="true"]');
  var $segmentDone = $('.segment-done');
  var goToReceipt = false;

  if ($list.find('li.a-selected:not(.a-list-header)').length === $list.find('li:not(.a-list-header)').length) {
    goToReceipt = true;
  } else {
    $list.find('li.a-selected')
      .addClass('a-deleted')
      .addClass('a-disabled')
      .removeClass('a-selected')
      .removeAttr('tabindex');
    $segmentDone.hide();
  }

  return goToReceipt;
};

var handleModalClose = function(src, targetUrl) {
  var hasSelectedRows = $('ul[data-list-selectable="true"] li.a-selected:not(.a-list-header)').length > 0;
  if (!hasSelectedRows) {
    $(src).popover('disable');
    location.href = targetUrl;
  }
};

var setupListRowSelect = function() {
  var $list = $('ul[data-list-selectable="true"]');
  var $segmentDone = $('.segment-done');

  $list.on('click', 'li.a-selectable:not(.a-list-header)', function() {
    if (!$(this).hasClass('a-deleted')) {
      $(this).toggleClass('a-selected');
      if ($list.find('li.a-selected').length > 0) {
        $segmentDone.show();
      } else {
        $segmentDone.hide();
      }
    }
  });

  $('.a-js-add-remove-all').on('click', function() {
    if ($list.find('li.a-selected:not(.a-list-header)').length === $list.find('li:not(.a-list-header)').length) {
      $list.find('li:not(.a-list-header)').removeClass('a-selected');
      $segmentDone.hide();
    } else {
      $list.find('li:not(.a-list-header)').addClass('a-selected');
      $segmentDone.show();
    }
  });

  $('.a-js-cancel-deletion').on('click', function() {
    $list.find('li:not(.a-list-header)').removeClass('a-selected');
    $segmentDone.hide();
  });
};

var removeListRow = function(src) {
  if (src) {
    $(src).remove();
  }
};

// Toggles between two components.
// Each toggable component needs to be referenced by id from data-switch-target attribute of switch
var toggleSwitch = function() {
  var $allWithTarget = $('.switch-container input[data-switch-target]');
  var allTargets = [];
  $.each($allWithTarget, function() {
    $.each($(this).data('switch-target'), function() {
      allTargets.push(this + '');
    });
  });

  $allWithTarget.on('click', function() {
    var $currentSwitch = $(this);
    var switchTargets = $currentSwitch.data('switch-target');

    $.each(switchTargets, function() {
      $('#' + this).show();
    });

    $.each(allTargets, function() {
      var hide = true;
      var outerTarget = this + '';

      $.each(switchTargets, function() {
        var innerTarget = this + '';
        if (outerTarget === innerTarget) {
          hide = false;
        }
      });

      if (hide) {
        $('#' + this).hide();
      }
    });
  });
};

var truncateToNumberOfLines = function(element) {
  var originalText = $(element).find('.sr-only').text();
  var $innerText = $(element).find('.a-js-inner-text');
  var containerHeight = $(element).height();
  var containerWidth = $(element).width();
  var i;

  for (i = 0; i < 500; i++) {
    if ($innerText.outerHeight() >= (containerHeight + 5) ||
    $innerText.outerWidth() >= (containerWidth)) {
      $innerText.text($innerText.text().trim().replace(/\s*.{4}$/, '...'));
    } else {
      break;
    }
  }
};

var truncateAllBoxButtons = function() {
  $('.a-box-button-name').filter(':visible').each(function() {
    truncateToNumberOfLines($(this));
  });
  if ($('.a-box-button-name').length > 0) {
    $(window).off('resize', truncateAllBoxButtons);
    $(window).resize(truncateAllBoxButtons);
  }
};

var truncateBoxButtonNames = function() {
  truncateAllBoxButtons();

  $('.a-collapsePanel-body').on('shown.bs.collapse', function() {
    truncateAllBoxButtons();
  });

  $(document).on('click', '.a-box-button', function(e) {
    truncateAllBoxButtons();
  });
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

var setupSelectableCheckbox = function() {
  $('body').on('change', '.a-js-selectable-checkbox', function() {
    if ($(this).is(':checked')) {
      $(this).closest('.a-selectable').addClass('a-selected');
    } else {
      $(this).closest('.a-selectable').removeClass('a-selected');
    }
  });

  $('body').on('focus', '.a-js-selectable-checkbox', function() {
    $(this).closest('.a-selectable').addClass('a-focus');
  });

  $('body').on('blur', '.a-js-selectable-checkbox', function() {
    $(this).closest('.a-selectable').removeClass('a-focus');
  });
};

/* eslint vars-on-top: 0 */
/* globals AltinnDropdown */
/* globals AltinnDropdown:true */
AltinnDropdown = {
  init: function() {
    var that = this;
    $('body').on('click', '[data-toggle="altinn-dropdown"] .a-dropdown-item', function() {
      var $dropdownElement = $(this).closest('[data-toggle="altinn-dropdown"]');
      if ($(this).data('value')) {
        $dropdownElement.find('.a-js-altinnDropdown-value').val($(this).data('value'));
      }

      $dropdownElement.find('.a-dropdown-toggle').html($(this).html());

      // Focus the dropdownmenu element after click on item in dropdownmenu
      var id = $(this).closest('.a-dropdown-menu').attr('aria-labelledby');
      $('#' + id).focus();
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

/* globals jQuery */
/* eslint dot-notation: "warn" */
(function($) {
  $.fn.datepicker.dates['nn'] = {
    days: ['sundag', 'måndag', 'tysdag', 'onsdag', 'torsdag', 'fredag', 'laurdag'],
    daysShort: ['sun', 'mån', 'tys', 'ons', 'tor', 'fre', 'lau'],
    daysMin: ['su', 'må', 'ty', 'on', 'to', 'fr', 'la'],
    months: ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'],
    monthsShort: ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'],
    today: 'i dag',
    monthsTitle: 'Månadar',
    clear: 'Nullstill',
    weekStart: 1,
    format: 'dd.mm.yyyy'
  };
}(jQuery));

/* globals jQuery */
/* eslint dot-notation: "warn" */
(function($) {
  $.fn.datepicker.dates['no'] = {
    days: ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
    daysShort: ['søn', 'man', 'tir', 'ons', 'tor', 'fre', 'lør'],
    daysMin: ['sø', 'ma', 'ti', 'on', 'to', 'fr', 'lø'],
    months: ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'],
    monthsShort: ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'],
    today: 'i dag',
    monthsTitle: 'Måneder',
    clear: 'Nullstill',
    weekStart: 1,
    format: 'dd.mm.yyyy'
  };
}(jQuery));

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

function showPassword(src, target) {
  var pwd = $('#' + target);
  if (pwd.attr('type') === 'text') {
    pwd.attr('type', 'password');
    $(src).children('.hide-password-text').hide();
    $(src).children('.show-password-text').show();
  } else {
    pwd.attr('type', 'text');
    $(src).children('.hide-password-text').show();
    $(src).children('.show-password-text').hide();

    setTimeout(function() {
      pwd.attr('type', 'password');
      $(src).children('.hide-password-text').hide();
      $(src).children('.show-password-text').show();
    }, 15000);
  }
}

function setVisibility(passwordField, showPasswordId) {
  var password = $(passwordField);
  if (password.val().length > 0) {
    $('#' + showPasswordId).removeClass('d-none');
  } else {
    $('#' + showPasswordId).addClass('d-none');
  }
}

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
      $(settings.target).trigger('loaded.altinn.modal');
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
    $(settings.target).trigger('loaded.altinn.modal');

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
      $(settings.target).trigger('loaded.altinn.modal');

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

/* globals $ */
var toggleFilter = function() {
  $('.a-collapse-title').on('keyup', function(e) {
    var key = e.which;
    if (key === 13) {
      e.stopImmediatePropagation(); e.stopPropagation(); e.preventDefault();
      $(e.target).trigger('mouseup');
    } else if (key === 9) {
      if ($($(e.target).attr('data-target')).hasClass('show')) {
        $($(e.target).attr('data-target')).find('.a-switch').eq(0)
          .trigger('focus');
      }
    }
  });
};

/* globals currentRequest, AltinnQuickhelp */
/* globals AltinnQuickhelp:true */
AltinnQuickhelp = {
  listeners: function(target) {
    var that = this;
    $('.a-stickyHelp-search').find('input').on('keyup', function(e) {
      var keyCode = e.keyCode || e.which;
      if (keyCode === 13 && encodeURIComponent($(this)[0].value).length > 0) {
        that.nextquickhelpPage({
          url: $('#a-stickyHelp').attr('data-api') +
            encodeURIComponent($(this)[0].value) + '/' + $('html').attr('lang'),
          target: target
        });
      }
    });
    $('.a-stickyHelp-search').find('button').on('click', function(e) {
      if (encodeURIComponent($('.a-js-stickyhelpSearch')[0].value).length > 0) {
        that.nextquickhelpPage({
          url: $('#a-stickyHelp').attr('data-api') +
            encodeURIComponent($('.a-js-stickyhelpSearch')[0].value) + '/' +
            $('html').attr('lang'),
          target: target
        });
      }
    });
  },
  nextquickhelpPage: function(settings) {
    var currentRequest = $.ajax({
      url: settings.url,
      beforeSend: function() {
        if (typeof currentRequest !== 'undefined') {
          currentRequest.abort();
        }
      }
    }).done(function(data) {
      var quickhelpPage = $('<div/>', { class: 'quickhelpPage', html: data });
      var current; var existingPages; var newPage; var newPageIndex;
      existingPages = $(settings.target + ' :data(page-index)');
      newPageIndex = existingPages.length + 1;
      newPage = $('<div/>', {
        class: 'a-page a-next-page',
        data: { 'page-index': newPageIndex },
        html: quickhelpPage
      });
      $(settings.target + ' .a-stickyHelp-content-target').append(newPage);
      $(settings.target).animate({ scrollTop: 0 }, 20);
      current = $(settings.target + ' .a-current-page');
      setTimeout(function() {
        current.removeClass('a-current-page').addClass('a-previous-page');
        newPage.removeClass('a-next-page').addClass('a-current-page');
        $(newPage).data();
      }, 0);
      current.on('transitionend', function() {
        if (settings.clearHistory) {
          $(settings.target + ' :data(page-index)').not('.a-current-page')
            .remove();
        } else {
          current.off();
        }
      });
      $('#a-js-stickyHelp-back').addClass('d-block');
    });
  },
  previousquickhelpPage: function(settings) {
    var current; var allPages; var previous; var pagesToPop;
    if (!settings.pagesToPop) {
      pagesToPop = 1;
    } else {
      pagesToPop = settings.pagesToPop;
    }
    current = $(settings.target + ' .a-current-page');
    allPages = $(settings.target + ' :data(page-index)');
    previous = allPages.filter(function() {
      return $(this).data('page-index') === allPages.length - 1;
    });
    previous.addClass('a-current-page').removeClass('a-next-page');
    current.removeClass('a-current-page').addClass('a-next-page');
    setTimeout(function() {
      previous.addClass('a-current-page').removeClass('a-previous-page');
    }, 0);
    current.on('transitionend', function() {
      var previousPages = allPages.filter(function() {
        return $(this).data('page-index') > allPages.length - pagesToPop;
      });
      previousPages.remove();
    });
    if (allPages.length === 2) {
      $('#a-js-stickyHelp-back').removeClass('d-block');
    }
  },
  init: function() {
    var that = this; that.listeners('#a-stickyHelp');
    $('body').on('click', '[data-toggle="quickhelp"]', function() {
      var $source = $(this);
      if ($source.data().action === 'next') {
        that.nextquickhelpPage({
          url: $source.data().url, target: $source.data().target
        });
      } else if ($source.data().action === 'back') {
        that.previousquickhelpPage({
          target: $source.data().target, pagesToPop: $source.data().pages
        });
      }
    });
    $('.a-current-page').data({ 'page-index': 1 });
    $('.a-js-stickyHelpCategory')
      .html($('#a-stickyHelp').find('.a-stickyHelp-content-target')
        .attr('data-category')
      );
    $('.a-js-stickyHelpCategoryLink').attr('data-url', $('#a-stickyHelp')
      .find('.a-stickyHelp-content-target').attr('data-url')
    );
    $('body').on('click', '.a-stickyHelp-open', function() {
      if (!$('.a-js-stickyHelpFrame').attr('src')) {
        $('.a-js-stickyHelpFrame')
          .attr('src', $('.a-js-stickyHelpFrame').attr('data-src'));
      }
    });
    if ($('.quickhelpPage').find('.a-text').length !== 0) {
      $('.quickhelpPage').parent('.a-page').addClass('a-page-hasArticleInside');
    }
  }
};

/* globals mobileNavigation */
var wasDark = $('header').hasClass('a-darkBackground');
var action = function(e) {
  if ($(e.target).closest('.a-globalNav-main').length === 0 &&
  $(e.target).closest('.navbar-toggler').length === 0) {
    if ($('.a-globalNav-main').is(':visible')) {
      $('.navbar-toggler').attr('data-jsexpanded', 'false');
      $('.a-globalNav-main').hide();
      $('body').css('background-color', '');
      if (wasDark) {
        $('header').addClass('a-darkBackground');
        $('.a-globalNav-logo').find('img')
          .attr('src', $('.a-globalNav-logo').find('img').attr('src').replace('blue', 'white'));
      }
      $('.a-page').children(':not(header)').removeClass('a-js-hidden');
    }
  } else if ($(e.target).closest('.navbar-toggler').length > 0) {
    if ($('.a-globalNav-main').is(':visible')) {
      $('.navbar-toggler').attr('data-jsexpanded', 'false');
      $('.a-globalNav-main').hide();
      $('body').css('background-color', '');
      if (wasDark) {
        $('header').addClass('a-darkBackground');
        $('.a-globalNav-logo').find('img')
          .attr('src', $('.a-globalNav-logo').find('img').attr('src').replace('blue', 'white'));
      }
      $('.a-page').children(':not(header)').removeClass('a-js-hidden');
    } else {
      $('.navbar-toggler').attr('data-jsexpanded', 'true');
      $('.a-globalNav-main').show();
      $('body').css('background-color', '#fff');
      if (wasDark) {
        $('header').removeClass('a-darkBackground');
        $('.a-globalNav-logo').find('img')
          .attr('src', $('.a-globalNav-logo').find('img').attr('src').replace('white', 'blue'));
      }
      $('.a-page').children(':not(header)').addClass('a-js-hidden');
    }
  }
};
function menuHandler() {
  // enable tabbing and mouse click on mobile menu btn
  if ($('body').width() < 768) {
    $('body').on('click', action);
  }
}
menuHandler();
$(window).on('resize', function() {
  $('body').off('click', action);
  menuHandler();
});

var toggleInstant = function() {
  $('.a-panelAccordion').on('click', '*[data-toggle="instant"]', function() {
    var $target = $(this.dataset.target);
    if ($target.is(':visible')) {
      $(this).attr('aria-expanded', false);
      $target.hide();
      $(this).removeClass('a-open');
    } else {
      $(this).attr('aria-expanded', true);
      $target.show();
      $(this).addClass('a-open');
    }
  });
};

/* globals $ */
var autoFootnotes = function() {
  // Ideally we should have a generic class name here, but it would break
  // existing articles
  $('.epi-footnote').not('popovered').each(function(index) {
    $(this).hide().addClass('popovered');
    $(this).after(
      '<a href="javascript:void(0)" ' +
        'tabindex="0" ' +
        'class="a-linkArea a-helpIconButton a-helpIconButton--blue a-js-togglePopoverIcons" ' +
        'role="button" ' +
        'data-toggle="popover" ' +
        'data-popover-class="footnote"' +
        'data-trigger="click"' +
        'data-popover-content="epiFootnote_' + index + '">' +
        '<i class="ai ai-circle-plus a-js-popoverIconInitial"></i>' +
        '<i class="ai ai-circle-minus a-js-popoverIconExpanded"></i>' +
      '</a>' +
      '<div id="epiFootnote_' + index + '" style="display: none">' +
        $(this).html() +
      '</div>'
    );
  });
};

/* globals $ */
var mobileNavigation = function() {
  $('.a-globalNav .dropdown').on('show.bs.dropdown', function(e) {
    var that = this;
    setTimeout(function() {
      $(that).find('.a-dropdown-languages').addClass('expand');
      $(that).find('.a-dropdown-languages a').removeAttr('tabindex');
      $(that).find('.a-dropdown-languages a').removeAttr('aria-hidden');
    }, 0);
  });

  $('.a-globalNav .dropdown').on('hide.bs.dropdown', function(e) {
    $(this).find('.a-dropdown-languages').removeClass('expand');
    $(this).find('.a-dropdown-languages a').attr('tabindex', '-1');
    $(this).find('.a-dropdown-languages a').attr('aria-hidden', 'true');
  });
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

var setupOnKeypress = function() {
  $('body').on('keydown', '.a-clickable, .a-selectable', function(e) {
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

var setupNestedCheckboxes = function() {
  $('[data-toggle="nestedCheckbox"]').on('change', function() {
    var target = $(this).data('target');
    if ($(this).is(':checked')) {
      $(target).show();
    } else {
      $(target).hide();
    }
  });

  $('[data-toggle="nestedCheckbox"]').each(function() {
    if (!$(this).is(':checked')) {
      $($(this).data('target')).hide();
    }
  });
};

/* globals $ */
// used for popovers
var tooltip = function() {
  $('[data-toggle="tooltip"]').tooltip();
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

// Select the node that will be observed for mutations
var targetNode = document.getElementsByClassName('navbar-toggler')[0];

// Options for the observer (which mutations to observe)
var config = { attributes: true, childList: true };

var callback = function(mutationsList) {
  mutationsList.forEach(function(mutation) {
    if ($(mutation.target).attr('data-jsexpanded') === 'false') {
      $('.a-login-container').css('display', '');
    } else {
      $('.a-login-container').css('display', 'none');
    }
  });
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
try {
  observer.observe(targetNode, config);
} catch (e) {
  //
}


$('button.a-personSwitcher').on('click', function() {
  if ($('button.navbar-toggler').attr('data-jsexpanded') === 'true') {
    event.preventDefault();
    event.stopPropagation();
    $('button.navbar-toggler').trigger('click');
  }
});

$('.a-dropdown-personswitchList').on('click', 'button[data-toggle="collapse"]', function(event) {
  event.preventDefault();
  event.stopPropagation();
  $($(this).data('target')).collapse('toggle');
});

// For setting the background-color when favorite star is hovered
$('.a-listWithSubLevels').children().hover(function() {
  if (!$(this).parent().find('button.a-btn-shadow-large').is(':disabled') && ($(this).is('.a-favourite') || $(this).is('.a-btn-shadow-large'))) {
    $(this).parent().find('button.a-btn-shadow-large').css('background', '#CFF0FF');
    $(this).parent().find('button.a-btn-shadow-large.a-bgGreyLight').css('background', '#E2E2E2');
  }
},
function() {
  if (!$(this).parent().find('button.a-btn-shadow-large').is(':disabled') && ($(this).is('.a-favourite') || $(this).is('.a-btn-shadow-large'))) {
    $(this).parent().find('button.a-btn-shadow-large').css('background', '#E3F7FF');
    $(this).parent().find('button.a-btn-shadow-large.a-bgGreyLight').css('background', '#EFEFEF');
  }
});

var setValidatorSettings = function() {
  var defaultOptions = {
    ignore: ':hidden, .ignoreValidation',
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

/* eslint vars-on-top: 0 */
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

    /*
      This is a keyboard trap code
      which prevents the user from exiting the "popover" dialog with tabbing.
      ESC will close the "popover" dialog.
    */

    // Find popover-warning
    var popoverWarning = $('.popover-warning');

    // Find all focusable children
    var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    // var focusableElements = popover.querySelectorAll(focusableElementsString);
    var focusableElements = $(popoverWarning).find(focusableElementsString);

    // If there are focusable elements, make keyboardtrap
    if (focusableElements.length) {
      // Convert NodeList to Array
      focusableElements = Array.prototype.slice.call(focusableElements);

      var firstTabStop = focusableElements[0];
      var lastTabStop = focusableElements[focusableElements.length - 1];

      // Focus first child, and scroll to current position
      var position = $(window).scrollTop();
      firstTabStop.focus({ preventScroll: true });
      $(window).scrollTop(position);

      $(popoverWarning).keydown(function(key) {
        if (key.keyCode === 9) {
          // Shift + Tab
          if (key.shiftKey) {
            if (document.activeElement === firstTabStop) {
              key.preventDefault();
              lastTabStop.focus();
            }
          // TAB
          } else {
            if (document.activeElement === lastTabStop) { // eslint-disable-line
              key.preventDefault();
              firstTabStop.focus();
            }
          }
        } else if (key.keyCode === 27) {
          // Escape
          $('[data-toggle="popover"]').popover('hide');
          $(forceFocusTriggerElement).focus();
        }
      });

      // if cancel/avbryt pressed with Enter, hide popover and focus on trigger
      $(lastTabStop).keydown(function(key) {
        if (key.keyCode === 13) {
          // Enter
          key.preventDefault();
          $('[data-toggle="popover"]').popover('hide');
          $(forceFocusTriggerElement).focus();
        }
      });
    }
  });

  $('body').on('hidden.bs.popover', '[data-toggle="popover"].a-js-popover-forceFocus', function(e) {
    $('body').find('.a-js-popoverTrick').remove();
  });

  // hides popover when the checkbutton is checked
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
    if ($(e.target).data('toggle') !== 'popover' && $(e.target).parents('[data-toggle="popover"]').length === 0 && $(e.target).parents('.popover.show').length === 0) {
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
        modalHeight = $('.modal-dialog').height() + $('.modalPage:visible').height();
        padding = ($('.popover').offset().top + $('.modal').scrollTop() + $('.popover').height() + 5) - modalHeight;
        $('.modalPage:visible').css('padding-bottom', padding + 'px');
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

var setupExpandContent = function() {
  var expandContent = function() {
    $($(this).data('target')).addClass('a-expanded');
    $(this).hide();
  };

  $('*[data-toggle="altinn-expand"]').each(function() {
    var targetHeight;
    var $target = $($(this).data('target'));
    $target.removeClass('a-expandable-content');
    targetHeight = $target.outerHeight();
    $(this).off('click', expandContent);
    if (targetHeight > 320) {
      $target.addClass('a-expandable-content');
      $target.removeClass('a-expanded');
      $(this).on('click', expandContent);
      $(this).show();
    } else {
      $(this).hide();
    }
  });
};

function searchFilterView() {
  function RepositionStickyHelp() {
    var searchFilters = $('.a-overlay-container');
    var searchFilerActionButton = $('.a-search-filter-action-wrapper button');
    if (searchFilters.is(':visible') && searchFilerActionButton.position().left === 0) {
      $('.a-stickyHelp-container button').css('transform', 'translateY(-38px)');
    } else {
      $('.a-stickyHelp-container button').css('transform', 'translateY(0px)');
    }
  }

  $(document.body).on('click', '.a-js-searchFilterToggle', function(e) {
    var hideMainInbox = $('.a-js-hideElement');
    var searchField = $('.a-js-filterFocus');
    var searchFilters = $('.a-overlay-container');
    var hideClass = 'd-none';

    if (searchFilters.hasClass(hideClass)) {
      searchFilters.removeClass(hideClass);
      hideMainInbox.addClass(hideClass);
      searchFilters.removeAttr('tabindex');
      hideMainInbox.attr('tabindex', '-1');
      searchField.attr('tabindex', '1').focus();
      $('input#inbox_search_filter').val($('input#inbox_search').val());
    } else {
      searchFilters.addClass(hideClass);
      hideMainInbox.removeClass(hideClass);
      searchFilters.attr('tabindex', '-1');
      hideMainInbox.removeAttr('tabindex');
      $('input#inbox_search').val($('input#inbox_search_filter').val());
    }
    setTimeout(RepositionStickyHelp, 0);

    $(window).off('resize', RepositionStickyHelp);
    $(window).resize(RepositionStickyHelp);
  });
}

/* globals enableIOS11Fix, disableIOS11Fix, iOS11BugWorkAround */

var enableIOS11Fix = function() {
  // We disable scrolling by hiding everything not in view
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  // It seems we don't need to set these, but I'm leaving there here for now
  // Should be reversed in the disableIOS11Fix function if we enable them
  // document.body.style.height = '100%';
  // document.body.style.width = '100%';
};

var disableIOS11Fix = function() {
  document.body.style.overflow = 'auto';
  document.body.style.position = 'static';
};

var isAffectedPlatform = function() {
  // Needs to be updated if new versions are affected
  var ua = navigator.userAgent;
  var iOS = /iPad|iPhone|iPod/.test(ua);
  var iOS11 = /OS 11_/.test(ua);

  return (iOS && iOS11);
};

var iOS11BugWorkAround = function() {
  // Detect iOS 11_x affected by cursor position bug
  // Bug report: https://bugs.webkit.org/show_bug.cgi?id=176896
  if (isAffectedPlatform()) {
    // This should run in the parent page only, not in the modal
    if ($('body.a-stickyHelp-body').length === 0) {
      // We enable the fix only when the help button is clicked/tapped
      $('.a-stickyHelp-open').on('click', function() {
        enableIOS11Fix();
      });
    }

    // This should be running inside the iframe
    $('.a-stickyHelp-close').on('click', function() {
      // When the close button in the sticky help window is clicked/tapped
      // we disable the fix, otherwise the page will not scroll
      window.parent.disableIOS11Fix();
    });
  }
};


/* globals $ */
var contactForm = function() {
  $('body.a-stickyHelp-body').on('click', '#contact-form-trigger', function() {
    var ScontactFormLink;
    var $closeButton;

    if (window.parent.$) {
      ScontactFormLink = window.parent.$('#contact-form-link');
      $closeButton = window.parent.$('.a-stickyHelp-close');
      if (ScontactFormLink.length > 0) {
        ScontactFormLink.click();
        $closeButton.click();
        return false;
      }
    }

    return true;
  });
};

/* globals AltinnModal */
var sessionExpiredDialog = function() {
  var cookie;
  // How long does a session last
  var sessionTimeout = 30;
  // How long before checking for a valid session for the first time
  var firstCheckTimeout = sessionTimeout - 1;
  // How often to check if the session is valid
  var checkTimeout = 2;
  var loggedOutMessage = 'Du har vært inaktiv i mer enn 30 minutter, og er nå logget ut.';
  var cookieName = 'sessionExpiredDialog';
  var isLoggedIn = false;
  var intervarHandler = null;

  function minutesToMilliseconds(minutes) {
    return minutes * 60 * 1000;
  }

  function getCookie() {
    var cookieValue = document.cookie.replace(new RegExp('(?:(?:^|.*;\\s*)' + cookieName + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1');

    return cookieValue;
  }

  function stopInterval() {
    if (intervarHandler != null) {
      window.clearInterval(intervarHandler);
      intervarHandler = null;
    }
  }

  function showLoggedOutMessage() {
    alert(loggedOutMessage);
  }

  function reloadPage() {
    window.location.reload();
  }

  function deleteCookie() {
    document.cookie = cookieName + '=; expires=0';
  }

  function checkCookie() {
    var sessionExpiresIn;
    var now = new Date();

    cookie = getCookie();
    sessionExpiresIn = new Date(cookie);

    if (now > sessionExpiresIn) {
      deleteCookie();
      stopInterval();
      showLoggedOutMessage();
      reloadPage();
    }
  }

  function startCheckTimer() {
    intervarHandler = window.setInterval(checkCookie, minutesToMilliseconds(checkTimeout));
  }

  function createCookie() {
    var now = new Date();
    // We store the time when the session should expire, in 30 mins
    now.setTime(now.getTime() + minutesToMilliseconds(sessionTimeout));
    document.cookie = cookieName + '=' + now.toUTCString();
    // We start a timer to check in 28 mins, every 2 mins for an expired session
    window.setTimeout(startCheckTimer, minutesToMilliseconds(firstCheckTimeout));
  }

  if (window.sessionValidation !== undefined && window.sessionValidation != null) {
    sessionTimeout = window.sessionValidation.timeout;
    loggedOutMessage = window.sessionValidation.loggedOutMessage;
    isLoggedIn = window.sessionValidation.loggedIn;

    if (isLoggedIn) {
      cookie = getCookie();
      if (cookie === '') {
        createCookie();
      } else {
        startCheckTimer();
      }
    } else {
      deleteCookie();
    }
  }
};

var onCountryCodeChange = function() {
  var initialWidth = 55;
  $('.a-js-countryCode').keyup(function() {
    var inputVal = $(this).val();
    var newWidth;

    if (inputVal.length > 3) {
      newWidth = initialWidth + ((inputVal.length - 3) * 9);
      $(this).css('max-width', newWidth + 'px');
    } else {
      $(this).css('max-width', '');
    }
  });
};

var toggleRoleRightsInit = function() {
  // When clicked on les, skrive or signer icon, toggle the disable on/off.
  $('.a-list-container').on('click', '.a-js-toggleRights', function() {
    $(this).children(':first').toggleClass('a-iconStrikeThrough a-disabledIcon');
  });

  // When clicking on the delete or angre icon, toggle the deleted row on/off.
  $('.a-list-container').on('click', '.a-js-toggleRightsDelete', function() {
    $(this).closest('li').toggleClass('a-deleted a-selected a-defaultCursor');

    // if closest li has class a-deleted.
    if ($(this).closest('li').hasClass('a-deleted')) {
      // remove tabindex of rights buttons
      $(this)
        .parent()
        .prev()
        .children()
        .prop('tabindex', '-1');

      // set tabindex -1 on ai-del
      $(this).prop('tabindex', '-1');

      // set tabdindex and focus to ai-undo
      $(this).next().prop('tabindex', '0');
      $(this).next().focus();
    // else if closest li does not have a-deleted
    } else {
      $(this)
        .parent()
        .prev()
        .children()
        .prop('tabindex', '0');

      // set tabindex -1 on ai-undo
      $(this).prop('tabindex', '-1');

      // set focus to ai-del
      $(this).prev().prop('tabindex', '0');
      $(this).prev().focus();
    }
  });
};

/*
  globals
  AltinnDropdown,
  AltinnModal,
  AltinnQuickhelp
  addListExpandHandler,
  addListSortHandler,
  autoFootnotes,
  cardsToggle,
  codeLookup,
  colnavCustom,
  contactForm,
  feedbackToggle,
  formatOrgNr,
  genericSearch,
  handleFocus,
  initializeDatepicker,
  iOS11BugWorkAround,
  mobileNavigation,
  nameChecker,
  onboarding,
  onConfirmDeletionClick,
  onCountryCodeChange,
  onFileInputChange,
  popoverGlobalInit,
  popoverLocalInit,
  questionnaireInteraction,
  searchFilterView,
  sessionExpiredDialog,
  setupAddRightsHandler,
  setupExpandContent,
  setupListRowSelect,
  setupNestedCheckboxes,
  setupOnKeypress,
  setupSelectableCheckbox,
  setupTruncateLines,
  setValidatorSettings,
  toggleFilter,
  toggleInstant,
  toggleRoleRightsInit,
  toggleSwitch,
  tooltip,
  truncateBoxButtonNames,
  uniformHeight,
  window,
*/

window.portalInit = function() {
  $.fn.modal.Constructor.prototype._enforceFocus = function() {
    $(document)
      .off('focusin.bs.modal')
      .on('focusin.bs.modal', $.proxy(function(event) {
        if (document !== event.target &&
            this._element !== event.target &&
            !$(this._element).has(event.target).length
            && !$(event.target).hasClass('popover')
            && !$(event.target).closest('.popover').length > 0) {
          this._element.focus();
        }
      }, this));
  };

  AltinnModal.init();
  AltinnDropdown.init();
  AltinnQuickhelp.init();
  addListExpandHandler();
  addListSortHandler();
  autoFootnotes();
  cardsToggle();
  contactForm();
  feedbackToggle();
  formatOrgNr();
  handleFocus();
  initializeDatepicker();
  iOS11BugWorkAround();
  mobileNavigation();
  onConfirmDeletionClick();
  onCountryCodeChange();
  onFileInputChange();
  popoverGlobalInit();
  popoverLocalInit();
  searchFilterView();
  sessionExpiredDialog();
  setupExpandContent();
  setupListRowSelect();
  setupNestedCheckboxes();
  setupOnKeypress();
  setupSelectableCheckbox();
  setupTruncateLines();
  setValidatorSettings();
  toggleFilter();
  toggleInstant();
  toggleRoleRightsInit();
  toggleSwitch();
  tooltip();
  truncateBoxButtonNames();
};
window.portalInit();

//# sourceMappingURL=maps/portal.js.map