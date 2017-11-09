/* globals defaultListSort */
// prototype only
var moveRowToTable = function(tableId, $row, rowCopiedClass) {
  var $rowCopy = $row.clone();
  var $existingRowCopy = $('#copy-' + $row.attr('id'));
  var $action = $row.find('a.a-fullWidthLink span').first();

  if ($action.text().trim() === 'Gi rettigheter') {
    $action.text('Gi og fjerne rettigheter');
  } else if ($action.text().trim() === 'Gi og fjerne rettigheter') {
    $action.text('Gi rettigheter');
  }

  // replace original row with dummy row in source list
  $rowCopy.insertAfter($row);

  // check if target list has corresponding deleted row
  if ($existingRowCopy.length > 0) {
    // replace dummy row with original row in target list
    $row.insertAfter($existingRowCopy);
    $existingRowCopy.remove();
  } else {
    // add row to list
    $('#' + tableId).append($row);
  }

  // change styling for source list and set id
  $rowCopy.addClass(rowCopiedClass).addClass('a-disabled');
  $rowCopy.attr('id', 'copy-' + $row.attr('id'));
  $('#' + $rowCopy.attr('id') + ' .a-js-removeMe').remove();

  defaultListSort();
};

var setupAddRightsHandler = function() {
  var $row;
  var targetTableId;
  var sourceTableId;
  var currentTableId;

  function editingSourceTable() {
    return targetTableId && currentTableId && currentTableId !== targetTableId;
  }

  function editingTargetTable() {
    return targetTableId && currentTableId && currentTableId === targetTableId;
  }

  function actionsRowHasSelectedElements() {
    return $row.has('.a-switch input[type="checkbox"]:checked').length > 0;
  }

  $('.a-list .collapse').on('hide.bs.collapse', function() {
    targetTableId = $(this).closest('li')[0].dataset.targetTable;
    sourceTableId = $(this).closest('li')[0].dataset.sourceTable;

    if (targetTableId && sourceTableId) {
      $(this).addClass('a-js-removeMe');
    }
    return $(this).closest('li').removeClass('a-expanded');
  });

  $('.a-list .collapse').on('show.bs.collapse', function() {
    return $(this).closest('li').addClass('a-expanded');
  });

  $('.a-list').on('click', '.a-js-confirmAddRightBtn', function() {
    $row = $(this).closest('li').removeClass('a-expanded');
    currentTableId = $(this).closest('ul').attr('id');
    targetTableId = $row[0].dataset.targetTable;
    sourceTableId = $row[0].dataset.sourceTable;

    $row.find('.collapse').collapse('hide');
    $row.removeClass('a-expanded');

    if (actionsRowHasSelectedElements() && editingSourceTable()) {
      moveRowToTable(targetTableId, $($row), 'a-completed');
    } else if (!actionsRowHasSelectedElements() && editingTargetTable()) {
      moveRowToTable(sourceTableId, $($row), 'a-deleted');
    }
  });
};

var _anchors = function() {
  window.anchors.options.placement = 'left';
  window.anchors.options.class = 'a-sg-anchor';
  window.anchors.remove('.sg-pattern-example h3');
  window.anchors.remove('.a-page h1');
  window.anchors.remove('.a-page h2');
  window.anchors.remove('.a-page h3');
  window.anchors.remove('.a-page h4');
  window.anchors.remove('.a-page h5');
  window.anchors.remove('.a-page h6');
};

var certificateHandler = function() {
  $('.a-js-certificateContainer').on('focus', function() {
    $('.a-js-certificateContainer').closest('label').addClass('a-custom-fileupload--focused');
  });
  $('.a-js-certificateContainer').on('blur', function() {
    $('.a-js-certificateContainer').closest('label').removeClass('a-custom-fileupload--focused');
  });

  $('.a-js-fileInputChangeHandler').on('change', function() {
    var $parent = $(this).parent();
    var $fileListContainer = $parent.next();
    var $listItemText = $fileListContainer.find('.a-js-listItemText');
    var $listItem = $fileListContainer.find('li');
    var $listItemLabel = $fileListContainer.find('li').attr('aria-label');
    var fileName = $(this).val().split('\\')[$(this).val().split('\\').length - 1];

    $parent.hide();
    $fileListContainer.show();
    $listItemText.text(fileName);
    $listItem.attr('aria-label', $listItemLabel + fileName);
  });

  $('.a-js-certificateContainer').on('change', function() {
    $('.a-js-certificateEdit').removeClass('hidden-xs-up');
    $('.a-js-certificateContainer1').removeClass('hidden-xs-up');
    $('.a-js-certificateUpload').addClass('hidden-xs-up');
  });

  $('.a-js-certificateStep1').on('click', function() {
    $('.a-js-certificateContainer1').addClass('hidden-xs-up');
    $('.a-js-certificateContainer2').removeClass('hidden-xs-up');
  });
  $('.a-js-certificateStep2').on('click', function() {
    $('.a-js-certificateEdit').addClass('hidden-xs-up');
    $('.a-js-certificateContainer1').addClass('hidden-xs-up');
    $('.a-js-certificateUpload').removeClass('hidden-xs-up');
  });

  $('.a-js-addcertificate').on('click', function() {
    $('.a-js-certificateList').addClass('hidden-xs-up');
    $('.a-js-certificateUpload').removeClass('hidden-xs-up');
    $('.a-js-certificateUpload').find('input').focus();
  });
  $('.a-custom-certupload').on('change', function() {
    $('.a-js-certificateList').removeClass('hidden-xs-up');
    $('.a-js-certificateUpload').addClass('hidden-xs-up');
    $('#loginInfoEnterprisePanelHeader').find('a').first().focus();
  });
  $('#cancel-upload').on('click', function() {
    $('.a-js-certificateList').removeClass('hidden-xs-up');
    $('.a-js-certificateUpload').addClass('hidden-xs-up');
    $('#loginInfoEnterprisePanelHeader').find('a').first().focus();
  });
  $('.a-js-certificateEdit').on('click', function() {
    $('.a-js-edit-userpass').removeClass('hidden-xs-up');
    $('.a-js-certificates').addClass('hidden-xs-up');
  });
  $('.a-js-certificateSave').on('click', function() {
    $('.a-js-certificates').removeClass('hidden-xs-up');
    $('.a-js-edit-userpass').addClass('hidden-xs-up');
  });
};

/* globals Clipboard */
var clipboard = new Clipboard('.a-js-btnCopy');
clipboard.on('success', function(e) {
  $('.a-js-clipboardMsg').html('Kopiert til utklippstavlen');
  e.clearSelection();
});

clipboard.on('error', function(e) {
  $('.a-js-clipboardMsg').html('Trykk CTRL+C/CMD+C for å kopiere org.nr.');
});

/* globals $ */
var codeLookup = function() {
  var capIt = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  var lastKeypress; var now; var iterate;
  var legend = $('.a-js-lookup').find('.a-legend');
  var loader = $('.a-js-lookup').find('.modal-body').find('.a-loader');
  var empty = $('.a-js-lookup').find('.a-js-noResults');
  var container = $('.a-js-lookup').find('.modal-body').find('.a-radioButtons');
  var check = function() {
    if ($('form').find('input[type=radio]:checked').length > 0) {
      $('form').find('button[type=submit]').removeAttr('disabled');
      $('form').find('input[type=radio]').parent().removeClass('a-js-radioParentGray');
      $('form').find('input[type=radio]:checked').parent()
        .addClass('a-js-radioParentGray');
    } else {
      $('form').find('button[type=submit]').attr('disabled', 'disabled');
    }
  };
  var query; var base = container.html(); container.html(''); loader.hide();
  empty.hide(); legend.hide();
  if ($('.a-js-lookup').length > 0) {
    $('form').on('change', check);
    $.getJSON('../../data/ssb.json', function(data) {
      function createPath(dest, str) {
        var _str = str; var _dest = data[dest.parentCode];
        if (_dest !== undefined) {
          if (dest.name === _dest.name) {
            return createPath(_dest, _str);
          }
          if (str.indexOf(_dest.name) !== -1) {
            return str;
          }
          _str = _dest.name + ' / ' + _str; return createPath(_dest, _str);
        }
        return str;
      }
      $('.a-js-lookup').find('input[type=text]').on('keypress', function() {
        lastKeypress = new Date().getTime(); iterate = true;
        loader.show(); legend.hide(); empty.hide(); container.html(''); check();
      });
      setInterval(function() {
        if ($('.a-js-lookup').find('input[type=text]').val() !== undefined) {
          query = $('.a-js-lookup').find('input[type=text]').val().toLowerCase();
        } else {
          query = '';
        }
        now = new Date().getTime();
        if (query.length > 0 && (now - lastKeypress > 1500) && iterate) {
          iterate = false;
          Object.keys(data).forEach(function(item) {
            var method; var var1 = ' ' + query + ' ';
            var var2 = '-' + query + ' '; var var3 = ' ' + query + '-';
            var var4 = ' ' + query; var var5 = query + ' ';
            var var6 = capIt(query); var re1 = new RegExp(var1, 'g');
            var re2 = new RegExp(var2, 'g'); var re3 = new RegExp(var3, 'g');
            var re4 = new RegExp(var4, 'g'); var re5 = new RegExp(var5, 'g');
            var re6 = new RegExp(var6, 'g');
            var out1 = ' <strong style="color:inherit">' + query + '</strong> ';
            var out2 = '-<strong style="color:inherit">' + query + '</strong> ';
            var out3 = ' <strong style="color:inherit">' + query + '</strong>-';
            var out4 = ' <strong style="color:inherit">' + query + '</strong>';
            var out5 = '<strong style="color:inherit">' + query + '</strong> ';
            var out6 = '<strong style="color:inherit">' + capIt(query) +
              '</strong>';
            if (
              (
                data[item].name.toLowerCase().indexOf(var1) !== -1 ||
                data[item].name.toLowerCase().indexOf(var2) !== -1 ||
                data[item].name.toLowerCase().indexOf(var3) !== -1 ||
                data[item].name.toLowerCase().indexOf(var4) !== -1 ||
                data[item].name.toLowerCase().indexOf(var5) !== -1 ||
                data[item].name.toLowerCase().indexOf(var6) !== -1 ||
                data[item].shortName.toLowerCase().indexOf(var1) !== -1 ||
                data[item].shortName.toLowerCase().indexOf(var2) !== -1 ||
                data[item].shortName.toLowerCase().indexOf(var3) !== -1 ||
                data[item].shortName.toLowerCase().indexOf(var4) !== -1 ||
                data[item].shortName.toLowerCase().indexOf(var5) !== -1 ||
                data[item].shortName.toLowerCase().indexOf(var6) !== -1 ||
                data[item].notes.toLowerCase().indexOf(var1) !== -1 ||
                data[item].notes.toLowerCase().indexOf(var2) !== -1 ||
                data[item].notes.toLowerCase().indexOf(var3) !== -1 ||
                data[item].notes.toLowerCase().indexOf(var4) !== -1 ||
                data[item].notes.toLowerCase().indexOf(var5) !== -1 ||
                data[item].notes.toLowerCase().indexOf(var6) !== -1
              ) &&
              data[item].level === 5
            ) {
              if (
                data[item].name.toLowerCase().indexOf(var1) !== -1 ||
                data[item].name.toLowerCase().indexOf(var2) !== -1 ||
                data[item].name.toLowerCase().indexOf(var3) !== -1 ||
                data[item].name.toLowerCase().indexOf(var4) !== -1 ||
                data[item].name.toLowerCase().indexOf(var5) !== -1 ||
                data[item].name.toLowerCase().indexOf(var6) !== -1
              ) {
                method = 'prepend';
              } else {
                method = 'append';
              }
              container[method](base
                .replace('%NAME%', data[item].name
                  .replace(re1, out1)
                  .replace(re2, out2)
                  .replace(re3, out3)
                  .replace(re4, out4)
                  .replace(re5, out5)
                  .replace(re6, out6)
                )
                .replace('%DESCRIPTION%', data[item].notes
                  .replace(re1, out1)
                  .replace(re2, out2)
                  .replace(re3, out3)
                  .replace(re4, out4)
                  .replace(re5, out5)
                  .replace(re6, out6)
                )
                .replace('%ID%', data[item].shortName)
                .replace('%PATH%', createPath(data[item], '')
                  .replace(re1, out1)
                  .replace(re2, out2)
                  .replace(re3, out3)
                  .replace(re4, out4)
                  .replace(re5, out5)
                  .replace(re6, out6)
                )
              );
            }
          });
          loader.hide(); legend.show();
          if (container.html() === '') {
            empty.show(); legend.hide();
          }
        }
      }, 2000);
    });
  }
};

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

/* globals $ */
var hideIntroInSubs = function() {
  if (JSON.parse($('#sg-pattern-data-footer').text()).patternPartial !== undefined) {
    $('.sg-top').hide();
    $('.sg-statesExplanation').hide();
  }
};

/* globals $ */
var insetVariations = function() {
  $('.sg-pattern').each(function() {
    if ($(this).attr('id').indexOf('♺') !== -1) {
      $(this).addClass('a-sg-patternVariations');
    }
  });
};

/* globals $ */
var goBack = function() {
  var arr = [];
  $('.container').addClass('a-tempAnim');
};

