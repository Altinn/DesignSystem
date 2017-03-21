// for PatternLab only
var addListExpandHandler = function() {
  $('.a-list *[data-toggle="collapse"]').on('click', function() {
    // This script runs before the bootstrap collapse handler, so the collapsed-class will still be
    // present even though the content is about to be expanded
    if ($(this).hasClass('collapsed')) {
      $(this).closest('li').addClass('a-expanded');
    } else {
      $(this).closest('li').removeClass('a-expanded');
    }
  });
};

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
      $(target).attr('aria-hidden', false);
    });
    popoverLocalInit();
    $('body').scrollTop(0);
  });
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

/* globals $, smoothState */
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
    });
  }
};

/* globals $ */
var handleFocus = function() {
  // If state on input is 'focus', add class to a-input: 'a-input-focus'
  $('input.form-control').focus(function() {
    $(this).parent().addClass('a-input-focus');
  }).blur(function() {
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

/* globals $ */
var initializeDatepicker = function() {
  $('.form-control.date').datepicker({
    format: 'dd.mm.yyyy',
    language: 'no',
    todayHighlight: true,
    orientation: 'bottom left',
    autoclose: true,
    maxViewMode: 0
  }).on('show', function(e) {
    $('.datepicker').find('.next').html('');
    $('.datepicker').find('.prev').html('');
    $('.datepicker').find('table').attr('cellpadding', '0');
    $('.datepicker').find('table').attr('cellspacing', '0');
    $('.datepicker').each(function() {
      if ($(this).find('.today').html().indexOf('<span') === -1) {
        $(this).find('.today')
          .html('<span>' + $(this).find('.today').html() + '</span>');
      }
      if ($(this).find('.active').html().indexOf('<span') === -1) {
        $(this).find('.active')
          .html('<span>' + $(this).find('.active').html() + '</span>');
      }
    });
  });
  if ($('.form-control.date').length > 0) {
    $('body').on('click', function(e) {
      $('.datepicker').hide();
    });
    $('.form-control.date').on('change', function() {
      $('.datepicker').each(function() {
        if ($(this).find('.today').html().indexOf('<span') === -1) {
          $(this).find('.today')
          .html('<span>' + $(this).find('.today').html() + '</span>');
        }
        if ($(this).find('.active').html().indexOf('<span') === -1) {
          $(this).find('.active')
          .html('<span>' + $(this).find('.active').html() + '</span>');
        }
      });
    });
    $('.form-control.date').datepicker('setDate', new Date());
    $('.form-control.date').on('click', function(e) {
      e.stopPropagation(); e.preventDefault();
    });
    $('.datepicker').on('click', function(e) {
      e.stopPropagation(); e.preventDefault();
    });
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
      .removeClass('reverse-sort');
    $(src).addClass('a-active');
  } else {
    $(src).toggleClass('reverse-sort');
  }

  reverse = $(src).hasClass('reverse-sort');

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
var mobileNavigation = function() {
  $('.ap-sideNav-mobilebar').click(function() {
    var self = $(this);
    var searchButton = $('.a-toggle-search').hasClass('show');
    if (self.hasClass('show')) {
      $('.ap-sideNav-collapse').slideUp(300); self.removeClass('show');
    } else {
      if (searchButton === true) {
        $('.a-search').slideUp(300); $('.a-toggle-search').removeClass('show');
      }
      self.addClass('show'); $('.ap-sideNav-collapse').slideDown(300);
    }
    return false;
  });
  window.langTriggerClick = function(e) {
    var key = e.which;
    if (key === 13) {
      $(e.target).trigger('mousedown');
    } else if (key === 9) {
      if (!$('#exCollapsingNavbar').find('.a-dropdown-languages').hasClass('expand')) {
        $('#exCollapsingNavbar').find('.a-dropdown-languages').find('a').attr('tabindex', '-1');
      } else {
        $('#exCollapsingNavbar').find('.a-dropdown-languages').find('a').attr('tabindex', '0');
      }
    }
  };
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
    trigger: 'click',
    template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><div class="popover-content"></div></div>'
  };

  $('[data-toggle="popover"]').popover(options);

  $('.a-js-togglePopoverIcons').each(function() {
    $(this).find('i').eq(1).hide();
  });
};

var popoverGlobalInit = function() {
  $('body').on('shown.bs.popover', '[data-toggle="popover"].a-js-tabable-popover', function(e) {
    var triggerElement = this;
    setTimeout(function() {
      $(triggerElement).after($($(triggerElement).data('bs.popover').tip));
      $(window).one('scroll', function() {
        $('[data-toggle="popover"]').popover('hide');
      });
    }, 0);
  });

  // Hide all existing popovers when opening a new popover
  $('body').on('click', '[data-toggle="popover"]', function(e) {
    $('[data-toggle="popover"]').not(this).popover('hide');
  });

  // Hide all existing popovers when focusing a new element
  // which is not the open popover or any of its content
  $('body').on('blur', '[data-toggle="popover"], .popover *', function(e) {
    var that = this;
    setTimeout(function() {
      var $focused = $(':focus');
      if ($focused.length !== 0 && !$focused.hasClass('popover') && !$focused.parents('.popover').length >= 1) {
        $('[data-toggle="popover"]').popover('hide');
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
    }
  });

  function adjustBig() {
    if ($('.popover-big').length > 0) {
      $('.popover-big').attr('style',
        $('.popover-big').attr('style').replace(
          /translateX\(.*?\)/, 'translateX(0px)'
        )
      );
    }
  }

  $('body').on('shown.bs.popover', '.a-js-togglePopoverIcons', function(e) {
    $(e.target).find('i').eq(0).hide();
    $(e.target).find('i').eq(1).show();
  });

  $('body').on('hidden.bs.popover', '.a-js-togglePopoverIcons', function(e) {
    $(e.target).find('i').eq(0).show();
    $(e.target).find('i').eq(1).hide();
  });

  $('body').on('shown.bs.popover', '.a-js-persistPopover', function() {
    // Adjust the popover arrow correctly as the popover fills the full width
    $('body').append(
      '<style>.popover-big:after { left: ' + ($(this).offset().left + 10.5) + 'px !important; }</style>');
    $('html, body').animate({
      scrollTop: $('.a-js-persistPopover').offset().top - 50
    }, 250);
    adjustBig();
  });

  $(window).scroll(adjustBig);
  $(window).resize(adjustBig);
};

/* globals $ */
var propagateContent = function() {
  $('.a-js-propagatedContentDestination').each(function() {
    var prefix = '.a-js-propagatedContentOrigin.';
    if ($(this)[0].hasAttribute('data-maxwidth')) {
      if (window.innerWidth <= parseInt($(this).attr('data-maxwidth'), 10)) {
        if ($(this).hasClass('replace-me')) {
          $(this).before($(prefix + $(this).attr('data-refclass')).html());
          $(this).remove();
        } else {
          $(this).html($(prefix + $(this).attr('data-refclass')).html());
        }
      }
    } else if ($(this)[0].hasAttribute('data-minwidth')) {
      if (window.innerWidth >= parseInt($(this).attr('data-minwidth'), 10)) {
        if ($(this).hasClass('replace-me')) {
          $(this).before($(prefix + $(this).attr('data-refclass')).html());
          $(this).remove();
        } else {
          $(this).html($(prefix + $(this).attr('data-refclass')).html());
        }
      }
    } else if ($(this).hasClass('replace-me')) {
      $(this).before($(prefix + $(this).attr('data-refclass')).html());
      $(this).remove();
    } else {
      $(this).html($(prefix + $(this).attr('data-refclass')).html());
    }
  });
  $('.a-js-propagatedContentOrigin').html('');
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

$('.a-js-index-heading').click(function() {
  if ($(this).hasClass('expanded')) {
    $(this).removeClass('expanded');
    $(this).addClass('collapsed');
    if ($('.a-js-index-heading.expanded').length === 0) {
      $('.a-js-index-heading').removeClass('dim');
    } else {
      $(this).addClass('dim');
    }
  } else {
    $('.a-js-index-heading').removeClass('expanded');
    $(this).removeClass('collapsed');
    $(this).addClass('expanded');
    $('.a-js-index-heading').addClass('dim');
    $('.a-js-index-heading.expanded').removeClass('dim');
  }
});

/* globals $ */
// used for popovers
var tooltip = function() {
  $('[data-toggle="tooltip"]').tooltip();
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

/* globals questionnaireInteraction,
  drilldownInteraction,
  handleFocus,
  mobileNavigation,
  propagateContent,
  toggleFilter,
  uniformHeight,
  tooltip,
  initializeDatepicker,
  onboarding,
  nameChecker,
  codeLookup,
  handleValidatorLibrary,
  setupAddRightsHandler,
  onFileInputChange,
  toggleInstant,
  switchForm,
  addListExpandHandler,
  addListSortHandler,
  setupListRowSelect,
  setupOnKeypress,
  genericSearch,
  toggleInstant,
  articleAnchors,
  feedbackToggle,
  setValidatorSettings,
  popoverLocalInit,
  popoverGlobalInit */


window.sharedInit = function() {
  setValidatorSettings();
  addListExpandHandler();
  setupOnKeypress();
  handleFocus();
  initializeDatepicker();
  addListSortHandler();
  mobileNavigation();
  propagateContent();
  toggleFilter();
  tooltip();
  toggleInstant();
  feedbackToggle();
  popoverLocalInit();
  popoverGlobalInit();
};
window.sharedInit();

var articleAnchors = function() {
  if ($('.epi-wysiwyg').length > 0 && $('.sg-pattern-category').length === 0) {
    window.anchors.options.placement = 'left';
    window.anchors.options.class = 'a-sg-anchor';
    window.anchors.add('h2');
    window.anchors.add('h3');
  }
};

function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}!function(t){"use strict";function e(t){if(void 0===Function.prototype.name){var e=/function\s([^(]{1,})\(/,n=e.exec(t.toString());return n&&n.length>1?n[1].trim():""}return void 0===t.prototype?t.constructor.name:t.prototype.constructor.name}function n(t){return"true"===t||"false"!==t&&(isNaN(1*t)?t:parseFloat(t))}function i(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}var o="6.3.0",s={version:o,_plugins:{},_uuids:[],rtl:function(){return"rtl"===t("html").attr("dir")},plugin:function(t,n){var o=n||e(t),s=i(o);this._plugins[s]=this[o]=t},registerPlugin:function(t,n){var o=n?i(n):e(t.constructor).toLowerCase();t.uuid=this.GetYoDigits(6,o),t.$element.attr("data-"+o)||t.$element.attr("data-"+o,t.uuid),t.$element.data("zfPlugin")||t.$element.data("zfPlugin",t),t.$element.trigger("init.zf."+o),this._uuids.push(t.uuid)},unregisterPlugin:function(t){var n=i(e(t.$element.data("zfPlugin").constructor));this._uuids.splice(this._uuids.indexOf(t.uuid),1),t.$element.removeAttr("data-"+n).removeData("zfPlugin").trigger("destroyed.zf."+n);for(var o in t)t[o]=null},reInit:function(e){var n=e instanceof t;try{if(n)e.each(function(){t(this).data("zfPlugin")._init()});else{var o=typeof e,s=this,a={object:function(e){e.forEach(function(e){e=i(e),t("[data-"+e+"]").foundation("_init")})},string:function(){e=i(e),t("[data-"+e+"]").foundation("_init")},undefined:function(){this.object(Object.keys(s._plugins))}};a[o](e)}}catch(t){console.error(t)}finally{return e}},GetYoDigits:function(t,e){return t=t||6,Math.round(Math.pow(36,t+1)-Math.random()*Math.pow(36,t)).toString(36).slice(1)+(e?"-"+e:"")},reflow:function(e,i){"undefined"==typeof i?i=Object.keys(this._plugins):"string"==typeof i&&(i=[i]);var o=this;t.each(i,function(i,s){var a=o._plugins[s],r=t(e).find("[data-"+s+"]").addBack("[data-"+s+"]");r.each(function(){var e=t(this),i={};if(e.data("zfPlugin"))return void console.warn("Tried to initialize "+s+" on an element that already has a Foundation plugin.");if(e.attr("data-options")){e.attr("data-options").split(";").forEach(function(t,e){var o=t.split(":").map(function(t){return t.trim()});o[0]&&(i[o[0]]=n(o[1]))})}try{e.data("zfPlugin",new a(t(this),i))}catch(t){console.error(t)}finally{return}})})},getFnName:e,transitionend:function(t){var e,n={transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend"},i=document.createElement("div");for(var o in n)"undefined"!=typeof i.style[o]&&(e=n[o]);return e?e:(e=setTimeout(function(){t.triggerHandler("transitionend",[t])},1),"transitionend")}};s.util={throttle:function(t,e){var n=null;return function(){var i=this,o=arguments;null===n&&(n=setTimeout(function(){t.apply(i,o),n=null},e))}}};var a=function(n){var i=typeof n,o=t("meta.foundation-mq"),a=t(".no-js");if(o.length||t('<meta class="foundation-mq">').appendTo(document.head),a.length&&a.removeClass("no-js"),"undefined"===i)s.MediaQuery._init(),s.reflow(this);else{if("string"!==i)throw new TypeError("We're sorry, "+i+" is not a valid parameter. You must use a string representing the method you wish to invoke.");var r=Array.prototype.slice.call(arguments,1),l=this.data("zfPlugin");if(void 0===l||void 0===l[n])throw new ReferenceError("We're sorry, '"+n+"' is not an available method for "+(l?e(l):"this element")+".");1===this.length?l[n].apply(l,r):this.each(function(e,i){l[n].apply(t(i).data("zfPlugin"),r)})}return this};window.Foundation=s,t.fn.foundation=a,function(){Date.now&&window.Date.now||(window.Date.now=Date.now=function(){return(new Date).getTime()});for(var t=["webkit","moz"],e=0;e<t.length&&!window.requestAnimationFrame;++e){var n=t[e];window.requestAnimationFrame=window[n+"RequestAnimationFrame"],window.cancelAnimationFrame=window[n+"CancelAnimationFrame"]||window[n+"CancelRequestAnimationFrame"]}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var i=0;window.requestAnimationFrame=function(t){var e=Date.now(),n=Math.max(i+16,e);return setTimeout(function(){t(i=n)},n-e)},window.cancelAnimationFrame=clearTimeout}window.performance&&window.performance.now||(window.performance={start:Date.now(),now:function(){return Date.now()-this.start}})}(),Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var e=Array.prototype.slice.call(arguments,1),n=this,i=function(){},o=function(){return n.apply(this instanceof i?this:t,e.concat(Array.prototype.slice.call(arguments)))};return this.prototype&&(i.prototype=this.prototype),o.prototype=new i,o})}(jQuery),!function(t){function e(t){var e={};return"string"!=typeof t?e:(t=t.trim().slice(1,-1))?e=t.split("&").reduce(function(t,e){var n=e.replace(/\+/g," ").split("="),i=n[0],o=n[1];return i=decodeURIComponent(i),o=void 0===o?null:decodeURIComponent(o),t.hasOwnProperty(i)?Array.isArray(t[i])?t[i].push(o):t[i]=[t[i],o]:t[i]=o,t},{}):e}var n={queries:[],current:"",_init:function(){var n,i=this,o=t(".foundation-mq").css("font-family");n=e(o);for(var s in n)n.hasOwnProperty(s)&&i.queries.push({name:s,value:"only screen and (min-width: "+n[s]+")"});this.current=this._getCurrentSize(),this._watcher()},atLeast:function(t){var e=this.get(t);return!!e&&window.matchMedia(e).matches},is:function(t){return t=t.trim().split(" "),t.length>1&&"only"===t[1]?t[0]===this._getCurrentSize():this.atLeast(t[0])},get:function(t){for(var e in this.queries)if(this.queries.hasOwnProperty(e)){var n=this.queries[e];if(t===n.name)return n.value}return null},_getCurrentSize:function(){for(var t,e=0;e<this.queries.length;e++){var n=this.queries[e];window.matchMedia(n.value).matches&&(t=n)}return"object"==typeof t?t.name:t},_watcher:function(){var e=this;t(window).on("resize.zf.mediaquery",function(){var n=e._getCurrentSize(),i=e.current;n!==i&&(e.current=n,t(window).trigger("changed.zf.mediaquery",[n,i]))})}};Foundation.MediaQuery=n,window.matchMedia||(window.matchMedia=function(){"use strict";var t=window.styleMedia||window.media;if(!t){var e=document.createElement("style"),n=document.getElementsByTagName("script")[0],i=null;e.type="text/css",e.id="matchmediajs-test",n&&n.parentNode&&n.parentNode.insertBefore(e,n),i="getComputedStyle"in window&&window.getComputedStyle(e,null)||e.currentStyle,t={matchMedium:function(t){var n="@media "+t+"{ #matchmediajs-test { width: 1px; } }";return e.styleSheet?e.styleSheet.cssText=n:e.textContent=n,"1px"===i.width}}}return function(e){return{matches:t.matchMedium(e||"all"),media:e||"all"}}}()),Foundation.MediaQuery=n}(jQuery),!function(t){function e(t){var e={};for(var n in t)e[t[n]]=t[n];return e}var n={9:"TAB",13:"ENTER",27:"ESCAPE",32:"SPACE",37:"ARROW_LEFT",38:"ARROW_UP",39:"ARROW_RIGHT",40:"ARROW_DOWN"},i={},o={keys:e(n),parseKey:function(t){var e=n[t.which||t.keyCode]||String.fromCharCode(t.which).toUpperCase();return e=e.replace(/\W+/,""),t.shiftKey&&(e="SHIFT_"+e),t.ctrlKey&&(e="CTRL_"+e),t.altKey&&(e="ALT_"+e),e=e.replace(/_$/,"")},handleKey:function(e,n,o){var s,a,r,l=i[n],u=this.parseKey(e);if(!l)return console.warn("Component not defined!");if(s="undefined"==typeof l.ltr?l:Foundation.rtl()?t.extend({},l.ltr,l.rtl):t.extend({},l.rtl,l.ltr),a=s[u],r=o[a],r&&"function"==typeof r){var d=r.apply();(o.handled||"function"==typeof o.handled)&&o.handled(d)}else(o.unhandled||"function"==typeof o.unhandled)&&o.unhandled()},findFocusable:function(e){return!!e&&e.find("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter(function(){return!(!t(this).is(":visible")||t(this).attr("tabindex")<0)})},register:function(t,e){i[t]=e},trapFocus:function(t){var e=Foundation.Keyboard.findFocusable(t),n=e.eq(0),i=e.eq(-1);t.on("keydown.zf.trapfocus",function(t){t.target===i[0]&&"TAB"===Foundation.Keyboard.parseKey(t)?(t.preventDefault(),n.focus()):t.target===n[0]&&"SHIFT_TAB"===Foundation.Keyboard.parseKey(t)&&(t.preventDefault(),i.focus())})},releaseFocus:function(t){t.off("keydown.zf.trapfocus")}};Foundation.Keyboard=o}(jQuery),!function(t){function e(t,e,n){function i(r){a||(a=r),s=r-a,n.apply(e),s<t?o=window.requestAnimationFrame(i,e):(window.cancelAnimationFrame(o),e.trigger("finished.zf.animate",[e]).triggerHandler("finished.zf.animate",[e]))}var o,s,a=null;return 0===t?(n.apply(e),void e.trigger("finished.zf.animate",[e]).triggerHandler("finished.zf.animate",[e])):void(o=window.requestAnimationFrame(i))}function n(e,n,s,a){function r(){e||n.hide(),l(),a&&a.apply(n)}function l(){n[0].style.transitionDuration=0,n.removeClass(u+" "+d+" "+s)}if(n=t(n).eq(0),n.length){var u=e?i[0]:i[1],d=e?o[0]:o[1];l(),n.addClass(s).css("transition","none"),requestAnimationFrame(function(){n.addClass(u),e&&n.show()}),requestAnimationFrame(function(){n[0].offsetWidth,n.css("transition","").addClass(d)}),n.one(Foundation.transitionend(n),r)}}var i=["mui-enter","mui-leave"],o=["mui-enter-active","mui-leave-active"],s={animateIn:function(t,e,i){n(!0,t,e,i)},animateOut:function(t,e,i){n(!1,t,e,i)}};Foundation.Move=e,Foundation.Motion=s}(jQuery),!function(t){var e={Feather:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"zf";e.attr("role","menubar");var i=e.find("li").attr({role:"menuitem"}),o="is-"+n+"-submenu",s=o+"-item",a="is-"+n+"-submenu-parent";i.each(function(){var e=t(this),i=e.children("ul");i.length&&(e.addClass(a).attr({"aria-haspopup":!0,"aria-label":e.children("a:first").text()}),"drilldown"===n&&e.attr({"aria-expanded":!1}),i.addClass("submenu "+o).attr({"data-submenu":"",role:"menu"}),"drilldown"===n&&i.attr({"aria-hidden":!0})),e.parent("[data-submenu]").length&&e.addClass("is-submenu-item "+s)})},Burn:function(t,e){var n="is-"+e+"-submenu",i=n+"-item",o="is-"+e+"-submenu-parent";t.find(">li, .menu, .menu > li").removeClass(n+" "+i+" "+o+" is-submenu-item submenu is-active").removeAttr("data-submenu").css("display","")}};Foundation.Nest=e}(jQuery),!function(t){function e(t,e,i,o){var s,a,r,l,u=n(t);if(e){var d=n(e);a=u.offset.top+u.height<=d.height+d.offset.top,s=u.offset.top>=d.offset.top,r=u.offset.left>=d.offset.left,l=u.offset.left+u.width<=d.width+d.offset.left}else a=u.offset.top+u.height<=u.windowDims.height+u.windowDims.offset.top,s=u.offset.top>=u.windowDims.offset.top,r=u.offset.left>=u.windowDims.offset.left,l=u.offset.left+u.width<=u.windowDims.width;var f=[a,s,r,l];return i?r===l==!0:o?s===a==!0:f.indexOf(!1)===-1}function n(t,e){if(t=t.length?t[0]:t,t===window||t===document)throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");var n=t.getBoundingClientRect(),i=t.parentNode.getBoundingClientRect(),o=document.body.getBoundingClientRect(),s=window.pageYOffset,a=window.pageXOffset;return{width:n.width,height:n.height,offset:{top:n.top+s,left:n.left+a},parentDims:{width:i.width,height:i.height,offset:{top:i.top+s,left:i.left+a}},windowDims:{width:o.width,height:o.height,offset:{top:s,left:a}}}}function i(t,e,i,o,s,a){var r=n(t),l=e?n(e):null;switch(i){case"top":return{left:Foundation.rtl()?l.offset.left-r.width+l.width:l.offset.left,top:l.offset.top-(r.height+o)};case"left":return{left:l.offset.left-(r.width+s),top:l.offset.top};case"right":return{left:l.offset.left+l.width+s,top:l.offset.top};case"center top":return{left:l.offset.left+l.width/2-r.width/2,top:l.offset.top-(r.height+o)};case"center bottom":return{left:a?s:l.offset.left+l.width/2-r.width/2,top:l.offset.top+l.height+o};case"center left":return{left:l.offset.left-(r.width+s),top:l.offset.top+l.height/2-r.height/2};case"center right":return{left:l.offset.left+l.width+s+1,top:l.offset.top+l.height/2-r.height/2};case"center":return{left:r.windowDims.offset.left+r.windowDims.width/2-r.width/2,top:r.windowDims.offset.top+r.windowDims.height/2-r.height/2};case"reveal":return{left:(r.windowDims.width-r.width)/2,top:r.windowDims.offset.top+o};case"reveal full":return{left:r.windowDims.offset.left,top:r.windowDims.offset.top};case"left bottom":return{left:l.offset.left,top:l.offset.top+l.height+o};case"right bottom":return{left:l.offset.left+l.width+s-r.width,top:l.offset.top+l.height+o};default:return{left:Foundation.rtl()?l.offset.left-r.width+l.width:l.offset.left+s,top:l.offset.top+l.height+o}}}Foundation.Box={ImNotTouchingYou:e,GetDimensions:n,GetOffsets:i}}(jQuery),!function(t){function e(){a(),i(),o(),s(),n()}function n(e){var n=t("[data-yeti-box]"),i=["dropdown","tooltip","reveal"];if(e&&("string"==typeof e?i.push(e):"object"==typeof e&&"string"==typeof e[0]?i.concat(e):console.error("Plugin names must be strings")),n.length){var o=i.map(function(t){return"closeme.zf."+t}).join(" ");t(window).off(o).on(o,function(e,n){var i=e.namespace.split(".")[0],o=t("[data-"+i+"]").not('[data-yeti-box="'+n+'"]');o.each(function(){var e=t(this);e.triggerHandler("close.zf.trigger",[e])})})}}function i(e){var n=void 0,i=t("[data-resize]");i.length&&t(window).off("resize.zf.trigger").on("resize.zf.trigger",function(o){n&&clearTimeout(n),n=setTimeout(function(){r||i.each(function(){t(this).triggerHandler("resizeme.zf.trigger")}),i.attr("data-events","resize")},e||10)})}function o(e){var n=void 0,i=t("[data-scroll]");i.length&&t(window).off("scroll.zf.trigger").on("scroll.zf.trigger",function(o){n&&clearTimeout(n),n=setTimeout(function(){r||i.each(function(){t(this).triggerHandler("scrollme.zf.trigger")}),i.attr("data-events","scroll")},e||10)})}function s(e){var n=t("[data-mutate]");n.length&&r&&n.each(function(){t(this).triggerHandler("mutateme.zf.trigger")})}function a(){if(!r)return!1;var e=document.querySelectorAll("[data-resize], [data-scroll], [data-mutate]"),n=function(e){var n=t(e[0].target);switch(e[0].type){case"attributes":"scroll"===n.attr("data-events")&&"data-events"===e[0].attributeName&&n.triggerHandler("scrollme.zf.trigger",[n,window.pageYOffset]),"resize"===n.attr("data-events")&&"data-events"===e[0].attributeName&&n.triggerHandler("resizeme.zf.trigger",[n]),"style"===e[0].attributeName&&(n.closest("[data-mutate]").attr("data-events","mutate"),n.closest("[data-mutate]").triggerHandler("mutateme.zf.trigger",[n.closest("[data-mutate]")]));break;case"childList":n.closest("[data-mutate]").attr("data-events","mutate"),n.closest("[data-mutate]").triggerHandler("mutateme.zf.trigger",[n.closest("[data-mutate]")]);break;default:return!1}};if(e.length)for(var i=0;i<=e.length-1;i++){var o=new r(n);o.observe(e[i],{attributes:!0,childList:!0,characterData:!1,subtree:!0,attributeFilter:["data-events","style"]})}}var r=function(){for(var t=["WebKit","Moz","O","Ms",""],e=0;e<t.length;e++)if(t[e]+"MutationObserver"in window)return window[t[e]+"MutationObserver"];return!1}(),l=function(e,n){e.data(n).split(" ").forEach(function(i){t("#"+i)["close"===n?"trigger":"triggerHandler"](n+".zf.trigger",[e])})};t(document).on("click.zf.trigger","[data-open]",function(){l(t(this),"open")}),t(document).on("click.zf.trigger","[data-close]",function(){var e=t(this).data("close");e?l(t(this),"close"):t(this).trigger("close.zf.trigger")}),t(document).on("click.zf.trigger","[data-toggle]",function(){var e=t(this).data("toggle");e?l(t(this),"toggle"):t(this).trigger("toggle.zf.trigger")}),t(document).on("close.zf.trigger","[data-closable]",function(e){e.stopPropagation();var n=t(this).data("closable");""!==n?Foundation.Motion.animateOut(t(this),n,function(){t(this).trigger("closed.zf")}):t(this).fadeOut().trigger("closed.zf")}),t(document).on("focus.zf.trigger blur.zf.trigger","[data-toggle-focus]",function(){var e=t(this).data("toggle-focus");t("#"+e).triggerHandler("toggle.zf.trigger",[t(this)])}),t(window).on("load",function(){e()}),Foundation.IHearYou=e}(jQuery);var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();!function(t){var e=function(){function e(n,i){_classCallCheck(this,e),this.$element=n,this.options=t.extend({},e.defaults,this.$element.data(),i),Foundation.Nest.Feather(this.$element,"drilldown"),this._init(),Foundation.registerPlugin(this,"Drilldown"),Foundation.Keyboard.register("Drilldown",{ENTER:"open",SPACE:"open",ARROW_RIGHT:"next",ARROW_UP:"up",ARROW_DOWN:"down",ARROW_LEFT:"previous",ESCAPE:"close",TAB:"down",SHIFT_TAB:"up"})}return _createClass(e,[{key:"_init",value:function(){this.$submenuAnchors=this.$element.find("li.is-drilldown-submenu-parent").children("a"),this.$submenus=this.$submenuAnchors.parent("li").children("[data-submenu]"),this.$menuItems=this.$element.find("li").not(".js-drilldown-back").attr("role","menuitem").find("a"),this.$element.attr("data-mutate",this.$element.attr("data-drilldown")||Foundation.GetYoDigits(6,"drilldown")),this._prepareMenu(),this._registerEvents(),this._keyboardEvents()}},{key:"_prepareMenu",value:function(){var e=this;this.$submenuAnchors.each(function(){var n=t(this),i=n.parent();e.options.parentLink&&n.clone().prependTo(i.children("[data-submenu]")).wrap('<li class="is-submenu-parent-item is-submenu-item is-drilldown-submenu-item" role="menu-item"></li>'),n.data("savedHref",n.attr("href")).removeAttr("href").attr("tabindex",0),n.children("[data-submenu]").attr({"aria-hidden":!0,tabindex:0,role:"menu"}),e._events(n)}),this.$submenus.each(function(){var n=t(this),i=n.find(".js-drilldown-back");if(!i.length)switch(e.options.backButtonPosition){case"bottom":n.append(e.options.backButton);break;case"top":n.prepend(e.options.backButton);break;default:console.error("Unsupported backButtonPosition value '"+e.options.backButtonPosition+"'")}e._back(n)}),this.options.autoHeight||this.$submenus.addClass("drilldown-submenu-cover-previous"),this.$element.parent().hasClass("is-drilldown")||(this.$wrapper=t(this.options.wrapper).addClass("is-drilldown"),this.options.animateHeight&&this.$wrapper.addClass("animate-height"),this.$wrapper=this.$element.wrap(this.$wrapper).parent().css(this._getMaxDims()))}},{key:"_resize",value:function(){this.$wrapper.css({"max-width":"none","min-height":"none"}),this.$wrapper.css(this._getMaxDims())}},{key:"_events",value:function(e){var n=this;e.off("click.zf.drilldown").on("click.zf.drilldown",function(i){if(t(i.target).parentsUntil("ul","li").hasClass("is-drilldown-submenu-parent")&&(i.stopImmediatePropagation(),i.preventDefault()),n._show(e.parent("li")),n.options.closeOnClick){var o=t("body");o.off(".zf.drilldown").on("click.zf.drilldown",function(e){e.target===n.$element[0]||t.contains(n.$element[0],e.target)||(e.preventDefault(),n._hideAll(),o.off(".zf.drilldown"))})}}),this.$element.on("mutateme.zf.trigger",this._resize.bind(this))}},{key:"_registerEvents",value:function(){this.options.scrollTop&&(this._bindHandler=this._scrollTop.bind(this),this.$element.on("open.zf.drilldown hide.zf.drilldown closed.zf.drilldown",this._bindHandler))}},{key:"_scrollTop",value:function(){var e=this,n=""!=e.options.scrollTopElement?t(e.options.scrollTopElement):e.$element,i=parseInt(n.offset().top+e.options.scrollTopOffset);t("html, body").stop(!0).animate({scrollTop:i},e.options.animationDuration,e.options.animationEasing,function(){this===t("html")[0]&&e.$element.trigger("scrollme.zf.drilldown")})}},{key:"_keyboardEvents",value:function(){var e=this;this.$menuItems.add(this.$element.find(".js-drilldown-back > a, .is-submenu-parent-item > a")).on("keydown.zf.drilldown",function(n){var i,o,s=t(this),a=s.parent("li").parent("ul").children("li").children("a");a.each(function(e){if(t(this).is(s))return i=a.eq(Math.max(0,e-1)),void(o=a.eq(Math.min(e+1,a.length-1)))}),Foundation.Keyboard.handleKey(n,"Drilldown",{next:function(){if(s.is(e.$submenuAnchors))return e._show(s.parent("li")),s.parent("li").one(Foundation.transitionend(s),function(){s.parent("li").find("ul li a").filter(e.$menuItems).first().focus()}),!0},previous:function(){return e._hide(s.parent("li").parent("ul")),s.parent("li").parent("ul").one(Foundation.transitionend(s),function(){setTimeout(function(){s.parent("li").parent("ul").parent("li").children("a").first().focus()},1)}),!0},up:function(){return i.focus(),!0},down:function(){return o.focus(),!0},close:function(){e._back()},open:function(){return s.is(e.$menuItems)?s.is(e.$submenuAnchors)?(e._show(s.parent("li")),s.parent("li").one(Foundation.transitionend(s),function(){s.parent("li").find("ul li a").filter(e.$menuItems).first().focus()}),!0):void 0:(e._hide(s.parent("li").parent("ul")),s.parent("li").parent("ul").one(Foundation.transitionend(s),function(){setTimeout(function(){s.parent("li").parent("ul").parent("li").children("a").first().focus()},1)}),!0)},handled:function(t){t&&n.preventDefault(),n.stopImmediatePropagation()}})})}},{key:"_hideAll",value:function(){var t=this.$element.find(".is-drilldown-submenu.is-active").addClass("is-closing");this.options.autoHeight&&this.$wrapper.css({height:t.parent().closest("ul").data("calcHeight")}),t.one(Foundation.transitionend(t),function(e){t.removeClass("is-active is-closing")}),this.$element.trigger("closed.zf.drilldown")}},{key:"_back",value:function(t){var e=this;t.off("click.zf.drilldown"),t.children(".js-drilldown-back").on("click.zf.drilldown",function(n){n.stopImmediatePropagation(),e._hide(t);var i=t.parent("li").parent("ul").parent("li");i.length&&e._show(i)})}},{key:"_menuLinkEvents",value:function(){var t=this;this.$menuItems.not(".is-drilldown-submenu-parent").off("click.zf.drilldown").on("click.zf.drilldown",function(e){setTimeout(function(){t._hideAll()},0)})}},{key:"_show",value:function(t){this.options.autoHeight&&this.$wrapper.css({height:t.children("[data-submenu]").data("calcHeight")}),t.attr("aria-expanded",!0),t.children("[data-submenu]").addClass("is-active").attr("aria-hidden",!1),this.$element.trigger("open.zf.drilldown",[t])}},{key:"_hide",value:function(t){this.options.autoHeight&&this.$wrapper.css({height:t.parent().closest("ul").data("calcHeight")});t.parent("li").attr("aria-expanded",!1),t.attr("aria-hidden",!0).addClass("is-closing"),t.addClass("is-closing").one(Foundation.transitionend(t),function(){t.removeClass("is-active is-closing"),t.blur()}),t.trigger("hide.zf.drilldown",[t])}},{key:"_getMaxDims",value:function(){var e=0,n={},i=this;return this.$submenus.add(this.$element).each(function(){var o=(t(this).children("li").length,Foundation.Box.GetDimensions(this).height);e=o>e?o:e,i.options.autoHeight&&(t(this).data("calcHeight",o),t(this).hasClass("is-drilldown-submenu")||(n.height=o))}),this.options.autoHeight||(n["min-height"]=e+"px"),n["max-width"]=this.$element[0].getBoundingClientRect().width+"px",n}},{key:"destroy",value:function(){this.options.scrollTop&&this.$element.off(".zf.drilldown",this._bindHandler),this._hideAll(),this.$element.off("mutateme.zf.trigger"),Foundation.Nest.Burn(this.$element,"drilldown"),this.$element.unwrap().find(".js-drilldown-back, .is-submenu-parent-item").remove().end().find(".is-active, .is-closing, .is-drilldown-submenu").removeClass("is-active is-closing is-drilldown-submenu").end().find("[data-submenu]").removeAttr("aria-hidden tabindex role"),this.$submenuAnchors.each(function(){t(this).off(".zf.drilldown")}),this.$submenus.removeClass("drilldown-submenu-cover-previous"),this.$element.find("a").each(function(){var e=t(this);e.removeAttr("tabindex"),e.data("savedHref")&&e.attr("href",e.data("savedHref")).removeData("savedHref")}),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={backButton:'<li class="js-drilldown-back"><a tabindex="0">Back</a></li>',backButtonPosition:"top",wrapper:"<div></div>",parentLink:!1,closeOnClick:!1,autoHeight:!1,animateHeight:!1,scrollTop:!1,scrollTopElement:"",scrollTopOffset:0,animationDuration:500,animationEasing:"swing"},Foundation.plugin(e,"Drilldown")}(jQuery);var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();!function(t){var e=function(){function e(n,i){_classCallCheck(this,e),this.$element=n,this.options=t.extend({},e.defaults,this.$element.data(),i),Foundation.Nest.Feather(this.$element,"accordion"),this._init(),Foundation.registerPlugin(this,"AccordionMenu"),Foundation.Keyboard.register("AccordionMenu",{ENTER:"toggle",SPACE:"toggle",ARROW_RIGHT:"open",ARROW_UP:"up",ARROW_DOWN:"down",ARROW_LEFT:"close",ESCAPE:"closeAll"})}return _createClass(e,[{key:"_init",value:function(){this.$element.find("[data-submenu]").not(".is-active").slideUp(0),this.$element.attr({role:"menu","aria-multiselectable":this.options.multiOpen}),this.$menuLinks=this.$element.find(".is-accordion-submenu-parent"),this.$menuLinks.each(function(){var e=this.id||Foundation.GetYoDigits(6,"acc-menu-link"),n=t(this),i=n.children("[data-submenu]"),o=i[0].id||Foundation.GetYoDigits(6,"acc-menu"),s=i.hasClass("is-active");n.attr({"aria-controls":o,"aria-expanded":s,role:"menuitem",id:e}),i.attr({"aria-labelledby":e,"aria-hidden":!s,role:"menu",id:o})});var e=this.$element.find(".is-active");if(e.length){var n=this;e.each(function(){n.down(t(this))})}this._events()}},{key:"_events",value:function(){var e=this;this.$element.find("li").each(function(){var n=t(this).children("[data-submenu]");n.length&&t(this).children("a").off("click.zf.accordionMenu").on("click.zf.accordionMenu",function(t){t.preventDefault(),e.toggle(n)})}).on("keydown.zf.accordionmenu",function(n){var i,o,s=t(this),a=s.parent("ul").children("li"),r=s.children("[data-submenu]");a.each(function(e){if(t(this).is(s))return i=a.eq(Math.max(0,e-1)).find("a").first(),o=a.eq(Math.min(e+1,a.length-1)).find("a").first(),t(this).children("[data-submenu]:visible").length&&(o=s.find("li:first-child").find("a").first()),t(this).is(":first-child")?i=s.parents("li").first().find("a").first():i.parents("li").first().children("[data-submenu]:visible").length&&(i=i.parents("li").find("li:last-child").find("a").first()),void(t(this).is(":last-child")&&(o=s.parents("li").first().next("li").find("a").first()))}),Foundation.Keyboard.handleKey(n,"AccordionMenu",{open:function(){r.is(":hidden")&&(e.down(r),r.find("li").first().find("a").first().focus())},close:function(){r.length&&!r.is(":hidden")?e.up(r):s.parent("[data-submenu]").length&&(e.up(s.parent("[data-submenu]")),s.parents("li").first().find("a").first().focus())},up:function(){return i.focus(),!0},down:function(){return o.focus(),!0},toggle:function(){s.children("[data-submenu]").length&&e.toggle(s.children("[data-submenu]"))},closeAll:function(){e.hideAll()},handled:function(t){t&&n.preventDefault(),n.stopImmediatePropagation()}})})}},{key:"hideAll",value:function(){this.up(this.$element.find("[data-submenu]"))}},{key:"showAll",value:function(){this.down(this.$element.find("[data-submenu]"))}},{key:"toggle",value:function(t){t.is(":animated")||(t.is(":hidden")?this.down(t):this.up(t))}},{key:"down",value:function(t){var e=this;this.options.multiOpen||this.up(this.$element.find(".is-active").not(t.parentsUntil(this.$element).add(t))),t.addClass("is-active").attr({"aria-hidden":!1}).parent(".is-accordion-submenu-parent").attr({"aria-expanded":!0}),t.slideDown(e.options.slideSpeed,function(){e.$element.trigger("down.zf.accordionMenu",[t])})}},{key:"up",value:function(t){var e=this;t.slideUp(e.options.slideSpeed,function(){e.$element.trigger("up.zf.accordionMenu",[t])});var n=t.find("[data-submenu]").slideUp(0).addBack().attr("aria-hidden",!0);n.parent(".is-accordion-submenu-parent").attr("aria-expanded",!1)}},{key:"destroy",value:function(){this.$element.find("[data-submenu]").slideDown(0).css("display",""),this.$element.find("a").off("click.zf.accordionMenu"),Foundation.Nest.Burn(this.$element,"accordion"),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={slideSpeed:250,multiOpen:!0},Foundation.plugin(e,"AccordionMenu")}(jQuery);var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();!function(t){var e=function(){function e(n,i){_classCallCheck(this,e),this.$element=n,this.options=t.extend({},e.defaults,this.$element.data(),i),Foundation.Nest.Feather(this.$element,"dropdown"),this._init(),Foundation.registerPlugin(this,"DropdownMenu"),Foundation.Keyboard.register("DropdownMenu",{ENTER:"open",SPACE:"open",ARROW_RIGHT:"next",ARROW_UP:"up",ARROW_DOWN:"down",ARROW_LEFT:"previous",ESCAPE:"close"})}return _createClass(e,[{key:"_init",value:function(){var t=this.$element.find("li.is-dropdown-submenu-parent");this.$element.children(".is-dropdown-submenu-parent").children(".is-dropdown-submenu").addClass("first-sub"),this.$menuItems=this.$element.find('[role="menuitem"]'),this.$tabs=this.$element.children('[role="menuitem"]'),this.$tabs.find("ul.is-dropdown-submenu").addClass(this.options.verticalClass),this.$element.hasClass(this.options.rightClass)||"right"===this.options.alignment||Foundation.rtl()||this.$element.parents(".top-bar-right").is("*")?(this.options.alignment="right",t.addClass("opens-left")):t.addClass("opens-right"),this.changed=!1,this._events()}},{key:"_isVertical",value:function(){return"block"===this.$tabs.css("display")}},{key:"_events",value:function(){var e=this,n="ontouchstart"in window||"undefined"!=typeof window.ontouchstart,i="is-dropdown-submenu-parent",o=function(o){var s=t(o.target).parentsUntil("ul","."+i),a=s.hasClass(i),r="true"===s.attr("data-is-click"),l=s.children(".is-dropdown-submenu");if(a)if(r){if(!e.options.closeOnClick||!e.options.clickOpen&&!n||e.options.forceFollow&&n)return;o.stopImmediatePropagation(),o.preventDefault(),e._hide(s)}else o.preventDefault(),o.stopImmediatePropagation(),e._show(l),s.add(s.parentsUntil(e.$element,"."+i)).attr("data-is-click",!0)};(this.options.clickOpen||n)&&this.$menuItems.on("click.zf.dropdownmenu touchstart.zf.dropdownmenu",o),e.options.closeOnClickInside&&this.$menuItems.on("click.zf.dropdownmenu touchend.zf.dropdownmenu",function(n){var o=t(this),s=o.hasClass(i);s||e._hide()}),this.options.disableHover||this.$menuItems.on("mouseenter.zf.dropdownmenu",function(n){var o=t(this),s=o.hasClass(i);s&&(clearTimeout(o.data("_delay")),o.data("_delay",setTimeout(function(){e._show(o.children(".is-dropdown-submenu"))},e.options.hoverDelay)))}).on("mouseleave.zf.dropdownmenu",function(n){var o=t(this),s=o.hasClass(i);if(s&&e.options.autoclose){if("true"===o.attr("data-is-click")&&e.options.clickOpen)return!1;clearTimeout(o.data("_delay")),o.data("_delay",setTimeout(function(){e._hide(o)},e.options.closingTime))}}),this.$menuItems.on("keydown.zf.dropdownmenu",function(n){var i,o,s=t(n.target).parentsUntil("ul",'[role="menuitem"]'),a=e.$tabs.index(s)>-1,r=a?e.$tabs:s.siblings("li").add(s);r.each(function(e){if(t(this).is(s))return i=r.eq(e-1),void(o=r.eq(e+1))});var l=function(){s.is(":last-child")||(o.children("a:first").focus(),n.preventDefault())},u=function(){i.children("a:first").focus(),n.preventDefault()},d=function(){var t=s.children("ul.is-dropdown-submenu");t.length&&(e._show(t),s.find("li > a:first").focus(),n.preventDefault())},f=function(){var t=s.parent("ul").parent("li");t.children("a:first").focus(),e._hide(t),n.preventDefault()},c={open:d,close:function(){e._hide(e.$element),
e.$menuItems.find("a:first").focus(),n.preventDefault()},handled:function(){n.stopImmediatePropagation()}};a?e._isVertical()?Foundation.rtl()?t.extend(c,{down:l,up:u,next:f,previous:d}):t.extend(c,{down:l,up:u,next:d,previous:f}):Foundation.rtl()?t.extend(c,{next:u,previous:l,down:d,up:f}):t.extend(c,{next:l,previous:u,down:d,up:f}):Foundation.rtl()?t.extend(c,{next:f,previous:d,down:l,up:u}):t.extend(c,{next:d,previous:f,down:l,up:u}),Foundation.Keyboard.handleKey(n,"DropdownMenu",c)})}},{key:"_addBodyHandler",value:function(){var e=t(document.body),n=this;e.off("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu").on("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu",function(t){var i=n.$element.find(t.target);i.length||(n._hide(),e.off("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu"))})}},{key:"_show",value:function(e){var n=this.$tabs.index(this.$tabs.filter(function(n,i){return t(i).find(e).length>0})),i=e.parent("li.is-dropdown-submenu-parent").siblings("li.is-dropdown-submenu-parent");this._hide(i,n),e.css("visibility","hidden").addClass("js-dropdown-active").parent("li.is-dropdown-submenu-parent").addClass("is-active");var o=Foundation.Box.ImNotTouchingYou(e,null,!0);if(!o){var s="left"===this.options.alignment?"-right":"-left",a=e.parent(".is-dropdown-submenu-parent");a.removeClass("opens"+s).addClass("opens-"+this.options.alignment),o=Foundation.Box.ImNotTouchingYou(e,null,!0),o||a.removeClass("opens-"+this.options.alignment).addClass("opens-inner"),this.changed=!0}e.css("visibility",""),this.options.closeOnClick&&this._addBodyHandler(),this.$element.trigger("show.zf.dropdownmenu",[e])}},{key:"_hide",value:function(t,e){var n;n=t&&t.length?t:void 0!==e?this.$tabs.not(function(t,n){return t===e}):this.$element;var i=n.hasClass("is-active")||n.find(".is-active").length>0;if(i){if(n.find("li.is-active").add(n).attr({"data-is-click":!1}).removeClass("is-active"),n.find("ul.js-dropdown-active").removeClass("js-dropdown-active"),this.changed||n.find("opens-inner").length){var o="left"===this.options.alignment?"right":"left";n.find("li.is-dropdown-submenu-parent").add(n).removeClass("opens-inner opens-"+this.options.alignment).addClass("opens-"+o),this.changed=!1}this.$element.trigger("hide.zf.dropdownmenu",[n])}}},{key:"destroy",value:function(){this.$menuItems.off(".zf.dropdownmenu").removeAttr("data-is-click").removeClass("is-right-arrow is-left-arrow is-down-arrow opens-right opens-left opens-inner"),t(document.body).off(".zf.dropdownmenu"),Foundation.Nest.Burn(this.$element,"dropdown"),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={disableHover:!1,autoclose:!0,hoverDelay:50,clickOpen:!1,closingTime:500,alignment:"left",closeOnClick:!0,closeOnClickInside:!0,verticalClass:"vertical",rightClass:"align-right",forceFollow:!0},Foundation.plugin(e,"DropdownMenu")}(jQuery);var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();!function(t){var e=function(){function e(n,i){_classCallCheck(this,e),this.$element=t(n),this.rules=this.$element.data("responsive-menu"),this.currentMq=null,this.currentPlugin=null,this._init(),this._events(),Foundation.registerPlugin(this,"ResponsiveMenu")}return _createClass(e,[{key:"_init",value:function(){if("string"==typeof this.rules){for(var e={},i=this.rules.split(" "),o=0;o<i.length;o++){var s=i[o].split("-"),a=s.length>1?s[0]:"small",r=s.length>1?s[1]:s[0];null!==n[r]&&(e[a]=n[r])}this.rules=e}t.isEmptyObject(this.rules)||this._checkMediaQueries(),this.$element.attr("data-mutate",this.$element.attr("data-mutate")||Foundation.GetYoDigits(6,"responsive-menu"))}},{key:"_events",value:function(){var e=this;t(window).on("changed.zf.mediaquery",function(){e._checkMediaQueries()})}},{key:"_checkMediaQueries",value:function(){var e,i=this;t.each(this.rules,function(t){Foundation.MediaQuery.atLeast(t)&&(e=t)}),e&&(this.currentPlugin instanceof this.rules[e].plugin||(t.each(n,function(t,e){i.$element.removeClass(e.cssClass)}),this.$element.addClass(this.rules[e].cssClass),this.currentPlugin&&this.currentPlugin.destroy(),this.currentPlugin=new this.rules[e].plugin(this.$element,{})))}},{key:"destroy",value:function(){this.currentPlugin.destroy(),t(window).off(".zf.ResponsiveMenu"),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={};var n={dropdown:{cssClass:"dropdown",plugin:Foundation._plugins["dropdown-menu"]||null},drilldown:{cssClass:"drilldown",plugin:Foundation._plugins.drilldown||null},accordion:{cssClass:"accordion-menu",plugin:Foundation._plugins["accordion-menu"]||null}};Foundation.plugin(e,"ResponsiveMenu")}(jQuery);var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();!function(t){var e=function(){function e(n,i){_classCallCheck(this,e),this.$element=n,this.options=t.extend({},e.defaults,this.$element.data(),i),this._init(),Foundation.registerPlugin(this,"Dropdown"),Foundation.Keyboard.register("Dropdown",{ENTER:"open",SPACE:"open",ESCAPE:"close"})}return _createClass(e,[{key:"_init",value:function(){var e=this.$element.attr("id");this.$anchor=t(t('[data-toggle="'+e+'"]').length?'[data-toggle="'+e+'"]':'[data-open="'+e+'"]'),this.$anchor.attr({"aria-controls":e,"data-is-focus":!1,"data-yeti-box":e,"aria-haspopup":!0,"aria-expanded":!1}),this.options.parentClass?this.$parent=this.$element.parents("."+this.options.parentClass):this.$parent=null,this.options.positionClass=this.getPositionClass(),this.counter=4,this.usedPositions=[],this.$element.attr({"aria-hidden":"true","data-yeti-box":e,"data-resize":e,"aria-labelledby":this.$anchor[0].id||Foundation.GetYoDigits(6,"dd-anchor")}),this._events()}},{key:"getPositionClass",value:function(){var t=this.$element[0].className.match(/(top|left|right|bottom)/g);t=t?t[0]:"";var e=/float-(\S+)/.exec(this.$anchor[0].className);e=e?e[1]:"";var n=e?e+" "+t:t;return n}},{key:"_reposition",value:function(t){this.usedPositions.push(t?t:"bottom"),!t&&this.usedPositions.indexOf("top")<0?this.$element.addClass("top"):"top"===t&&this.usedPositions.indexOf("bottom")<0?this.$element.removeClass(t):"left"===t&&this.usedPositions.indexOf("right")<0?this.$element.removeClass(t).addClass("right"):"right"===t&&this.usedPositions.indexOf("left")<0?this.$element.removeClass(t).addClass("left"):!t&&this.usedPositions.indexOf("top")>-1&&this.usedPositions.indexOf("left")<0?this.$element.addClass("left"):"top"===t&&this.usedPositions.indexOf("bottom")>-1&&this.usedPositions.indexOf("left")<0?this.$element.removeClass(t).addClass("left"):"left"===t&&this.usedPositions.indexOf("right")>-1&&this.usedPositions.indexOf("bottom")<0?this.$element.removeClass(t):"right"===t&&this.usedPositions.indexOf("left")>-1&&this.usedPositions.indexOf("bottom")<0?this.$element.removeClass(t):this.$element.removeClass(t),this.classChanged=!0,this.counter--}},{key:"_setPosition",value:function(){if("false"===this.$anchor.attr("aria-expanded"))return!1;var t=this.getPositionClass(),e=Foundation.Box.GetDimensions(this.$element),n=(Foundation.Box.GetDimensions(this.$anchor),"left"===t?"left":"right"===t?"left":"top"),i="top"===n?"height":"width";"height"===i?this.options.vOffset:this.options.hOffset;if(e.width>=e.windowDims.width||!this.counter&&!Foundation.Box.ImNotTouchingYou(this.$element,this.$parent)){var o=e.windowDims.width,s=0;if(this.$parent){var a=Foundation.Box.GetDimensions(this.$parent),s=a.offset.left;a.width<o&&(o=a.width)}return this.$element.offset(Foundation.Box.GetOffsets(this.$element,this.$anchor,"center bottom",this.options.vOffset,this.options.hOffset+s,!0)).css({width:o-2*this.options.hOffset,height:"auto"}),this.classChanged=!0,!1}for(this.$element.offset(Foundation.Box.GetOffsets(this.$element,this.$anchor,t,this.options.vOffset,this.options.hOffset));!Foundation.Box.ImNotTouchingYou(this.$element,this.$parent,!0)&&this.counter;)this._reposition(t),this._setPosition()}},{key:"_events",value:function(){var e=this;this.$element.on({"open.zf.trigger":this.open.bind(this),"close.zf.trigger":this.close.bind(this),"toggle.zf.trigger":this.toggle.bind(this),"resizeme.zf.trigger":this._setPosition.bind(this)}),this.options.hover&&(this.$anchor.off("mouseenter.zf.dropdown mouseleave.zf.dropdown").on("mouseenter.zf.dropdown",function(){var n=t("body").data();"undefined"!=typeof n.whatinput&&"mouse"!==n.whatinput||(clearTimeout(e.timeout),e.timeout=setTimeout(function(){e.open(),e.$anchor.data("hover",!0)},e.options.hoverDelay))}).on("mouseleave.zf.dropdown",function(){clearTimeout(e.timeout),e.timeout=setTimeout(function(){e.close(),e.$anchor.data("hover",!1)},e.options.hoverDelay)}),this.options.hoverPane&&this.$element.off("mouseenter.zf.dropdown mouseleave.zf.dropdown").on("mouseenter.zf.dropdown",function(){clearTimeout(e.timeout)}).on("mouseleave.zf.dropdown",function(){clearTimeout(e.timeout),e.timeout=setTimeout(function(){e.close(),e.$anchor.data("hover",!1)},e.options.hoverDelay)})),this.$anchor.add(this.$element).on("keydown.zf.dropdown",function(n){var i=t(this);Foundation.Keyboard.findFocusable(e.$element);Foundation.Keyboard.handleKey(n,"Dropdown",{open:function(){i.is(e.$anchor)&&(e.open(),e.$element.attr("tabindex",-1).focus(),n.preventDefault())},close:function(){e.close(),e.$anchor.focus()}})})}},{key:"_addBodyHandler",value:function(){var e=t(document.body).not(this.$element),n=this;e.off("click.zf.dropdown").on("click.zf.dropdown",function(t){n.$anchor.is(t.target)||n.$anchor.find(t.target).length||n.$element.find(t.target).length||(n.close(),e.off("click.zf.dropdown"))})}},{key:"open",value:function(){if(this.$element.trigger("closeme.zf.dropdown",this.$element.attr("id")),this.$anchor.addClass("hover").attr({"aria-expanded":!0}),this._setPosition(),this.$element.addClass("is-open").attr({"aria-hidden":!1}),this.options.autoFocus){var t=Foundation.Keyboard.findFocusable(this.$element);t.length&&t.eq(0).focus()}this.options.closeOnClick&&this._addBodyHandler(),this.options.trapFocus&&Foundation.Keyboard.trapFocus(this.$element),this.$element.trigger("show.zf.dropdown",[this.$element])}},{key:"close",value:function(){if(!this.$element.hasClass("is-open"))return!1;if(this.$element.removeClass("is-open").attr({"aria-hidden":!0}),this.$anchor.removeClass("hover").attr("aria-expanded",!1),this.classChanged){var t=this.getPositionClass();t&&this.$element.removeClass(t),this.$element.addClass(this.options.positionClass).css({height:"",width:""}),this.classChanged=!1,this.counter=4,this.usedPositions.length=0}this.$element.trigger("hide.zf.dropdown",[this.$element]),this.options.trapFocus&&Foundation.Keyboard.releaseFocus(this.$element)}},{key:"toggle",value:function(){if(this.$element.hasClass("is-open")){if(this.$anchor.data("hover"))return;this.close()}else this.open()}},{key:"destroy",value:function(){this.$element.off(".zf.trigger").hide(),this.$anchor.off(".zf.dropdown"),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={parentClass:null,hoverDelay:250,hover:!1,hoverPane:!1,vOffset:1,hOffset:1,positionClass:"",trapFocus:!1,autoFocus:!1,closeOnClick:!1},Foundation.plugin(e,"Dropdown")}(jQuery);

/* globals $, Foundation */
var drilldownInteraction = function() {
  var levels = ['a-colnav-firstLevel', 'a-colnav-secondLevel', 'a-colnav-thirdLevel'];
  var open = [];
  var isSmall = $(window).width() < 992;
  var drilldownLegendDefault = $('.a-js-drilldownLegend').html();
  var movedDuringTouch = false;
  var shifted;
  function urlQuery(query) {
    var _query = query.replace(/[[]/, '[').replace(/[\]]/, '\\]');
    var expr = '[\\?&]' + _query + '=([^&#]*)';
    var regex = new RegExp(expr);
    var results = regex.exec(window.location.href);
    if (results !== null) {
      return results[1];
    }
    return false;
  }
  function calc(x, y, z) {
    var a = $('.a-contentOverview').width();
    return (x === parseInt(x, 10) || x === parseFloat(x, 10)) ?
      parseInt(a / (isSmall ? (x / 1.363636363636) : x) / (y || 1), 10) + (isSmall ? 30 : 0) :
      x.css('left', (parseInt(a / (isSmall ? 10 : y) / (z || 1), 10) - (isSmall ? 2 : 0)) + 'px');
  }
  function whenKey(e, classToQuery) {
    var code = e.keyCode || e.which;
    if (code === 27 || code === 37 || code === 38 || code === 39 || code === 40) {
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
    }
    if (code === 13 || code === 32) {
      if (classToQuery === '.a-colnav-item-third') {
        //
      } else {
        e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
        $(e.target).trigger('mouseup').trigger('focus');
      }
    } else if (code === 9 && !$(e.target).hasClass('open')) {
      if (shifted) {
        if ($(e.target).blur().parent().prev().length === 0) {
          //
        } else {
          e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
          $(e.target).blur().parent().prev()
            .find(classToQuery)
            .trigger('focus');
        }
      } else if ($(e.target).blur().parent().next().length === 0) {
        //
      } else {
        e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
        $(e.target).blur().parent().next()
          .find(classToQuery)
          .trigger('focus');
      }
    } else if (code === 9 && $(e.target).hasClass('open')) {
      if (shifted) {
        e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
        $(e.target).blur().parent().parent()
          .parent()
          .children('a')
          .trigger('focus');
      } else {
        e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
        $(e.target).blur().next().children('li:eq(0)')
          .children('a')
          .trigger('focus');
      }
    }
  }
  function whenClick(event, alt) {
    var el = alt === undefined ? $(event.target) : event;
    var li = el.closest('li').hasClass('is-dropdown-submenu-parent') ? el.closest('li') : el;
    var newurl;
    var text = li.find('h2').length > 0 ? li.find('h2').text() : li.find('h3').text();
    if (li.children('a').hasClass('a-js-colnavLinkAlt')) {
      window.location = li.children('a').attr('href');
    }
    levels.forEach(function(str, index) {
      var wasStacked;
      if (el.closest('ul').hasClass(str)) {
        if (el.closest('a').hasClass('open') || el.find('a').hasClass('open') ||
          el.hasClass('open')) {
          text = el.closest('ul').prev().find('h2').text() || '';
          if (history.pushState) {
            newurl = window.location.protocol + '//' + window.location.host +
              window.location.pathname + '?position=' + text.toLowerCase().replace(/ /g, '-');
            window.history.pushState({ path: newurl }, '', newurl);
          }
          open = [];
          if (index === 0) {
            $('.a-js-drilldownLegend').html(drilldownLegendDefault);
          }
          $('.' + levels[index + 1]).removeClass('noTrans').css('left', '250%');
          $('.' + levels[2]).removeClass('noTrans').css('left', '250%');
          calc(index > 0 ? el.closest('ul') : 0, 3 / index);
          el.closest('ul').removeClass('stacked').find('.open').removeClass('open');
          el.closest('ul').find('.dim').removeClass('dim');
        } else if (!el.hasClass('a-colnav-secondLevel') && !el.hasClass('a-colnav-thirdLevel')) {
          if (history.pushState) {
            newurl = window.location.protocol + '//' + window.location.host +
              window.location.pathname + '?position=' + text.toLowerCase().replace(/ /g, '-');
            window.history.pushState({ path: newurl }, '', newurl);
          }
          if (el.closest('li').find('h2').length > 0 || el.closest('li').find('h3').length > 0) {
            $('.a-js-drilldownLegend').html(
              el.closest('li').find('h2').length > 0 ?
                el.closest('li').find('h2').text() : el.closest('li').find('h3').text()
            );
          }
          if (index === 0) {
            $('.' + levels[1]).removeClass('stacked').removeClass('noTrans').css('left', '250%');
            $('.' + levels[2]).removeClass('stacked').removeClass('noTrans').css('left', '250%');
            el.closest('ul').find('.dim').removeClass('dim');
          }
          wasStacked = el.closest('ul').hasClass('stacked');
          el.closest('ul').children('li').children('a').addClass('dim');
          el.closest('ul').addClass('stacked').find('.open').removeClass('open');
          $('.' + levels[index + 1]).hide().addClass('noTrans');
          el.addClass('open').closest('a').addClass('open');
          el.find('a').eq(0).addClass('open');
          if (open.indexOf(levels[index + 1]) === -1) {
            li.find('.' + levels[index + 1]).removeClass(wasStacked ? '' : 'noTrans')
              .css('left', '250%').show();
            open.push(levels[index + 1]);
          }
          if (index > 0) {
            calc(el.closest('ul'), 3, index + 1).removeClass('noTrans').css('width', calc(1.5))
              .show();
          }
          calc(li.find('.' + levels[index + 1]), 3, index + 1).css('width', calc(1.5)).show();
        }
      }
    });
    if ($('.a-colnav-firstLevel').hasClass('stacked')) {
      $('.a-js-backButton').show();
      if (isSmall) {
        $('.switch-container').hide();
        $('.a-containerColnav-top').css('padding-bottom', '0px');
        $('.a-js-backButton').css('margin-top', '-3px');
        $('.a-js-colnavTitleBold').text('');
        $('.a-js-colnavTitleRegular').text(text);
      }
    } else {
      $('.a-js-backButton').hide();
      if (isSmall) {
        $('.switch-container').show();
        $('.a-containerColnav-top').css('padding-bottom', '24px');
        $('.a-js-backButton').css('margin-top', '0px');
        $('.a-js-colnavTitleBold').text('');
        $('.a-js-colnavTitleRegular').text('Alle skjemaer');
      }
    }
  }
  window.drillDownGetSource = function(str) {
    var url = [
      'http://altinn-dev.dev.bouvet.no/api/' + str,
      '/api/' + str,
      '../../../data/' + str + '.json',
      '../../../DesignSystem/data/' + str + '.json'
    ];
    var act2 = function(event) {
      whenClick(event);
      return false;
    };
    var act3 = function(event) {
      whenKey(event, '.a-colnav-item');
    };
    var act4 = function(event) {
      whenKey(event, '.a-colnav-item-second');
    };
    var act5 = function(event) {
      whenKey(event, '.a-colnav-item-third');
    };
    var act6 = function(event) {
      if (!movedDuringTouch) {
        whenClick(event);
      }
    };
    var act7 = function() {
      if ($('.a-colnav-secondLevel.submenu.is-active').length === 1) {
        $(this).off('keydown.zf.drilldown').parent().find('.a-colnav-item-second')
          .eq(0)
          .focus();
      }
    };
    var act8 = function() {
      whenClick($('a.open').last(), true);
    };
    var act9 = function(event) {
      event.stopPropagation();
      movedDuringTouch = false;
    };
    var act10 = function(event) {
      movedDuringTouch = true;
      event.stopPropagation();
    };
    var afterRequest = function(data) {
      var depth = 3;
      var markup = '';
      data.forEach(function(item) {
        var level2 = '';
        item[item.SubCategory ? 'SubCategory' : 'List'].forEach(function(_item) {
          var level3 = '';
          if (_item[_item.SchemaList ? 'SchemaList' : 'List']) {
            _item[_item.SchemaList ? 'SchemaList' : 'List'].forEach(function(__item) {
              level3 += '<li>' +
                '<a href="' + __item.Url + '" class="a-colnav-item-third">' +
                  '<h4>' + (__item.Heading || __item.Title) + '</h4>' +
                  '<span class="a-colnav-rightText">' + __item.Provider + '</span>' +
                '</a>' +
              '</li>';
            });
          } else {
            depth = 2;
          }
          level2 += '<li>' +
            '<a href="#" class="a-colnav-item-second a-js-colnavLink">' +
              '<h3>' + (_item.Heading || _item.Title) + '</h3>' +
            '</a>' +
            '<a href="' + _item.Url + '" class="a-colnav-item-second a-js-colnavLinkAlt">' +
              '<h4>' + (_item.Heading || _item.Title) + '</h4>' +
            '</a>' +
            '<ul class="a-colnav a-colnav-vertical a-colnav-thirdLevel">' +
              level3 +
            '</ul>' +
          '</li>';
        });
        markup += (
          '<li>' +
            '<a href="#" class="a-colnav-item">' +
              '<h2>' + item.Heading + '</h2>' +
              '<p class="a-leadText">' +
                item.Description +
              '</p>' +
            '</a>' +
            '<ul class="a-colnav a-colnav-vertical a-colnav-secondLevel">' +
              level2 +
            '</ul>' +
          '</li>'
        );
      });
      $('.a-colnav-wrapper').off('mouseup', act2);
      $('.a-colnav-item').off('keydown', act3);
      $('.a-colnav-item-second').off('keydown', act4);
      $('.a-colnav-item-third').off('keydown', act5);
      $('.a-colnav').find('a').off('mouseup', act6);
      $('.a-colnav-item').off('focus', act7);
      $('.a-js-backButton').off('click', act8);
      $('.a-colnav').find('a').off('touchstart', act9);
      $('.a-colnav').find('a').off('touchmove', act10);
      $('.a-colnav').html(markup).foundation();
      if ($('.a-colnav-wrapper').length > 0 && !isSmall) {
        $('.a-colnav-wrapper')
          .html($('.a-colnav-wrapper').html().replace(/drilldown/g, 'dropdown'))
          .show().children()
          .on('mouseup', act2);
      }
      $(document).on('keyup keydown', function(e) {
        shifted = e.shiftKey;
      });
      $('.a-colnav-item').on('keydown', act3);
      $('.a-colnav-item-second').on('keydown', act4);
      $('.a-colnav-item-third').on('keydown', act5);
      if (isSmall) {
        if ($('.a-colnav-wrapper').length > 0) {
          $('.a-colnav-wrapper').html($('.a-colnav-wrapper').html()
            .replace(/drilldown/g, 'dropdown'));
          $('.a-colnav').find('a').on('mouseup', act6);
        }
      }
      $('.a-colnav-item-second').attr('tabindex', '0');
      $('.a-colnav-item-third').attr('tabindex', '0');
      $('.a-colnav-item').attr('tabindex', '0').on('focus', act7);
      $('.a-js-backButton').on('click', act8);
      $('.a-colnav').find('a').on('touchstart', act9);
      $('.a-colnav').find('a').on('touchmove', act10);
      // if ($('.a-colnav').attr('data-colnav-depth') === '2') {
      if (depth === 2) {
        $('.a-colnav').find('.a-colnav-thirdLevel').remove();
        $('.a-colnav').find('.a-js-colnavLink').remove();
      } else {
        $('.a-colnav').find('.a-js-colnavLinkAlt').remove();
      }
      if (urlQuery('position')) {
        $('.a-colnav').find('a.a-colnav-item').each(function() {
          if ($(this).find('h2').text().toLowerCase() ===
            urlQuery('position')
              .replace(/%C3%A6/g, 'æ')
              .replace(/%C3%B8/g, 'ø')
              .replace(/%C3%A5/g, 'å')
              .replace(/%C3%86/g, 'Æ')
              .replace(/%C3%98/g, 'Ø')
              .replace(/%C3%85/g, 'Å')
              .replace(/-/g, ' ')) {
            whenClick($(this), true);
          }
        });
        $('.a-colnav').find('a.a-colnav-item-second').each(function() {
          if ($(this).find('h3').text().toLowerCase() ===
            urlQuery('position')
              .replace(/%C3%A6/g, 'æ')
              .replace(/%C3%B8/g, 'ø')
              .replace(/%C3%A5/g, 'å')
              .replace(/%C3%86/g, 'Æ')
              .replace(/%C3%98/g, 'Ø')
              .replace(/%C3%85/g, 'Å')
              .replace(/-/g, ' ')) {
            whenClick($(this).closest('ul').prev(), true);
            setTimeout(function() {
              whenClick($(this), true);
            }.bind(this), 250);
          }
        });
      }
    };
    $.ajax({
      type: 'GET',
      url: url[0],
      success: function(data) {
        afterRequest(data);
      },
      error: function() {
        $.ajax({
          type: 'GET',
          url: url[1],
          success: function(data) {
            afterRequest(data);
          },
          error: function() {
            $.ajax({
              type: 'GET',
              url: url[2],
              success: function(data) {
                afterRequest(data);
              },
              error: function() {
                $.getJSON(url[3], function(data) {
                  afterRequest(data);
                });
              }
            });
          }
        });
      }
    });
  };
  $(document).ready(function() {
    if ($('.a-colnav').length > 0) {
      $('.a-colnav-wrapper').on('click', function(event) {
        if (!$(event.target).closest('ul').hasClass('a-colnav-thirdLevel')) {
          event.preventDefault();
          event.stopImmediatePropagation();
          event.stopPropagation();
        }
      });
      window.drillDownGetSource('getcategory');
    }
  });
};

/*!
 * jQuery.ellipsis
 * http://github.com/jjenzz/jquery.ellipsis
 * --------------------------------------------------------------------------
 * Copyright (c) 2013 J. Smith (@jjenzz)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * adds a class to the last 'allowed' line of text so you can apply
 * text-overflow: ellipsis;
 */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{a(jQuery)}}(function(d){var c="ellipsis",b='<span style="white-space: nowrap;">',e={lines:"auto",ellipClass:"ellip",responsive:false};function a(h,q){var m=this,w=0,g=[],k,p,i,f,j,n,s;m.$cont=d(h);m.opts=d.extend({},e,q);function o(){m.text=m.$cont.text();m.opts.ellipLineClass=m.opts.ellipClass+"-line";m.$el=d('<span class="'+m.opts.ellipClass+'" />');m.$el.text(m.text);m.$cont.empty().append(m.$el);t()}function t(){if(typeof m.opts.lines==="number"&&m.opts.lines<2){m.$el.addClass(m.opts.ellipLineClass);return}n=m.$cont.height();if(m.opts.lines==="auto"&&m.$el.prop("scrollHeight")<=n){return}if(!k){return}s=d.trim(m.text).split(/\s+/);m.$el.html(b+s.join("</span> "+b)+"</span>");m.$el.find("span").each(k);if(p!=null){u(p)}}function u(x){s[x]='<span class="'+m.opts.ellipLineClass+'">'+s[x];s.push("</span>");m.$el.html(s.join(" "))}if(m.opts.lines==="auto"){var r=function(y,A){var x=d(A),z=x.position().top;j=j||x.height();if(z===f){g[w].push(x)}else{f=z;w+=1;g[w]=[x]}if(z+j>n){p=y-g[w-1].length;return false}};k=r}if(typeof m.opts.lines==="number"&&m.opts.lines>1){var l=function(y,A){var x=d(A),z=x.position().top;if(z!==f){f=z;w+=1}if(w===m.opts.lines){p=y;return false}};k=l}if(m.opts.responsive){var v=function(){g=[];w=0;f=null;p=null;m.$el.html(m.text);clearTimeout(i);i=setTimeout(t,100)};d(window).on("resize."+c,v)}o()}d.fn[c]=function(f){return this.each(function(){try{d(this).data(c,(new a(this,f)))}catch(g){if(window.console){console.error(c+": "+g)}}})}}));

/* globals $ */
var genericSearch = function() {
  var dimensions;
  var dimensionsAliases;
  var dataSource;
  var container;
  var base;
  var afterRequest;
  var page = 1;
  var inputBy;
  var legend = $('.a-js-genericSearch').find('.a-legend');
  var loader = $('.a-js-genericSearch').find('.a-logo-anim');
  var empty = $('.a-js-genericSearch').find('.a-js-noResults');
  var selected = {};
  var onSuccess = function(data) {
    afterRequest(data, false);
  };
  var onSecondError = function() {
    $.getJSON(dataSource[2], onSuccess);
  };
  var onError = function() {
    $.ajax({
      type: 'GET', url: dataSource[1], success: onSuccess, error: onSecondError
    });
  };
  var match = function(arr1, arr2) {
    var count = 0;
    arr1.forEach(function(item) {
      count += arr2.indexOf(parseInt(item, 10)) !== -1 ? 1 : 0;
    });
    return count > 0;
  };
  var dynamicSort = function(property) {
    return function(a, b) {
      if (a[property] < b[property]) {
        return -1;
      } else if (a[property] > b[property]) {
        return 1;
      }
      return 0;
    };
  };
  var grinder = function(item) {
    if (selected[dimensions[0]].length === 0 && selected[dimensions[1]].length === 0) {
      return true;
    }
    if (selected[dimensions[0]].length > 0 && selected[dimensions[1]].length > 0) {
      return (
        match(selected[dimensions[0]], item[dimensions[0]]) &&
        match(selected[dimensions[1]], item[dimensions[1]]));
    }
    return (
      match(selected[dimensions[0]], item[dimensions[0]]) ||
      match(selected[dimensions[1]], item[dimensions[1]])
    );
  };
  loader.hide();
  empty.hide();
  legend.hide();
  if ($('.a-js-genericSearch').length > 0) {
    loader.show();
    $('.a-js-none').show().prev().hide();
    inputBy = $('.a-js-genericSearch').find('input[type=search]').length > 0 ? 'search' : 'filter';
    container = inputBy === 'search' ?
      $('.a-js-genericSearch').find('.a-list') : $('.a-js-genericSearch').find('.a-js-results');
    container.find('li:gt(0)').remove();
    container.find('article:gt(0)').remove();
    base = container.html(); container.html('');
    dataSource = $('.a-js-genericSearch').attr('data-source').split(',');
    afterRequest = function(data, paginating) {
      var lastKeypress;
      var iterate;
      var count = 0;
      var mappedKeys = {};
      var newList = data.SubsidiesList.sort(dynamicSort('SubsidyName'));
      loader.hide();
      $('.a-js-genericSearch').find('.a-card-filter').show();
      $('.a-js-genericSearch').find('.a-js-results').show();
      if (inputBy === 'search') {
        $('.a-js-genericSearch').find('form').on('keyup keypress', function(e) {
          var keyCode = e.keyCode || e.which;
          if (keyCode === 13) {
            e.preventDefault();
            return false;
          }
          return true;
        });
        $('.a-js-genericSearch').find('form').find('input[type=search]').on('keypress', function() {
          lastKeypress = new Date().getTime();
          iterate = true;
          loader.show();
          legend.hide();
          empty.hide();
          container.html('');
        });
        setInterval(function() {
          var value = $('.a-js-genericSearch').find('form').find('input[type=search]').val();
          var query = value !== undefined ? value.toLowerCase() : '';
          if (query.length > 0 && (new Date().getTime() - lastKeypress > 1500) && iterate) {
            iterate = false;
            data.items.forEach(function(item) {
              if (item.name.toLowerCase().indexOf(query) !== -1 ||
                item.parent.toLowerCase().indexOf(query) !== -1) {
                container[item.name.toLowerCase().indexOf(query) !== -1 ? 'prepend' : 'append'](
                  base.replace('%NAME%', item.name).replace('%PARENT%', item.parent)
                    .replace(/%URL%/g, item.url).replace('../..', '')
                );
              }
            });
            loader.hide();
            empty[container.html() === '' ? 'show' : 'hide']();
            legend[container.html() === '' ? 'hide' : 'show']();
          }
        }, 2000);
      } else if (paginating) {
        page += 1;
        $('.a-js-results').find('article').hide();
        newList.filter(grinder).forEach(function(item, index) {
          $('#' + item.id)[index < 20 * page ? 'show' : 'hide']();
        });
        $('.a-js-results').next()[newList.filter(grinder).length < 20 * page ? 'hide' : 'show']();
      } else {
        dimensions = $('.a-js-genericSearch').attr('data-dimensions').split(',');
        dimensionsAliases = $('.a-js-genericSearch').attr('data-dimensionsaliases').split(',');
        selected[dimensions[0]] = [];
        selected[dimensions[1]] = [];
        $('.a-js-genericSearch').attr('data-mappedkeys').split(',').forEach(function(pair) {
          mappedKeys[pair.split('=')[0]] = pair.split('=')[1];
        });
        $('.a-js-results').next().on('click', function() {
          afterRequest(data, true);
        });
        dimensions.forEach(function(dimension, index) {
          var hasNote = $('.a-js-filterDim' + (index + 1)).find('.d-block').length > 0;
          var where = data[dimension + 'List'] ?
            data[dimension + 'List'] : data[dimensionsAliases[index] + 'List'];
          where.reverse().forEach(function(item) {
            $('.a-js-filterDim' + (index + 1))
              .find(hasNote ? '.d-block' : '.text-sm-center')[hasNote ? 'before' : 'append'](
              '<div class="a-switch">' +
              $('.a-js-filterDim' + (index + 1)).find('.a-switch').eq(0).html()
                .replace(/%ID%/g, item[mappedKeys.ID])
                .replace('%TITLE%', item[mappedKeys.TITLE]) + '</div>'
            );
          });
          $('.a-js-filterDim' + (index + 1)).find('.a-switch').eq(0).hide();
        });
        newList.forEach(function(item, index) {
          newList[index].id = 'result-' + index;
          container.append(
            base.replace('%NAME%', item[mappedKeys.NAME]).replace(/%URL%/g, item[mappedKeys.URL])
              .replace('%DESC%', item[mappedKeys.DESC] || 'Ingen beskrivelse.')
              .replace('%IDENTIFIER%', 'result-' + index));
        });
        $('.a-js-results').find('article').each(function(index, item) {
          $(this)[index < 20 * page ? 'show' : 'hide']();
        });
        $('.a-js-results').next().show();
        $('.a-card-filter').find('input[type=checkbox]').on('change', function() {
          page = 1;
          $('.a-js-none').show().prev().hide();
          $('.a-js-results').find('article').hide();
          dimensions.forEach(function(dimension, index) {
            selected[dimension] = [];
            $('.a-js-filterDim' + (index + 1)).find('input[type=checkbox]:checked').each(
              function(_index) {
                selected[dimension].push($(this).attr('id')
                  .replace('filterDim' + (index + 1) + 'ID', ''));
                $('.a-js-filterDim' + (index + 1)).find('.a-js-none').hide().prev()
                  .show()
                  .find('.badge')
                  .html(_index + 1);
              });
            if ($('.a-js-filterDim' + (index + 1)).find('.a-js-plural')) {
              $('.a-js-filterDim' + (index + 1)).find('.a-js-plural').html(index > 0 ? 'r' : '');
            }
          });
          newList.filter(grinder).forEach(function(item, index) {
            $('#' + item.id)[index < 20 * page ? 'show' : 'hide']();
          });
          $('.a-js-results').next()[newList.filter(grinder).length < 20 ? 'hide' : 'show']();
          empty[newList.filter(grinder).length === 0 ? 'show' : 'hide']();
        });
      }
    };
    $.ajax({ type: 'GET', url: dataSource[0], success: onSuccess, error: onError });
  }
};

// /* globals $ */
// var handleValidatorLibrary = function() {
//   $('.form-group').each(function() {
//     var self = $(this);
//     if (self.attr('data-toggle') === 'validator') {
//       self.parent().attr('data-toggle', 'validator')
//         .attr('data-delay', self.attr('data-delay')).validator();
//     }
//   });

//   $('form[data-toggle="validator"]').each(function() {
//     var $form = $(this);
//     $form.on('validate.bs.validator', function() {
//       var allValid = true;
//       $form.find('input').each(function() {
//         if (!this.validity.valid) {
//           allValid = false;
//         }
//         if ($(this).attr('type') === 'file'
//           && $(this).attr('required')
//           && $(this).val() === ''
//           && !$(this).val()) {
//           allValid = false;
//         }
//       });

//       if (allValid) {
//         $form.find('.a-js-hideWhenInvalid').show();
//         $form.find('.a-js-enableWhenValid').removeAttr('disabled');
//       } else {
//         $form.find('.a-js-hideWhenInvalid').hide();
//         $form.find('.a-js-enableWhenValid').attr('disabled', true);
//       }
//     });

//     $(this).trigger('validate.bs.validator');
//   });
// };

/* globals mobileNavigation */
var wasDark = $('header').hasClass('a-darkBackground');
function menuHandler() {
  if ($('body').width() < 768) {
    $('body').on('mouseup', function(e) {
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
    });
  }
}
menuHandler();
$(window).on('resize', function() {
  menuHandler();
  mobileNavigation();
});

var wasDark = $('header').hasClass('a-darkBackground');
if ($('.a-js-personSwitcherTriggerOutside').length > 0) {
  if ($('.a-dropdown-personswitchList-large').length === 1) {
    $('.a-js-personSwitcherTriggerOutside').find('button').css('cursor', 'auto');
  }
  $('body').on('mouseup', function(e) {
    if (!$('.a-globalNav-main').is(':visible')) {
      $('.a-page').children(':not(header)').removeClass('a-js-hidden');
    }
    if ($('.a-dropdown-personswitchList-large').length === 0) {
      if ($(e.target).closest('.a-dropdown-personswitchList').length === 0 &&
      $(e.target).closest('.a-js-personSwitcherTriggerOutside').length === 0) {
        if ($('.a-dropdown-personswitchList').is(':visible')) {
          $('.a-dropdown-personswitchList').hide();
          $('body').css('background-color', '');
          if (wasDark) {
            $('header').addClass('a-darkBackground');
            $('.a-globalNav-logo').find('img')
              .attr('src', $('.a-globalNav-logo').find('img').attr('src').replace('blue', 'white'));
          }
          $('.a-page').children(':not(header)').removeClass('a-js-hidden');
        }
      } else if ($(e.target).closest('.a-js-personSwitcherTriggerOutside').length > 0) {
        if ($('.a-dropdown-personswitchList').is(':visible')) {
          $('.a-dropdown-personswitchList').hide();
          $('body').css('background-color', '');
          if (wasDark) {
            $('header').addClass('a-darkBackground');
            $('.a-globalNav-logo').find('img')
              .attr('src', $('.a-globalNav-logo').find('img').attr('src').replace('blue', 'white'));
          }
          $('.a-page').children(':not(header)').removeClass('a-js-hidden');
        } else {
          $('.a-dropdown-personswitchList').show();
          if ($('.a-dropdown-personswitchList.a-dropdown-fullWidth').length === 1) {
            $('body').css('background-color', '#fff');
            if (wasDark) {
              $('header').removeClass('a-darkBackground');
              $('.a-globalNav-logo').find('img')
                .attr('src', $('.a-globalNav-logo').find('img').attr('src').replace('white', 'blue'));
            }
            $('.a-page').children().not('header').addClass('a-js-hidden');
          }
          if ($('.a-globalNav-main').is(':visible')) {
            $('.navbar-toggler').trigger('click');
          }
        }
      }
    }
  });
  $('.a-js-loadMorePersonSwitcherInfo').prev().hide();
  $('.a-js-loadMorePersonSwitcherInfo').on('click', function() {
    $('.a-dropdown-personswitchList').addClass('a-dropdown-fullWidth');
    if ($('.a-dropdown-personswitchList-large').length === 0) {
      $('body').css('background-color', '#fff');
      if (wasDark) {
        $('header').removeClass('a-darkBackground');
        $('.a-globalNav-logo').find('img')
          .attr('src', $('.a-globalNav-logo').find('img').attr('src').replace('white', 'blue'));
      }
      $('.a-page').children().not('header').addClass('a-js-hidden');
    }
    $(this).prev().show();
    $('.a-js-loadMorePersonSwitcherInfo').hide();
    setTimeout(function() {
      $('.a-js-loadMorePersonSwitcherInfo').show();
      $('.a-dropdown-personswitchList')
        .find('.a-listWithSubLevels').find('button:hidden').each(function(index) {
          if (index < 3) {
            $(this).show();
          }
        });
      $('.a-dropdown-personswitchList')
        .find('.a-bgPanel:hidden').each(function(index) {
          if (index < 3) {
            $(this).show();
          }
        });
      $('.a-js-loadMorePersonSwitcherInfo').prev().hide();
      if (
        (
          $('.a-dropdown-personswitchList-large').length === 0
          &&
          $('.a-dropdown-personswitchList')
            .find('.a-listWithSubLevels').find('button:hidden').length === 0
        )
        ||
        (
          $('.a-dropdown-personswitchList-large').length === 1
          &&
          $('.a-dropdown-personswitchList').find('.a-bgPanel:hidden').length === 0
        )) {
        $('.a-js-loadMorePersonSwitcherInfo').hide();
      }
    }, 1500);
  });
  $('.a-dropdown-personswitchList').find('.a-listWithSubLevels').find('button')
    .each(function(index) {
      if (index > 3) {
        $(this).hide();
      }
    });
  $('.a-dropdown-personswitchList').find('.a-bgPanel')
    .each(function(index) {
      if (index > 3) {
        $(this).hide();
      }
    });
}

/* globals $ */
var questionnaireInteraction = function() {
  $('.a-trigger-question').each(function() {
    $(this).find('input').on('change', function() {
      $(this).parent().parent().parent()
        .next()
        .css('display', 'block');
    });
  });
};

/* globals $, smoothState */
var switchForm = function() {
  $('[name="js-switchForm"]').each(function(index) {
    $(this).attr(
      'data-switchUrl',
      $(this).parent().parent().parent()
        .attr('data-switchUrl' + (index + 1))
    );
  });
  $('[name="js-switchForm"]').change(function() {
    if ($(this).is(':checked')) {
      window.drillDownGetSource($(this).attr('data-switchUrl'));
    }
  });
};

/* globals $ */
var uniformHeight = function() {
  var cardGroup = $('.a-card-group .row');
  var maxheight;
  if ($(window).width() >= 768) {
    maxheight = 0;
    cardGroup.children().each(function() {
      if ($(this).height() > maxheight) {
        maxheight = $(this).height();
      }
    });
    cardGroup.children().children().css('min-height', maxheight);
  } else {
    cardGroup.children().children().css('min-height', 'auto');
  }
};

/* globals
  drilldownInteraction,
  switchForm,
  genericSearch,
  handleValidatorLibrary,
  questionnaireInteraction,
  uniformHeight,
  articleAnchors
*/
window.infoportalInit = function() {
  drilldownInteraction();
  switchForm();
  genericSearch();
 // handleValidatorLibrary();
  questionnaireInteraction();
  uniformHeight();
  articleAnchors();
};
window.infoportalInit();
// $(document).foundation();
$(document).ready(function() {
  setTimeout(function() {
    $('.a-maxTwoLines').ellipsis({
      lines: 2,
      responsive: true
    });
    $('.a-maxThreeLines').ellipsis({
      lines: 3,
      responsive: true
    });
  }, 0);
});
