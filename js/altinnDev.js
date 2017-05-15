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
        $(this).attr('href', $(this).attr('href').replace('/patterns/', '/DesignSystem/patterns/'));
      }
    });
    $('*[onclick]').each(function() {
      if ($(this).attr('onclick').indexOf('location.href=\'/patterns/') > -1) {
        $(this).attr('onclick', $(this).attr('onclick').replace('location.href=\'/patterns/', 'location.href=\'/DesignSystem/patterns/'));
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

/* globals _anchors, hideIntroInSubs, insetVariations, toggleArchivedState,
  selectAll, toggleTheme, fixPatternLinks,
  preOpenModals, prototypingInteractionStarteENK, $, onboarding, codeLookup, nameChecker,
  setupAddRightsHandler, initSearchWithHighlight */
window.devInit = function() {
  _anchors();
  hideIntroInSubs();
  insetVariations();
  toggleArchivedState();
  selectAll();
  toggleTheme();
  fixPatternLinks();
  preOpenModals();
  prototypingInteractionStarteENK();
  onboarding();
  codeLookup();
  nameChecker();
  initSearchWithHighlight();
  setupAddRightsHandler();
  selectAll();
  toggleTheme();
};
window.devInit();
$('.html-escape').each(function() {
  $(this).text($(this).html());
});
// $('form').validate();

/* globals currentRequest, AltinnQuickhelp */
/* globals AltinnQuickhelp:true */
AltinnQuickhelp = {
  loadQuickhelp: function(settings) {
    var that = this;
    var currentRequest = $.ajax({
      url: settings.url,
      beforeSend: function() {
        if (typeof currentRequest !== 'undefined') {
          currentRequest.abort();
        }
      }
    }).done(function(data) {
      var quickhelpPage = $('<div/>', {
        class: 'a-quickhelpPage-start',
        id: 'a-js-quickhelpPage',
        html: data
      });
      var page = $('<div/>', {
        class: 'a-page a-current-page',
        data: {
          'page-index': 1
        },
        html: quickhelpPage
      });
      $(settings.target + ' .a-stickyHelp-content-target').append(page);
      $(settings.target).find('.a-current-page').first().data();
      $('.a-js-stickyHelpCategory').html($(settings.target).find('.a-stickyHelp-content-target').attr('data-category'));
      $('.a-js-stickyHelpCategoryLink').attr('data-url', $(settings.target).find('.a-stickyHelp-content-target').attr('data-url'));
    });
  },
  listeners: function(target) {
    var that = this;
    $('.a-stickyHelp-search').find('input').on('keyup', function(e) {
      var keyCode = e.keyCode || e.which;
      if (keyCode === 13 && encodeURIComponent($(this)[0].value).length > 0) {
        that.nextquickhelpPage({
          url: 'http://altinn-dev.dev.bouvet.no/api/quicksearch/' + encodeURIComponent($(this)[0].value) + '/no',
          target: target
        });
      }
    });
    $('.a-stickyHelp-search').find('button').on('click', function(e) {
      if (encodeURIComponent($('.a-js-stickyhelpSearch')[0].value).length > 0) {
        that.nextquickhelpPage({
          url: 'http://altinn-dev.dev.bouvet.no/api/quicksearch/' + encodeURIComponent($('.a-js-stickyhelpSearch')[0].value) + '/no',
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
      var current;
      var quickhelpPage = $('<div/>', {
        class: 'quickhelpPage',
        html: data
      });
      var existingPages;
      var newPage;
      var newPageIndex;
      existingPages = $(settings.target + ' :data(page-index)');
      newPageIndex = existingPages.length + 1;
      newPage = $('<div/>', {
        class: 'a-page a-next-page',
        data: {
          'page-index': newPageIndex
        },
        html: quickhelpPage
      });
      $(settings.target + ' .a-stickyHelp-content-target').append(newPage);
      $(settings.target).animate({
        scrollTop: 0
      }, 20);
      current = $(settings.target + ' .a-current-page');
      setTimeout(function() {
        current.removeClass('a-current-page').addClass('a-previous-page');
        newPage.removeClass('a-next-page').addClass('a-current-page');
        $(newPage).data();
      }, 0);
      current.on('transitionend', function() {
        if (settings.clearHistory) {
          $(settings.target + ' :data(page-index)').not('.a-current-page').remove();
        } else {
          // current.hide().off();
          current.off();
        }
      });
      $('#a-js-stickyHelp-back').addClass('d-block');
    });
  },
  previousquickhelpPage: function(settings) {
    var current;
    var allPages;
    var previous;
    var pagesToPop;
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
    // previous.show();
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
    var that = this;
    that.listeners('#a-stickyHelp');
    that.loadQuickhelp({
      url: '../../patterns/03-maler-_70-hurtighjelp-10-hurtighjelp-start/03-maler-_70-hurtighjelp-10-hurtighjelp-start.markup-only.html',
      target: '#a-stickyHelp'
    });
    $('body').on('click', '[data-toggle="quickhelp"]', function() {
      var $source = $(this);
      if ($source.data().action === 'load') {
        that.loadQuickhelp({
          url: $source.data().url,
          target: $source.data().target
        });
      } else if ($source.data().action === 'next') {
        that.nextquickhelpPage({ url: $source.data().url,
          target: $source.data().target });
      } else if ($source.data().action === 'back') {
        that.previousquickhelpPage({
          target: $source.data().target,
          pagesToPop: $source.data().pages
        });
      }
    });
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

var autoFootnotes = function() {
  $('.epi-footnote').each(function(index) {
    $(this).hide();
    $(this).after(
      '<a href="javascript:void(0)" ' +
        'tabindex="0" ' +
        'class="a-linkArea a-helpIconButton a-helpIconButton--blue a-js-togglePopoverIcons" ' +
        'role="button" ' +
        'data-toggle="popover" ' +
        'data-animation="false" ' +
        'data-target="#myPopup" ' +
        'data-placement="bottom" ' +
        'data-popover-content="epiFootnote_' + index + '">' +
        '<i class="ai ai-circle-plus"></i>' +
        '<i class="ai ai-circle-minus"></i>' +
        '<span class="sr-only">Vis mer info</span>' +
      '</a>' +
      '<div id="epiFootnote_' + index + '" style="display: none">' +
        $(this).html() +
      '</div>'
    );
    $('#epiFootnote_' + index).popover();
  });
};

function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}!function(t){"use strict";function e(t){if(void 0===Function.prototype.name){var e=/function\s([^(]{1,})\(/,n=e.exec(t.toString());return n&&n.length>1?n[1].trim():""}return void 0===t.prototype?t.constructor.name:t.prototype.constructor.name}function n(t){return"true"===t||"false"!==t&&(isNaN(1*t)?t:parseFloat(t))}function i(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}var o="6.3.0",s={version:o,_plugins:{},_uuids:[],rtl:function(){return"rtl"===t("html").attr("dir")},plugin:function(t,n){var o=n||e(t),s=i(o);this._plugins[s]=this[o]=t},registerPlugin:function(t,n){var o=n?i(n):e(t.constructor).toLowerCase();t.uuid=this.GetYoDigits(6,o),t.$element.attr("data-"+o)||t.$element.attr("data-"+o,t.uuid),t.$element.data("zfPlugin")||t.$element.data("zfPlugin",t),t.$element.trigger("init.zf."+o),this._uuids.push(t.uuid)},unregisterPlugin:function(t){var n=i(e(t.$element.data("zfPlugin").constructor));this._uuids.splice(this._uuids.indexOf(t.uuid),1),t.$element.removeAttr("data-"+n).removeData("zfPlugin").trigger("destroyed.zf."+n);for(var o in t)t[o]=null},reInit:function(e){var n=e instanceof t;try{if(n)e.each(function(){t(this).data("zfPlugin")._init()});else{var o=typeof e,s=this,a={object:function(e){e.forEach(function(e){e=i(e),t("[data-"+e+"]").foundation("_init")})},string:function(){e=i(e),t("[data-"+e+"]").foundation("_init")},undefined:function(){this.object(Object.keys(s._plugins))}};a[o](e)}}catch(t){console.error(t)}finally{return e}},GetYoDigits:function(t,e){return t=t||6,Math.round(Math.pow(36,t+1)-Math.random()*Math.pow(36,t)).toString(36).slice(1)+(e?"-"+e:"")},reflow:function(e,i){"undefined"==typeof i?i=Object.keys(this._plugins):"string"==typeof i&&(i=[i]);var o=this;t.each(i,function(i,s){var a=o._plugins[s],r=t(e).find("[data-"+s+"]").addBack("[data-"+s+"]");r.each(function(){var e=t(this),i={};if(e.data("zfPlugin"))return void console.warn("Tried to initialize "+s+" on an element that already has a Foundation plugin.");if(e.attr("data-options")){e.attr("data-options").split(";").forEach(function(t,e){var o=t.split(":").map(function(t){return t.trim()});o[0]&&(i[o[0]]=n(o[1]))})}try{e.data("zfPlugin",new a(t(this),i))}catch(t){console.error(t)}finally{return}})})},getFnName:e,transitionend:function(t){var e,n={transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend"},i=document.createElement("div");for(var o in n)"undefined"!=typeof i.style[o]&&(e=n[o]);return e?e:(e=setTimeout(function(){t.triggerHandler("transitionend",[t])},1),"transitionend")}};s.util={throttle:function(t,e){var n=null;return function(){var i=this,o=arguments;null===n&&(n=setTimeout(function(){t.apply(i,o),n=null},e))}}};var a=function(n){var i=typeof n,o=t("meta.foundation-mq"),a=t(".no-js");if(o.length||t('<meta class="foundation-mq">').appendTo(document.head),a.length&&a.removeClass("no-js"),"undefined"===i)s.MediaQuery._init(),s.reflow(this);else{if("string"!==i)throw new TypeError("We're sorry, "+i+" is not a valid parameter. You must use a string representing the method you wish to invoke.");var r=Array.prototype.slice.call(arguments,1),l=this.data("zfPlugin");if(void 0===l||void 0===l[n])throw new ReferenceError("We're sorry, '"+n+"' is not an available method for "+(l?e(l):"this element")+".");1===this.length?l[n].apply(l,r):this.each(function(e,i){l[n].apply(t(i).data("zfPlugin"),r)})}return this};window.Foundation=s,t.fn.foundation=a,function(){Date.now&&window.Date.now||(window.Date.now=Date.now=function(){return(new Date).getTime()});for(var t=["webkit","moz"],e=0;e<t.length&&!window.requestAnimationFrame;++e){var n=t[e];window.requestAnimationFrame=window[n+"RequestAnimationFrame"],window.cancelAnimationFrame=window[n+"CancelAnimationFrame"]||window[n+"CancelRequestAnimationFrame"]}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var i=0;window.requestAnimationFrame=function(t){var e=Date.now(),n=Math.max(i+16,e);return setTimeout(function(){t(i=n)},n-e)},window.cancelAnimationFrame=clearTimeout}window.performance&&window.performance.now||(window.performance={start:Date.now(),now:function(){return Date.now()-this.start}})}(),Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var e=Array.prototype.slice.call(arguments,1),n=this,i=function(){},o=function(){return n.apply(this instanceof i?this:t,e.concat(Array.prototype.slice.call(arguments)))};return this.prototype&&(i.prototype=this.prototype),o.prototype=new i,o})}(jQuery),!function(t){function e(t){var e={};return"string"!=typeof t?e:(t=t.trim().slice(1,-1))?e=t.split("&").reduce(function(t,e){var n=e.replace(/\+/g," ").split("="),i=n[0],o=n[1];return i=decodeURIComponent(i),o=void 0===o?null:decodeURIComponent(o),t.hasOwnProperty(i)?Array.isArray(t[i])?t[i].push(o):t[i]=[t[i],o]:t[i]=o,t},{}):e}var n={queries:[],current:"",_init:function(){var n,i=this,o=t(".foundation-mq").css("font-family");n=e(o);for(var s in n)n.hasOwnProperty(s)&&i.queries.push({name:s,value:"only screen and (min-width: "+n[s]+")"});this.current=this._getCurrentSize(),this._watcher()},atLeast:function(t){var e=this.get(t);return!!e&&window.matchMedia(e).matches},is:function(t){return t=t.trim().split(" "),t.length>1&&"only"===t[1]?t[0]===this._getCurrentSize():this.atLeast(t[0])},get:function(t){for(var e in this.queries)if(this.queries.hasOwnProperty(e)){var n=this.queries[e];if(t===n.name)return n.value}return null},_getCurrentSize:function(){for(var t,e=0;e<this.queries.length;e++){var n=this.queries[e];window.matchMedia(n.value).matches&&(t=n)}return"object"==typeof t?t.name:t},_watcher:function(){var e=this;t(window).on("resize.zf.mediaquery",function(){var n=e._getCurrentSize(),i=e.current;n!==i&&(e.current=n,t(window).trigger("changed.zf.mediaquery",[n,i]))})}};Foundation.MediaQuery=n,window.matchMedia||(window.matchMedia=function(){"use strict";var t=window.styleMedia||window.media;if(!t){var e=document.createElement("style"),n=document.getElementsByTagName("script")[0],i=null;e.type="text/css",e.id="matchmediajs-test",n&&n.parentNode&&n.parentNode.insertBefore(e,n),i="getComputedStyle"in window&&window.getComputedStyle(e,null)||e.currentStyle,t={matchMedium:function(t){var n="@media "+t+"{ #matchmediajs-test { width: 1px; } }";return e.styleSheet?e.styleSheet.cssText=n:e.textContent=n,"1px"===i.width}}}return function(e){return{matches:t.matchMedium(e||"all"),media:e||"all"}}}()),Foundation.MediaQuery=n}(jQuery),!function(t){function e(t){var e={};for(var n in t)e[t[n]]=t[n];return e}var n={9:"TAB",13:"ENTER",27:"ESCAPE",32:"SPACE",37:"ARROW_LEFT",38:"ARROW_UP",39:"ARROW_RIGHT",40:"ARROW_DOWN"},i={},o={keys:e(n),parseKey:function(t){var e=n[t.which||t.keyCode]||String.fromCharCode(t.which).toUpperCase();return e=e.replace(/\W+/,""),t.shiftKey&&(e="SHIFT_"+e),t.ctrlKey&&(e="CTRL_"+e),t.altKey&&(e="ALT_"+e),e=e.replace(/_$/,"")},handleKey:function(e,n,o){var s,a,r,l=i[n],u=this.parseKey(e);if(!l)return console.warn("Component not defined!");if(s="undefined"==typeof l.ltr?l:Foundation.rtl()?t.extend({},l.ltr,l.rtl):t.extend({},l.rtl,l.ltr),a=s[u],r=o[a],r&&"function"==typeof r){var d=r.apply();(o.handled||"function"==typeof o.handled)&&o.handled(d)}else(o.unhandled||"function"==typeof o.unhandled)&&o.unhandled()},findFocusable:function(e){return!!e&&e.find("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter(function(){return!(!t(this).is(":visible")||t(this).attr("tabindex")<0)})},register:function(t,e){i[t]=e},trapFocus:function(t){var e=Foundation.Keyboard.findFocusable(t),n=e.eq(0),i=e.eq(-1);t.on("keydown.zf.trapfocus",function(t){t.target===i[0]&&"TAB"===Foundation.Keyboard.parseKey(t)?(t.preventDefault(),n.focus()):t.target===n[0]&&"SHIFT_TAB"===Foundation.Keyboard.parseKey(t)&&(t.preventDefault(),i.focus())})},releaseFocus:function(t){t.off("keydown.zf.trapfocus")}};Foundation.Keyboard=o}(jQuery),!function(t){function e(t,e,n){function i(r){a||(a=r),s=r-a,n.apply(e),s<t?o=window.requestAnimationFrame(i,e):(window.cancelAnimationFrame(o),e.trigger("finished.zf.animate",[e]).triggerHandler("finished.zf.animate",[e]))}var o,s,a=null;return 0===t?(n.apply(e),void e.trigger("finished.zf.animate",[e]).triggerHandler("finished.zf.animate",[e])):void(o=window.requestAnimationFrame(i))}function n(e,n,s,a){function r(){e||n.hide(),l(),a&&a.apply(n)}function l(){n[0].style.transitionDuration=0,n.removeClass(u+" "+d+" "+s)}if(n=t(n).eq(0),n.length){var u=e?i[0]:i[1],d=e?o[0]:o[1];l(),n.addClass(s).css("transition","none"),requestAnimationFrame(function(){n.addClass(u),e&&n.show()}),requestAnimationFrame(function(){n[0].offsetWidth,n.css("transition","").addClass(d)}),n.one(Foundation.transitionend(n),r)}}var i=["mui-enter","mui-leave"],o=["mui-enter-active","mui-leave-active"],s={animateIn:function(t,e,i){n(!0,t,e,i)},animateOut:function(t,e,i){n(!1,t,e,i)}};Foundation.Move=e,Foundation.Motion=s}(jQuery),!function(t){var e={Feather:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"zf";e.attr("role","menubar");var i=e.find("li").attr({role:"menuitem"}),o="is-"+n+"-submenu",s=o+"-item",a="is-"+n+"-submenu-parent";i.each(function(){var e=t(this),i=e.children("ul");i.length&&(e.addClass(a).attr({"aria-haspopup":!0,"aria-label":e.children("a:first").text()}),"drilldown"===n&&e.attr({"aria-expanded":!1}),i.addClass("submenu "+o).attr({"data-submenu":"",role:"menu"}),"drilldown"===n&&i.attr({"aria-hidden":!0})),e.parent("[data-submenu]").length&&e.addClass("is-submenu-item "+s)})},Burn:function(t,e){var n="is-"+e+"-submenu",i=n+"-item",o="is-"+e+"-submenu-parent";t.find(">li, .menu, .menu > li").removeClass(n+" "+i+" "+o+" is-submenu-item submenu is-active").removeAttr("data-submenu").css("display","")}};Foundation.Nest=e}(jQuery),!function(t){function e(t,e,i,o){var s,a,r,l,u=n(t);if(e){var d=n(e);a=u.offset.top+u.height<=d.height+d.offset.top,s=u.offset.top>=d.offset.top,r=u.offset.left>=d.offset.left,l=u.offset.left+u.width<=d.width+d.offset.left}else a=u.offset.top+u.height<=u.windowDims.height+u.windowDims.offset.top,s=u.offset.top>=u.windowDims.offset.top,r=u.offset.left>=u.windowDims.offset.left,l=u.offset.left+u.width<=u.windowDims.width;var f=[a,s,r,l];return i?r===l==!0:o?s===a==!0:f.indexOf(!1)===-1}function n(t,e){if(t=t.length?t[0]:t,t===window||t===document)throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");var n=t.getBoundingClientRect(),i=t.parentNode.getBoundingClientRect(),o=document.body.getBoundingClientRect(),s=window.pageYOffset,a=window.pageXOffset;return{width:n.width,height:n.height,offset:{top:n.top+s,left:n.left+a},parentDims:{width:i.width,height:i.height,offset:{top:i.top+s,left:i.left+a}},windowDims:{width:o.width,height:o.height,offset:{top:s,left:a}}}}function i(t,e,i,o,s,a){var r=n(t),l=e?n(e):null;switch(i){case"top":return{left:Foundation.rtl()?l.offset.left-r.width+l.width:l.offset.left,top:l.offset.top-(r.height+o)};case"left":return{left:l.offset.left-(r.width+s),top:l.offset.top};case"right":return{left:l.offset.left+l.width+s,top:l.offset.top};case"center top":return{left:l.offset.left+l.width/2-r.width/2,top:l.offset.top-(r.height+o)};case"center bottom":return{left:a?s:l.offset.left+l.width/2-r.width/2,top:l.offset.top+l.height+o};case"center left":return{left:l.offset.left-(r.width+s),top:l.offset.top+l.height/2-r.height/2};case"center right":return{left:l.offset.left+l.width+s+1,top:l.offset.top+l.height/2-r.height/2};case"center":return{left:r.windowDims.offset.left+r.windowDims.width/2-r.width/2,top:r.windowDims.offset.top+r.windowDims.height/2-r.height/2};case"reveal":return{left:(r.windowDims.width-r.width)/2,top:r.windowDims.offset.top+o};case"reveal full":return{left:r.windowDims.offset.left,top:r.windowDims.offset.top};case"left bottom":return{left:l.offset.left,top:l.offset.top+l.height+o};case"right bottom":return{left:l.offset.left+l.width+s-r.width,top:l.offset.top+l.height+o};default:return{left:Foundation.rtl()?l.offset.left-r.width+l.width:l.offset.left+s,top:l.offset.top+l.height+o}}}Foundation.Box={ImNotTouchingYou:e,GetDimensions:n,GetOffsets:i}}(jQuery),!function(t){function e(){a(),i(),o(),s(),n()}function n(e){var n=t("[data-yeti-box]"),i=["dropdown","tooltip","reveal"];if(e&&("string"==typeof e?i.push(e):"object"==typeof e&&"string"==typeof e[0]?i.concat(e):console.error("Plugin names must be strings")),n.length){var o=i.map(function(t){return"closeme.zf."+t}).join(" ");t(window).off(o).on(o,function(e,n){var i=e.namespace.split(".")[0],o=t("[data-"+i+"]").not('[data-yeti-box="'+n+'"]');o.each(function(){var e=t(this);e.triggerHandler("close.zf.trigger",[e])})})}}function i(e){var n=void 0,i=t("[data-resize]");i.length&&t(window).off("resize.zf.trigger").on("resize.zf.trigger",function(o){n&&clearTimeout(n),n=setTimeout(function(){r||i.each(function(){t(this).triggerHandler("resizeme.zf.trigger")}),i.attr("data-events","resize")},e||10)})}function o(e){var n=void 0,i=t("[data-scroll]");i.length&&t(window).off("scroll.zf.trigger").on("scroll.zf.trigger",function(o){n&&clearTimeout(n),n=setTimeout(function(){r||i.each(function(){t(this).triggerHandler("scrollme.zf.trigger")}),i.attr("data-events","scroll")},e||10)})}function s(e){var n=t("[data-mutate]");n.length&&r&&n.each(function(){t(this).triggerHandler("mutateme.zf.trigger")})}function a(){if(!r)return!1;var e=document.querySelectorAll("[data-resize], [data-scroll], [data-mutate]"),n=function(e){var n=t(e[0].target);switch(e[0].type){case"attributes":"scroll"===n.attr("data-events")&&"data-events"===e[0].attributeName&&n.triggerHandler("scrollme.zf.trigger",[n,window.pageYOffset]),"resize"===n.attr("data-events")&&"data-events"===e[0].attributeName&&n.triggerHandler("resizeme.zf.trigger",[n]),"style"===e[0].attributeName&&(n.closest("[data-mutate]").attr("data-events","mutate"),n.closest("[data-mutate]").triggerHandler("mutateme.zf.trigger",[n.closest("[data-mutate]")]));break;case"childList":n.closest("[data-mutate]").attr("data-events","mutate"),n.closest("[data-mutate]").triggerHandler("mutateme.zf.trigger",[n.closest("[data-mutate]")]);break;default:return!1}};if(e.length)for(var i=0;i<=e.length-1;i++){var o=new r(n);o.observe(e[i],{attributes:!0,childList:!0,characterData:!1,subtree:!0,attributeFilter:["data-events","style"]})}}var r=function(){for(var t=["WebKit","Moz","O","Ms",""],e=0;e<t.length;e++)if(t[e]+"MutationObserver"in window)return window[t[e]+"MutationObserver"];return!1}(),l=function(e,n){e.data(n).split(" ").forEach(function(i){t("#"+i)["close"===n?"trigger":"triggerHandler"](n+".zf.trigger",[e])})};t(document).on("click.zf.trigger","[data-open]",function(){l(t(this),"open")}),t(document).on("click.zf.trigger","[data-close]",function(){var e=t(this).data("close");e?l(t(this),"close"):t(this).trigger("close.zf.trigger")}),t(document).on("click.zf.trigger","[data-toggle]",function(){var e=t(this).data("toggle");e?l(t(this),"toggle"):t(this).trigger("toggle.zf.trigger")}),t(document).on("close.zf.trigger","[data-closable]",function(e){e.stopPropagation();var n=t(this).data("closable");""!==n?Foundation.Motion.animateOut(t(this),n,function(){t(this).trigger("closed.zf")}):t(this).fadeOut().trigger("closed.zf")}),t(document).on("focus.zf.trigger blur.zf.trigger","[data-toggle-focus]",function(){var e=t(this).data("toggle-focus");t("#"+e).triggerHandler("toggle.zf.trigger",[t(this)])}),t(window).on("load",function(){e()}),Foundation.IHearYou=e}(jQuery);var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();!function(t){var e=function(){function e(n,i){_classCallCheck(this,e),this.$element=n,this.options=t.extend({},e.defaults,this.$element.data(),i),Foundation.Nest.Feather(this.$element,"drilldown"),this._init(),Foundation.registerPlugin(this,"Drilldown"),Foundation.Keyboard.register("Drilldown",{ENTER:"open",SPACE:"open",ARROW_RIGHT:"next",ARROW_UP:"up",ARROW_DOWN:"down",ARROW_LEFT:"previous",ESCAPE:"close",TAB:"down",SHIFT_TAB:"up"})}return _createClass(e,[{key:"_init",value:function(){this.$submenuAnchors=this.$element.find("li.is-drilldown-submenu-parent").children("a"),this.$submenus=this.$submenuAnchors.parent("li").children("[data-submenu]"),this.$menuItems=this.$element.find("li").not(".js-drilldown-back").attr("role","menuitem").find("a"),this.$element.attr("data-mutate",this.$element.attr("data-drilldown")||Foundation.GetYoDigits(6,"drilldown")),this._prepareMenu(),this._registerEvents(),this._keyboardEvents()}},{key:"_prepareMenu",value:function(){var e=this;this.$submenuAnchors.each(function(){var n=t(this),i=n.parent();e.options.parentLink&&n.clone().prependTo(i.children("[data-submenu]")).wrap('<li class="is-submenu-parent-item is-submenu-item is-drilldown-submenu-item" role="menu-item"></li>'),n.data("savedHref",n.attr("href")).removeAttr("href").attr("tabindex",0),n.children("[data-submenu]").attr({"aria-hidden":!0,tabindex:0,role:"menu"}),e._events(n)}),this.$submenus.each(function(){var n=t(this),i=n.find(".js-drilldown-back");if(!i.length)switch(e.options.backButtonPosition){case"bottom":n.append(e.options.backButton);break;case"top":n.prepend(e.options.backButton);break;default:console.error("Unsupported backButtonPosition value '"+e.options.backButtonPosition+"'")}e._back(n)}),this.options.autoHeight||this.$submenus.addClass("drilldown-submenu-cover-previous"),this.$element.parent().hasClass("is-drilldown")||(this.$wrapper=t(this.options.wrapper).addClass("is-drilldown"),this.options.animateHeight&&this.$wrapper.addClass("animate-height"),this.$wrapper=this.$element.wrap(this.$wrapper).parent().css(this._getMaxDims()))}},{key:"_resize",value:function(){this.$wrapper.css({"max-width":"none","min-height":"none"}),this.$wrapper.css(this._getMaxDims())}},{key:"_events",value:function(e){var n=this;e.off("click.zf.drilldown").on("click.zf.drilldown",function(i){if(t(i.target).parentsUntil("ul","li").hasClass("is-drilldown-submenu-parent")&&(i.stopImmediatePropagation(),i.preventDefault()),n._show(e.parent("li")),n.options.closeOnClick){var o=t("body");o.off(".zf.drilldown").on("click.zf.drilldown",function(e){e.target===n.$element[0]||t.contains(n.$element[0],e.target)||(e.preventDefault(),n._hideAll(),o.off(".zf.drilldown"))})}}),this.$element.on("mutateme.zf.trigger",this._resize.bind(this))}},{key:"_registerEvents",value:function(){this.options.scrollTop&&(this._bindHandler=this._scrollTop.bind(this),this.$element.on("open.zf.drilldown hide.zf.drilldown closed.zf.drilldown",this._bindHandler))}},{key:"_scrollTop",value:function(){var e=this,n=""!=e.options.scrollTopElement?t(e.options.scrollTopElement):e.$element,i=parseInt(n.offset().top+e.options.scrollTopOffset);t("html, body").stop(!0).animate({scrollTop:i},e.options.animationDuration,e.options.animationEasing,function(){this===t("html")[0]&&e.$element.trigger("scrollme.zf.drilldown")})}},{key:"_keyboardEvents",value:function(){var e=this;this.$menuItems.add(this.$element.find(".js-drilldown-back > a, .is-submenu-parent-item > a")).on("keydown.zf.drilldown",function(n){var i,o,s=t(this),a=s.parent("li").parent("ul").children("li").children("a");a.each(function(e){if(t(this).is(s))return i=a.eq(Math.max(0,e-1)),void(o=a.eq(Math.min(e+1,a.length-1)))}),Foundation.Keyboard.handleKey(n,"Drilldown",{next:function(){if(s.is(e.$submenuAnchors))return e._show(s.parent("li")),s.parent("li").one(Foundation.transitionend(s),function(){s.parent("li").find("ul li a").filter(e.$menuItems).first().focus()}),!0},previous:function(){return e._hide(s.parent("li").parent("ul")),s.parent("li").parent("ul").one(Foundation.transitionend(s),function(){setTimeout(function(){s.parent("li").parent("ul").parent("li").children("a").first().focus()},1)}),!0},up:function(){return i.focus(),!0},down:function(){return o.focus(),!0},close:function(){e._back()},open:function(){return s.is(e.$menuItems)?s.is(e.$submenuAnchors)?(e._show(s.parent("li")),s.parent("li").one(Foundation.transitionend(s),function(){s.parent("li").find("ul li a").filter(e.$menuItems).first().focus()}),!0):void 0:(e._hide(s.parent("li").parent("ul")),s.parent("li").parent("ul").one(Foundation.transitionend(s),function(){setTimeout(function(){s.parent("li").parent("ul").parent("li").children("a").first().focus()},1)}),!0)},handled:function(t){t&&n.preventDefault(),n.stopImmediatePropagation()}})})}},{key:"_hideAll",value:function(){var t=this.$element.find(".is-drilldown-submenu.is-active").addClass("is-closing");this.options.autoHeight&&this.$wrapper.css({height:t.parent().closest("ul").data("calcHeight")}),t.one(Foundation.transitionend(t),function(e){t.removeClass("is-active is-closing")}),this.$element.trigger("closed.zf.drilldown")}},{key:"_back",value:function(t){var e=this;t.off("click.zf.drilldown"),t.children(".js-drilldown-back").on("click.zf.drilldown",function(n){n.stopImmediatePropagation(),e._hide(t);var i=t.parent("li").parent("ul").parent("li");i.length&&e._show(i)})}},{key:"_menuLinkEvents",value:function(){var t=this;this.$menuItems.not(".is-drilldown-submenu-parent").off("click.zf.drilldown").on("click.zf.drilldown",function(e){setTimeout(function(){t._hideAll()},0)})}},{key:"_show",value:function(t){this.options.autoHeight&&this.$wrapper.css({height:t.children("[data-submenu]").data("calcHeight")}),t.attr("aria-expanded",!0),t.children("[data-submenu]").addClass("is-active").attr("aria-hidden",!1),this.$element.trigger("open.zf.drilldown",[t])}},{key:"_hide",value:function(t){this.options.autoHeight&&this.$wrapper.css({height:t.parent().closest("ul").data("calcHeight")});t.parent("li").attr("aria-expanded",!1),t.attr("aria-hidden",!0).addClass("is-closing"),t.addClass("is-closing").one(Foundation.transitionend(t),function(){t.removeClass("is-active is-closing"),t.blur()}),t.trigger("hide.zf.drilldown",[t])}},{key:"_getMaxDims",value:function(){var e=0,n={},i=this;return this.$submenus.add(this.$element).each(function(){var o=(t(this).children("li").length,Foundation.Box.GetDimensions(this).height);e=o>e?o:e,i.options.autoHeight&&(t(this).data("calcHeight",o),t(this).hasClass("is-drilldown-submenu")||(n.height=o))}),this.options.autoHeight||(n["min-height"]=e+"px"),n["max-width"]=this.$element[0].getBoundingClientRect().width+"px",n}},{key:"destroy",value:function(){this.options.scrollTop&&this.$element.off(".zf.drilldown",this._bindHandler),this._hideAll(),this.$element.off("mutateme.zf.trigger"),Foundation.Nest.Burn(this.$element,"drilldown"),this.$element.unwrap().find(".js-drilldown-back, .is-submenu-parent-item").remove().end().find(".is-active, .is-closing, .is-drilldown-submenu").removeClass("is-active is-closing is-drilldown-submenu").end().find("[data-submenu]").removeAttr("aria-hidden tabindex role"),this.$submenuAnchors.each(function(){t(this).off(".zf.drilldown")}),this.$submenus.removeClass("drilldown-submenu-cover-previous"),this.$element.find("a").each(function(){var e=t(this);e.removeAttr("tabindex"),e.data("savedHref")&&e.attr("href",e.data("savedHref")).removeData("savedHref")}),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={backButton:'<li class="js-drilldown-back"><a tabindex="0">Back</a></li>',backButtonPosition:"top",wrapper:"<div></div>",parentLink:!1,closeOnClick:!1,autoHeight:!1,animateHeight:!1,scrollTop:!1,scrollTopElement:"",scrollTopOffset:0,animationDuration:500,animationEasing:"swing"},Foundation.plugin(e,"Drilldown")}(jQuery);var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();!function(t){var e=function(){function e(n,i){_classCallCheck(this,e),this.$element=n,this.options=t.extend({},e.defaults,this.$element.data(),i),Foundation.Nest.Feather(this.$element,"accordion"),this._init(),Foundation.registerPlugin(this,"AccordionMenu"),Foundation.Keyboard.register("AccordionMenu",{ENTER:"toggle",SPACE:"toggle",ARROW_RIGHT:"open",ARROW_UP:"up",ARROW_DOWN:"down",ARROW_LEFT:"close",ESCAPE:"closeAll"})}return _createClass(e,[{key:"_init",value:function(){this.$element.find("[data-submenu]").not(".is-active").slideUp(0),this.$element.attr({role:"menu","aria-multiselectable":this.options.multiOpen}),this.$menuLinks=this.$element.find(".is-accordion-submenu-parent"),this.$menuLinks.each(function(){var e=this.id||Foundation.GetYoDigits(6,"acc-menu-link"),n=t(this),i=n.children("[data-submenu]"),o=i[0].id||Foundation.GetYoDigits(6,"acc-menu"),s=i.hasClass("is-active");n.attr({"aria-controls":o,"aria-expanded":s,role:"menuitem",id:e}),i.attr({"aria-labelledby":e,"aria-hidden":!s,role:"menu",id:o})});var e=this.$element.find(".is-active");if(e.length){var n=this;e.each(function(){n.down(t(this))})}this._events()}},{key:"_events",value:function(){var e=this;this.$element.find("li").each(function(){var n=t(this).children("[data-submenu]");n.length&&t(this).children("a").off("click.zf.accordionMenu").on("click.zf.accordionMenu",function(t){t.preventDefault(),e.toggle(n)})}).on("keydown.zf.accordionmenu",function(n){var i,o,s=t(this),a=s.parent("ul").children("li"),r=s.children("[data-submenu]");a.each(function(e){if(t(this).is(s))return i=a.eq(Math.max(0,e-1)).find("a").first(),o=a.eq(Math.min(e+1,a.length-1)).find("a").first(),t(this).children("[data-submenu]:visible").length&&(o=s.find("li:first-child").find("a").first()),t(this).is(":first-child")?i=s.parents("li").first().find("a").first():i.parents("li").first().children("[data-submenu]:visible").length&&(i=i.parents("li").find("li:last-child").find("a").first()),void(t(this).is(":last-child")&&(o=s.parents("li").first().next("li").find("a").first()))}),Foundation.Keyboard.handleKey(n,"AccordionMenu",{open:function(){r.is(":hidden")&&(e.down(r),r.find("li").first().find("a").first().focus())},close:function(){r.length&&!r.is(":hidden")?e.up(r):s.parent("[data-submenu]").length&&(e.up(s.parent("[data-submenu]")),s.parents("li").first().find("a").first().focus())},up:function(){return i.focus(),!0},down:function(){return o.focus(),!0},toggle:function(){s.children("[data-submenu]").length&&e.toggle(s.children("[data-submenu]"))},closeAll:function(){e.hideAll()},handled:function(t){t&&n.preventDefault(),n.stopImmediatePropagation()}})})}},{key:"hideAll",value:function(){this.up(this.$element.find("[data-submenu]"))}},{key:"showAll",value:function(){this.down(this.$element.find("[data-submenu]"))}},{key:"toggle",value:function(t){t.is(":animated")||(t.is(":hidden")?this.down(t):this.up(t))}},{key:"down",value:function(t){var e=this;this.options.multiOpen||this.up(this.$element.find(".is-active").not(t.parentsUntil(this.$element).add(t))),t.addClass("is-active").attr({"aria-hidden":!1}).parent(".is-accordion-submenu-parent").attr({"aria-expanded":!0}),t.slideDown(e.options.slideSpeed,function(){e.$element.trigger("down.zf.accordionMenu",[t])})}},{key:"up",value:function(t){var e=this;t.slideUp(e.options.slideSpeed,function(){e.$element.trigger("up.zf.accordionMenu",[t])});var n=t.find("[data-submenu]").slideUp(0).addBack().attr("aria-hidden",!0);n.parent(".is-accordion-submenu-parent").attr("aria-expanded",!1)}},{key:"destroy",value:function(){this.$element.find("[data-submenu]").slideDown(0).css("display",""),this.$element.find("a").off("click.zf.accordionMenu"),Foundation.Nest.Burn(this.$element,"accordion"),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={slideSpeed:250,multiOpen:!0},Foundation.plugin(e,"AccordionMenu")}(jQuery);var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();!function(t){var e=function(){function e(n,i){_classCallCheck(this,e),this.$element=n,this.options=t.extend({},e.defaults,this.$element.data(),i),Foundation.Nest.Feather(this.$element,"dropdown"),this._init(),Foundation.registerPlugin(this,"DropdownMenu"),Foundation.Keyboard.register("DropdownMenu",{ENTER:"open",SPACE:"open",ARROW_RIGHT:"next",ARROW_UP:"up",ARROW_DOWN:"down",ARROW_LEFT:"previous",ESCAPE:"close"})}return _createClass(e,[{key:"_init",value:function(){var t=this.$element.find("li.is-dropdown-submenu-parent");this.$element.children(".is-dropdown-submenu-parent").children(".is-dropdown-submenu").addClass("first-sub"),this.$menuItems=this.$element.find('[role="menuitem"]'),this.$tabs=this.$element.children('[role="menuitem"]'),this.$tabs.find("ul.is-dropdown-submenu").addClass(this.options.verticalClass),this.$element.hasClass(this.options.rightClass)||"right"===this.options.alignment||Foundation.rtl()||this.$element.parents(".top-bar-right").is("*")?(this.options.alignment="right",t.addClass("opens-left")):t.addClass("opens-right"),this.changed=!1,this._events()}},{key:"_isVertical",value:function(){return"block"===this.$tabs.css("display")}},{key:"_events",value:function(){var e=this,n="ontouchstart"in window||"undefined"!=typeof window.ontouchstart,i="is-dropdown-submenu-parent",o=function(o){var s=t(o.target).parentsUntil("ul","."+i),a=s.hasClass(i),r="true"===s.attr("data-is-click"),l=s.children(".is-dropdown-submenu");if(a)if(r){if(!e.options.closeOnClick||!e.options.clickOpen&&!n||e.options.forceFollow&&n)return;o.stopImmediatePropagation(),o.preventDefault(),e._hide(s)}else o.preventDefault(),o.stopImmediatePropagation(),e._show(l),s.add(s.parentsUntil(e.$element,"."+i)).attr("data-is-click",!0)};(this.options.clickOpen||n)&&this.$menuItems.on("click.zf.dropdownmenu touchstart.zf.dropdownmenu",o),e.options.closeOnClickInside&&this.$menuItems.on("click.zf.dropdownmenu touchend.zf.dropdownmenu",function(n){var o=t(this),s=o.hasClass(i);s||e._hide()}),this.options.disableHover||this.$menuItems.on("mouseenter.zf.dropdownmenu",function(n){var o=t(this),s=o.hasClass(i);s&&(clearTimeout(o.data("_delay")),o.data("_delay",setTimeout(function(){e._show(o.children(".is-dropdown-submenu"))},e.options.hoverDelay)))}).on("mouseleave.zf.dropdownmenu",function(n){var o=t(this),s=o.hasClass(i);if(s&&e.options.autoclose){if("true"===o.attr("data-is-click")&&e.options.clickOpen)return!1;clearTimeout(o.data("_delay")),o.data("_delay",setTimeout(function(){e._hide(o)},e.options.closingTime))}}),this.$menuItems.on("keydown.zf.dropdownmenu",function(n){var i,o,s=t(n.target).parentsUntil("ul",'[role="menuitem"]'),a=e.$tabs.index(s)>-1,r=a?e.$tabs:s.siblings("li").add(s);r.each(function(e){if(t(this).is(s))return i=r.eq(e-1),void(o=r.eq(e+1))});var l=function(){s.is(":last-child")||(o.children("a:first").focus(),n.preventDefault())},u=function(){i.children("a:first").focus(),n.preventDefault()},d=function(){var t=s.children("ul.is-dropdown-submenu");t.length&&(e._show(t),s.find("li > a:first").focus(),n.preventDefault())},f=function(){var t=s.parent("ul").parent("li");t.children("a:first").focus(),e._hide(t),n.preventDefault()},c={open:d,close:function(){e._hide(e.$element),
e.$menuItems.find("a:first").focus(),n.preventDefault()},handled:function(){n.stopImmediatePropagation()}};a?e._isVertical()?Foundation.rtl()?t.extend(c,{down:l,up:u,next:f,previous:d}):t.extend(c,{down:l,up:u,next:d,previous:f}):Foundation.rtl()?t.extend(c,{next:u,previous:l,down:d,up:f}):t.extend(c,{next:l,previous:u,down:d,up:f}):Foundation.rtl()?t.extend(c,{next:f,previous:d,down:l,up:u}):t.extend(c,{next:d,previous:f,down:l,up:u}),Foundation.Keyboard.handleKey(n,"DropdownMenu",c)})}},{key:"_addBodyHandler",value:function(){var e=t(document.body),n=this;e.off("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu").on("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu",function(t){var i=n.$element.find(t.target);i.length||(n._hide(),e.off("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu"))})}},{key:"_show",value:function(e){var n=this.$tabs.index(this.$tabs.filter(function(n,i){return t(i).find(e).length>0})),i=e.parent("li.is-dropdown-submenu-parent").siblings("li.is-dropdown-submenu-parent");this._hide(i,n),e.css("visibility","hidden").addClass("js-dropdown-active").parent("li.is-dropdown-submenu-parent").addClass("is-active");var o=Foundation.Box.ImNotTouchingYou(e,null,!0);if(!o){var s="left"===this.options.alignment?"-right":"-left",a=e.parent(".is-dropdown-submenu-parent");a.removeClass("opens"+s).addClass("opens-"+this.options.alignment),o=Foundation.Box.ImNotTouchingYou(e,null,!0),o||a.removeClass("opens-"+this.options.alignment).addClass("opens-inner"),this.changed=!0}e.css("visibility",""),this.options.closeOnClick&&this._addBodyHandler(),this.$element.trigger("show.zf.dropdownmenu",[e])}},{key:"_hide",value:function(t,e){var n;n=t&&t.length?t:void 0!==e?this.$tabs.not(function(t,n){return t===e}):this.$element;var i=n.hasClass("is-active")||n.find(".is-active").length>0;if(i){if(n.find("li.is-active").add(n).attr({"data-is-click":!1}).removeClass("is-active"),n.find("ul.js-dropdown-active").removeClass("js-dropdown-active"),this.changed||n.find("opens-inner").length){var o="left"===this.options.alignment?"right":"left";n.find("li.is-dropdown-submenu-parent").add(n).removeClass("opens-inner opens-"+this.options.alignment).addClass("opens-"+o),this.changed=!1}this.$element.trigger("hide.zf.dropdownmenu",[n])}}},{key:"destroy",value:function(){this.$menuItems.off(".zf.dropdownmenu").removeAttr("data-is-click").removeClass("is-right-arrow is-left-arrow is-down-arrow opens-right opens-left opens-inner"),t(document.body).off(".zf.dropdownmenu"),Foundation.Nest.Burn(this.$element,"dropdown"),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={disableHover:!1,autoclose:!0,hoverDelay:50,clickOpen:!1,closingTime:500,alignment:"left",closeOnClick:!0,closeOnClickInside:!0,verticalClass:"vertical",rightClass:"align-right",forceFollow:!0},Foundation.plugin(e,"DropdownMenu")}(jQuery);var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();!function(t){var e=function(){function e(n,i){_classCallCheck(this,e),this.$element=t(n),this.rules=this.$element.data("responsive-menu"),this.currentMq=null,this.currentPlugin=null,this._init(),this._events(),Foundation.registerPlugin(this,"ResponsiveMenu")}return _createClass(e,[{key:"_init",value:function(){if("string"==typeof this.rules){for(var e={},i=this.rules.split(" "),o=0;o<i.length;o++){var s=i[o].split("-"),a=s.length>1?s[0]:"small",r=s.length>1?s[1]:s[0];null!==n[r]&&(e[a]=n[r])}this.rules=e}t.isEmptyObject(this.rules)||this._checkMediaQueries(),this.$element.attr("data-mutate",this.$element.attr("data-mutate")||Foundation.GetYoDigits(6,"responsive-menu"))}},{key:"_events",value:function(){var e=this;t(window).on("changed.zf.mediaquery",function(){e._checkMediaQueries()})}},{key:"_checkMediaQueries",value:function(){var e,i=this;t.each(this.rules,function(t){Foundation.MediaQuery.atLeast(t)&&(e=t)}),e&&(this.currentPlugin instanceof this.rules[e].plugin||(t.each(n,function(t,e){i.$element.removeClass(e.cssClass)}),this.$element.addClass(this.rules[e].cssClass),this.currentPlugin&&this.currentPlugin.destroy(),this.currentPlugin=new this.rules[e].plugin(this.$element,{})))}},{key:"destroy",value:function(){this.currentPlugin.destroy(),t(window).off(".zf.ResponsiveMenu"),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={};var n={dropdown:{cssClass:"dropdown",plugin:Foundation._plugins["dropdown-menu"]||null},drilldown:{cssClass:"drilldown",plugin:Foundation._plugins.drilldown||null},accordion:{cssClass:"accordion-menu",plugin:Foundation._plugins["accordion-menu"]||null}};Foundation.plugin(e,"ResponsiveMenu")}(jQuery);var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();!function(t){var e=function(){function e(n,i){_classCallCheck(this,e),this.$element=n,this.options=t.extend({},e.defaults,this.$element.data(),i),this._init(),Foundation.registerPlugin(this,"Dropdown"),Foundation.Keyboard.register("Dropdown",{ENTER:"open",SPACE:"open",ESCAPE:"close"})}return _createClass(e,[{key:"_init",value:function(){var e=this.$element.attr("id");this.$anchor=t(t('[data-toggle="'+e+'"]').length?'[data-toggle="'+e+'"]':'[data-open="'+e+'"]'),this.$anchor.attr({"aria-controls":e,"data-is-focus":!1,"data-yeti-box":e,"aria-haspopup":!0,"aria-expanded":!1}),this.options.parentClass?this.$parent=this.$element.parents("."+this.options.parentClass):this.$parent=null,this.options.positionClass=this.getPositionClass(),this.counter=4,this.usedPositions=[],this.$element.attr({"aria-hidden":"true","data-yeti-box":e,"data-resize":e,"aria-labelledby":this.$anchor[0].id||Foundation.GetYoDigits(6,"dd-anchor")}),this._events()}},{key:"getPositionClass",value:function(){var t=this.$element[0].className.match(/(top|left|right|bottom)/g);t=t?t[0]:"";var e=/float-(\S+)/.exec(this.$anchor[0].className);e=e?e[1]:"";var n=e?e+" "+t:t;return n}},{key:"_reposition",value:function(t){this.usedPositions.push(t?t:"bottom"),!t&&this.usedPositions.indexOf("top")<0?this.$element.addClass("top"):"top"===t&&this.usedPositions.indexOf("bottom")<0?this.$element.removeClass(t):"left"===t&&this.usedPositions.indexOf("right")<0?this.$element.removeClass(t).addClass("right"):"right"===t&&this.usedPositions.indexOf("left")<0?this.$element.removeClass(t).addClass("left"):!t&&this.usedPositions.indexOf("top")>-1&&this.usedPositions.indexOf("left")<0?this.$element.addClass("left"):"top"===t&&this.usedPositions.indexOf("bottom")>-1&&this.usedPositions.indexOf("left")<0?this.$element.removeClass(t).addClass("left"):"left"===t&&this.usedPositions.indexOf("right")>-1&&this.usedPositions.indexOf("bottom")<0?this.$element.removeClass(t):"right"===t&&this.usedPositions.indexOf("left")>-1&&this.usedPositions.indexOf("bottom")<0?this.$element.removeClass(t):this.$element.removeClass(t),this.classChanged=!0,this.counter--}},{key:"_setPosition",value:function(){if("false"===this.$anchor.attr("aria-expanded"))return!1;var t=this.getPositionClass(),e=Foundation.Box.GetDimensions(this.$element),n=(Foundation.Box.GetDimensions(this.$anchor),"left"===t?"left":"right"===t?"left":"top"),i="top"===n?"height":"width";"height"===i?this.options.vOffset:this.options.hOffset;if(e.width>=e.windowDims.width||!this.counter&&!Foundation.Box.ImNotTouchingYou(this.$element,this.$parent)){var o=e.windowDims.width,s=0;if(this.$parent){var a=Foundation.Box.GetDimensions(this.$parent),s=a.offset.left;a.width<o&&(o=a.width)}return this.$element.offset(Foundation.Box.GetOffsets(this.$element,this.$anchor,"center bottom",this.options.vOffset,this.options.hOffset+s,!0)).css({width:o-2*this.options.hOffset,height:"auto"}),this.classChanged=!0,!1}for(this.$element.offset(Foundation.Box.GetOffsets(this.$element,this.$anchor,t,this.options.vOffset,this.options.hOffset));!Foundation.Box.ImNotTouchingYou(this.$element,this.$parent,!0)&&this.counter;)this._reposition(t),this._setPosition()}},{key:"_events",value:function(){var e=this;this.$element.on({"open.zf.trigger":this.open.bind(this),"close.zf.trigger":this.close.bind(this),"toggle.zf.trigger":this.toggle.bind(this),"resizeme.zf.trigger":this._setPosition.bind(this)}),this.options.hover&&(this.$anchor.off("mouseenter.zf.dropdown mouseleave.zf.dropdown").on("mouseenter.zf.dropdown",function(){var n=t("body").data();"undefined"!=typeof n.whatinput&&"mouse"!==n.whatinput||(clearTimeout(e.timeout),e.timeout=setTimeout(function(){e.open(),e.$anchor.data("hover",!0)},e.options.hoverDelay))}).on("mouseleave.zf.dropdown",function(){clearTimeout(e.timeout),e.timeout=setTimeout(function(){e.close(),e.$anchor.data("hover",!1)},e.options.hoverDelay)}),this.options.hoverPane&&this.$element.off("mouseenter.zf.dropdown mouseleave.zf.dropdown").on("mouseenter.zf.dropdown",function(){clearTimeout(e.timeout)}).on("mouseleave.zf.dropdown",function(){clearTimeout(e.timeout),e.timeout=setTimeout(function(){e.close(),e.$anchor.data("hover",!1)},e.options.hoverDelay)})),this.$anchor.add(this.$element).on("keydown.zf.dropdown",function(n){var i=t(this);Foundation.Keyboard.findFocusable(e.$element);Foundation.Keyboard.handleKey(n,"Dropdown",{open:function(){i.is(e.$anchor)&&(e.open(),e.$element.attr("tabindex",-1).focus(),n.preventDefault())},close:function(){e.close(),e.$anchor.focus()}})})}},{key:"_addBodyHandler",value:function(){var e=t(document.body).not(this.$element),n=this;e.off("click.zf.dropdown").on("click.zf.dropdown",function(t){n.$anchor.is(t.target)||n.$anchor.find(t.target).length||n.$element.find(t.target).length||(n.close(),e.off("click.zf.dropdown"))})}},{key:"open",value:function(){if(this.$element.trigger("closeme.zf.dropdown",this.$element.attr("id")),this.$anchor.addClass("hover").attr({"aria-expanded":!0}),this._setPosition(),this.$element.addClass("is-open").attr({"aria-hidden":!1}),this.options.autoFocus){var t=Foundation.Keyboard.findFocusable(this.$element);t.length&&t.eq(0).focus()}this.options.closeOnClick&&this._addBodyHandler(),this.options.trapFocus&&Foundation.Keyboard.trapFocus(this.$element),this.$element.trigger("show.zf.dropdown",[this.$element])}},{key:"close",value:function(){if(!this.$element.hasClass("is-open"))return!1;if(this.$element.removeClass("is-open").attr({"aria-hidden":!0}),this.$anchor.removeClass("hover").attr("aria-expanded",!1),this.classChanged){var t=this.getPositionClass();t&&this.$element.removeClass(t),this.$element.addClass(this.options.positionClass).css({height:"",width:""}),this.classChanged=!1,this.counter=4,this.usedPositions.length=0}this.$element.trigger("hide.zf.dropdown",[this.$element]),this.options.trapFocus&&Foundation.Keyboard.releaseFocus(this.$element)}},{key:"toggle",value:function(){if(this.$element.hasClass("is-open")){if(this.$anchor.data("hover"))return;this.close()}else this.open()}},{key:"destroy",value:function(){this.$element.off(".zf.trigger").hide(),this.$anchor.off(".zf.dropdown"),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={parentClass:null,hoverDelay:250,hover:!1,hoverPane:!1,vOffset:1,hOffset:1,positionClass:"",trapFocus:!1,autoFocus:!1,closeOnClick:!1},Foundation.plugin(e,"Dropdown")}(jQuery);

/* globals $, Foundation */
var colnavCustom = function() {
  var levels = ['a-colnav-firstLevel', 'a-colnav-secondLevel', 'a-colnav-thirdLevel'];
  var open = [];
  var isSmall = $(window).width() < 992;
  var drilldownLegendDefault = $('.a-js-drilldownLegend').html();
  var movedDuringTouch = false;
  var shifted;
  var savedResults = {};
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
      '/api/' + str,
      '../../../data/' + str + '.json',
      '../../../DesignSystem/data/' + str + '.json',
      'http://altinn-dev.dev.bouvet.no/api/' + str
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
      savedResults[str] = data;
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
    if (savedResults[str]) {
      afterRequest(savedResults[str]);
    } else {
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
    }
  };
  $(document).ready(function() {
    if ($('.a-colnav').length > 0) {
      if (isSmall) {
        $('.a-contentOverview').css('overflow-x', 'hidden');
      }
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

/* globals $ */
var genericSearch = function() {
  var dimensions;
  var dimensionsAliases;
  var dataSource;
  var container;
  var altContainer;
  var base;
  var afterRequest;
  var page = 1;
  var legend;
  var loader;
  var empty;
  var inputBy;
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
  var match = function(arr1, arr2, allowEmpty) {
    var count = 0;
    if (arr2.length === 0 && allowEmpty) {
      return true;
    }
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
        match(selected[dimensions[1]], item[dimensions[1]], true));
    }
    if (selected[dimensions[0]].length > 0) {
      if (selected[dimensions[1]].length === 0) {
        return (
          match(selected[dimensions[0]], item[dimensions[0]])
        );
      }
      return (
        match(selected[dimensions[0]], item[dimensions[0]]) &&
        match(selected[dimensions[1]], item[dimensions[1]], true)
      );
    }
    return (
      match(selected[dimensions[0]], item[dimensions[0]]) ||
      match(selected[dimensions[1]], item[dimensions[1]], true)
    );
  };
  if ($('.a-js-genericSearch').length > 0) {
    if ($('.a-js-expandResults').length > 0) {
      $('.a-js-results').addClass('a-js-forceHidden');
      $('.a-js-alternativeResults').addClass('a-js-forceHidden');
      $('.a-js-moreResults').addClass('a-js-forceHidden');
      $('.a-js-expandResults').attr('disabled', 'disabled');
      $('.a-js-expandResults').on('click', function() {
        $('.a-collapse-title').not('.collapsed').click();
        $('.a-js-results').removeClass('a-js-forceHidden');
        $('.a-js-alternativeResults').removeClass('a-js-forceHidden');
        $('.a-js-moreResults').removeClass('a-js-forceHidden');
        $('.a-js-expandResults').hide();
        $('body').scrollTop($('.a-js-filterDim1').offset().top - 12);
      });
    }
    $('.a-js-none').show().prev().hide();
    inputBy = $('.a-js-genericSearch').find('input[type=search]').length > 0 ? 'search' : 'filter';
    container = inputBy === 'search' ?
      $('.a-js-genericSearch').find('.a-list') : $('.a-js-genericSearch').next().find('.a-js-results');
    altContainer = inputBy === 'search' ?
      null : $('.a-js-genericSearch').next().find('.a-js-alternativeResults');
    container.find('li:gt(0)').remove();
    container.find('.a-js-result:gt(0)').remove();
    base = container.html();
    container.html('');
    legend = inputBy === 'search' ?
      $('.a-js-genericSearch').find('.a-legend') :
      $('.a-js-genericSearch').next().find('.a-legend');
    loader = inputBy === 'search' ?
      $('.a-js-genericSearch').find('.a-loader') :
      $('.a-js-genericSearch').next().find('.a-loader');
    empty = inputBy === 'search' ?
      $('.a-js-genericSearch').find('.a-js-noResults') :
      $('.a-js-genericSearch').next().find('.a-js-noResults');
    loader.hide();
    empty.hide();
    legend.hide();
    if (altContainer) {
      altContainer.html('');
    }
    dataSource = $('.a-js-genericSearch').attr('data-source').split(',');
    afterRequest = function(data, paginating) {
      var lastKeypress;
      var iterate;
      var count = 0;
      var mappedKeys = {};
      var aboveCount;
      var belowCount;
      var newList;
      if (inputBy === 'filter') {
        newList = data.SubsidiesList.sort(dynamicSort('SubsidyName'));
      }
      loader.hide();
      $('.a-js-genericSearch').next().find('.a-card-filter').show();
      container.show();
      if (altContainer) {
        altContainer.show();
      }
      if (inputBy === 'search') {
        loader.hide();
        $('.a-js-genericSearch').find('form').on('keyup keypress', function(e) {
          var keyCode = e.keyCode || e.which;
          if (keyCode === 13) {
            e.preventDefault();
            return false;
          }
          return true;
        });
        $('.a-js-genericSearch').find('form').find('input[type=search]')
          .on('keypress', function() {
            lastKeypress = new Date().getTime();
            iterate = true;
            loader.show();
            legend.hide();
            empty.hide();
            container.html('');
          }
        );
        setInterval(function() {
          var value = $('.a-js-genericSearch').find('form').find('input[type=search]')
            .val();
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
        aboveCount = 0;
        belowCount = 0;
        page += 1;
        container.find('.a-js-result').hide();
        altContainer.find('.a-js-result').hide();
        newList.filter(grinder).forEach(function(item, index) {
          $('#' + item.id)[index < 20 * page ? 'show' : 'hide']();
          if (item.isAbove) {
            aboveCount += 1;
            $('#' + item.altId)[aboveCount < 20 * page ? 'show' : 'hide']();
          }
        });
        newList.filter(grinder).forEach(function(item, index) {
          if (item.isBelow) {
            belowCount += 1;
            $('#' + item.altId)[
              aboveCount < (20 * page) && belowCount < ((20 * page) - aboveCount) ? 'show' : 'hide'
            ]();
          }
        });
        setTimeout(function() {
          $('.a-js-extraHeading')[
            $('.a-js-underneath').is(':visible') ? 'show' : 'hide']();
        }, 1);
        container.next().next()[newList.filter(grinder).length < 20 * page ? 'hide' : 'show']();
        if (selected[dimensions[1]].length > 0) {
          container.hide();
          altContainer.show();
        } else {
          container.show();
          altContainer.hide();
        }
      } else {
        dimensions = $('.a-js-genericSearch').attr('data-dimensions').split(',');
        dimensionsAliases = $('.a-js-genericSearch').attr('data-dimensionsaliases').split(',');
        selected[dimensions[0]] = [];
        selected[dimensions[1]] = [];
        $('.a-js-genericSearch').attr('data-mappedkeys').split(',').forEach(function(pair) {
          mappedKeys[pair.split('=')[0]] = pair.split('=')[1];
        });
        container.next().next().on('click', function() {
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
        altContainer.append('<span class="a-js-top"></span>');
        altContainer.append(altContainer.attr('data-extraresultsheading'));
        altContainer.append('<span class="a-js-bottom"></span>');
        newList.forEach(function(item, index) {
          newList[index].id = 'result-' + index;
          newList[index].altId = 'altResult-' + index;
          container.append(
            base.replace('%NAME%', item[mappedKeys.NAME]).replace(/%URL%/g, item[mappedKeys.URL])
              .replace('%DESC%', item[mappedKeys.DESC] || 'Ingen beskrivelse.')
              .replace('%IDENTIFIER%', 'result-' + index)
              .replace('a-linkArticle', 'a-linkArticle a-js-result'));
          if (item.Industries.length !== 0) {
            newList[index].isAbove = true;
            altContainer.find('.a-js-extraHeading').before(
              base.replace('%NAME%', item[mappedKeys.NAME]).replace(/%URL%/g, item[mappedKeys.URL])
                .replace('%DESC%', item[mappedKeys.DESC] || 'Ingen beskrivelse.')
                .replace('%IDENTIFIER%', 'altResult-' + index)
                .replace('a-linkArticle', 'a-linkArticle a-js-result'));
          } else {
            newList[index].isBelow = true;
            altContainer.find('.a-js-bottom').before(
              base.replace('%NAME%', item[mappedKeys.NAME]).replace(/%URL%/g, item[mappedKeys.URL])
                .replace('%DESC%', item[mappedKeys.DESC] || 'Ingen beskrivelse.')
                .replace('%IDENTIFIER%', 'altResult-' + index)
                .replace('a-linkArticle', 'a-linkArticle a-js-result a-js-underneath'));
          }
        });
        container.find('.a-js-result').each(function(index, item) {
          $(this)[index < 20 * page ? 'show' : 'hide']();
        });
        container.next().next().show();
        altContainer.hide();
        $('.a-card-filter').find('input[type=checkbox]').on('change', function() {
          if ($('.a-js-expandResults').length > 0) {
            $('.a-js-expandResults').removeAttr('disabled');
            $('.a-js-results').addClass('a-js-forceHidden');
            $('.a-js-alternativeResults').addClass('a-js-forceHidden');
            $('.a-js-moreResults').addClass('a-js-forceHidden');
            $('.a-js-expandResults').show();
          }
          aboveCount = 0;
          belowCount = 0;
          page = 1;
          $('.a-js-none').show().prev().hide();
          container.find('.a-js-result').hide();
          altContainer.find('.a-js-result').hide();
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
              }
            );
            if ($('.a-js-filterDim' + (index + 1)).find('.a-js-plural')) {
              $('.a-js-filterDim' + (index + 1))
                .find('.a-js-plural')[selected[dimension].length > 1 ? 'show' : 'hide']();
            }
            if ($('.a-js-filterDim' + (index + 1)).find('.a-js-singular')) {
              $('.a-js-filterDim' + (index + 1))
                .find('.a-js-singular')[selected[dimension].length > 1 ? 'hide' : 'show']();
            }
          });
          newList.filter(grinder).forEach(function(item, index) {
            $('#' + item.id)[index < 20 ? 'show' : 'hide']();
            if (item.isAbove) {
              aboveCount += 1;
              $('#' + item.altId)[aboveCount < 20 ? 'show' : 'hide']();
            }
          });
          newList.filter(grinder).forEach(function(item, index) {
            if (item.isBelow) {
              belowCount += 1;
              $('#' + item.altId)[
                aboveCount < 20 && belowCount < (20 - aboveCount) ? 'show' : 'hide']();
            }
          });
          setTimeout(function() {
            $('.a-js-extraHeading')[
              $('.a-js-underneath').is(':visible') ? 'show' : 'hide']();
          }, 1);
          container.next().next()[newList.filter(grinder).length < 20 ? 'hide' : 'show']();
          empty[newList.filter(grinder).length === 0 ? 'show' : 'hide']();
          if (selected[dimensions[1]].length > 0) {
            container.hide();
            altContainer.show();
          } else {
            container.show();
            altContainer.hide();
          }
        });
      }
    };
    $.ajax({ type: 'GET', url: dataSource[0], success: onSuccess, error: onError });
  }
};

$('.a-dropdown-personswitchList').on('click', 'button[data-toggle="collapse"]', function(event) {
  event.preventDefault();
  event.stopPropagation();
  $($(this).data('target')).collapse('toggle');
});

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

/* globals $ */
function setupFormValidation(formId, buttonId) {
  var $submitBtn = $(buttonId);
  var wasSubmitted = false;
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
  var validateBackwards = function(el) {
    if (el.prev().find('.a-js-dropdownToValidate').length > 0) {
      validDropdown(el.prev().find('.a-js-dropdownToValidate'));
      validateBackwards(el.prev());
    } else if (el.prev().hasClass('form-group')) {
      if (el.prev().find('input').length > 0) {
        el.prev().find('input').valid();
      }
      if (el.prev().find('textarea').length > 0) {
        el.prev().find('textarea').valid();
      }
      validateBackwards(el.prev());
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

  $(formId).on('blur input change', '*', function() {
    if ($(formId).validate().checkForm() && validAllDropdowns()) {
      $submitBtn.prop('disabled', false);
      $submitBtn.removeClass('disabled');
    } else {
      $submitBtn.prop('disabled', 'disabled');
      $submitBtn.addClass('disabled');
    }

    if (!wasSubmitted) {
      $(formId).validate().submitted = {};
    }
  });

  $(formId + ' input').on('blur', function() {
    $(this).valid();
    validateBackwards($(this).closest('.form-group'));
  });

  $(formId + ' textarea').on('blur', function() {
    $(this).valid();
    validateBackwards($(this).closest('.form-group'));
  });

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
}

/* globals $ */
var subscribe = function() {
  var validate = function(elem, skipVal) {
    if (skipVal) {
      $(elem).trigger('blur');
      $(elem).trigger('focus');
    } else if (elem[0].hasAttribute('aria-invalid')) {
      if (elem.attr('aria-invalid') === 'true') {
        elem.closest('.a-card').find('button').attr('disabled', 'disabled')
          .addClass('disabled');
      } else {
        elem.closest('.a-card').find('button').removeAttr('disabled')
          .removeClass('disabled');
      }
    } else if (elem.val().length === 0) {
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
        validate($(this), true);
      });
      _this.find('input').on('focus', function() {
        validate($(this));
      });
      _this.find('input').on('blur', function() {
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
  colnavCustom,
  switchForm,
  genericSearch,
  questionnaireInteraction,
  uniformHeight,
  articleAnchors,
  subscribe,
  setupFormValidation,
  autoFootnotes,
  AltinnQuickhelp
*/
window.infoportalInit = function() {
  colnavCustom();
  switchForm();
  genericSearch();
  questionnaireInteraction();
  uniformHeight();
  articleAnchors();
  subscribe();
  setupFormValidation();
  autoFootnotes();
  AltinnQuickhelp.init();
};
window.infoportalInit();
// $(document).foundation();

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

var searchWithAutocomplete = function() {
  $.widget('custom.catcomplete', $.ui.autocomplete, ({
    _create: function() {
      this._super();
      this.widget().menu('option', 'items', '> :not(.a-js-autocomplete-header)');
      $('.ui-helper-hidden-accessible').addClass('sr-only');
    },
    _renderMenu: function(ul, items) {
      var that = this;

      $.each(items, function(index, item) {
        var li = that._renderItemData(ul, item);
        li.attr('role', 'menu');
        li.addClass('a-dotted');
        li.children().first().attr('role', 'button');
      });
      if (items.length === availableTags.length) {
        ul.prepend('<li class=\'a-js-autocomplete-header a-dotted\'>' + title + '</li>');
      } else if (!items[0].isNoResultsLabel) {
        ul.prepend('<li class=\'a-js-autocomplete-header a-dotted\'>' + items.length + ' treff </li>');
      } else {
        $('.ui-autocomplete').children().first().addClass('a-js-autocomplete-header');
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

/* globals
  formatOrgNr,
  cardsToggle,
  onConfirmDeletionClick,
  setupListRowSelect,
  toggleSwitch,
  searchWithAutocomplete,
  truncateBoxButtonNames,
  onFileInputChange
*/
window.portalInit = function() {
  formatOrgNr();
  cardsToggle();
  onConfirmDeletionClick();
  setupListRowSelect();
  toggleSwitch();
  searchWithAutocomplete();
  truncateBoxButtonNames();
  onFileInputChange();
};
window.portalInit();

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

/* globals currentRequest, popoverLocalInit, AltinnModal */
/* globals AltinnModal:true */
AltinnModal = {
  closeModal: function(settings) {
    $('body').removeClass('a-modal-background-error');
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
      });

      $(settings.target).on('shown.bs.modal', function() {
        $(settings.target).removeAttr('aria-hidden');
      });
      popoverLocalInit();

      $(settings.target).on('transitionend', function() {
        $(settings.target).append($('.a-stickyHelp-container'));
      });
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
        'page-index': newPageIndex,
        'is-success': settings.isSuccess,
        'is-error': settings.isError
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
      $('body').removeClass('a-modal-background-error');
      $('body').removeClass('a-modal-background-success');

      current.removeClass('a-current-page').addClass('a-previous-page');
      newPage.removeClass('a-next-page').addClass('a-current-page');
      $(newPage).data().enableDirtyPopover = settings.enableDirtyPopover;

      if (settings.isError) {
        $('body').addClass('a-modal-background-error');
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
          'page-index': newPageIndex,
          'is-success': settings.isSuccess,
          'is-error': settings.isError
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
        $('body').removeClass('a-modal-background-error');
        $('body').removeClass('a-modal-background-success');

        current.removeClass('a-current-page').addClass('a-previous-page');
        newPage.removeClass('a-next-page').addClass('a-current-page');
        $(newPage).data().enableDirtyPopover = settings.enableDirtyPopover;

        if (settings.isError) {
          $('body').addClass('a-modal-background-error');
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
    });
  },

  previousModalPage: function(settings) {
    var current;
    var allPages;
    var previous;
    var pagesToPop;
    var isError;
    var isSuccess;

    if (!settings.pagesToPop) {
      pagesToPop = 1;
    } else {
      pagesToPop = settings.pagesToPop;
    }

    if ($(settings.target + ' .a-current-page').data('page-index') - pagesToPop <= 0) {
      $('body').removeClass('a-modal-background-error');
      $('body').removeClass('a-modal-background-success');
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
  }
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
    $(e.target).find('.a-js-popoverIconInitial').hide();
    $(e.target).find('.a-js-popoverIconExpanded').show();
    // $(e.target).find('i').eq(0).hide();
    // $(e.target).find('i').eq(1).show();
  });

  $('body').on('hidden.bs.popover', '.a-js-togglePopoverIcons', function(e) {
    $(e.target).find('.a-js-popoverIconInitial').show();
    $(e.target).find('.a-js-popoverIconExpanded').hide();
    // $(e.target).find('i').eq(0).show();
    // $(e.target).find('i').eq(1).hide();
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

/* globals
  setupExpandContent
*/
$('.a-collapsePanel-body').on('show.bs.collapse', function() {
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

$('.a-collapsePanel-body').on('hide.bs.collapse', function() {
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
  colnavCustom,
  handleFocus,
  mobileNavigation,
  toggleFilter,
  uniformHeight,
  tooltip,
  initializeDatepicker,
  onboarding,
  nameChecker,
  codeLookup,
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
  popoverGlobalInit,
  setupSelectableCheckbox,
  window,
  setupTruncateLines,
  AltinnModal,
  setupExpandContent,
  AltinnDropdown
 */

window.sharedInit = function() {
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

  setValidatorSettings();
  addListExpandHandler();
  setupOnKeypress();
  handleFocus();
  initializeDatepicker();
  addListSortHandler();
  mobileNavigation();
  toggleFilter();
  tooltip();
  toggleInstant();
  feedbackToggle();
  popoverLocalInit();
  popoverGlobalInit();
  setupSelectableCheckbox();
  setupTruncateLines();
  setupExpandContent();
  AltinnModal.init();
  AltinnDropdown.init();
};

window.sharedInit();