/* globals $ */
var nameChecker = function() {
  var btnText; var initAction; var toggleBtns;
  if ($('.a-js-validator').length > 0) {
    btnText = $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(0)
    .text();
    initAction = '$(".a-js-validator").find("input[type=text]")' +
    '.attr("disabled", "disabled").parent().addClass("disabled")' +
    '.addClass("a-input-approved");' +
    '$(".a-js-validator").find(".a-validatorInfo").eq(0).hide();' +
    '$(".a-js-validator").find(".a-validatorInfo").eq(1).show();' +
    '$(".a-js-validator").find(".a-btn-group").find(".a-btn").eq(0)' +
    '.html("Velg navn").removeAttr("onclick");' +
    '$(".a-js-tryAnother").show();';
    $('.a-js-validator').find('.a-validatorInfo').eq(1).find('i')
    .addClass('a-validatorInfo-icon-approved');
    $('.a-js-validator').find('.a-validatorInfo').css('display', 'inline-block')
    .eq(1)
    .hide();
    if ($('.a-js-tryAnother').length === 0) {
      $('<button/>', {
        type: 'button',
        class: 'a-btn-link a-js-tryAnother',
        text: 'Prøv et annet navn'
      }).appendTo('.a-btn-group', '.a-js-validator');
    }
    $('.a-js-tryAnother').hide().on('click', function() {
      $('.a-js-validator').find('input[type=text]').removeAttr('disabled')
      .parent()
      .removeClass('disabled')
      .removeClass('a-input-approved');
      $('.a-js-tryAnother').hide();
      $('.a-js-validator').find('.a-validatorInfo').eq(0).show();
      $('.a-js-validator').find('.a-validatorInfo').eq(1).hide();
      $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(0)
      .html(btnText)
      .attr('onclick', '$(".a-js-validator").find(".a-message-error").show()')
      .hide();
      $('.a-js-validator').find('input[type=text]').val('');
      $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(1)
      .show();
    });
    $('.a-js-validator').find('.a-message-error');
    toggleBtns = function(el) {
      if ($(el).length > 0 && $(el).val().length > 0) {
        $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(0)
        .show();
        $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(1)
        .hide();
        if (
          $('.a-js-validator').find('input[type=text]').val()
          .indexOf($('.a-personSwitcher-name').attr('title').toLowerCase()
          .split(' ')[1]) !== -1 ||
          $('.a-js-validator').find('input[type=text]').val()
          .indexOf($('.a-personSwitcher-name').attr('title')
          .split(' ')[1]) !== -1
        ) {
          $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(0)
          .attr('onclick', initAction);
        } else {
          $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(0)
          .attr('onclick',
          '$(".a-js-validator").find(".a-message-error").show()');
        }
      } else {
        $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(0)
        .hide();
        $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(1)
        .show();
      }
    };
    toggleBtns($('.a-js-validator').find('input[type=text]'));
    $('.a-js-validator').find('input[type=text]').on('keyup', function(e) {
      if (e.which !== 13) {
        $('.a-js-validator').find('.a-message-error').hide();
      }
      toggleBtns(this);
    });
    $('.a-js-validator').find('input[type=text]').on('keydown', function(e) {
      $('.a-js-validator').find('.a-message-error').hide();
      if (e.which === 13) {
        e.preventDefault(); e.stopPropagation();
        if ($('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(0)
        .is(':visible')) {
          $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(0)
          .click();
        }
      }
    });
    $('.a-js-validator').find('input[type=text]').on('change', function() {
      $('.a-js-validator').find('.a-message-error').hide();
      toggleBtns(this);
    });
  }
};

/* globals $, onboardingStep, onboardingOnShow, onboardingSeek, onboardingHide,
  onboardingCrawl, onboardingBlank */
var onboarding = function() {
  var count = -1; var steps;
  $('body').addClass($('.a-js-bodyClassPersist').attr('data-body'));
  $('.a-page').eq(0).append('<span class="onboarding-wrapper"><span ' +
    'class="a-js-circle"></span></span><span class="onboarding-neutral"></span>'
  );
  if ($('body').width() < 768 && $('.a-onboarding').length > 0) {
    $('.onboarding-wrapper').css('position', 'fixed');
    $('.onboarding-neutral').css('position', 'fixed');
    $('.a-onboarding').css('top', '-120px').css('height', '100%').css('overflow', 'scroll')
      .css('padding-bottom', '0')
      .css('min-height', '110vh');
    $('.navbar-toggler')[0].click();
  }
  steps = onboardingCrawl();
  $('.modal-open').css('overflow-x', 'hidden');
  $('.onboarding-neutral').hide();
  $('.onboarding-wrapper').hide();
  $('.onboarding-wrapper')
    .css('transform', 'translate3d(0, 0, 0) matrix(1, 0, 0, 1, 570, 700)')
    .css('-webkit-transform', 'translate3d(0, 0, 0) matrix(1, 0, 0, 1, 570, 700)');
  $('.a-onboarding').find('.a-btn').on('click', function(e) {
    e.preventDefault(); e.stopPropagation();
    if ($(this).hasClass('a-btn-success')) {
      onboardingHide(onboardingStep(0));
    } else {
      if (count === -1) {
        $('.a-js-circle').css('background-color', 'rgba(2, 47, 81, 0)');
      } else if ($('body').width() < 768 && count === 1) {
        $('.navbar-toggler')[0].click();
      }
      count += 1;
      if (steps[count]) {
        onboardingSeek(count, steps);
      } else {
        $('.a-js-circle').css('background-color', 'rgba(2, 47, 81, 1)');
        onboardingBlank(true, 450);
      }
      onboardingStep(count + 1);
    }
  });
  $('.a-onboarding').find('.a-btn-link').on('click', function(e) {
    e.preventDefault(); e.stopPropagation();
    if (count === -1) {
      onboardingHide(onboardingStep(0));
    } else {
      count = -1; onboardingBlank(true); onboardingStep(0);
      if ($('body').width() < 768) {
        $('.navbar-toggler')[0].click();
      }
    }
  });
  $('.a-js-modalLauncher').each(function() {
    onboardingOnShow($(this).attr('data-target'), function() {
      count = -1; onboardingStep(0);
    });
  });
  $('#modalOnboarding').modal('show');
};

var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
var onboardingBlank = function(bool, delay) {
  $('.onboarding-wrapper')
    .css('transform', 'translate3d(0, 0, 0) matrix(1, 0, 0, 1, 570, 700)')
    .css('-webkit-transform', 'translate3d(0, 0, 0) matrix(1, 0, 0, 1, 570, 700)');
  setTimeout(function() {
    if (bool) {
      $('html, body').animate({ scrollTop: 0 }, 200);
      setTimeout(function() {
        $('.onboarding-neutral').css('opacity', '0.9');
        $('.onboarding-wrapper').css('opacity', '0');
      }, 200);
    } else {
      $('.onboarding-neutral').css('opacity', '0');
      $('.onboarding-wrapper').css('opacity', '0.9');
    }
  }, delay || 0);
};
var onboardingCrawl = function(callback) {
  var stepCrawlCount = 1; var arr = [];
  while (
    $('.a-page').find('.a-js-onboardingTarget-' + stepCrawlCount).length > 0
  ) {
    arr.push($('.a-page').find('.a-js-onboardingTarget-' + stepCrawlCount));
    stepCrawlCount += 1;
  }
  if (callback) {
    callback();
  }
  return arr;
};
var onboardingStep = function(i) {
  $('.a-onboarding').find('.modal-content').hide().eq(i)
    .show();
};
var onboardingOnShow = function(el, fn) {
  $(el).on('show.bs.modal', function() {
    if ($(el).hasClass('a-onboarding')) {
      $('.onboarding-neutral').fadeIn(200, 'linear');
      $('.onboarding-wrapper').show(); $('body').css('overflow-y', 'hidden');
      $('body').css('overflow-x', 'hidden');
      if (fn) {
        fn();
      }
    }
  });
};
var onboardingHide = function(fn) {
  if (fn) {
    setTimeout(function() {
      $('body').css('overflow-x', 'auto');
      fn();
    }, 200);
  } else {
    setTimeout(function() {
      $('body').css('overflow-x', 'auto');
    }, 200);
  }
  $('.a-js-modalLauncher').each(function() {
    $($(this).attr('data-target')).modal('hide');
    $('.onboarding-wrapper').hide();
  });
  $('.onboarding-neutral').fadeOut(200, 'linear');
  $('body').css('overflow-x', 'hidden');
  $('body').css('overflow-y', 'scroll');
};
var onboardingSeek = function(_count, _steps) {
  var count = _count; var steps = _steps; var mod; var horizontalJiggle; var verticalJiggle;
  var ratio;
  if (count === 0) {
    $('.a-js-circle').css('background-color', 'rgba(2, 47, 81, 1)');
    setTimeout(function() {
      $('.onboarding-neutral').css('opacity', '0');
      $('.onboarding-wrapper').css('opacity', '0.9');
      $('.a-js-circle').css('background-color', 'rgba(2, 47, 81, 0)');
    }, 250);
  } else {
    onboardingBlank(false);
  }
  ratio = (steps[count].width() / 7.5);
  if (ratio > 12.5) {
    ratio = 12.5;
  }
  if (steps[count - 1]) {
    if (steps[count - 1].offset().left < steps[count].offset().left) {
      horizontalJiggle = 10;
    } else if (
      steps[count - 1].offset().left > steps[count].offset().left
    ) {
      horizontalJiggle = -10;
    } else {
      horizontalJiggle = 0;
    }
    if (steps[count - 1].offset().top < steps[count].offset().top) {
      verticalJiggle = 10;
    } else if (
      steps[count - 1].offset().top > steps[count].offset().top
    ) {
      verticalJiggle = -10;
    } else {
      verticalJiggle = 0;
    }
  } else {
    horizontalJiggle = 10; verticalJiggle = 0;
  }
  if ($('body').width() < 768) {
    ratio = 7.5;
    if (steps[count].offset().top > 30) {
      mod = (steps[count].offset().top - (steps[count].offset().top - (50)));
    } else {
      mod = 31;
    }
    $('.onboarding-wrapper')
      .css(
        'transform',
        'translate3d(0, 0, 0) matrix(' + (ratio / 5) + ', 0, 0, ' + (ratio / 5) + ',' +
          (steps[count].offset().left + (isIE11 ? (570 * ((ratio / 5))) : 0) + (steps[count].width() / 2)) + ',' +
          ((steps[count].height() / 2)) + ')'
      )
      .css(
        '-webkit-transform',
        'translate3d(0, 0, 0) matrix(' + (ratio / 5) + ', 0, 0, ' + (ratio / 5) + ',' +
          (steps[count].offset().left + (isIE11 ? (570 * ((ratio / 5))) : 0) + (steps[count].width() / 2)) + ',' +
          ((steps[count].height() / 2)) + ')'
      )
      .css('top', mod + 'px')
      .css('left', '0.5px');
    $('html, body').animate({
      scrollTop: steps[count].offset().top - (50)
    }, 200);
  } else {
    if (steps[count].offset().top - (100) > 0) {
      mod = 141;
    } else {
      mod = -1;
    }
    $('.onboarding-wrapper')
      .css(
        'transform',
        'translate3d(0, 0, 0) matrix(' + (ratio / 5) + ', 0, 0, ' + (ratio / 5) + ',' +
          (steps[count].offset().left + (isIE11 ? (570 * ((ratio / 5))) : 0) + (steps[count].width() / 2)) + ',' +
          (steps[count].offset().top + (steps[count].height() / 2)) + ')'
      )
      .css(
        '-webkit-transform',
        'translate3d(0, 0, 0) matrix(' + (ratio / 5) + ', 0, 0, ' + (ratio / 5) + ',' +
          (steps[count].offset().left + (isIE11 ? (570 * ((ratio / 5))) : 0) + (steps[count].width() / 2)) + ',' +
          (steps[count].offset().top + (steps[count].height() / 2)) + ')'
      )
      .css('top', verticalJiggle + 'px')
      .css('left', horizontalJiggle + 'px');
    $('.onboarding-wrapper').css('top', (-1 - mod) + 'px').css('left', '2px');
    setTimeout(function() {
      $('.onboarding-wrapper')
      .css('top', ((verticalJiggle * -0.5) - mod) + 'px')
      .css('left', (horizontalJiggle * -0.5) + 'px');
      setTimeout(function() {
        $('.onboarding-wrapper')
        .css('top', ((verticalJiggle * 0.25) - mod) + 'px')
        .css('left', (horizontalJiggle * 0.25) + 'px');
        setTimeout(function() {
          $('.onboarding-wrapper')
          .css('top', ((verticalJiggle * -0.125) - mod) + 'px')
          .css('left', (horizontalJiggle * -0.125) + 'px');
          setTimeout(function() {
            $('.onboarding-wrapper').css('top', (-1 - mod) + 'px').css('left', '2px');
          }, 100);
        }, 100);
      }, 100);
    }, 450);
    $('html, body').animate({
      scrollTop: steps[count].offset().top - (100)
    }, 200);
  }
};

/* globals $ */
window.openGitMD = function(target) {
  window.open('https://github.com/Altinn/DesignSystem/edit/dev/source' +
    $(target).closest('.sg-pattern').find('.patternLink')
      .attr('href')
      .replace('DesignSystem/', '')
      .replace(/\.\.\//g, '')
      .replace('patterns', '/_patterns')
      .replace(/(?:[^//*]*)$/, '/')
      .replace('//', '.md')
      .replace(/-([0-9]{2})/g, '/$1'), '_blank'
  );
};

/* globals $ */
var preOpenModals = function() {
  $('#modalExample').addClass('show');
};

/* globals $ */
var prototypingInteractionStarteENK = function() {
  var emptyField = 0; /* Counting the number of times the "bransje"-textfield is empty */
  /* Prototyping that place will be visible after typing in postnumber */
  $('#postnummer').keyup(function() {
    if (this.value === '0123') {
      $('.a-js-place').css('display', 'inline');
    } else {
      $('.a-js-place').css('display', 'none');
    }
  });
  /* Prototyping that radiobuttons for "Virksomhet" will be visible after typing in keywords */
  $('#bransje').keyup(function() {
    if (this.value === 'tekstil') {
      $('#a-js-radio-bransje').css('display', 'inline');
    } else {
      $('#a-js-radio-bransje').css('display', 'none');
    }
  });
  /* Step 3 will start when user has typed in three different keywords without success */
  $('#bransje').keyup(function() {
    if (this.value.length === 0) {
      emptyField += 1;
    }
    if (emptyField >= 3) {
      window.location = '../../patterns/04-sider-80-prosess-00-starte-enk-3/04-sider-80-prosess-00-starte-enk-3.html';
    }
  });
  /* Toggling chat */
  $('#link-chat').on('click', function() {
    $('#chat').css('display', 'block');
  });
  $('#close-chat').on('click', function() {
    $('#chat').css('display', 'none');
  });
};

// Hard-coded data, should be replaced with JSON
var availableTags = [
  { label: '1. ACC Security level 2 MAG' },
  { label: '2. Corres test 250116' },
  { label: '3. PSA Skatteoppgjør personlig' },
  { label: '4. RF-1400 Melding om flytting innenlands' },
  { label: '5. Aksjeoppgaven 2014' },
  { label: '6. Et veldig langt punkt i lista som bør gå over alle bredder og grenser, men samtidig oppføre seg riktig i layout. Se så lang tekst dette her er.' }
];

// Hard-coded texts, should be replaced with custom strings
var title = 'Vanligste skjema og tjenester i din organisasjon';
var numberOfResultsLabel = ' treff. Bruk pil opp og pil ned for å navigere i resultatene.';
var noResultsLabel = 'Ingen treff';
var moreThanMaxLabel = 'Listen viser kun de første 100 treff. Vennligst begrens søket ditt';

var searchWithAutocomplete = function() {
  $.widget('custom.catcomplete', $.ui.autocomplete, ({
    _create: function() {
      this._super();
      this.widget().menu('option', 'items', '> :not(.a-js-autocomplete-header)');
      $('.ui-helper-hidden-accessible').addClass('sr-only');
    },
    _renderMenu: function(ul, items) {
      var that = this;
      var iLength = items.length;

      $.each(items, function(index, item) {
        var li = that._renderItemData(ul, item);
        li.attr('role', 'menu');
        li.addClass('a-dotted');
        li.children().first().attr('role', 'button');
      });

      if (iLength === availableTags.length) {
        ul.prepend('<li class=\'a-js-autocomplete-header a-dotted\'>' + title + '</li>');
      } else if (!items[0].isNoResultsLabel) {
        ul.prepend('<li class=\'a-js-autocomplete-header a-dotted\'>' + iLength + ' treff </li>');
      } else {
        $('.ui-autocomplete').children().first().addClass('a-js-autocomplete-header');
      }

      if (iLength >= 3) {
        ul.append('<li class=\'a-js-autocomplete-header a-dotted a-info\'>' + moreThanMaxLabel + '</li>');
      }
    }
  }));

  $('.a-js-autocomplete').catcomplete({
    // delay: 200, // set appropriate delay for ajax call
    source: availableTags,
    appendTo: '.a-autocomplete-container',
    minLength: 0,
    classes: {
      'ui-autocomplete': 'a-list',
      'ui-menu-item': 'a-dotted'
    },
    open: function(event, ui) {
      $('.ui-autocomplete').removeAttr('style'); // remove inline positioning and display of amount results
      $('.ui-autocomplete .ui-menu-item').not(':first-of-type').addClass('a-clickable');
    },
    messages: {
      noResults: noResultsLabel,
      results: function(count) {
        if (count === availableTags.length) {
          return title + '. ' + count + ' ' + numberOfResultsLabel;
        }

        return count + ' ' + numberOfResultsLabel;
      }
    },
    response: function(event, ui) {
      var el;
      if (ui.content.length === 0) {
        el = {
          isNoResultsLabel: true,
          label: noResultsLabel,
          title: noResultsLabel
        };

        ui.content.push(el);
      }
    }
  }).bind('click', function(e) { // TODO should also open on tab focus? issue 3766
    if ($(this).catcomplete('widget').is(':visible')) {
      $(this).catcomplete('close');
    } else {
      $(this).catcomplete('search', $(this).val());
    }
  });
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

/* globals $ */
var selectAll = function() {
  var ctrlDown = false;
  var ctrlKey = 17;
  var cmdKey = 91;
  var aKey = 65;

  var selectText = function(element) {
    var doc = document;
    var text = $(element);
    var range;
    var selection;

    text.each(function(index, value) {
      if ($(value).is(':visible')) {
        if (doc.body.createTextRange) {
          range = document.body.createTextRange();
          range.moveToElementText(value);
          range.select();
        } else if (window.getSelection) {
          selection = window.getSelection();
          range = document.createRange();
          range.selectNodeContents(value);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    });
  };

  var customShortcut = function(e) {
    if (ctrlDown && (e.keyCode === aKey)) {
      e.preventDefault(); e.stopPropagation();
      selectText('.language-markup code');
    }
  };

  $(document).keydown(function(e) {
    if (e.keyCode === ctrlKey || e.keyCode === cmdKey) {
      ctrlDown = true;
    }
  }).keyup(function(e) {
    if (e.keyCode === ctrlKey || e.keyCode === cmdKey) {
      ctrlDown = false;
    }
  });

  $('body').on('click', '.sg-pattern-extra-toggle', function() {
    setTimeout(function() {
      $('.language-markup').off('keydown', customShortcut).attr('tabindex', '1')
        .on('keydown', customShortcut);
    }, 500);
  });
};

/* globals $ */
var toggleArchivedState = function() {
  var archived = $('.sg-pattern-state.archived').parents('.sg-pattern');
  archived.addClass('a-sg-js-showArchived');
  $('.a-sg-js-toggleArchived').prop('checked', false);
  $('.a-sg-js-toggleArchived').click(function() {
    if ($(this).is(':checked')) {
      archived.removeClass('a-sg-js-showArchived');
    } else {
      archived.addClass('a-sg-js-showArchived');
    }
  });
};

/* globals $ */
var toggleSelectProfiles = function() {
  $('#selectedProfiles').hide();
  $('#profile-selection').hide();

  $('#alle-jeg-kan-representere-checkbutton-1').on('click', function() {
    $('#profile-selection').hide();
  });
  $('#select-profile-checkbutton-2').on('click', function() {
    $('#profile-selection').show();
  });
};

/* globals $ */
var toggleTheme = function() {
  $(function() {
    var toggleStuff = function(className) {
      $('body', $('iframe').contents()[0]).removeClass('a-bgBlueLight');
      $('body', $('iframe').contents()[0]).removeClass('a-bgGreyLight');
      $('body', $('iframe').contents()[0]).removeClass('a-bgWhite');
      $('body', $('iframe').contents()[0]).addClass(className);
      $('body', '.ap-profile').attr('class', '');
    };
    $('#sg-switchtheme-blue', $('iframe').contents()[0]).off('change');
    $('#sg-switchtheme-grey', $('iframe').contents()[0]).off('change');
    $('#sg-switchtheme-white', $('iframe').contents()[0]).off('change');
    if ($('body').hasClass('a-bgBlueLight')) {
      $('#sg-switchtheme-blue', $('iframe').contents()[0])
        .prop('checked', true);
    } else if ($('body').hasClass('a-bgGreyLight')) {
      $('#sg-switchtheme-grey', $('iframe').contents()[0])
        .prop('checked', true);
    } else if ($('body').hasClass('a-bgWhite')) {
      $('#sg-switchtheme-white', $('iframe').contents()[0])
        .prop('checked', true);
    }
    $('#sg-switchtheme-blue', $('iframe').contents()[0]).on('change',
      function() {
        toggleStuff('a-bgBlueLight');
      });
    $('#sg-switchtheme-grey', $('iframe').contents()[0]).on('change',
      function() {
        toggleStuff('a-bgGreyLight');
      });
    $('#sg-switchtheme-white', $('iframe').contents()[0]).on('change',
      function() {
        toggleStuff('a-bgWhite');
      });
    $('body', '.ap-profile').attr('class', '');
  });
};

var addListExpandHandler = function() {
  $('body').on('click', '.a-list *[data-toggle="collapse"]', function() {
    // This script runs before the bootstrap collapse handler, so the collapsed-class will still be
    // present even though the content is about to be expanded
    if ($(this).hasClass('collapsed')) {
      $(this).closest('li').addClass('a-expanded');
    } else {
      $(this).closest('li').removeClass('a-expanded');
    }
  });
};

/* globals AltinnDropdown */
/* globals AltinnDropdown:true */
AltinnDropdown = {
  init: function() {
    var that = this;
    $('body').on('click', '[data-toggle="altinn-dropdown"] .a-dropdown-item', function() {
      var $dropdownElement = $(this).closest('[data-toggle="altinn-dropdown"');
      if ($(this).data('value')) {
        $dropdownElement.find('.a-js-altinnDropdown-value').val($(this).data('value'));
      }

      $dropdownElement.find('.a-dropdown-toggle').html($(this).html());
    });
  }
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

var articleAnchors = function() {
  if ($('.epi-wysiwyg').length > 0 && $('.sg-pattern-category').length === 0) {
    window.anchors.options.placement = 'left';
    window.anchors.options.class = 'a-sg-anchor';
    window.anchors.add('h2');
    window.anchors.add('h3');
  }
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

var cardsToggle = function() {
  $('.a-box-button').on('click', function() {
    $(this).blur(); // remove blue background on expanded cards
  });
};

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

!function ($) {

  "use strict";

  var FOUNDATION_VERSION = '6.3.1';

  // Global Foundation object
  // This is attached to the window, or used as a module for AMD/Browserify
  var Foundation = {
    version: FOUNDATION_VERSION,

    /**
     * Stores initialized plugins.
     */
    _plugins: {},

    /**
     * Stores generated unique ids for plugin instances
     */
    _uuids: [],

    /**
     * Returns a boolean for RTL support
     */
    rtl: function () {
      return $('html').attr('dir') === 'rtl';
    },
    /**
     * Defines a Foundation plugin, adding it to the `Foundation` namespace and the list of plugins to initialize when reflowing.
     * @param {Object} plugin - The constructor of the plugin.
     */
    plugin: function (plugin, name) {
      // Object key to use when adding to global Foundation object
      // Examples: Foundation.Reveal, Foundation.OffCanvas
      var className = name || functionName(plugin);
      // Object key to use when storing the plugin, also used to create the identifying data attribute for the plugin
      // Examples: data-reveal, data-off-canvas
      var attrName = hyphenate(className);

      // Add to the Foundation object and the plugins list (for reflowing)
      this._plugins[attrName] = this[className] = plugin;
    },
    /**
     * @function
     * Populates the _uuids array with pointers to each individual plugin instance.
     * Adds the `zfPlugin` data-attribute to programmatically created plugins to allow use of $(selector).foundation(method) calls.
     * Also fires the initialization event for each plugin, consolidating repetitive code.
     * @param {Object} plugin - an instance of a plugin, usually `this` in context.
     * @param {String} name - the name of the plugin, passed as a camelCased string.
     * @fires Plugin#init
     */
    registerPlugin: function (plugin, name) {
      var pluginName = name ? hyphenate(name) : functionName(plugin.constructor).toLowerCase();
      plugin.uuid = this.GetYoDigits(6, pluginName);

      if (!plugin.$element.attr('data-' + pluginName)) {
        plugin.$element.attr('data-' + pluginName, plugin.uuid);
      }
      if (!plugin.$element.data('zfPlugin')) {
        plugin.$element.data('zfPlugin', plugin);
      }
      /**
       * Fires when the plugin has initialized.
       * @event Plugin#init
       */
      plugin.$element.trigger('init.zf.' + pluginName);

      this._uuids.push(plugin.uuid);

      return;
    },
    /**
     * @function
     * Removes the plugins uuid from the _uuids array.
     * Removes the zfPlugin data attribute, as well as the data-plugin-name attribute.
     * Also fires the destroyed event for the plugin, consolidating repetitive code.
     * @param {Object} plugin - an instance of a plugin, usually `this` in context.
     * @fires Plugin#destroyed
     */
    unregisterPlugin: function (plugin) {
      var pluginName = hyphenate(functionName(plugin.$element.data('zfPlugin').constructor));

      this._uuids.splice(this._uuids.indexOf(plugin.uuid), 1);
      plugin.$element.removeAttr('data-' + pluginName).removeData('zfPlugin')
      /**
       * Fires when the plugin has been destroyed.
       * @event Plugin#destroyed
       */
      .trigger('destroyed.zf.' + pluginName);
      for (var prop in plugin) {
        plugin[prop] = null; //clean up script to prep for garbage collection.
      }
      return;
    },

    /**
     * @function
     * Causes one or more active plugins to re-initialize, resetting event listeners, recalculating positions, etc.
     * @param {String} plugins - optional string of an individual plugin key, attained by calling `$(element).data('pluginName')`, or string of a plugin class i.e. `'dropdown'`
     * @default If no argument is passed, reflow all currently active plugins.
     */
    reInit: function (plugins) {
      var isJQ = plugins instanceof $;
      try {
        if (isJQ) {
          plugins.each(function () {
            $(this).data('zfPlugin')._init();
          });
        } else {
          var type = typeof plugins,
              _this = this,
              fns = {
            'object': function (plgs) {
              plgs.forEach(function (p) {
                p = hyphenate(p);
                $('[data-' + p + ']').foundation('_init');
              });
            },
            'string': function () {
              plugins = hyphenate(plugins);
              $('[data-' + plugins + ']').foundation('_init');
            },
            'undefined': function () {
              this['object'](Object.keys(_this._plugins));
            }
          };
          fns[type](plugins);
        }
      } catch (err) {
        console.error(err);
      } finally {
        return plugins;
      }
    },

    /**
     * returns a random base-36 uid with namespacing
     * @function
     * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
     * @param {String} namespace - name of plugin to be incorporated in uid, optional.
     * @default {String} '' - if no plugin name is provided, nothing is appended to the uid.
     * @returns {String} - unique id
     */
    GetYoDigits: function (length, namespace) {
      length = length || 6;
      return Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)).toString(36).slice(1) + (namespace ? '-' + namespace : '');
    },
    /**
     * Initialize plugins on any elements within `elem` (and `elem` itself) that aren't already initialized.
     * @param {Object} elem - jQuery object containing the element to check inside. Also checks the element itself, unless it's the `document` object.
     * @param {String|Array} plugins - A list of plugins to initialize. Leave this out to initialize everything.
     */
    reflow: function (elem, plugins) {

      // If plugins is undefined, just grab everything
      if (typeof plugins === 'undefined') {
        plugins = Object.keys(this._plugins);
      }
      // If plugins is a string, convert it to an array with one item
      else if (typeof plugins === 'string') {
          plugins = [plugins];
        }

      var _this = this;

      // Iterate through each plugin
      $.each(plugins, function (i, name) {
        // Get the current plugin
        var plugin = _this._plugins[name];

        // Localize the search to all elements inside elem, as well as elem itself, unless elem === document
        var $elem = $(elem).find('[data-' + name + ']').addBack('[data-' + name + ']');

        // For each plugin found, initialize it
        $elem.each(function () {
          var $el = $(this),
              opts = {};
          // Don't double-dip on plugins
          if ($el.data('zfPlugin')) {
            console.warn("Tried to initialize " + name + " on an element that already has a Foundation plugin.");
            return;
          }

          if ($el.attr('data-options')) {
            var thing = $el.attr('data-options').split(';').forEach(function (e, i) {
              var opt = e.split(':').map(function (el) {
                return el.trim();
              });
              if (opt[0]) opts[opt[0]] = parseValue(opt[1]);
            });
          }
          try {
            $el.data('zfPlugin', new plugin($(this), opts));
          } catch (er) {
            console.error(er);
          } finally {
            return;
          }
        });
      });
    },
    getFnName: functionName,
    transitionend: function ($elem) {
      var transitions = {
        'transition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'otransitionend'
      };
      var elem = document.createElement('div'),
          end;

      for (var t in transitions) {
        if (typeof elem.style[t] !== 'undefined') {
          end = transitions[t];
        }
      }
      if (end) {
        return end;
      } else {
        end = setTimeout(function () {
          $elem.triggerHandler('transitionend', [$elem]);
        }, 1);
        return 'transitionend';
      }
    }
  };

  Foundation.util = {
    /**
     * Function for applying a debounce effect to a function call.
     * @function
     * @param {Function} func - Function to be called at end of timeout.
     * @param {Number} delay - Time in ms to delay the call of `func`.
     * @returns function
     */
    throttle: function (func, delay) {
      var timer = null;

      return function () {
        var context = this,
            args = arguments;

        if (timer === null) {
          timer = setTimeout(function () {
            func.apply(context, args);
            timer = null;
          }, delay);
        }
      };
    }
  };

  // TODO: consider not making this a jQuery function
  // TODO: need way to reflow vs. re-initialize
  /**
   * The Foundation jQuery method.
   * @param {String|Array} method - An action to perform on the current jQuery object.
   */
  var foundation = function (method) {
    var type = typeof method,
        $meta = $('meta.foundation-mq'),
        $noJS = $('.no-js');

    if (!$meta.length) {
      $('<meta class="foundation-mq">').appendTo(document.head);
    }
    if ($noJS.length) {
      $noJS.removeClass('no-js');
    }

    if (type === 'undefined') {
      //needs to initialize the Foundation object, or an individual plugin.
      Foundation.MediaQuery._init();
      Foundation.reflow(this);
    } else if (type === 'string') {
      //an individual method to invoke on a plugin or group of plugins
      var args = Array.prototype.slice.call(arguments, 1); //collect all the arguments, if necessary
      var plugClass = this.data('zfPlugin'); //determine the class of plugin

      if (plugClass !== undefined && plugClass[method] !== undefined) {
        //make sure both the class and method exist
        if (this.length === 1) {
          //if there's only one, call it directly.
          plugClass[method].apply(plugClass, args);
        } else {
          this.each(function (i, el) {
            //otherwise loop through the jQuery collection and invoke the method on each
            plugClass[method].apply($(el).data('zfPlugin'), args);
          });
        }
      } else {
        //error for no class or no method
        throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (plugClass ? functionName(plugClass) : 'this element') + '.');
      }
    } else {
      //error for invalid argument type
      throw new TypeError('We\'re sorry, ' + type + ' is not a valid parameter. You must use a string representing the method you wish to invoke.');
    }
    return this;
  };

  window.Foundation = Foundation;
  $.fn.foundation = foundation;

  // Polyfill for requestAnimationFrame
  (function () {
    if (!Date.now || !window.Date.now) window.Date.now = Date.now = function () {
      return new Date().getTime();
    };

    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
      var vp = vendors[i];
      window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame'];
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
      var lastTime = 0;
      window.requestAnimationFrame = function (callback) {
        var now = Date.now();
        var nextTime = Math.max(lastTime + 16, now);
        return setTimeout(function () {
          callback(lastTime = nextTime);
        }, nextTime - now);
      };
      window.cancelAnimationFrame = clearTimeout;
    }
    /**
     * Polyfill for performance.now, required by rAF
     */
    if (!window.performance || !window.performance.now) {
      window.performance = {
        start: Date.now(),
        now: function () {
          return Date.now() - this.start;
        }
      };
    }
  })();
  if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
      if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }

      var aArgs = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP = function () {},
          fBound = function () {
        return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
      };

      if (this.prototype) {
        // native functions don't have a prototype
        fNOP.prototype = this.prototype;
      }
      fBound.prototype = new fNOP();

      return fBound;
    };
  }
  // Polyfill to get the name of a function in IE9
  function functionName(fn) {
    if (Function.prototype.name === undefined) {
      var funcNameRegex = /function\s([^(]{1,})\(/;
      var results = funcNameRegex.exec(fn.toString());
      return results && results.length > 1 ? results[1].trim() : "";
    } else if (fn.prototype === undefined) {
      return fn.constructor.name;
    } else {
      return fn.prototype.constructor.name;
    }
  }
  function parseValue(str) {
    if ('true' === str) return true;else if ('false' === str) return false;else if (!isNaN(str * 1)) return parseFloat(str);
    return str;
  }
  // Convert PascalCase to kebab-case
  // Thank you: http://stackoverflow.com/a/8955580
  function hyphenate(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }
}(jQuery);
'use strict';

!function ($) {

  // Default set of media queries
  var defaultQueries = {
    'default': 'only screen',
    landscape: 'only screen and (orientation: landscape)',
    portrait: 'only screen and (orientation: portrait)',
    retina: 'only screen and (-webkit-min-device-pixel-ratio: 2),' + 'only screen and (min--moz-device-pixel-ratio: 2),' + 'only screen and (-o-min-device-pixel-ratio: 2/1),' + 'only screen and (min-device-pixel-ratio: 2),' + 'only screen and (min-resolution: 192dpi),' + 'only screen and (min-resolution: 2dppx)'
  };

  var MediaQuery = {
    queries: [],

    current: '',

    /**
     * Initializes the media query helper, by extracting the breakpoint list from the CSS and activating the breakpoint watcher.
     * @function
     * @private
     */
    _init: function () {
      var self = this;
      var extractedStyles = $('.foundation-mq').css('font-family');
      var namedQueries;

      namedQueries = parseStyleToObject(extractedStyles);

      for (var key in namedQueries) {
        if (namedQueries.hasOwnProperty(key)) {
          self.queries.push({
            name: key,
            value: 'only screen and (min-width: ' + namedQueries[key] + ')'
          });
        }
      }

      this.current = this._getCurrentSize();

      this._watcher();
    },


    /**
     * Checks if the screen is at least as wide as a breakpoint.
     * @function
     * @param {String} size - Name of the breakpoint to check.
     * @returns {Boolean} `true` if the breakpoint matches, `false` if it's smaller.
     */
    atLeast: function (size) {
      var query = this.get(size);

      if (query) {
        return window.matchMedia(query).matches;
      }

      return false;
    },


    /**
     * Checks if the screen matches to a breakpoint.
     * @function
     * @param {String} size - Name of the breakpoint to check, either 'small only' or 'small'. Omitting 'only' falls back to using atLeast() method.
     * @returns {Boolean} `true` if the breakpoint matches, `false` if it does not.
     */
    is: function (size) {
      size = size.trim().split(' ');
      if (size.length > 1 && size[1] === 'only') {
        if (size[0] === this._getCurrentSize()) return true;
      } else {
        return this.atLeast(size[0]);
      }
      return false;
    },


    /**
     * Gets the media query of a breakpoint.
     * @function
     * @param {String} size - Name of the breakpoint to get.
     * @returns {String|null} - The media query of the breakpoint, or `null` if the breakpoint doesn't exist.
     */
    get: function (size) {
      for (var i in this.queries) {
        if (this.queries.hasOwnProperty(i)) {
          var query = this.queries[i];
          if (size === query.name) return query.value;
        }
      }

      return null;
    },


    /**
     * Gets the current breakpoint name by testing every breakpoint and returning the last one to match (the biggest one).
     * @function
     * @private
     * @returns {String} Name of the current breakpoint.
     */
    _getCurrentSize: function () {
      var matched;

      for (var i = 0; i < this.queries.length; i++) {
        var query = this.queries[i];

        if (window.matchMedia(query.value).matches) {
          matched = query;
        }
      }

      if (typeof matched === 'object') {
        return matched.name;
      } else {
        return matched;
      }
    },


    /**
     * Activates the breakpoint watcher, which fires an event on the window whenever the breakpoint changes.
     * @function
     * @private
     */
    _watcher: function () {
      var _this = this;

      $(window).on('resize.zf.mediaquery', function () {
        var newSize = _this._getCurrentSize(),
            currentSize = _this.current;

        if (newSize !== currentSize) {
          // Change the current media query
          _this.current = newSize;

          // Broadcast the media query change on the window
          $(window).trigger('changed.zf.mediaquery', [newSize, currentSize]);
        }
      });
    }
  };

  Foundation.MediaQuery = MediaQuery;

  // matchMedia() polyfill - Test a CSS media type/query in JS.
  // Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license
  window.matchMedia || (window.matchMedia = function () {
    'use strict';

    // For browsers that support matchMedium api such as IE 9 and webkit

    var styleMedia = window.styleMedia || window.media;

    // For those that don't support matchMedium
    if (!styleMedia) {
      var style = document.createElement('style'),
          script = document.getElementsByTagName('script')[0],
          info = null;

      style.type = 'text/css';
      style.id = 'matchmediajs-test';

      script && script.parentNode && script.parentNode.insertBefore(style, script);

      // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
      info = 'getComputedStyle' in window && window.getComputedStyle(style, null) || style.currentStyle;

      styleMedia = {
        matchMedium: function (media) {
          var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

          // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
          if (style.styleSheet) {
            style.styleSheet.cssText = text;
          } else {
            style.textContent = text;
          }

          // Test if media query is true or false
          return info.width === '1px';
        }
      };
    }

    return function (media) {
      return {
        matches: styleMedia.matchMedium(media || 'all'),
        media: media || 'all'
      };
    };
  }());

  // Thank you: https://github.com/sindresorhus/query-string
  function parseStyleToObject(str) {
    var styleObject = {};

    if (typeof str !== 'string') {
      return styleObject;
    }

    str = str.trim().slice(1, -1); // browsers re-quote string style values

    if (!str) {
      return styleObject;
    }

    styleObject = str.split('&').reduce(function (ret, param) {
      var parts = param.replace(/\+/g, ' ').split('=');
      var key = parts[0];
      var val = parts[1];
      key = decodeURIComponent(key);

      // missing `=` should be `null`:
      // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
      val = val === undefined ? null : decodeURIComponent(val);

      if (!ret.hasOwnProperty(key)) {
        ret[key] = val;
      } else if (Array.isArray(ret[key])) {
        ret[key].push(val);
      } else {
        ret[key] = [ret[key], val];
      }
      return ret;
    }, {});

    return styleObject;
  }

  Foundation.MediaQuery = MediaQuery;
}(jQuery);
/*******************************************
 *                                         *
 * This util was created by Marius Olbertz *
 * Please thank Marius on GitHub /owlbertz *
 * or the web http://www.mariusolbertz.de/ *
 *                                         *
 ******************************************/

'use strict';

!function ($) {

  var keyCodes = {
    9: 'TAB',
    13: 'ENTER',
    27: 'ESCAPE',
    32: 'SPACE',
    37: 'ARROW_LEFT',
    38: 'ARROW_UP',
    39: 'ARROW_RIGHT',
    40: 'ARROW_DOWN'
  };

  var commands = {};

  var Keyboard = {
    keys: getKeyCodes(keyCodes),

    /**
     * Parses the (keyboard) event and returns a String that represents its key
     * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
     * @param {Event} event - the event generated by the event handler
     * @return String key - String that represents the key pressed
     */
    parseKey: function (event) {
      var key = keyCodes[event.which || event.keyCode] || String.fromCharCode(event.which).toUpperCase();

      // Remove un-printable characters, e.g. for `fromCharCode` calls for CTRL only events
      key = key.replace(/\W+/, '');

      if (event.shiftKey) key = 'SHIFT_' + key;
      if (event.ctrlKey) key = 'CTRL_' + key;
      if (event.altKey) key = 'ALT_' + key;

      // Remove trailing underscore, in case only modifiers were used (e.g. only `CTRL_ALT`)
      key = key.replace(/_$/, '');

      return key;
    },


    /**
     * Handles the given (keyboard) event
     * @param {Event} event - the event generated by the event handler
     * @param {String} component - Foundation component's name, e.g. Slider or Reveal
     * @param {Objects} functions - collection of functions that are to be executed
     */
    handleKey: function (event, component, functions) {
      var commandList = commands[component],
          keyCode = this.parseKey(event),
          cmds,
          command,
          fn;

      if (!commandList) return console.warn('Component not defined!');

      if (typeof commandList.ltr === 'undefined') {
        // this component does not differentiate between ltr and rtl
        cmds = commandList; // use plain list
      } else {
        // merge ltr and rtl: if document is rtl, rtl overwrites ltr and vice versa
        if (Foundation.rtl()) cmds = $.extend({}, commandList.ltr, commandList.rtl);else cmds = $.extend({}, commandList.rtl, commandList.ltr);
      }
      command = cmds[keyCode];

      fn = functions[command];
      if (fn && typeof fn === 'function') {
        // execute function  if exists
        var returnValue = fn.apply();
        if (functions.handled || typeof functions.handled === 'function') {
          // execute function when event was handled
          functions.handled(returnValue);
        }
      } else {
        if (functions.unhandled || typeof functions.unhandled === 'function') {
          // execute function when event was not handled
          functions.unhandled();
        }
      }
    },


    /**
     * Finds all focusable elements within the given `$element`
     * @param {jQuery} $element - jQuery object to search within
     * @return {jQuery} $focusable - all focusable elements within `$element`
     */
    findFocusable: function ($element) {
      if (!$element) {
        return false;
      }
      return $element.find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]').filter(function () {
        if (!$(this).is(':visible') || $(this).attr('tabindex') < 0) {
          return false;
        } //only have visible elements and those that have a tabindex greater or equal 0
        return true;
      });
    },


    /**
     * Returns the component name name
     * @param {Object} component - Foundation component, e.g. Slider or Reveal
     * @return String componentName
     */

    register: function (componentName, cmds) {
      commands[componentName] = cmds;
    },


    /**
     * Traps the focus in the given element.
     * @param  {jQuery} $element  jQuery object to trap the foucs into.
     */
    trapFocus: function ($element) {
      var $focusable = Foundation.Keyboard.findFocusable($element),
          $firstFocusable = $focusable.eq(0),
          $lastFocusable = $focusable.eq(-1);

      $element.on('keydown.zf.trapfocus', function (event) {
        if (event.target === $lastFocusable[0] && Foundation.Keyboard.parseKey(event) === 'TAB') {
          event.preventDefault();
          $firstFocusable.focus();
        } else if (event.target === $firstFocusable[0] && Foundation.Keyboard.parseKey(event) === 'SHIFT_TAB') {
          event.preventDefault();
          $lastFocusable.focus();
        }
      });
    },

    /**
     * Releases the trapped focus from the given element.
     * @param  {jQuery} $element  jQuery object to release the focus for.
     */
    releaseFocus: function ($element) {
      $element.off('keydown.zf.trapfocus');
    }
  };

  /*
   * Constants for easier comparing.
   * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
   */
  function getKeyCodes(kcs) {
    var k = {};
    for (var kc in kcs) {
      k[kcs[kc]] = kcs[kc];
    }return k;
  }

  Foundation.Keyboard = Keyboard;
}(jQuery);
'use strict';

!function ($) {

  /**
   * Motion module.
   * @module foundation.motion
   */

  var initClasses = ['mui-enter', 'mui-leave'];
  var activeClasses = ['mui-enter-active', 'mui-leave-active'];

  var Motion = {
    animateIn: function (element, animation, cb) {
      animate(true, element, animation, cb);
    },

    animateOut: function (element, animation, cb) {
      animate(false, element, animation, cb);
    }
  };

  function Move(duration, elem, fn) {
    var anim,
        prog,
        start = null;
    // console.log('called');

    if (duration === 0) {
      fn.apply(elem);
      elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
      return;
    }

    function move(ts) {
      if (!start) start = ts;
      // console.log(start, ts);
      prog = ts - start;
      fn.apply(elem);

      if (prog < duration) {
        anim = window.requestAnimationFrame(move, elem);
      } else {
        window.cancelAnimationFrame(anim);
        elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
      }
    }
    anim = window.requestAnimationFrame(move);
  }

  /**
   * Animates an element in or out using a CSS transition class.
   * @function
   * @private
   * @param {Boolean} isIn - Defines if the animation is in or out.
   * @param {Object} element - jQuery or HTML object to animate.
   * @param {String} animation - CSS class to use.
   * @param {Function} cb - Callback to run when animation is finished.
   */
  function animate(isIn, element, animation, cb) {
    element = $(element).eq(0);

    if (!element.length) return;

    var initClass = isIn ? initClasses[0] : initClasses[1];
    var activeClass = isIn ? activeClasses[0] : activeClasses[1];

    // Set up the animation
    reset();

    element.addClass(animation).css('transition', 'none');

    requestAnimationFrame(function () {
      element.addClass(initClass);
      if (isIn) element.show();
    });

    // Start the animation
    requestAnimationFrame(function () {
      element[0].offsetWidth;
      element.css('transition', '').addClass(activeClass);
    });

    // Clean up the animation when it finishes
    element.one(Foundation.transitionend(element), finish);

    // Hides the element (for out animations), resets the element, and runs a callback
    function finish() {
      if (!isIn) element.hide();
      reset();
      if (cb) cb.apply(element);
    }

    // Resets transitions and removes motion-specific classes
    function reset() {
      element[0].style.transitionDuration = 0;
      element.removeClass(initClass + ' ' + activeClass + ' ' + animation);
    }
  }

  Foundation.Move = Move;
  Foundation.Motion = Motion;
}(jQuery);
'use strict';

!function ($) {

  var Nest = {
    Feather: function (menu) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'zf';

      menu.attr('role', 'menubar');

      var items = menu.find('li').attr({ 'role': 'menuitem' }),
          subMenuClass = 'is-' + type + '-submenu',
          subItemClass = subMenuClass + '-item',
          hasSubClass = 'is-' + type + '-submenu-parent';

      items.each(function () {
        var $item = $(this),
            $sub = $item.children('ul');

        if ($sub.length) {
          $item.addClass(hasSubClass).attr({
            'aria-haspopup': true,
            'aria-label': $item.children('a:first').text()
          });
          // Note:  Drilldowns behave differently in how they hide, and so need
          // additional attributes.  We should look if this possibly over-generalized
          // utility (Nest) is appropriate when we rework menus in 6.4
          if (type === 'drilldown') {
            $item.attr({ 'aria-expanded': false });
          }

          $sub.addClass('submenu ' + subMenuClass).attr({
            'data-submenu': '',
            'role': 'menu'
          });
          if (type === 'drilldown') {
            $sub.attr({ 'aria-hidden': true });
          }
        }

        if ($item.parent('[data-submenu]').length) {
          $item.addClass('is-submenu-item ' + subItemClass);
        }
      });

      return;
    },
    Burn: function (menu, type) {
      var //items = menu.find('li'),
      subMenuClass = 'is-' + type + '-submenu',
          subItemClass = subMenuClass + '-item',
          hasSubClass = 'is-' + type + '-submenu-parent';

      menu.find('>li, .menu, .menu > li').removeClass(subMenuClass + ' ' + subItemClass + ' ' + hasSubClass + ' is-submenu-item submenu is-active').removeAttr('data-submenu').css('display', '');

      // console.log(      menu.find('.' + subMenuClass + ', .' + subItemClass + ', .has-submenu, .is-submenu-item, .submenu, [data-submenu]')
      //           .removeClass(subMenuClass + ' ' + subItemClass + ' has-submenu is-submenu-item submenu')
      //           .removeAttr('data-submenu'));
      // items.each(function(){
      //   var $item = $(this),
      //       $sub = $item.children('ul');
      //   if($item.parent('[data-submenu]').length){
      //     $item.removeClass('is-submenu-item ' + subItemClass);
      //   }
      //   if($sub.length){
      //     $item.removeClass('has-submenu');
      //     $sub.removeClass('submenu ' + subMenuClass).removeAttr('data-submenu');
      //   }
      // });
    }
  };

  Foundation.Nest = Nest;
}(jQuery);
'use strict';

!function ($) {

  Foundation.Box = {
    ImNotTouchingYou: ImNotTouchingYou,
    GetDimensions: GetDimensions,
    GetOffsets: GetOffsets
  };

  /**
   * Compares the dimensions of an element to a container and determines collision events with container.
   * @function
   * @param {jQuery} element - jQuery object to test for collisions.
   * @param {jQuery} parent - jQuery object to use as bounding container.
   * @param {Boolean} lrOnly - set to true to check left and right values only.
   * @param {Boolean} tbOnly - set to true to check top and bottom values only.
   * @default if no parent object passed, detects collisions with `window`.
   * @returns {Boolean} - true if collision free, false if a collision in any direction.
   */
  function ImNotTouchingYou(element, parent, lrOnly, tbOnly) {
    var eleDims = GetDimensions(element),
        top,
        bottom,
        left,
        right;

    if (parent) {
      var parDims = GetDimensions(parent);

      bottom = eleDims.offset.top + eleDims.height <= parDims.height + parDims.offset.top;
      top = eleDims.offset.top >= parDims.offset.top;
      left = eleDims.offset.left >= parDims.offset.left;
      right = eleDims.offset.left + eleDims.width <= parDims.width + parDims.offset.left;
    } else {
      bottom = eleDims.offset.top + eleDims.height <= eleDims.windowDims.height + eleDims.windowDims.offset.top;
      top = eleDims.offset.top >= eleDims.windowDims.offset.top;
      left = eleDims.offset.left >= eleDims.windowDims.offset.left;
      right = eleDims.offset.left + eleDims.width <= eleDims.windowDims.width;
    }

    var allDirs = [bottom, top, left, right];

    if (lrOnly) {
      return left === right === true;
    }

    if (tbOnly) {
      return top === bottom === true;
    }

    return allDirs.indexOf(false) === -1;
  };

  /**
   * Uses native methods to return an object of dimension values.
   * @function
   * @param {jQuery || HTML} element - jQuery object or DOM element for which to get the dimensions. Can be any element other that document or window.
   * @returns {Object} - nested object of integer pixel values
   * TODO - if element is window, return only those values.
   */
  function GetDimensions(elem, test) {
    elem = elem.length ? elem[0] : elem;

    if (elem === window || elem === document) {
      throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");
    }

    var rect = elem.getBoundingClientRect(),
        parRect = elem.parentNode.getBoundingClientRect(),
        winRect = document.body.getBoundingClientRect(),
        winY = window.pageYOffset,
        winX = window.pageXOffset;

    return {
      width: rect.width,
      height: rect.height,
      offset: {
        top: rect.top + winY,
        left: rect.left + winX
      },
      parentDims: {
        width: parRect.width,
        height: parRect.height,
        offset: {
          top: parRect.top + winY,
          left: parRect.left + winX
        }
      },
      windowDims: {
        width: winRect.width,
        height: winRect.height,
        offset: {
          top: winY,
          left: winX
        }
      }
    };
  }

  /**
   * Returns an object of top and left integer pixel values for dynamically rendered elements,
   * such as: Tooltip, Reveal, and Dropdown
   * @function
   * @param {jQuery} element - jQuery object for the element being positioned.
   * @param {jQuery} anchor - jQuery object for the element's anchor point.
   * @param {String} position - a string relating to the desired position of the element, relative to it's anchor
   * @param {Number} vOffset - integer pixel value of desired vertical separation between anchor and element.
   * @param {Number} hOffset - integer pixel value of desired horizontal separation between anchor and element.
   * @param {Boolean} isOverflow - if a collision event is detected, sets to true to default the element to full width - any desired offset.
   * TODO alter/rewrite to work with `em` values as well/instead of pixels
   */
  function GetOffsets(element, anchor, position, vOffset, hOffset, isOverflow) {
    var $eleDims = GetDimensions(element),
        $anchorDims = anchor ? GetDimensions(anchor) : null;

    switch (position) {
      case 'top':
        return {
          left: Foundation.rtl() ? $anchorDims.offset.left - $eleDims.width + $anchorDims.width : $anchorDims.offset.left,
          top: $anchorDims.offset.top - ($eleDims.height + vOffset)
        };
        break;
      case 'left':
        return {
          left: $anchorDims.offset.left - ($eleDims.width + hOffset),
          top: $anchorDims.offset.top
        };
        break;
      case 'right':
        return {
          left: $anchorDims.offset.left + $anchorDims.width + hOffset,
          top: $anchorDims.offset.top
        };
        break;
      case 'center top':
        return {
          left: $anchorDims.offset.left + $anchorDims.width / 2 - $eleDims.width / 2,
          top: $anchorDims.offset.top - ($eleDims.height + vOffset)
        };
        break;
      case 'center bottom':
        return {
          left: isOverflow ? hOffset : $anchorDims.offset.left + $anchorDims.width / 2 - $eleDims.width / 2,
          top: $anchorDims.offset.top + $anchorDims.height + vOffset
        };
        break;
      case 'center left':
        return {
          left: $anchorDims.offset.left - ($eleDims.width + hOffset),
          top: $anchorDims.offset.top + $anchorDims.height / 2 - $eleDims.height / 2
        };
        break;
      case 'center right':
        return {
          left: $anchorDims.offset.left + $anchorDims.width + hOffset + 1,
          top: $anchorDims.offset.top + $anchorDims.height / 2 - $eleDims.height / 2
        };
        break;
      case 'center':
        return {
          left: $eleDims.windowDims.offset.left + $eleDims.windowDims.width / 2 - $eleDims.width / 2,
          top: $eleDims.windowDims.offset.top + $eleDims.windowDims.height / 2 - $eleDims.height / 2
        };
        break;
      case 'reveal':
        return {
          left: ($eleDims.windowDims.width - $eleDims.width) / 2,
          top: $eleDims.windowDims.offset.top + vOffset
        };
      case 'reveal full':
        return {
          left: $eleDims.windowDims.offset.left,
          top: $eleDims.windowDims.offset.top
        };
        break;
      case 'left bottom':
        return {
          left: $anchorDims.offset.left,
          top: $anchorDims.offset.top + $anchorDims.height + vOffset
        };
        break;
      case 'right bottom':
        return {
          left: $anchorDims.offset.left + $anchorDims.width + hOffset - $eleDims.width,
          top: $anchorDims.offset.top + $anchorDims.height + vOffset
        };
        break;
      default:
        return {
          left: Foundation.rtl() ? $anchorDims.offset.left - $eleDims.width + $anchorDims.width : $anchorDims.offset.left + hOffset,
          top: $anchorDims.offset.top + $anchorDims.height + vOffset
        };
    }
  }
}(jQuery);
'use strict';

!function ($) {

  var MutationObserver = function () {
    var prefixes = ['WebKit', 'Moz', 'O', 'Ms', ''];
    for (var i = 0; i < prefixes.length; i++) {
      if (prefixes[i] + 'MutationObserver' in window) {
        return window[prefixes[i] + 'MutationObserver'];
      }
    }
    return false;
  }();

  var triggers = function (el, type) {
    el.data(type).split(' ').forEach(function (id) {
      $('#' + id)[type === 'close' ? 'trigger' : 'triggerHandler'](type + '.zf.trigger', [el]);
    });
  };
  // Elements with [data-open] will reveal a plugin that supports it when clicked.
  $(document).on('click.zf.trigger', '[data-open]', function () {
    triggers($(this), 'open');
  });

  // Elements with [data-close] will close a plugin that supports it when clicked.
  // If used without a value on [data-close], the event will bubble, allowing it to close a parent component.
  $(document).on('click.zf.trigger', '[data-close]', function () {
    var id = $(this).data('close');
    if (id) {
      triggers($(this), 'close');
    } else {
      $(this).trigger('close.zf.trigger');
    }
  });

  // Elements with [data-toggle] will toggle a plugin that supports it when clicked.
  $(document).on('click.zf.trigger', '[data-toggle]', function () {
    var id = $(this).data('toggle');
    if (id) {
      triggers($(this), 'toggle');
    } else {
      $(this).trigger('toggle.zf.trigger');
    }
  });

  // Elements with [data-closable] will respond to close.zf.trigger events.
  $(document).on('close.zf.trigger', '[data-closable]', function (e) {
    e.stopPropagation();
    var animation = $(this).data('closable');

    if (animation !== '') {
      Foundation.Motion.animateOut($(this), animation, function () {
        $(this).trigger('closed.zf');
      });
    } else {
      $(this).fadeOut().trigger('closed.zf');
    }
  });

  $(document).on('focus.zf.trigger blur.zf.trigger', '[data-toggle-focus]', function () {
    var id = $(this).data('toggle-focus');
    $('#' + id).triggerHandler('toggle.zf.trigger', [$(this)]);
  });

  /**
  * Fires once after all other scripts have loaded
  * @function
  * @private
  */
  $(window).on('load', function () {
    checkListeners();
  });

  function checkListeners() {
    eventsListener();
    resizeListener();
    scrollListener();
    mutateListener();
    closemeListener();
  }

  //******** only fires this function once on load, if there's something to watch ********
  function closemeListener(pluginName) {
    var yetiBoxes = $('[data-yeti-box]'),
        plugNames = ['dropdown', 'tooltip', 'reveal'];

    if (pluginName) {
      if (typeof pluginName === 'string') {
        plugNames.push(pluginName);
      } else if (typeof pluginName === 'object' && typeof pluginName[0] === 'string') {
        plugNames.concat(pluginName);
      } else {
        console.error('Plugin names must be strings');
      }
    }
    if (yetiBoxes.length) {
      var listeners = plugNames.map(function (name) {
        return 'closeme.zf.' + name;
      }).join(' ');

      $(window).off(listeners).on(listeners, function (e, pluginId) {
        var plugin = e.namespace.split('.')[0];
        var plugins = $('[data-' + plugin + ']').not('[data-yeti-box="' + pluginId + '"]');

        plugins.each(function () {
          var _this = $(this);

          _this.triggerHandler('close.zf.trigger', [_this]);
        });
      });
    }
  }

  function resizeListener(debounce) {
    var timer = void 0,
        $nodes = $('[data-resize]');
    if ($nodes.length) {
      $(window).off('resize.zf.trigger').on('resize.zf.trigger', function (e) {
        if (timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(function () {

          if (!MutationObserver) {
            //fallback for IE 9
            $nodes.each(function () {
              $(this).triggerHandler('resizeme.zf.trigger');
            });
          }
          //trigger all listening elements and signal a resize event
          $nodes.attr('data-events', "resize");
        }, debounce || 10); //default time to emit resize event
      });
    }
  }

  function scrollListener(debounce) {
    var timer = void 0,
        $nodes = $('[data-scroll]');
    if ($nodes.length) {
      $(window).off('scroll.zf.trigger').on('scroll.zf.trigger', function (e) {
        if (timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(function () {

          if (!MutationObserver) {
            //fallback for IE 9
            $nodes.each(function () {
              $(this).triggerHandler('scrollme.zf.trigger');
            });
          }
          //trigger all listening elements and signal a scroll event
          $nodes.attr('data-events', "scroll");
        }, debounce || 10); //default time to emit scroll event
      });
    }
  }

  function mutateListener(debounce) {
    var $nodes = $('[data-mutate]');
    if ($nodes.length && MutationObserver) {
      //trigger all listening elements and signal a mutate event
      //no IE 9 or 10
      $nodes.each(function () {
        $(this).triggerHandler('mutateme.zf.trigger');
      });
    }
  }

  function eventsListener() {
    if (!MutationObserver) {
      return false;
    }
    var nodes = document.querySelectorAll('[data-resize], [data-scroll], [data-mutate]');

    //element callback
    var listeningElementsMutation = function (mutationRecordsList) {
      var $target = $(mutationRecordsList[0].target);

      //trigger the event handler for the element depending on type
      switch (mutationRecordsList[0].type) {

        case "attributes":
          if ($target.attr("data-events") === "scroll" && mutationRecordsList[0].attributeName === "data-events") {
            $target.triggerHandler('scrollme.zf.trigger', [$target, window.pageYOffset]);
          }
          if ($target.attr("data-events") === "resize" && mutationRecordsList[0].attributeName === "data-events") {
            $target.triggerHandler('resizeme.zf.trigger', [$target]);
          }
          if (mutationRecordsList[0].attributeName === "style") {
            $target.closest("[data-mutate]").attr("data-events", "mutate");
            $target.closest("[data-mutate]").triggerHandler('mutateme.zf.trigger', [$target.closest("[data-mutate]")]);
          }
          break;

        case "childList":
          $target.closest("[data-mutate]").attr("data-events", "mutate");
          $target.closest("[data-mutate]").triggerHandler('mutateme.zf.trigger', [$target.closest("[data-mutate]")]);
          break;

        default:
          return false;
        //nothing
      }
    };

    if (nodes.length) {
      //for each element that needs to listen for resizing, scrolling, or mutation add a single observer
      for (var i = 0; i <= nodes.length - 1; i++) {
        var elementObserver = new MutationObserver(listeningElementsMutation);
        elementObserver.observe(nodes[i], { attributes: true, childList: true, characterData: false, subtree: true, attributeFilter: ["data-events", "style"] });
      }
    }
  }

  // ------------------------------------

  // [PH]
  // Foundation.CheckWatchers = checkWatchers;
  Foundation.IHearYou = checkListeners;
  // Foundation.ISeeYou = scrollListener;
  // Foundation.IFeelYou = closemeListener;
}(jQuery);

// function domMutationObserver(debounce) {
//   // !!! This is coming soon and needs more work; not active  !!! //
//   var timer,
//   nodes = document.querySelectorAll('[data-mutate]');
//   //
//   if (nodes.length) {
//     // var MutationObserver = (function () {
//     //   var prefixes = ['WebKit', 'Moz', 'O', 'Ms', ''];
//     //   for (var i=0; i < prefixes.length; i++) {
//     //     if (prefixes[i] + 'MutationObserver' in window) {
//     //       return window[prefixes[i] + 'MutationObserver'];
//     //     }
//     //   }
//     //   return false;
//     // }());
//
//
//     //for the body, we need to listen for all changes effecting the style and class attributes
//     var bodyObserver = new MutationObserver(bodyMutation);
//     bodyObserver.observe(document.body, { attributes: true, childList: true, characterData: false, subtree:true, attributeFilter:["style", "class"]});
//
//
//     //body callback
//     function bodyMutation(mutate) {
//       //trigger all listening elements and signal a mutation event
//       if (timer) { clearTimeout(timer); }
//
//       timer = setTimeout(function() {
//         bodyObserver.disconnect();
//         $('[data-mutate]').attr('data-events',"mutate");
//       }, debounce || 150);
//     }
//   }
// }
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {

  /**
   * Drilldown module.
   * @module foundation.drilldown
   * @requires foundation.util.keyboard
   * @requires foundation.util.motion
   * @requires foundation.util.nest
   */

  var Drilldown = function () {
    /**
     * Creates a new instance of a drilldown menu.
     * @class
     * @param {jQuery} element - jQuery object to make into an accordion menu.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    function Drilldown(element, options) {
      _classCallCheck(this, Drilldown);

      this.$element = element;
      this.options = $.extend({}, Drilldown.defaults, this.$element.data(), options);

      Foundation.Nest.Feather(this.$element, 'drilldown');

      this._init();

      Foundation.registerPlugin(this, 'Drilldown');
      Foundation.Keyboard.register('Drilldown', {
        'ENTER': 'open',
        'SPACE': 'open',
        'ARROW_RIGHT': 'next',
        'ARROW_UP': 'up',
        'ARROW_DOWN': 'down',
        'ARROW_LEFT': 'previous',
        'ESCAPE': 'close',
        'TAB': 'down',
        'SHIFT_TAB': 'up'
      });
    }

    /**
     * Initializes the drilldown by creating jQuery collections of elements
     * @private
     */


    _createClass(Drilldown, [{
      key: '_init',
      value: function _init() {
        this.$submenuAnchors = this.$element.find('li.is-drilldown-submenu-parent').children('a');
        this.$submenus = this.$submenuAnchors.parent('li').children('[data-submenu]');
        this.$menuItems = this.$element.find('li').not('.js-drilldown-back').attr('role', 'menuitem').find('a');
        this.$element.attr('data-mutate', this.$element.attr('data-drilldown') || Foundation.GetYoDigits(6, 'drilldown'));

        this._prepareMenu();
        this._registerEvents();

        this._keyboardEvents();
      }

      /**
       * prepares drilldown menu by setting attributes to links and elements
       * sets a min height to prevent content jumping
       * wraps the element if not already wrapped
       * @private
       * @function
       */

    }, {
      key: '_prepareMenu',
      value: function _prepareMenu() {
        var _this = this;
        // if(!this.options.holdOpen){
        //   this._menuLinkEvents();
        // }
        this.$submenuAnchors.each(function () {
          var $link = $(this);
          var $sub = $link.parent();
          if (_this.options.parentLink) {
            $link.clone().prependTo($sub.children('[data-submenu]')).wrap('<li class="is-submenu-parent-item is-submenu-item is-drilldown-submenu-item" role="menu-item"></li>');
          }
          $link.data('savedHref', $link.attr('href')).removeAttr('href').attr('tabindex', 0);
          $link.children('[data-submenu]').attr({
            'aria-hidden': true,
            'tabindex': 0,
            'role': 'menu'
          });
          _this._events($link);
        });
        this.$submenus.each(function () {
          var $menu = $(this),
              $back = $menu.find('.js-drilldown-back');
          if (!$back.length) {
            switch (_this.options.backButtonPosition) {
              case "bottom":
                $menu.append(_this.options.backButton);
                break;
              case "top":
                $menu.prepend(_this.options.backButton);
                break;
              default:
                console.error("Unsupported backButtonPosition value '" + _this.options.backButtonPosition + "'");
            }
          }
          _this._back($menu);
        });

        this.$submenus.addClass('invisible');
        if (!this.options.autoHeight) {
          this.$submenus.addClass('drilldown-submenu-cover-previous');
        }

        // create a wrapper on element if it doesn't exist.
        if (!this.$element.parent().hasClass('is-drilldown')) {
          this.$wrapper = $(this.options.wrapper).addClass('is-drilldown');
          if (this.options.animateHeight) this.$wrapper.addClass('animate-height');
          this.$element.wrap(this.$wrapper);
        }
        // set wrapper
        this.$wrapper = this.$element.parent();
        this.$wrapper.css(this._getMaxDims());
      }
    }, {
      key: '_resize',
      value: function _resize() {
        this.$wrapper.css({ 'max-width': 'none', 'min-height': 'none' });
        // _getMaxDims has side effects (boo) but calling it should update all other necessary heights & widths
        this.$wrapper.css(this._getMaxDims());
      }

      /**
       * Adds event handlers to elements in the menu.
       * @function
       * @private
       * @param {jQuery} $elem - the current menu item to add handlers to.
       */

    }, {
      key: '_events',
      value: function _events($elem) {
        var _this = this;

        $elem.off('click.zf.drilldown').on('click.zf.drilldown', function (e) {
          if ($(e.target).parentsUntil('ul', 'li').hasClass('is-drilldown-submenu-parent')) {
            e.stopImmediatePropagation();
            e.preventDefault();
          }

          // if(e.target !== e.currentTarget.firstElementChild){
          //   return false;
          // }
          _this._show($elem.parent('li'));

          if (_this.options.closeOnClick) {
            var $body = $('body');
            $body.off('.zf.drilldown').on('click.zf.drilldown', function (e) {
              if (e.target === _this.$element[0] || $.contains(_this.$element[0], e.target)) {
                return;
              }
              e.preventDefault();
              _this._hideAll();
              $body.off('.zf.drilldown');
            });
          }
        });
        this.$element.on('mutateme.zf.trigger', this._resize.bind(this));
      }

      /**
       * Adds event handlers to the menu element.
       * @function
       * @private
       */

    }, {
      key: '_registerEvents',
      value: function _registerEvents() {
        if (this.options.scrollTop) {
          this._bindHandler = this._scrollTop.bind(this);
          this.$element.on('open.zf.drilldown hide.zf.drilldown closed.zf.drilldown', this._bindHandler);
        }
      }

      /**
       * Scroll to Top of Element or data-scroll-top-element
       * @function
       * @fires Drilldown#scrollme
       */

    }, {
      key: '_scrollTop',
      value: function _scrollTop() {
        var _this = this;
        var $scrollTopElement = _this.options.scrollTopElement != '' ? $(_this.options.scrollTopElement) : _this.$element,
            scrollPos = parseInt($scrollTopElement.offset().top + _this.options.scrollTopOffset);
        $('html, body').stop(true).animate({ scrollTop: scrollPos }, _this.options.animationDuration, _this.options.animationEasing, function () {
          /**
            * Fires after the menu has scrolled
            * @event Drilldown#scrollme
            */
          if (this === $('html')[0]) _this.$element.trigger('scrollme.zf.drilldown');
        });
      }

      /**
       * Adds keydown event listener to `li`'s in the menu.
       * @private
       */

    }, {
      key: '_keyboardEvents',
      value: function _keyboardEvents() {
        var _this = this;

        this.$menuItems.add(this.$element.find('.js-drilldown-back > a, .is-submenu-parent-item > a')).on('keydown.zf.drilldown', function (e) {
          var $element = $(this),
              $elements = $element.parent('li').parent('ul').children('li').children('a'),
              $prevElement,
              $nextElement;

          $elements.each(function (i) {
            if ($(this).is($element)) {
              $prevElement = $elements.eq(Math.max(0, i - 1));
              $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1));
              return;
            }
          });

          Foundation.Keyboard.handleKey(e, 'Drilldown', {
            next: function () {
              if ($element.is(_this.$submenuAnchors)) {
                _this._show($element.parent('li'));
                $element.parent('li').one(Foundation.transitionend($element), function () {
                  $element.parent('li').find('ul li a').filter(_this.$menuItems).first().focus();
                });
                return true;
              }
            },
            previous: function () {
              _this._hide($element.parent('li').parent('ul'));
              $element.parent('li').parent('ul').one(Foundation.transitionend($element), function () {
                setTimeout(function () {
                  $element.parent('li').parent('ul').parent('li').children('a').first().focus();
                }, 1);
              });
              return true;
            },
            up: function () {
              $prevElement.focus();
              // Don't tap focus on first element in root ul
              return !$element.is(_this.$element.find('> li:first-child > a'));
            },
            down: function () {
              $nextElement.focus();
              // Don't tap focus on last element in root ul
              return !$element.is(_this.$element.find('> li:last-child > a'));
            },
            close: function () {
              // Don't close on element in root ul
              if (!$element.is(_this.$element.find('> li > a'))) {
                _this._hide($element.parent().parent());
                $element.parent().parent().siblings('a').focus();
              }
            },
            open: function () {
              if (!$element.is(_this.$menuItems)) {
                // not menu item means back button
                _this._hide($element.parent('li').parent('ul'));
                $element.parent('li').parent('ul').one(Foundation.transitionend($element), function () {
                  setTimeout(function () {
                    $element.parent('li').parent('ul').parent('li').children('a').first().focus();
                  }, 1);
                });
                return true;
              } else if ($element.is(_this.$submenuAnchors)) {
                _this._show($element.parent('li'));
                $element.parent('li').one(Foundation.transitionend($element), function () {
                  $element.parent('li').find('ul li a').filter(_this.$menuItems).first().focus();
                });
                return true;
              }
            },
            handled: function (preventDefault) {
              if (preventDefault) {
                e.preventDefault();
              }
              e.stopImmediatePropagation();
            }
          });
        }); // end keyboardAccess
      }

      /**
       * Closes all open elements, and returns to root menu.
       * @function
       * @fires Drilldown#closed
       */

    }, {
      key: '_hideAll',
      value: function _hideAll() {
        var $elem = this.$element.find('.is-drilldown-submenu.is-active').addClass('is-closing');
        if (this.options.autoHeight) this.$wrapper.css({ height: $elem.parent().closest('ul').data('calcHeight') });
        $elem.one(Foundation.transitionend($elem), function (e) {
          $elem.removeClass('is-active is-closing');
        });
        /**
         * Fires when the menu is fully closed.
         * @event Drilldown#closed
         */
        this.$element.trigger('closed.zf.drilldown');
      }

      /**
       * Adds event listener for each `back` button, and closes open menus.
       * @function
       * @fires Drilldown#back
       * @param {jQuery} $elem - the current sub-menu to add `back` event.
       */

    }, {
      key: '_back',
      value: function _back($elem) {
        var _this = this;
        $elem.off('click.zf.drilldown');
        $elem.children('.js-drilldown-back').on('click.zf.drilldown', function (e) {
          e.stopImmediatePropagation();
          // console.log('mouseup on back');
          _this._hide($elem);

          // If there is a parent submenu, call show
          var parentSubMenu = $elem.parent('li').parent('ul').parent('li');
          if (parentSubMenu.length) {
            _this._show(parentSubMenu);
          }
        });
      }

      /**
       * Adds event listener to menu items w/o submenus to close open menus on click.
       * @function
       * @private
       */

    }, {
      key: '_menuLinkEvents',
      value: function _menuLinkEvents() {
        var _this = this;
        this.$menuItems.not('.is-drilldown-submenu-parent').off('click.zf.drilldown').on('click.zf.drilldown', function (e) {
          // e.stopImmediatePropagation();
          setTimeout(function () {
            _this._hideAll();
          }, 0);
        });
      }

      /**
       * Opens a submenu.
       * @function
       * @fires Drilldown#open
       * @param {jQuery} $elem - the current element with a submenu to open, i.e. the `li` tag.
       */

    }, {
      key: '_show',
      value: function _show($elem) {
        if (this.options.autoHeight) this.$wrapper.css({ height: $elem.children('[data-submenu]').data('calcHeight') });
        $elem.attr('aria-expanded', true);
        $elem.children('[data-submenu]').addClass('is-active').removeClass('invisible').attr('aria-hidden', false);
        /**
         * Fires when the submenu has opened.
         * @event Drilldown#open
         */
        this.$element.trigger('open.zf.drilldown', [$elem]);
      }
    }, {
      key: '_hide',


      /**
       * Hides a submenu
       * @function
       * @fires Drilldown#hide
       * @param {jQuery} $elem - the current sub-menu to hide, i.e. the `ul` tag.
       */
      value: function _hide($elem) {
        if (this.options.autoHeight) this.$wrapper.css({ height: $elem.parent().closest('ul').data('calcHeight') });
        var _this = this;
        $elem.parent('li').attr('aria-expanded', false);
        $elem.attr('aria-hidden', true).addClass('is-closing');
        $elem.addClass('is-closing').one(Foundation.transitionend($elem), function () {
          $elem.removeClass('is-active is-closing');
          $elem.blur().addClass('invisible');
        });
        /**
         * Fires when the submenu has closed.
         * @event Drilldown#hide
         */
        $elem.trigger('hide.zf.drilldown', [$elem]);
      }

      /**
       * Iterates through the nested menus to calculate the min-height, and max-width for the menu.
       * Prevents content jumping.
       * @function
       * @private
       */

    }, {
      key: '_getMaxDims',
      value: function _getMaxDims() {
        var maxHeight = 0,
            result = {},
            _this = this;
        this.$submenus.add(this.$element).each(function () {
          var numOfElems = $(this).children('li').length;
          var height = Foundation.Box.GetDimensions(this).height;
          maxHeight = height > maxHeight ? height : maxHeight;
          if (_this.options.autoHeight) {
            $(this).data('calcHeight', height);
            if (!$(this).hasClass('is-drilldown-submenu')) result['height'] = height;
          }
        });

        if (!this.options.autoHeight) result['min-height'] = maxHeight + 'px';

        result['max-width'] = this.$element[0].getBoundingClientRect().width + 'px';

        return result;
      }

      /**
       * Destroys the Drilldown Menu
       * @function
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        if (this.options.scrollTop) this.$element.off('.zf.drilldown', this._bindHandler);
        this._hideAll();
        this.$element.off('mutateme.zf.trigger');
        Foundation.Nest.Burn(this.$element, 'drilldown');
        this.$element.unwrap().find('.js-drilldown-back, .is-submenu-parent-item').remove().end().find('.is-active, .is-closing, .is-drilldown-submenu').removeClass('is-active is-closing is-drilldown-submenu').end().find('[data-submenu]').removeAttr('aria-hidden tabindex role');
        this.$submenuAnchors.each(function () {
          $(this).off('.zf.drilldown');
        });

        this.$submenus.removeClass('drilldown-submenu-cover-previous');

        this.$element.find('a').each(function () {
          var $link = $(this);
          $link.removeAttr('tabindex');
          if ($link.data('savedHref')) {
            $link.attr('href', $link.data('savedHref')).removeData('savedHref');
          } else {
            return;
          }
        });
        Foundation.unregisterPlugin(this);
      }
    }]);

    return Drilldown;
  }();

  Drilldown.defaults = {
    /**
     * Markup used for JS generated back button. Prepended  or appended (see backButtonPosition) to submenu lists and deleted on `destroy` method, 'js-drilldown-back' class required. Remove the backslash (`\`) if copy and pasting.
     * @option
     * @type {string}
     * @default '<li class="js-drilldown-back"><a tabindex="0">Back</a></li>'
     */
    backButton: '<li class="js-drilldown-back"><a tabindex="0">Back</a></li>',
    /**
     * Position the back button either at the top or bottom of drilldown submenus. Can be `'left'` or `'bottom'`.
     * @option
     * @type {string}
     * @default top
     */
    backButtonPosition: 'top',
    /**
     * Markup used to wrap drilldown menu. Use a class name for independent styling; the JS applied class: `is-drilldown` is required. Remove the backslash (`\`) if copy and pasting.
     * @option
     * @type {string}
     * @default '<div></div>'
     */
    wrapper: '<div></div>',
    /**
     * Adds the parent link to the submenu.
     * @option
     * @type {boolean}
     * @default false
     */
    parentLink: false,
    /**
     * Allow the menu to return to root list on body click.
     * @option
     * @type {boolean}
     * @default false
     */
    closeOnClick: false,
    /**
     * Allow the menu to auto adjust height.
     * @option
     * @type {boolean}
     * @default false
     */
    autoHeight: false,
    /**
     * Animate the auto adjust height.
     * @option
     * @type {boolean}
     * @default false
     */
    animateHeight: false,
    /**
     * Scroll to the top of the menu after opening a submenu or navigating back using the menu back button
     * @option
     * @type {boolean}
     * @default false
     */
    scrollTop: false,
    /**
     * String jquery selector (for example 'body') of element to take offset().top from, if empty string the drilldown menu offset().top is taken
     * @option
     * @type {string}
     * @default ''
     */
    scrollTopElement: '',
    /**
     * ScrollTop offset
     * @option
     * @type {number}
     * @default 0
     */
    scrollTopOffset: 0,
    /**
     * Scroll animation duration
     * @option
     * @type {number}
     * @default 500
     */
    animationDuration: 500,
    /**
     * Scroll animation easing. Can be `'swing'` or `'linear'`.
     * @option
     * @type {string}
     * @see {@link https://api.jquery.com/animate|JQuery animate}
     * @default 'swing'
     */
    animationEasing: 'swing'
    // holdOpen: false
  };

  // Window exports
  Foundation.plugin(Drilldown, 'Drilldown');
}(jQuery);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {

  /**
   * DropdownMenu module.
   * @module foundation.dropdown-menu
   * @requires foundation.util.keyboard
   * @requires foundation.util.box
   * @requires foundation.util.nest
   */

  var DropdownMenu = function () {
    /**
     * Creates a new instance of DropdownMenu.
     * @class
     * @fires DropdownMenu#init
     * @param {jQuery} element - jQuery object to make into a dropdown menu.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    function DropdownMenu(element, options) {

      _classCallCheck(this, DropdownMenu);

      this.$element = element;
      this.options = $.extend({}, DropdownMenu.defaults, this.$element.data(), options);

      Foundation.Nest.Feather(this.$element, 'dropdown');
      this._init();

      Foundation.registerPlugin(this, 'DropdownMenu');
      Foundation.Keyboard.register('DropdownMenu', {
        'ENTER': 'open',
        'SPACE': 'open',
        'ARROW_RIGHT': 'next',
        'ARROW_UP': 'up',
        'ARROW_DOWN': 'down',
        'ARROW_LEFT': 'previous',
        'ESCAPE': 'close'
      });
    }

    /**
     * Initializes the plugin, and calls _prepareMenu
     * @private
     * @function
     */


    _createClass(DropdownMenu, [{
      key: '_init',
      value: function _init() {

        var subs = this.$element.find('li.is-dropdown-submenu-parent');
        this.$element.children('.is-dropdown-submenu-parent').children('.is-dropdown-submenu').addClass('first-sub');

        this.$menuItems = this.$element.find('[role="menuitem"]');
        this.$tabs = this.$element.children('[role="menuitem"]');
        this.$tabs.find('ul.is-dropdown-submenu').addClass(this.options.verticalClass);

        if (this.$element.hasClass(this.options.rightClass) || this.options.alignment === 'right' || Foundation.rtl() || this.$element.parents('.top-bar-right').is('*')) {
          this.options.alignment = 'right';
          subs.addClass('opens-left');
        } else {
          subs.addClass('opens-right');
        }
        this.changed = false;
        this._events();
      }
    }, {
      key: '_isVertical',
      value: function _isVertical() {
        return this.$tabs.css('display') === 'block';
      }

      /**
       * Adds event listeners to elements within the menu
       * @private
       * @function
       */

    }, {
      key: '_events',
      value: function _events() {

        var _this = this,
            hasTouch = 'ontouchstart' in window || typeof window.ontouchstart !== 'undefined',
            parClass = 'is-dropdown-submenu-parent';

        // used for onClick and in the keyboard handlers
        var handleClickFn = function (e) {
          var $elem = $(e.target).parentsUntil('ul', '.' + parClass),
              hasSub = $elem.hasClass(parClass),
              hasClicked = $elem.attr('data-is-click') === 'true',
              $sub = $elem.children('.is-dropdown-submenu');

          if (hasSub) {
            if (hasClicked) {
              if (!_this.options.closeOnClick || !_this.options.clickOpen && !hasTouch || _this.options.forceFollow && hasTouch) {
                return;
              } else {
                e.stopImmediatePropagation();
                e.preventDefault();
                _this._hide($elem);
              }
            } else {
              e.preventDefault();
              e.stopImmediatePropagation();
              _this._show($sub);
              $elem.add($elem.parentsUntil(_this.$element, '.' + parClass)).attr('data-is-click', true);
            }
          }
        };

        if (this.options.clickOpen || hasTouch) {
          this.$menuItems.on('click.zf.dropdownmenu touchstart.zf.dropdownmenu', handleClickFn);
        }

        // Handle Leaf element Clicks
        if (_this.options.closeOnClickInside) {
          this.$menuItems.on('click.zf.dropdownmenu', function (e) {
            var $elem = $(this),
                hasSub = $elem.hasClass(parClass);
            if (!hasSub) {
              _this._hide();
            }
          });
        }

        if (!this.options.disableHover) {
          this.$menuItems.on('mouseenter.zf.dropdownmenu', function (e) {
            var $elem = $(this),
                hasSub = $elem.hasClass(parClass);

            if (hasSub) {
              clearTimeout($elem.data('_delay'));
              $elem.data('_delay', setTimeout(function () {
                _this._show($elem.children('.is-dropdown-submenu'));
              }, _this.options.hoverDelay));
            }
          }).on('mouseleave.zf.dropdownmenu', function (e) {
            var $elem = $(this),
                hasSub = $elem.hasClass(parClass);
            if (hasSub && _this.options.autoclose) {
              if ($elem.attr('data-is-click') === 'true' && _this.options.clickOpen) {
                return false;
              }

              clearTimeout($elem.data('_delay'));
              $elem.data('_delay', setTimeout(function () {
                _this._hide($elem);
              }, _this.options.closingTime));
            }
          });
        }
        this.$menuItems.on('keydown.zf.dropdownmenu', function (e) {
          var $element = $(e.target).parentsUntil('ul', '[role="menuitem"]'),
              isTab = _this.$tabs.index($element) > -1,
              $elements = isTab ? _this.$tabs : $element.siblings('li').add($element),
              $prevElement,
              $nextElement;

          $elements.each(function (i) {
            if ($(this).is($element)) {
              $prevElement = $elements.eq(i - 1);
              $nextElement = $elements.eq(i + 1);
              return;
            }
          });

          var nextSibling = function () {
            if (!$element.is(':last-child')) {
              $nextElement.children('a:first').focus();
              e.preventDefault();
            }
          },
              prevSibling = function () {
            $prevElement.children('a:first').focus();
            e.preventDefault();
          },
              openSub = function () {
            var $sub = $element.children('ul.is-dropdown-submenu');
            if ($sub.length) {
              _this._show($sub);
              $element.find('li > a:first').focus();
              e.preventDefault();
            } else {
              return;
            }
          },
              closeSub = function () {
            //if ($element.is(':first-child')) {
            var close = $element.parent('ul').parent('li');
            close.children('a:first').focus();
            _this._hide(close);
            e.preventDefault();
            //}
          };
          var functions = {
            open: openSub,
            close: function () {
              _this._hide(_this.$element);
              _this.$menuItems.find('a:first').focus(); // focus to first element
              e.preventDefault();
            },
            handled: function () {
              e.stopImmediatePropagation();
            }
          };

          if (isTab) {
            if (_this._isVertical()) {
              // vertical menu
              if (Foundation.rtl()) {
                // right aligned
                $.extend(functions, {
                  down: nextSibling,
                  up: prevSibling,
                  next: closeSub,
                  previous: openSub
                });
              } else {
                // left aligned
                $.extend(functions, {
                  down: nextSibling,
                  up: prevSibling,
                  next: openSub,
                  previous: closeSub
                });
              }
            } else {
              // horizontal menu
              if (Foundation.rtl()) {
                // right aligned
                $.extend(functions, {
                  next: prevSibling,
                  previous: nextSibling,
                  down: openSub,
                  up: closeSub
                });
              } else {
                // left aligned
                $.extend(functions, {
                  next: nextSibling,
                  previous: prevSibling,
                  down: openSub,
                  up: closeSub
                });
              }
            }
          } else {
            // not tabs -> one sub
            if (Foundation.rtl()) {
              // right aligned
              $.extend(functions, {
                next: closeSub,
                previous: openSub,
                down: nextSibling,
                up: prevSibling
              });
            } else {
              // left aligned
              $.extend(functions, {
                next: openSub,
                previous: closeSub,
                down: nextSibling,
                up: prevSibling
              });
            }
          }
          Foundation.Keyboard.handleKey(e, 'DropdownMenu', functions);
        });
      }

      /**
       * Adds an event handler to the body to close any dropdowns on a click.
       * @function
       * @private
       */

    }, {
      key: '_addBodyHandler',
      value: function _addBodyHandler() {

        var $body = $(document.body),
            _this = this;
        $body.off('mouseup.zf.dropdownmenu touchend.zf.dropdownmenu').on('mouseup.zf.dropdownmenu touchend.zf.dropdownmenu', function (e) {
          var $link = _this.$element.find(e.target);
          if ($link.length) {
            return;
          }

          _this._hide();
          $body.off('mouseup.zf.dropdownmenu touchend.zf.dropdownmenu');
        });
      }

      /**
       * Opens a dropdown pane, and checks for collisions first.
       * @param {jQuery} $sub - ul element that is a submenu to show
       * @function
       * @private
       * @fires DropdownMenu#show
       */

    }, {
      key: '_show',
      value: function _show($sub) {

        var idx = this.$tabs.index(this.$tabs.filter(function (i, el) {
          return $(el).find($sub).length > 0;
        }));
        var $sibs = $sub.parent('li.is-dropdown-submenu-parent').siblings('li.is-dropdown-submenu-parent');
        this._hide($sibs, idx);
        $sub.css('visibility', 'hidden').addClass('js-dropdown-active').parent('li.is-dropdown-submenu-parent').addClass('is-active');
        var clear = Foundation.Box.ImNotTouchingYou($sub, null, true);
        if (!clear) {
          var oldClass = this.options.alignment === 'left' ? '-right' : '-left',
              $parentLi = $sub.parent('.is-dropdown-submenu-parent');
          $parentLi.removeClass('opens' + oldClass).addClass('opens-' + this.options.alignment);
          clear = Foundation.Box.ImNotTouchingYou($sub, null, true);
          if (!clear) {
            $parentLi.removeClass('opens-' + this.options.alignment).addClass('opens-inner');
          }
          this.changed = true;
        }
        $sub.css('visibility', '');
        if (this.options.closeOnClick) {
          this._addBodyHandler();
        }
        /**
         * Fires when the new dropdown pane is visible.
         * @event DropdownMenu#show
         */
        this.$element.trigger('show.zf.dropdownmenu', [$sub]);
      }

      /**
       * Hides a single, currently open dropdown pane, if passed a parameter, otherwise, hides everything.
       * @function
       * @param {jQuery} $elem - element with a submenu to hide
       * @param {Number} idx - index of the $tabs collection to hide
       * @private
       */

    }, {
      key: '_hide',
      value: function _hide($elem, idx) {

        var $toClose;
        if ($elem && $elem.length) {
          $toClose = $elem;
        } else if (idx !== undefined) {
          $toClose = this.$tabs.not(function (i, el) {
            return i === idx;
          });
        } else {
          $toClose = this.$element;
        }
        var somethingToClose = $toClose.hasClass('is-active') || $toClose.find('.is-active').length > 0;

        if (somethingToClose) {
          $toClose.find('li.is-active').add($toClose).attr({
            'data-is-click': false
          }).removeClass('is-active');

          $toClose.find('ul.js-dropdown-active').removeClass('js-dropdown-active');

          if (this.changed || $toClose.find('opens-inner').length) {
            var oldClass = this.options.alignment === 'left' ? 'right' : 'left';
            $toClose.find('li.is-dropdown-submenu-parent').add($toClose).removeClass('opens-inner opens-' + this.options.alignment).addClass('opens-' + oldClass);
            this.changed = false;
          }
          /**
           * Fires when the open menus are closed.
           * @event DropdownMenu#hide
           */
          this.$element.trigger('hide.zf.dropdownmenu', [$toClose]);
        }
      }

      /**
       * Destroys the plugin.
       * @function
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        this.$menuItems.off('.zf.dropdownmenu').removeAttr('data-is-click').removeClass('is-right-arrow is-left-arrow is-down-arrow opens-right opens-left opens-inner');
        $(document.body).off('.zf.dropdownmenu');
        Foundation.Nest.Burn(this.$element, 'dropdown');
        Foundation.unregisterPlugin(this);
      }
    }]);
    return DropdownMenu;
  }();

  /**
   * Default settings for plugin
   */


  DropdownMenu.defaults = {
    /**
     * Disallows hover events from opening submenus
     * @option
     * @type {boolean}
     * @default false
     */
    disableHover: false,
    /**
     * Allow a submenu to automatically close on a mouseleave event, if not clicked open.
     * @option
     * @type {boolean}
     * @default true
     */
    autoclose: true,
    /**
     * Amount of time to delay opening a submenu on hover event.
     * @option
     * @type {number}
     * @default 50
     */
    hoverDelay: 50,
    /**
     * Allow a submenu to open/remain open on parent click event. Allows cursor to move away from menu.
     * @option
     * @type {boolean}
     * @default false
     */
    clickOpen: false,
    /**
     * Amount of time to delay closing a submenu on a mouseleave event.
     * @option
     * @type {number}
     * @default 500
     */

    closingTime: 500,
    /**
     * Position of the menu relative to what direction the submenus should open. Handled by JS. Can be `'left'` or `'right'`.
     * @option
     * @type {string}
     * @default 'left'
     */
    alignment: 'left',
    /**
     * Allow clicks on the body to close any open submenus.
     * @option
     * @type {boolean}
     * @default true
     */
    closeOnClick: true,
    /**
     * Allow clicks on leaf anchor links to close any open submenus.
     * @option
     * @type {boolean}
     * @default true
     */
    closeOnClickInside: true,
    /**
     * Class applied to vertical oriented menus, Foundation default is `vertical`. Update this if using your own class.
     * @option
     * @type {string}
     * @default 'vertical'
     */
    verticalClass: 'vertical',
    /**
     * Class applied to right-side oriented menus, Foundation default is `align-right`. Update this if using your own class.
     * @option
     * @type {string}
     * @default 'align-right'
     */
    rightClass: 'align-right',
    /**
     * Boolean to force overide the clicking of links to perform default action, on second touch event for mobile.
     * @option
     * @type {boolean}
     * @default true
     */
    forceFollow: true
  };

  // Window exports
  Foundation.plugin(DropdownMenu, 'DropdownMenu');
}(jQuery);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {

  /**
   * ResponsiveMenu module.
   * @module foundation.responsiveMenu
   * @requires foundation.util.triggers
   * @requires foundation.util.mediaQuery
   */

  var ResponsiveMenu = function () {
    /**
     * Creates a new instance of a responsive menu.
     * @class
     * @fires ResponsiveMenu#init
     * @param {jQuery} element - jQuery object to make into a dropdown menu.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    function ResponsiveMenu(element, options) {
      _classCallCheck(this, ResponsiveMenu);

      this.$element = $(element);
      this.rules = this.$element.data('responsive-menu');
      this.currentMq = null;
      this.currentPlugin = null;

      this._init();
      this._events();

      Foundation.registerPlugin(this, 'ResponsiveMenu');
    }

    /**
     * Initializes the Menu by parsing the classes from the 'data-ResponsiveMenu' attribute on the element.
     * @function
     * @private
     */


    _createClass(ResponsiveMenu, [{
      key: '_init',
      value: function _init() {
        // The first time an Interchange plugin is initialized, this.rules is converted from a string of "classes" to an object of rules
        if (typeof this.rules === 'string') {
          var rulesTree = {};

          // Parse rules from "classes" pulled from data attribute
          var rules = this.rules.split(' ');

          // Iterate through every rule found
          for (var i = 0; i < rules.length; i++) {
            var rule = rules[i].split('-');
            var ruleSize = rule.length > 1 ? rule[0] : 'small';
            var rulePlugin = rule.length > 1 ? rule[1] : rule[0];

            if (MenuPlugins[rulePlugin] !== null) {
              rulesTree[ruleSize] = MenuPlugins[rulePlugin];
            }
          }

          this.rules = rulesTree;
        }

        if (!$.isEmptyObject(this.rules)) {
          this._checkMediaQueries();
        }
        // Add data-mutate since children may need it.
        this.$element.attr('data-mutate', this.$element.attr('data-mutate') || Foundation.GetYoDigits(6, 'responsive-menu'));
      }

      /**
       * Initializes events for the Menu.
       * @function
       * @private
       */

    }, {
      key: '_events',
      value: function _events() {
        var _this = this;

        $(window).on('changed.zf.mediaquery', function () {
          _this._checkMediaQueries();
        });
        // $(window).on('resize.zf.ResponsiveMenu', function() {
        //   _this._checkMediaQueries();
        // });
      }

      /**
       * Checks the current screen width against available media queries. If the media query has changed, and the plugin needed has changed, the plugins will swap out.
       * @function
       * @private
       */

    }, {
      key: '_checkMediaQueries',
      value: function _checkMediaQueries() {
        var matchedMq,
            _this = this;
        // Iterate through each rule and find the last matching rule
        $.each(this.rules, function (key) {
          if (Foundation.MediaQuery.atLeast(key)) {
            matchedMq = key;
          }
        });

        // No match? No dice
        if (!matchedMq) return;

        // Plugin already initialized? We good
        if (this.currentPlugin instanceof this.rules[matchedMq].plugin) return;

        // Remove existing plugin-specific CSS classes
        $.each(MenuPlugins, function (key, value) {
          _this.$element.removeClass(value.cssClass);
        });

        // Add the CSS class for the new plugin
        this.$element.addClass(this.rules[matchedMq].cssClass);

        // Create an instance of the new plugin
        if (this.currentPlugin) this.currentPlugin.destroy();
        this.currentPlugin = new this.rules[matchedMq].plugin(this.$element, {});
      }

      /**
       * Destroys the instance of the current plugin on this element, as well as the window resize handler that switches the plugins out.
       * @function
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        this.currentPlugin.destroy();
        $(window).off('.zf.ResponsiveMenu');
        Foundation.unregisterPlugin(this);
      }
    }]);

    return ResponsiveMenu;
  }();

  ResponsiveMenu.defaults = {};

  // The plugin matches the plugin classes with these plugin instances.
  var MenuPlugins = {
    dropdown: {
      cssClass: 'dropdown',
      plugin: Foundation._plugins['dropdown-menu'] || null
    },
    drilldown: {
      cssClass: 'drilldown',
      plugin: Foundation._plugins['drilldown'] || null
    },
    accordion: {
      cssClass: 'accordion-menu',
      plugin: Foundation._plugins['accordion-menu'] || null
    }
  };

  // Window exports
  Foundation.plugin(ResponsiveMenu, 'ResponsiveMenu');
}(jQuery);

/* globals $, Foundation */
var colnavCustom = function() {
  var levels = ['a-colnav-firstLevel', 'a-colnav-secondLevel', 'a-colnav-thirdLevel']; // Classnames
  var open = []; // Array to hold open levels
  var isSmall = $('.a-contentOverview').width() < 900; // Boolean for determining screen size
  var movedDuringTouch = false; // Boolean to determine whether there was movement during touch
  var shifted; // Boolean to determine if shift key was pressed
  var savedResults = {}; // Object to hold saved results
  var pluginInstance; // Variable to hold Foundation plugin instance
  var endPointUrl = '';
  var currentCategory = '';

  var keys = {
    category: 'category',
    checked: ':checked',
    dataId: 'data-id',
    disabled: 'disabled',
    colnavWrapper: '.a-colnav-wrapper',
    loaderClass: '.a-js-drilldownLoader',
    radioClassSelector: '.radio',
    switchurl: 'switchurl',
    toggleInput: '[name="js-switchForm"]'
  };

  var category = {
    category: 'category',
    provider: 'provider'
  };

  function hideLoader() {
    $(keys.loaderClass).hide();
  }

  function showLoader() {
    $(keys.loaderClass).show();
  }

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

  // This code awful. It can return a number or an element (!),
  // the argument names don't convey any information and there
  // a few magical numbers.
  // Should be the first target of a refactoring in the future.
  // Perform various calculations to determine placements and widths
  function calc(x, y, z) {
    var returnValue = '';
    var left = null;
    var contentOverviewWith = $('.a-contentOverview').width();
    if (isSmall) {
      if (isNaN(x)) {
        returnValue = x.css('left', '50px');
      } else {
        returnValue = ((contentOverviewWith - ((z + 1) * 50)) - (1.5 * (z + 1))) + 'px';
      }
    } else if (isNaN(x)) {
      left = parseInt(x.css('left'), 10);
      if ((currentCategory === category.provider &&
          x.hasClass('a-colnav-secondLevel') &&
          left < 250)
        ||
        (currentCategory === category.category &&
          x.hasClass('a-colnav-thirdLevel') &&
          left < 200)) {
        returnValue = x;
      } else {
        returnValue = x.css('left', parseInt(contentOverviewWith / y / (z || 1), 10) + 'px');
      }
    } else {
      returnValue = parseInt(contentOverviewWith / x / (y || 1), 10);
    }

    return returnValue;
  }

  function disableToggles() {
    $(keys.toggleInput).closest(keys.radioClassSelector).addClass(keys.disabled);
    $(keys.toggleInput).attr(keys.disabled, true);
  }

  function enableToggles() {
    $(keys.toggleInput).closest(keys.radioClassSelector).removeClass(keys.disabled);
    $(keys.toggleInput).attr(keys.disabled, false);
  }

  function setHistoryState(position) {
    var urlQueryString = '?category=';
    var newurl = window.location.pathname;
    currentCategory = $(keys.toggleInput + keys.checked).data(keys.switchurl).replace('get', '');
    if (history.replaceState) {
      urlQueryString += currentCategory;
      if (position !== null && position !== '') {
        urlQueryString = urlQueryString + '&position=' + position;
      }
      newurl += urlQueryString;
      window.history.replaceState({
        path: newurl
      }, '', newurl);
    }
  }

  function whenKey(e, classToQuery) { // Logic for keypresses on items
    var code = e.keyCode || e.which;
    if (code === 27 || code === 37 || code === 38 || code === 39 || code === 40) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
    if (code === 13 || code === 32) {
      if (classToQuery !== '.a-colnav-item-third') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        $(e.target).trigger('mouseup').trigger('focus');
      }
    } else if (code === 9 && !$(e.target).hasClass('open')) {
      if (shifted) {
        if ($(e.target).blur().parent().prev().length !== 0) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          $(e.target).blur().parent().prev()
            .find(classToQuery)
            .trigger('focus');
        }
      } else if ($(e.target).blur().parent().next().length !== 0) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        $(e.target).blur().parent().next()
          .find(classToQuery)
          .trigger('focus');
      }
    } else if (code === 9 && $(e.target).hasClass('open')) {
      if (shifted) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        $(e.target).blur().parent().parent()
          .parent()
          .children('a')
          .trigger('focus');
      } else {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        $(e.target).blur().next().children('li:eq(0)')
          .children('a')
          .trigger('focus');
      }
    }
  }

  function whenClick(eventOrElement, alt) { // Logic for clicks on items
    var el = null;
    var li = null;
    var text = null;
    var position = null;
    if (eventOrElement.which === 2 || eventOrElement.which === 3) {
      // Middle-click or right-click, stop processing the event
      // Ref.: http://api.jquery.com/event.which/
      return;
    }

    if (eventOrElement.target && eventOrElement.target.tagName === 'UL') {
      return;
    }

    // Determine element
    el = alt === undefined ? $(eventOrElement.target) : eventOrElement;
    li = el.closest('li').hasClass('is-dropdown-submenu-parent') ? el.closest('li') : el;
    if (li.is('h4')) {
      li = li.parents().eq(1);
    }

    // If item holds an actual link, redirect
    if (li.children('a').hasClass('a-js-colnavLinkAlt')) {
      window.location = li.children('a').prop('href');
      return;
    }
    text = li.find('h2').length > 0 ? li.find('h2').text() : li.find('h3').text();
    position = li.find('h2').length > 0 ? li.find('h2').attr(keys.dataId) : li.find('h3').attr(keys.dataId);
    // Iterate through levels
    levels.forEach(function(str, index) {
      var wasStacked;
      if (el.closest('ul').hasClass(str)) { // Check if element exists
        if (el.closest('a').hasClass('open') || el.find('a').hasClass('open') || el.hasClass('open')) { // Check if item is already open:
          position = el.closest('ul').prev().find('h2').attr(keys.dataId) || '';
          setHistoryState(position);
          open = []; // Clear array for open levels
          // Hide lower levels:
          $('.' + levels[index + 1]).removeClass('noTrans').css('left', '250%');
          $('.' + levels[2]).removeClass('noTrans').css('left', '250%');
          calc(index > 0 ? el.closest('ul') : 0, 3 / index); // Calculate left position for parent
          // Reset markup:
          el.closest('ul').removeClass('stacked').find('.open').removeClass('open');
          el.closest('ul').find('.dim').removeClass('dim');
          if (isSmall) {
            el.closest('ul').css('width', calc(1.5, null, index - 1));
          }
        } else { // If item is not open:
          setHistoryState(position);
          if (index === 0) { // If on first level, reset markup and hide lower levels
            el.closest('ul').find('.dim').removeClass('dim');
            $('.' + levels[1]).removeClass('stacked').removeClass('noTrans').css('left', '250%');
            $('.' + levels[2]).removeClass('stacked').removeClass('noTrans').css('left', '250%');
          }
          wasStacked = el.closest('ul').hasClass('stacked'); // Check if parent was stacked
          el.closest('ul').children('li').children('a').addClass('dim'); // Dim other items
          // Stack parent and reset any open items:
          el.closest('ul').addClass('stacked').find('.open').removeClass('open');
          $('.' + levels[index + 1]).hide().addClass('noTrans'); // Adjust markup of lower level
          // Adjust item markup:
          el.addClass('open').closest('a').addClass('open');
          el.find('a').eq(0).addClass('open');
          if (open.indexOf(levels[index + 1]) === -1) { // If lower level is not open
            // Prepare lower level and add it to array:
            li.find('.' + levels[index + 1]).removeClass(wasStacked ? '' : 'noTrans')
              .css('left', '250%').show();
            open.push(levels[index + 1]);
          }
          if (index > 0) { // If level is second or lower, calculate left position and width
            calc(el.closest('ul'), 3, index + 1).removeClass('noTrans')
              .css('width', calc(1.5, null, index)).show();
          }
          // Calculate left position and width for lower level
          calc(li.find('.' + levels[index + 1]), 3, index + 1).css('width', calc(1.5, null, index))
            .show();
        }
      }
    });
    // Perform markup adjustments to stacked view:
    if ($('.a-colnav-firstLevel').hasClass('stacked')) {
      $('.a-js-backButton').show();
      if (isSmall) {
        $('.switch-container').hide();
        $('.a-containerColnav-top').css('padding-bottom', '0px');
        $('.a-js-backButton').css('margin-top', '-4px');
        $('.a-js-colnavTitleBold').text('');
        $('.a-js-colnavTitleRegular').text(text);
      }
      // Perform markup adjustments to unstacked view:
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
    // Adjust the height of container:
    $('.a-colnav-firstLevel').css('height', 'auto');
    if (
      parseInt($('.a-colnav-thirdLevel:visible').height(), 10) >
      parseInt($('.a-colnav-firstLevel').height(), 10) ||
      parseInt($('.a-colnav-secondLevel:visible').height(), 10) >
      parseInt($('.a-colnav-firstLevel').height(), 10)) {
      $('.a-colnav-firstLevel')
        .css('height',
          parseInt($('.a-colnav-thirdLevel:visible').height(), 10) >
          parseInt($('.a-colnav-secondLevel:visible').height(), 10) ?
          (parseInt($('.a-colnav-thirdLevel:visible').height(), 10) - 2) :
          (parseInt($('.a-colnav-secondLevel:visible').height(), 10) - 2) +
          'px');
    }
    if (!$('.a-colnav-firstLevel').hasClass('stacked')) {
      $('.a-colnav-firstLevel').css('height', 'auto');
    }
  }

  function attachHandlers(depth) {
    var queryHit = false;
    var positionUrlParameterValue = null;
    // (Re)initialize Foundation library logic:
    if ($('.a-colnav').prop('data-dropdown-menu')) {
      pluginInstance.destroy();
      pluginInstance = new Foundation.DropdownMenu($('.a-colnav').eq(0));
    } else {
      pluginInstance = new Foundation.DropdownMenu($('.a-colnav').eq(0));
    }
    if ($(keys.colnavWrapper).length > 0) { // Conditional logic for different screen sizes
      if (isSmall) {
        $(keys.colnavWrapper).html($(keys.colnavWrapper).html()
          .replace(/drilldown/g, 'dropdown'));
        $('.a-colnav').find('a').on('mouseup', function(event) { // Apply action logic
          if (!movedDuringTouch) {
            whenClick(event);
          }
        });
      } else {
        $(keys.colnavWrapper)
          .html($(keys.colnavWrapper).html().replace(/drilldown/g, 'dropdown'))
          .show().children()
          .on('mouseup', function(event) { // Apply action logic
            whenClick(event);
            return false;
          });
      }

      enableToggles();
    }
    $(document).on('keyup keydown', function(e) { // Detect shift key
      shifted = e.shiftKey;
    });
    // Set tabindexes:
    $('.a-colnav-item-second').prop('tabindex', '0');
    $('.a-colnav-item-third').prop('tabindex', '0');
    // Apply remaining action logic:
    $('.a-colnav-item').on('keydown', function(event) {
      whenKey(event, '.a-colnav-item');
    });
    $('.a-colnav-item-second').on('keydown', function(event) {
      whenKey(event, '.a-colnav-item-second');
    });
    $('.a-colnav-item-third').on('keydown', function(event) {
      whenKey(event, '.a-colnav-item-third');
    });
    $('.a-colnav-item').on('click', function(event) {
      if ($(window).scrollTop() > $(keys.colnavWrapper).offset().top) {
        $('html,body').animate({
          scrollTop: $(keys.colnavWrapper).offset().top
        }, 300);
      }
    });
    $('.a-colnav-item').prop('tabindex', '0').on('focus', function() {
      if ($('.a-colnav-secondLevel.submenu.is-active').length === 1) {
        $(this).off('keydown.zf.drilldown').parent().find('.a-colnav-item-second')
          .eq(0)
          .focus();
      }
    });
    $('.a-js-backButton').on('click', function() {
      whenClick($('a.open').last(), true);
    });
    $('.a-colnav').find('a').on('touchstart', function(event) {
      event.stopPropagation();
      movedDuringTouch = false;
    });
    $('.a-colnav').find('a').on('touchmove', function(event) {
      movedDuringTouch = true;
      event.stopPropagation();
    });
    // Perform depth specific markup changes:
    if (depth === 2) {
      $('.a-colnav').find('.a-colnav-thirdLevel').remove();
      $('.a-colnav').find('.a-js-colnavLink').remove();
      $('.a-colnav').find('.a-leadText').remove();
    } else {
      $('.a-colnav').find('.a-colnav-item-second.a-js-colnavLinkAlt').remove();
    }
    // Check if position is included in URL, and navigate to it
    positionUrlParameterValue = urlQuery('position');
    if (positionUrlParameterValue) {
      $('.a-colnav').find('a.a-colnav-item').each(function() {
        if ($(this).find('h2').attr(keys.dataId) === positionUrlParameterValue) {
          queryHit = true;
          whenClick($(this), true);
        }
      });
      if (currentCategory === category.category) {
        $('.a-colnav').find('a.a-colnav-item-second').each(function() {
          if ($(this).find('h3').attr(keys.dataId) === positionUrlParameterValue) {
            queryHit = true;
            whenClick($(this).closest('ul').prev(), true);
            setTimeout(function() {
              whenClick($(this), true);
            }.bind(this), 250);
          }
        });
      }
    }
  }

  function populateNavigation(str, data) {
    var depth = 3; // Assume a depth of three levels
    var markup = []; // Array to store markup
    savedResults[str] = data; // Save results for later
    data.forEach(function(item) { // Parse and generate markup
      var level2 = [];
      var li = document.createElement('li');
      var a = document.createElement('a');
      var h2 = document.createElement('h2');
      var p = document.createElement('p');
      var ul = document.createElement('ul');
      item[item.SubCategory ? 'SubCategory' : 'List'].forEach(function(_item) {
        var level3 = [];
        var _li = document.createElement('li');
        var _a1 = document.createElement('a');
        var _a2 = document.createElement('a');
        var _h3 = document.createElement('h3');
        var _h4 = document.createElement('h4');
        var _ul = document.createElement('ul');
        if (_item[_item.SchemaList ? 'SchemaList' : 'List']) {
          _item[_item.SchemaList ? 'SchemaList' : 'List'].forEach(function(__item) {
            var __li = document.createElement('li');
            var __a = document.createElement('a');
            var __h4 = document.createElement('h4');
            var __span = document.createElement('span');
            $(__h4).text(__item.Heading || __item.Title).appendTo($(__a));
            $(__h4).attr(keys.dataId, __item.Id);
            $(__span).addClass('a-colnav-rightText').text(__item.Provider || 'Skatteetaten')
              .appendTo($(__a));
            $(__a).prop('href', __item.Url)
              .addClass('a-colnav-item-third')
              .addClass('a-js-colnavLinkAlt')
              .appendTo($(__li));
            level3.push(__li);
          });
        } else {
          depth = 2;
        }
        $(_h3).text(_item.Heading || _item.Title).appendTo($(_a1));
        $(_h3).attr(keys.dataId, _item.Id);
        $(_h4).text(_item.Heading || _item.Title).appendTo($(_a2));
        $(_h4).attr(keys.dataId, _item.Id);
        $(_a1)
          // .prop('href', '#')
          .addClass('a-colnav-item-second').addClass('a-js-colnavLink')
          .appendTo($(_li));
        $(_a2).prop('href', _item.Url).addClass('a-colnav-item-second')
          .addClass('a-js-colnavLinkAlt')
          .appendTo($(_li));
        $(_ul).addClass('a-colnav').addClass('a-colnav-vertical')
          .addClass('a-colnav-thirdLevel')
          .append(level3)
          .appendTo($(_li));
        level2.push(_li);
      });
      $(h2).text(item.Heading).appendTo($(a));
      $(h2).attr(keys.dataId, item.Id);
      $(p).text(item.Description).addClass('a-leadText').appendTo($(a));
      $(a)
        // .prop('href', '#')
        .addClass('a-colnav-item').appendTo($(li));
      $(ul).addClass('a-colnav').addClass('a-colnav-vertical').addClass('a-colnav-secondLevel')
        .append(level2)
        .appendTo($(li));
      markup.push(li);
    });
    $('.a-colnav').html(markup); // Append markup
    hideLoader();
    setTimeout(function() {
      attachHandlers(depth);
    }, 0);
  }

  function afterRequest(str, data) { // Populating logic
    $('.a-colnav').html(''); // Wipe previous markup
    $('.a-colnav').show();
    setTimeout(function() {
      populateNavigation(str, data);
    }, 0);
  }

  function getDrilldownSource(str) {
    var url = endPointUrl + str;
    showLoader();
    disableToggles();
    if (savedResults[str]) { // Get stored results if present
      afterRequest(str, savedResults[str]);
    } else {
      // These hardcoded paths and IPs need to be fixed probably
      if (window.location.pathname.indexOf('DesignSystem') === 1 ||
        window.location.origin.indexOf('localhost') !== -1) {
        url += '.json';
      }
      $.ajax({
        type: 'GET',
        url: url,
        success: function(data) {
          afterRequest(str, data); // Perform populating logic
        }
      });
    }
  }

  function resizedWindow() {
    var wasSmall = isSmall;
     // Redefine boolean for determining screen size
    isSmall = $('.a-contentOverview').width() < 900;
    // No change required if the window is still big/small
    if (isSmall === wasSmall) {
      return;
    }
    getDrilldownSource($(keys.toggleInput + keys.checked).data(keys.switchurl));
    if (!isSmall) {
      // Ensure reset of markup
      $('.switch-container').show();
      $('.a-js-colnavTitleRegular').text('Alle skjemaer');
    }
    if (isSmall) { // Small screen specific style (can be moved to stylesheet)
      $('.a-contentOverview').css('overflow-x', 'hidden');
    }
  }

  function onBodyClick(e) {
    var arr = [];
    if (!isSmall) {
      if ($(e.target).closest('.a-colnav-firstLevel').length === 0) {
        $('a.open').each(function() {
          arr.push($(this));
        });
        arr.reverse();
        arr.forEach(function(item) {
          item.parent().trigger('mouseup');
        });
      }
    }
  }

  function performResizeLogicAfterResizeEvents() {
    var resizeTimeout;
    window.onresize = function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizedWindow, 100);
    };
  }

  function setSwitchUrlAttribute() {
    $(keys.toggleInput).each(function(index) {
      $(this).data(keys.switchurl,
        $(this).parents().eq(2).data(keys.switchurl + (index + 1))
      );
      $(this).prop('data-' + keys.switchurl,
        $(this).parents().eq(2).data(keys.switchurl + (index + 1))
      );
    });
  }

  function onToggleChange() {
    if ($(this).is(keys.checked)) {
      setHistoryState(null);
      getDrilldownSource($(this).data(keys.switchurl));
    }
  }

  function detectSelectedSourceChange() {
    $(keys.toggleInput).change(onToggleChange);
  }

  function loadDrillDownSource() {
    var selectedIndex = 1;
    var dataSource = 'get';
    var urlCategory = urlQuery(keys.category);
    // Chose category/kategori by default
    currentCategory = category.category;
    // and see if the URL contains the selected category already
    if (urlCategory !== null && urlCategory !== false) {
      currentCategory = urlCategory;
    }
    if (currentCategory === category.provider) {
      selectedIndex = 2;
    }
    dataSource += currentCategory;
    $(keys.toggleInput).prop('checked', false);
    // Maybe not so robust to use the id, but it's the only way we have to
    // identify each checkbox at this point
    $('#atom-switch-cb' + selectedIndex).prop('checked', true);
    getDrilldownSource(dataSource);
  }

  $(document).ready(function() {
    endPointUrl = $(keys.toggleInput).parents().eq(3).data('switchendpoint');
    if ($('.a-colnav').length > 0) { // Check if drilldown markup is present
      if (isSmall) { // Small screen specific style (can be moved to stylesheet)
        $('.a-contentOverview').css('overflow-x', 'hidden');
      }
      loadDrillDownSource();
      performResizeLogicAfterResizeEvents();
      setSwitchUrlAttribute();
      detectSelectedSourceChange();
      $('body').on('click', onBodyClick);
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
var contactForm = function() {
  $('body.a-stickyHelp-body').on('click', '#contact-form-trigger', function() {
    var ScontactFormLink;

    if (window.parent.$) {
      ScontactFormLink = window.parent.$('#contact-form-link');
      if (ScontactFormLink.length > 0) {
        ScontactFormLink.click();
        return false;
      }
    }

    return true;
  });
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

/* globals $ */
var genericSearch = function() {
  var dimensions;
  var base;
  var page = 0;
  var articlesPerPage = 20;
  var inputBy;
  var selection = [];
  var dataList;
  var elements = {};

  var keys = {
    forceHiddenClass: 'a-js-forceHidden',
    genericSearchSelector: '.a-js-genericSearch',
    showResultsButtonSelector: '.a-js-expandResults',
    tagFilterSectionSelector: '.a-card-filter',
    generalArticleSelector: 'a-js-underneath'
  };

  function arrayIncludes(array, element) {
    var newArray;
    var includes;

    if (array.includes) {
      includes = array.includes(element);
    } else { // IE
      newArray = array.filter(function(el) {
        return el === element;
      });
      includes = newArray.length > 0;
    }

    return includes;
  }

  function grinder(item) {
    var i;
    var j;
    var itemDimension;
    var isMatch = false;
    var itemDimensionsCount = 0;

    for (i = 0; i < dimensions.length; i += 1) {
      itemDimensionsCount += item[dimensions[i].name].length;
      for (j = 0; j < item[dimensions[i].name].length; j += 1) {
        itemDimension = item[dimensions[i].name][j];
        if (arrayIncludes(selection, 'd' + (i + 1) + '-' + itemDimension)) {
          isMatch = true;
          break;
        }
      }
    }

    // General item
    if (itemDimensionsCount === 0) {
      isMatch = true;
    }

    return isMatch;
  }

  function tags() {
    return $(keys.tagFilterSectionSelector).find('input[type="checkbox"].sr-only');
  }

  function selectedTags() {
    return $(keys.tagFilterSectionSelector).find('input[type="checkbox"]:checked.sr-only');
  }

  function urlFilterPrefix(id) {
    return id.replace('filterDim1ID', 'd1-').replace('filterDim2ID', 'd2-');
  }

  function resetPage() {
    page = 1;
  }

  // TODO: This method is copied from colnavCustom.js, should be put in a common
  // module
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

  function getDataSource(index) {
    var dataSources = $(keys.genericSearchSelector).attr('data-source').split(',');
    var dataUrl = dataSources[index];
    if (window.location.pathname.indexOf('/DesignSystem/') === -1 && window.location.origin.indexOf('/localhost') === -1) {
      // Do not add the language attribute when running locally or in Github
      dataUrl += '/' + $('html').attr('lang');
    }

    return dataUrl;
  }

  function getSelection() {
    var id;
    var idPattern = /d(\d+)-.*/;
    var match;
    var dimension;
    var dimensionIndex;
    var index;

    selection = [];
    for (index = 0; index < dimensions.length; index += 1) {
      dimension = dimensions[index];
      dimension.isSelected = false;
      dimension.selectedCount = 0;
    }
    selectedTags().each(function() {
      id = urlFilterPrefix($(this).attr('name'));
      match = idPattern.exec(id);
      if (match != null && match.length > 1) {
        dimensionIndex = match[1] - 1;
        dimensions[dimensionIndex].isSelected = true;
        dimensions[dimensionIndex].selectedCount += 1;
      }
      selection.push(id);
    });
  }

  function userHasSelectedTags() {
    return selection.length > 0;
  }

  function setHistoryState() {
    var newurl = window.location.pathname;
    var urlQueryString = '?filter=';
    if (selection.length > 0) {
      urlQueryString += selection.join(',');
      newurl += urlQueryString;
    }
    if (history.replaceState) {
      window.history.replaceState({
        path: newurl
      }, '', newurl);
    }
  }

  function getUrlFilter() {
    if (urlQuery('filter')) {
      selection = urlQuery('filter').split(',');
    }
  }

  function hideContainers() {
    elements.$container.hide();
    if (elements.$altContainer !== null) {
      elements.$altContainer.hide();
    }
  }

  function showContainers() {
    if (dimensions[1].isSelected) {
      elements.$container.hide();
      if (elements.$altContainer !== null) {
        elements.$altContainer.show();
        elements.$altContainer.removeClass(keys.forceHiddenClass);
      }
    } else {
      elements.$container.show();
      elements.$container.removeClass(keys.forceHiddenClass);
      if (elements.$altContainer !== null) {
        elements.$altContainer.hide();
      }
    }
  }

  function setElementsVisibility(filteredList) {
    if (userHasSelectedTags()) {
      elements.$loadMoreButton[filteredList.length <= articlesPerPage * page ? 'hide' : 'show']();
      elements.$noResultsMessage[filteredList.length === 0 ? 'show' : 'hide']();
      elements.$showResultsButton.removeAttr('disabled');
      elements.$showResultsButton.removeClass(keys.forceHiddenClass);
      elements.$showResultsButton.show();
    } else {
      elements.$showResultsButton.hide();
    }
  }

  function showResults() {
    $('.a-collapse-title').not('.collapsed').click();
    elements.$container.removeClass(keys.forceHiddenClass);
    if (elements.$altContainer !== null) {
      elements.$altContainer.removeClass(keys.forceHiddenClass);
    }
    elements.$loadMoreButton.removeClass(keys.forceHiddenClass);
    elements.$showResultsButton.hide();
    showContainers();
    $('body').scrollTop($('.a-js-filterDim1').offset().top - 12);
  }

  function setDimenstionLabels() {
    var $dimensionSectionContainer = null;
    var $noSelectionLabel = null;
    var $selectionLabel = null;
    var $selectionLabelType = null;

    dimensions.forEach(function(dimension, index) {
      $dimensionSectionContainer = $('.a-js-filterDim' + (index + 1));
      $noSelectionLabel = $dimensionSectionContainer.find('.a-js-none');
      $selectionLabel = $noSelectionLabel.prev();
      $selectionLabel.find('.badge').html(dimension.selectedCount);
      $selectionLabelType = $selectionLabel.find('.a-js-card-filter-type');
      switch (dimension.selectedCount) {
      case 0:
        $noSelectionLabel.show();
        $selectionLabel.hide();
        break;
      case 1:
        $noSelectionLabel.hide();
        $selectionLabel.show();
        $selectionLabelType.text($selectionLabelType.attr('data-singular-text'));
        break;
      default:
        $noSelectionLabel.hide();
        $selectionLabel.show();
        $selectionLabelType.text($selectionLabelType.attr('data-plural-text'));
        break;
      }
    });
  }

  function hideResultItems() {
    elements.$container.find('.a-js-result').hide();
    if (elements.$altContainer !== null) {
      elements.$altContainer.find('.a-js-result').hide();
    }
  }

  function setAboveItemsVisibility(filteredList, maxNumberOfItemsToDisplay) {
    var aboveCount = 0;
    var i = 0;
    var item;

    while (i < filteredList.length && aboveCount < maxNumberOfItemsToDisplay) {
      item = filteredList[i];
      $('#' + item.id).show();
      if (item.isAbove) {
        $('#' + item.altId).show();
        aboveCount += 1;
      }
      i += 1;
    }

    return aboveCount;
  }

  function setBelowItemsVisibility(filteredList, maxNumberOfItemsToDisplay) {
    var showExtraHeading = false;
    var belowCount = 0;
    var i = 0;
    var item;
    var $altItem = null;

    while (i < filteredList.length
      && belowCount < maxNumberOfItemsToDisplay) {
      item = filteredList[i];
      if (!item.isAbove) {
        $altItem = $('#' + item.altId);
        if ($altItem.hasClass(keys.generalArticleSelector)) {
          showExtraHeading = true;
        }
        $altItem.show();
        belowCount += 1;
      }
      i += 1;
    }

    return showExtraHeading;
  }

  function filterArticles() {
    var aboveCount = 0;
    var filteredList = [];
    var showExtraHeading;
    var maxNumberOfItemsToDisplay;

    getSelection();
    setHistoryState();
    setDimenstionLabels();
    hideResultItems();
    filteredList = dataList.filter(grinder);
    maxNumberOfItemsToDisplay = articlesPerPage * page;

    aboveCount = setAboveItemsVisibility(filteredList, maxNumberOfItemsToDisplay);
    if (aboveCount < maxNumberOfItemsToDisplay) {
      maxNumberOfItemsToDisplay -= aboveCount;
      showExtraHeading = setBelowItemsVisibility(filteredList, maxNumberOfItemsToDisplay);
    }

    if (showExtraHeading) {
      elements.$extraResultsHeading.show();
    } else {
      elements.$extraResultsHeading.hide();
    }

    setElementsVisibility(filteredList);
    hideContainers();
  }

  function appendExtraResultsHeading() {
    if (elements.$altContainer !== null) {
      elements.$altContainer.append('<span class="a-js-top"></span>');
      elements.$altContainer.append(elements.$altContainer.attr('data-extraresultsheading'));
      elements.$altContainer.append('<span class="a-js-bottom"></span>');
      elements.$extraResultsHeading = $('.a-js-extraHeading');
    }
  }

  function createResultElement(template, name, url, description, id, cssClasses) {
    return template.replace('%NAME%', name)
      .replace(/%URL%/g, url)
      .replace('%DESC%', description || 'Ingen beskrivelse.')
      .replace('%IDENTIFIER%', id)
      .replace('a-linkArticle', cssClasses);
  }

  function buildResultsList(mappedKeys) {
    var element;
    var name;
    var url;
    var description;
    var id;
    var cssClasses;

    dataList.forEach(function(item, index) {
      dataList[index].id = 'result-' + index;
      dataList[index].altId = 'altResult-' + index;
      if (item.Purposes.length !== 0 || item.Industries.length !== 0) {
        dataList[index].isAbove = true;
      } else {
        dataList[index].isAbove = false;
      }
      name = item[mappedKeys.NAME];
      url = item[mappedKeys.URL];
      description = item[mappedKeys.DESC] || 'Ingen beskrivelse.';
      id = 'result-' + index;
      cssClasses = 'a-linkArticle a-js-result';
      element = createResultElement(base, name, url, description, id, cssClasses);
      elements.$container.append(element);

      id = 'altResult-' + index;
      if (dataList[index].isAbove) {
        element = createResultElement(base, name, url, description, id, cssClasses);
        elements.$extraResultsHeading.before(element);
      } else {
        cssClasses = 'a-linkArticle a-js-result ' + keys.generalArticleSelector;
        element = createResultElement(base, name, url, description, id, cssClasses);
        if (elements.$altContainer !== null) {
          elements.$altContainer.append(element);
        }
      }
    });
    elements.$container.find('.a-js-result').each(function(index, item) {
      $(this)[index < articlesPerPage * page ? 'show' : 'hide']();
    });
    resetPage();
    elements.$loader.hide();
    filterArticles();
  }

  function toggleTag() {
    resetPage();
    filterArticles();
  }

  function getDimensionNames() {
    var dimensionNames;
    var dimensionAliases;
    var dimensionIndex;
    var parts;
    var i;

    dimensions = [];
    dimensionNames = $(keys.genericSearchSelector).attr('data-dimensions').split(',');
    dimensionAliases = $(keys.genericSearchSelector).attr('data-dimensionsaliases').split(',');
    for (i = 0; i < dimensionNames.length; i += 1) {
      dimensions.push({
        name: dimensionNames[i],
        alias: dimensionAliases[i],
        isSelected: false,
        selectedCount: 0
      });
    }
  }

  function getMappedKeys() {
    var mappedKeys = {};
    var parts;

    $(keys.genericSearchSelector).attr('data-mappedkeys').split(',').forEach(function(pair) {
      parts = pair.split('=');
      mappedKeys[parts[0]] = parts[1];
    });

    return mappedKeys;
  }

  function buildTagsAndDimensions(data) {
    var lastKeypress;
    var iterate;
    var mappedKeys;

    getDimensionNames();
    mappedKeys = getMappedKeys();

    dimensions.forEach(function(dimension, index) {
      var hasNote = $('.a-js-filterDim' + (index + 1)).find('.d-block').length > 0;
      var where = data[dimension.name + 'List'] ?
        data[dimension.name + 'List'] : data[dimensions[index].alias + 'List'];
      where.forEach(function(item) {
        var $tag = $('<div class="a-switch">' +
          $('.a-js-filterDim' + (index + 1)).find('.a-switch').eq(0).html()
            .replace(/%ID%/g, item[mappedKeys.ID])
            .replace('%TITLE%', item[mappedKeys.TITLE]) + '</div>');
        var $input = $tag.find('input[type="checkbox"]');
        var tagId = urlFilterPrefix($input.attr('id'));
        if (arrayIncludes(selection, tagId)) {
          $input.attr('checked', true);
        }
        $('.a-js-filterDim' + (index + 1))
          .find(hasNote ? '.d-block' : '.text-sm-center')[hasNote ? 'before' : 'append']($tag);
      });
      $('.a-js-filterDim' + (index + 1)).find('.a-switch').eq(0).hide();
    });
    tags().on('change', toggleTag);
    // Give the browser time to update the UI
    setTimeout(function() {
      buildResultsList(mappedKeys);
    }, 0);
  }

  function processData(data) {
    var lastKeypress;
    var iterate;

    if (inputBy === 'filter') {
      // We keep the order the in the data sent by the server
      dataList = data.SubsidiesList;
    }
    $(keys.genericSearchSelector).next().find(keys.tagFilterSectionSelector).show();
    if (inputBy === 'search') {
      $(keys.genericSearchSelector).find('form').on('keyup keypress', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
          e.preventDefault();
          return false;
        }
        return true;
      });
      $(keys.genericSearchSelector).find('form').find('input[type=search]')
        .on('keypress', function() {
          lastKeypress = new Date().getTime();
          iterate = true;
          elements.$loader.show();
          elements.$legend.hide();
          elements.$noResultsMessage.hide();
          elements.$container.html('');
        }
      );
      setInterval(function() {
        var value = $(keys.genericSearchSelector).find('form').find('input[type=search]')
          .val();
        var query = value !== undefined ? value.toLowerCase() : '';
        if (query.length > 0 && (new Date().getTime() - lastKeypress > 1500) && iterate) {
          iterate = false;
          data.items.forEach(function(item) {
            if (item.name.toLowerCase().indexOf(query) !== -1 ||
              item.parent.toLowerCase().indexOf(query) !== -1) {
              elements.$container[item.name.toLowerCase().indexOf(query) !== -1 ? 'prepend' : 'append'](
                base.replace('%NAME%', item.name).replace('%PARENT%', item.parent)
                  .replace(/%URL%/g, item.url).replace('../..', '')
              );
            }
          });
          elements.$loader.hide();
          elements.$noResultsMessage[elements.$container.html() === '' ? 'show' : 'hide']();
          elements.$legend[elements.$container.html() === '' ? 'hide' : 'show']();
        }
      }, 2000);
    } else {
      buildTagsAndDimensions(data);
    }
  }

  function onSecondError() {
    $.getJSON(getDataSource(2), processData);
  }

  function onError() {
    $.ajax({
      type: 'GET', url: getDataSource(1), success: processData, error: onSecondError
    });
  }

  function addEventHandlers() {
    elements.$showResultsButton.on('click', showResults);
    elements.$loadMoreButton.on('click', function() {
      page += 1;
      filterArticles();
      showContainers();
    });
  }

  function findElements() {
    if (inputBy === 'search') {
      elements.$container = $(keys.genericSearchSelector).find('.a-list');
      elements.$altContainer = null;
    } else {
      elements.$container = $(keys.genericSearchSelector).next().find('.a-js-results');
      elements.$altContainer = $(keys.genericSearchSelector).next().find('.a-js-alternativeResults');
    }
    base = elements.$container.html();
    elements.$genericSearch = $(keys.genericSearchSelector);
    if (inputBy !== 'search') {
      elements.$genericSearch = elements.$genericSearch.next();
    }
    elements.$legend = elements.$genericSearch.find('.a-legend');
    elements.$loader = elements.$genericSearch.find('.a-loader');
    elements.$noResultsMessage = elements.$genericSearch.find('.a-js-noResults');
    elements.$showResultsButton = $(keys.showResultsButtonSelector);
    elements.$loadMoreButton = $('.a-js-moreResults');
  }

  function initialLayout() {
    elements.$container.find('li:gt(0)').remove();
    elements.$container.find('.a-js-result:gt(0)').remove();
    elements.$container.html('');
    if (elements.$altContainer !== null) {
      elements.$altContainer.html('');
    }
  }

  function getInputType() {
    inputBy = $(keys.genericSearchSelector).find('input[type=search]').length > 0 ? 'search' : 'filter';
  }

  function getData() {
    var dataUrl = getDataSource(0);
    // This line only for development, do not commit uncommented
    // dataUrl = '/data/getsubsidy.json';
    $.ajax({ type: 'GET', url: dataUrl, success: processData, error: onError });
  }

  if ($(keys.genericSearchSelector).length > 0) {
    getUrlFilter();
    getInputType();
    findElements();
    initialLayout();
    appendExtraResultsHeading();
    addEventHandlers();
    // Give the browser time to update the UI
    setTimeout(getData, 0);
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

/* globals $ */
var initializeDatepicker = function() {
  var today = ('0' + new Date().getDate()).slice(-2) + '.' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '.' + new Date().getFullYear();

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
    language: 'no',
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

/* globals $, Foundation */
var listenForAttachmentChanges = function(formId, errorMessageCallback) {
  var maxSizeInMb = 15;
  var maxSizeInBytes = maxSizeInMb * 1024 * 1024;
  var allowedExtensions = [
    'bmp', 'jpg', 'jpeg', 'png', 'gif', 'txt', 'log', 'csv', 'doc', 'docx', 'xls', 'xlsx', 'ppt',
    'pptx', 'pdf', 'odt', 'ods', 'odp', 'rtf', 'rar', 'zip', '7z', 'gdoc', 'gsheet', 'gslide', 'htm',
    'html', 'eml', 'msg'
  ];

  var fileInput = $(formId).find('.a-js-uploadAttachment').find('#newCertificateInput');
  var attachmentErrorBox = $(formId).find('.a-js-upload-error');
  var attachmentBox = $(formId).find('.a-js-attachment-box');
  var attachmentNameText = $(attachmentBox).find('.a-js-attachment-name');
  var deleteAttachmentButton = $(attachmentBox).find('.a-btn-delete');
  var selectedFile = '';

  attachmentErrorBox.hide();
  attachmentBox.hide();

  deleteAttachmentButton.click(function() {
    fileInput.val(''); // reset content
    attachmentBox.hide();
    attachmentErrorBox.hide();
    fileInput.parent().show();
  });

  $(fileInput).change(function(event) {
    if (event.target.files.length > 0) {
      selectedFile = event.target.files[0];
    }

    function handleFile(file) {
      var fileName = file.name;
      var extension = fileName.split('.').pop();
      var byteSize = file.size;

      var validExtension = $.inArray(extension, allowedExtensions) > -1;
      var validFileSize = maxSizeInBytes > byteSize;

      if (validExtension && validFileSize) {
        // success:
        // set file name and show 'attachment box'
        // hide 'error box'
        // hide upload button

        attachmentNameText.text(fileName);
        attachmentBox.show();
        attachmentErrorBox.hide();
        fileInput.parent().hide();
      } else {
        // failure:
        // hide 'attachment box'
        // show 'error box'
        // show upload button
        attachmentBox.hide();
        attachmentErrorBox.show();
        fileInput.parent().show();
      }

      if (!validFileSize) {
        attachmentErrorBox.find('.a-message-error').text(errorMessageCallback('size') + ': ' + maxSizeInMb + 'MB');
      } else if (!validExtension) {
        attachmentErrorBox.find('.a-message-error').text(errorMessageCallback('ext') + ': ' + allowedExtensions.join(', '));
      }
    }

    if (selectedFile) {
      handleFile(selectedFile);
    } else {
      attachmentBox.hide();
    }
  });
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

$('.a-dropdown-personswitchList').on('click', 'button[data-toggle="collapse"]', function(event) {
  event.preventDefault();
  event.stopPropagation();
  $($(this).data('target')).collapse('toggle');
});

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
      forceFocusTriggerElement = false;
      $(this).parent().find('.a-js-popoverIconInitial').show();
      $(this).parent().find('.a-js-popoverIconExpanded').hide();
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

  // $('body').on('shown.bs.popover', '.a-js-togglePopoverIcons', function(e) {
  //   $(e.target).find('.a-js-popoverIconInitial').hide();
  //   $(e.target).find('.a-js-popoverIconExpanded').show();
  //   // $(e.target).find('i').eq(0).hide();
  //   // $(e.target).find('i').eq(1).show();
  // });

  // $('body').on('hidden.bs.popover', '.a-js-togglePopoverIcons', function(e) {
  //   $(e.target).find('.a-js-popoverIconInitial').show();
  //   $(e.target).find('.a-js-popoverIconExpanded').hide();
  //   // $(e.target).find('i').eq(0).show();
  //   // $(e.target).find('i').eq(1).hide();
  // });

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

var removeListRow = function(src) {
  if (src) {
    $(src).remove();
  }
};

function searchFilterView() {
  $(document.body).on('click', '.a-js-searchFilterToggle', function(e) {
    var hideClass = 'd-none';
    var hideMainInbox = $('.a-js-hideElement');
    var searchField = $('.a-js-filterFocus');
    var searchFilters = $('.a-overlay-container');

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
  });

  $('.a-overlay-container').on('change', 'input', function(e) {
    var hideClass = 'd-none';
    var searchFilerActionWrapper = $('.a-search-filter-action-wrapper');

    if (searchFilerActionWrapper.hasClass(hideClass)) {
      searchFilerActionWrapper.removeClass(hideClass);
    }
  });
}

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

/* globals $ */
// used for popovers
var tooltip = function() {
  $('[data-toggle="tooltip"]').tooltip();
};

var truncateToNumberOfLines = function(element) {
  var innerText = $($(element).find('.a-js-inner-text')[0]);
  var containerHeight = $(element).height();

  if ($(innerText).outerHeight() >= (containerHeight + 5)) {
    while ($(innerText).outerHeight() >= (containerHeight + 5)) {
      $(innerText).text(function(index, text) {
        return text.replace(/\W*\s(\S)*$/, '...');
      });
    }
  }
};

// adds ellipsis for text that spans over two lines
var truncateBoxButtonNames = function() {
  $('.a-box-button').on('click', function() {
    $('.a-box-button-name').each(function() {
      truncateToNumberOfLines($(this));
    });
  });

  $('.a-collapsePanel-body').on('shown.bs.collapse', function() {
    $('.a-box-button-name').each(function() {
      truncateToNumberOfLines($(this));
    });
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

/*
  globals
  $,
  _anchors,
  addListExpandHandler,
  addListSortHandler,
  articleAnchors,
  autoFootnotes,
  AltinnDropdown,
  AltinnModal,
  AltinnQuickhelp
  cardsToggle,
  certificateHandler,
  codeLookup,
  colnavCustom,
  contactForm,
  feedbackToggle,
  fixPatternLinks,
  formatOrgNr,
  genericSearch,
  handleFocus,
  hideIntroInSubs,
  initializeDatepicker,
  initSearchWithHighlight,
  insetVariations,
  iOS11BugWorkAround,
  listenForAttachmentChanges,
  mobileNavigation,
  nameChecker,
  newsArchive
  onboarding,
  onConfirmDeletionClick,
  onFileInputChange,
  popoverGlobalInit,
  popoverLocalInit,
  preOpenModals,
  prototypingInteractionStarteENK,
  questionnaireInteraction,
  searchFilterView,
  searchWithAutocomplete,
  selectAll,
  setupAddRightsHandler,
  setupExpandContent,
  setupFormValidation,
  setupListRowSelect,
  setupNestedCheckboxes,
  setupOnKeypress,
  setupSelectableCheckbox,
  setupTruncateLines,
  setValidatorSettings,
  subscribe,
  toggleArchivedState,
  toggleFilter,
  toggleInstant,
  toggleSelectProfiles,
  toggleSwitch,
  toggleTheme,
  tooltip,
  truncateBoxButtonNames,
  uniformHeight,
  window
*/

window.devInit = function() {
  _anchors();
  addListExpandHandler();
  addListSortHandler();
  articleAnchors();
  autoFootnotes();
  AltinnDropdown.init();
  AltinnModal.init();
  AltinnQuickhelp.init();
  cardsToggle();
  certificateHandler();
  codeLookup();
  colnavCustom();
  contactForm();
  feedbackToggle();
  fixPatternLinks();
  formatOrgNr();
  handleFocus();
  hideIntroInSubs();
  genericSearch();
  initializeDatepicker();
  insetVariations();
  initSearchWithHighlight();
  iOS11BugWorkAround();
  listenForAttachmentChanges();
  mobileNavigation();
  nameChecker();
  newsArchive();
  onboarding();
  onConfirmDeletionClick();
  onFileInputChange();
  popoverGlobalInit();
  popoverLocalInit();
  preOpenModals();
  prototypingInteractionStarteENK();
  questionnaireInteraction();
  searchFilterView();
  searchWithAutocomplete();
  selectAll();
  setupAddRightsHandler();
  setupExpandContent();
  setupFormValidation();
  setupListRowSelect();
  setupNestedCheckboxes();
  setupOnKeypress();
  setupSelectableCheckbox();
  setupTruncateLines();
  setValidatorSettings();
  subscribe();
  toggleArchivedState();
  toggleFilter();
  toggleInstant();
  toggleSelectProfiles();
  toggleSwitch();
  toggleTheme();
  tooltip();
  truncateBoxButtonNames();
  uniformHeight();

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

  function setupForm1() {
    $('body').off('focus', '#contactForm', setupForm1);
    setupFormValidation('#contactForm', '#a-js-contactForm-submit');
  }
  function setupForm2() {
    $('body').off('focus', '#contactForm2', setupForm2);
    setupFormValidation('#contactForm2', '#a-js-contactForm-submit2');
  }
  $('body').on('focus', '#contactForm', setupForm1);
  $('body').on('focus', '#contactForm2', setupForm2);

  function errorMessageCallback(type) {
    if (type === 'ext') {
      // Prefix to error message where the user tried to upload a forbidden file type
      return 'Tillatte filtyper';
    } else if (type === 'size') {
      // Prefix to error message where the user tried to upload a file which is too big
      return 'Maksimum filstørrelse';
    }
    return 'Det oppstod en feil';
  }
  listenForAttachmentChanges('#js-attachmentForm', errorMessageCallback);
};
window.devInit();
$('.html-escape').each(function() {
  $(this).text($(this).html());
});
// $('form').validate();
