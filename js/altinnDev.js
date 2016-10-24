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


/* Prototyping that place will be visible after typing in postnumber */
$(document).ready(function() {
    $("#postnummer").keyup(function() {
        if (this.value == "0123") {
            $("#a-js-place").css("display", "inline");
        }
        else {
            $("#a-js-place").css("display", "none");
        }
    });
});

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

/* globals _anchors, hideIntroInSubs, insetVariations, selectAll, toggleTheme,
preOpenModals, $ */
window.altinnDev = function() {
  _anchors();
  hideIntroInSubs();
  insetVariations();
  selectAll();
  toggleTheme();
  preOpenModals();
};
window.altinnDev();
$('.html-escape').each(function() {
  $(this).text($(this).html());
});
window.smoothStateMod = function() {
  $('#smoothState').find('a:not(.sr-only-focusable)').on('click', function(e) {
    if (location.pathname.replace(/\//g, '')
      === $(this).attr('href').replace(/\//g, '').replace(/\.\./g, '')) {
      e.preventDefault(); e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    } else if ($(this).attr('href') !== '#') {
      e.preventDefault(); e.stopPropagation();
      e.stopImmediatePropagation();
      window.smoothState.load($(this).attr('href'));
    }
    return false;
  });
};
$(document).foundation();
window.smoothState = $('#smoothState').smoothState({
  prefetch: true,
  debug: true,
  anchors: 'blink',
  cacheLength: 9,
  onStart: {
    duration: 250,
    render: function($container) {
      $container.addClass('is-exiting');
      window.smoothState.restartCSSAnimations();
      if ($container.find('.a-tempAnim').length > 0) {
        $container.find('.a-scene_element')
          .removeClass('a-scene_element--fadeinright')
          .removeClass('a-scene_element--fadeinleft')
          .addClass('a-scene_element--fadeoutright');
      } else {
        $container.find('.a-scene_element')
          .removeClass('a-scene_element--fadeinright')
          .removeClass('a-scene_element--fadeinleft')
          .addClass('a-scene_element--fadeoutleft');
      }
    }
  },
  onReady: {
    duration: 0,
    render: function($container, $newContent) {
      $container.removeClass('is-exiting');
      $newContent.find('.a-scene_element--fadeinright').hide();
      if ($container.find('.a-tempAnim').length > 0) {
        $newContent.find('.a-scene_element')
          .removeClass('a-scene_element--fadeinright')
          .addClass('a-scene_element--fadeinleft')
          .removeClass('a-tempAnim');
      }
      $container.html($newContent);
    }
  },
  onAfter: function() {
    $(document).foundation();
    window.altinnInit();
    window.altinnDev();
    window.smoothStateMod();
    $('.a-scene_element').show();
  }
}).data('smoothState');
window.smoothStateMod();
