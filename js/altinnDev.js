var _anchors = function() {
  window.anchors.options.placement = 'left';
  window.anchors.options.class = 'a-sg-anchor';
  window.anchors.add('h3');
  window.anchors.remove('.sg-pattern-example h3');
  window.anchors.remove('.a-page h1');
  window.anchors.remove('.a-page h2');
  window.anchors.remove('.a-page h3');
  window.anchors.remove('.a-page h4');
  window.anchors.remove('.a-page h5');
  window.anchors.remove('.a-page h6');
};

/* globals $ */
var fixPatternLinks = function() {
 if (window.location.pathname.indexOf('DesignSystem') === 1) {
   $('a').each(function() {
     if ($(this).attr('href').indexOf('DesignSystem') === -1) {
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

/* globals $, smoothState */
var goBack = function() {
  var arr = [];
  $('.container').addClass('a-tempAnim');
  Object.keys(smoothState.cache).forEach(function(key, index) {
    arr.push(key);
  });
  delete smoothState.cache[arr[arr.length - 1]];
  arr.splice(-1, 1);
  smoothState.load(arr[arr.length - 1]);
};

/* globals $ */
window.openGitMD = function(target) {
  window.open('https://github.com/Altinn/DesignSystem/edit/master/source' +
    $(target).closest('.sg-pattern').find('.patternLink')
      .attr('href')
      .replace(/\.\.\//g, '')
      .replace('patterns', '/_patterns')
      .replace(/(?:[^/*]*)$/, '')
      .slice(0, -1)
      .replace(/-([0-9]{2})/g, '/$1') + '.md', '_blank'
  );
};

/* globals $ */
var preOpenModals = function() {
  $('#modalExample').addClass('in');
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
      window.smoothState.load('../../patterns/04-sider-80-prosess-00-starte-enk-3/04-sider-80-prosess-00-starte-enk-3.html');
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

/* globals _anchors, hideIntroInSubs, insetVariations, selectAll, toggleTheme, fixPatternLinks,
preOpenModals, prototypingInteractionStarteENK $ */
window.altinnDev = function() {
  _anchors();
  hideIntroInSubs();
  insetVariations();
  selectAll();
  toggleTheme();
  fixPatternLinks();
  preOpenModals();
  prototypingInteractionStarteENK();
};
window.altinnDev();
$('.html-escape').each(function() {
  $(this).text($(this).html());
});
