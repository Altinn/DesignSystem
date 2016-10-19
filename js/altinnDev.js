var _anchors = function() {
  window.anchors.options.placement = 'left';
  window.anchors.options.class = 'a-sg-anchor';
  window.anchors.add('h3');
  window.anchors.remove('.sg-pattern-example h3');
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
      $('body', $('iframe').contents()[0]).attr('class', className);
      localStorage.setItem('theme', className);
      $('body', '.ap-profile').attr('class', '');
    };
    $('#sg-switchtheme-blue', $('iframe').contents()[0]).off('change');
    $('#sg-switchtheme-grey', $('iframe').contents()[0]).off('change');
    $('#sg-switchtheme-white', $('iframe').contents()[0]).off('change');

    if (localStorage.getItem('theme') &&
      localStorage.getItem('theme') === 'business') {
      $('body', $('iframe').contents()[0]).attr('class', 'business');
      $('#sg-switchtheme-blue', $('iframe').contents()[0]).prop('checked', true);
    } else if (localStorage.getItem('theme') &&
      localStorage.getItem('theme') === 'private-person') {
      $('body', $('iframe').contents()[0]).attr('class', 'private-person');
      $('#sg-switchtheme-grey', $('iframe').contents()[0]).prop('checked', true);
    } else {
      $('body', $('iframe').contents()[0]).attr('class', 'neutral');
      $('#sg-switchtheme-white', $('iframe').contents()[0])
        .prop('checked', true);
    }
    $('#sg-switchtheme-blue', $('iframe').contents()[0]).on('change',
      function() {
        toggleStuff('business');
      });
    $('#sg-switchtheme-grey', $('iframe').contents()[0]).on('change',
      function() {
        toggleStuff('private-person');
      });
    $('#sg-switchtheme-white', $('iframe').contents()[0]).on('change',
      function() {
        toggleStuff('neutral');
      });
    $('body', '.ap-profile').attr('class', '');
  });
};

/* globals _anchors, hideIntroInSubs, insetVariations, selectAll, toggleTheme, preOpenModals */
window.altinnDev = function() {
  _anchors(); hideIntroInSubs(); insetVariations(); selectAll(); toggleTheme();
  preOpenModals();
};
window.altinnDev();
