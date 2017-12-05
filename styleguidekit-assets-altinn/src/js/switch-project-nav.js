var $switchClass = '.a-sg-switch-dropdown';
var $switchLabelClass = $switchClass + ' .a-sg-sellabel';
var $viewPortContents = '#sg-viewport';

var resetSwitchLayout = function() {
  var $elementToReset = 'ul.a-sg-switch-dropdown-list';
  var $elementLiToReset = $elementToReset + ' li';
  $($elementLiToReset).each(function() {
    if ($(this).css('display') !== null) {
      $(this).removeAttr('style');
    }
  });
  $($elementToReset).removeClass(window.localStorage.getItem('selected_project'));
  $($elementLiToReset).each(function() {
    if ($(this).css('display') !== null) {
      $(this).removeAttr('style');
    }
  });
  $($elementToReset).removeClass(window.localStorage.getItem('selected_project'));
};

var updateDropdownLayout = function(selectedProject) {
  var switchClass = 'ul.a-sg-switch-dropdown-list';
  switch (selectedProject) {
  case 'altinn':
    $(switchClass + ' li').eq(0).css('display', 'none');
    $(switchClass).addClass('altinn');
    break;
  case 'brreg':
    $(switchClass + ' li').eq(1).css('display', 'none');
    $(switchClass).addClass('brreg');
    break;
  case 'altinnett':
    $(switchClass + ' li').eq(2).css('display', 'none');
    $(switchClass).addClass('altinnett');
    break;
  default:
    break;
  }
};

function getLocalStorageValue(key) {
  return window.localStorage.getItem(key);
}

function setLocalStorageValue(key, value) {
  window.localStorage.setItem(key, value);
}

function getSelectedProject() {
  return getLocalStorageValue('selected_project');
}

function setSelectedProject(value) {
  setLocalStorageValue('selected_project', value);
}

$.fn.toggleProjectComponent = function(hide) {
  if ($(this).is('a')) { // Gjemmer menypunkt
    if (hide === true) {
      $(this).hide();
    } else {
      $(this).show();
    }
  } else if (hide === true) {
    $(this).closest('.sg-pattern').hide(); // Gjemmer div på siden med html
  } else {
    $(this).closest('.sg-pattern').show();
  }
};

$.fn.hasAnyProjectStateClass = function(availableProjects) {
  var i;
  for (i = 0; i < availableProjects.length; i += 1) {
    if ($(this).hasClass(availableProjects[i])) {
      return true;
    }
  }
  return false;
};

function checkAndChangeComponentElements(project, elements) {
  var availableProjects = ['altinn', 'brreg', 'altinnett'];
  if (getSelectedProject() === null) {
    setSelectedProject('altinn');
    $('.display-altinnett').hide();
    $('.display-brreg').hide();
  }

  $.each(elements, function(index, element) {
    // Checks if there is any project theme set on the state of the compoenent
    if ($(element).hasAnyProjectStateClass(availableProjects)) {
      if ($(element).hasClass(project)) {
        // there is set a state that is the same as the choosen theme
        $(element).toggleProjectComponent(false);
      } else {
        $(element).toggleProjectComponent(true);
      }
    }
  });
}

function removePagesAndTemplatesFromNav(project) {
  var $patternTypeLinks = $('li a.sg-nav-menus');
  var projectLinksToHide = [];
  $patternTypeLinks.show();
  switch (project) {
  case 'altinn':
    projectLinksToHide = ['maler-brreg', 'sider-brreg', 'maler-altinnett', 'sider-altinnett'];
    $patternTypeLinks.each(function() {
      if ($.inArray($(this).text().toLowerCase(), projectLinksToHide) !== -1) {
        $(this).hide();
      }
    });
    break;
  case 'brreg':
    projectLinksToHide = ['maler-infoportal', 'sider-infoportal', 'maler-altinnett', 'sider-altinnett', 'maler-portal', 'sider-portal'];
    $patternTypeLinks.each(function() {
      if ($.inArray($(this).text().toLowerCase(), projectLinksToHide) !== -1) {
        $(this).hide();
      }
    });
    break;
  case 'altinnett':
    projectLinksToHide = ['maler-brreg', 'sider-brreg', 'maler-infoportal', 'sider-infoportal', 'maler-portal', 'sider-portal'];
    $patternTypeLinks.each(function() {
      if ($.inArray($(this).text().toLowerCase(), projectLinksToHide) !== -1) {
        $(this).hide();
      }
    });
    break;
  default:
    break;
  }
}

function changeCss(project) {
  <!-- DEFAULT - Hide preloader in iFrame -->
  $($viewPortContents).contents().find('.a-sg-content-preloader').hide();
  switch (project) {
  case 'altinn':
    $($viewPortContents).contents().find('head link[href~=\'../../css/style.dist.brreg.css\']').prop('disabled', true);
    $($viewPortContents).contents().find('head link[href~=\'../../css/style.dist.altinnett.css\']').prop('disabled', true);
    $($viewPortContents).contents().find('head link[href~=\'../../css/style.prototype.altinn.css\']').prop('disabled', false);
    break;
  case 'altinnett':
    $($viewPortContents).contents().find('head link[href~=\'../../css/style.dist.brreg.css\']').prop('disabled', true);
    $($viewPortContents).contents().find('head link[href~=\'../../css/style.dist.altinnett.css\']').prop('disabled', false);
    $($viewPortContents).contents().find('head link[href~=\'../../css/style.prototype.altinn.css\']').prop('disabled', true);
    break;
  case 'brreg':
    $($viewPortContents).contents().find('head link[href~=\'../../css/style.dist.brreg.css\']').prop('disabled', false);
    $($viewPortContents).contents().find('head link[href~=\'../../css/style.dist.altinnett.css\']').prop('disabled', true);
    $($viewPortContents).contents().find('head link[href~=\'../../css/style.prototype.altinn.css\']').prop('disabled', true);
    break;
  default:
    break;
  }
}

function toggleWelcomeText(project) {
  if (project === 'brreg') {
    $($viewPortContents).contents().find('.welcome-panel-altinn').hide();
    $($viewPortContents).contents().find('.welcome-panel-brreg').show();
  } else {
    $($viewPortContents).contents().find('.welcome-panel-brreg').hide();
    $($viewPortContents).contents().find('.welcome-panel-altinn').show();
  }
}

function changeContentNotRelevantForProject() {
  var allHeaderElements = document.querySelectorAll('.sg-pattern-state');
  var iframeElements = document.querySelector('#sg-viewport').contentDocument.querySelectorAll('.sg-pattern-state');
  var project = getSelectedProject();
  checkAndChangeComponentElements(project, allHeaderElements);
  checkAndChangeComponentElements(project, iframeElements);
  removePagesAndTemplatesFromNav(project);
  changeCss(project);
  toggleWelcomeText(project);
}

function initSwitch() {
  if (getSelectedProject() === null) {
    $($switchClass + '-list li:first-child').click();
  } else {
    $($switchLabelClass).text($($switchClass + '-list li #project-' + getSelectedProject()).text());
    updateDropdownLayout(getSelectedProject());
    changeContentNotRelevantForProject();
  }
}

$('#sg-viewport').load(function() { // iframe
  initSwitch();
});

$(window).on('load', function() {
  var $body = 'body';
  $($body).css({ overflow: 'hidden' });
  $('.a-sg-content-preloader-status:first').fadeOut();
  $('.a-sg-content-preloader:first').delay(350).fadeOut('slow');
  $($body).delay(350).css({ overflow: 'visible' });
});

$(document).ready(function() {
  $($switchLabelClass).click(function() {
    $($switchClass).toggleClass('active');
  });

  $($switchClass + '-list li').click(function() {
    var selected = $(this).attr('data-value');
    resetSwitchLayout();

    $($switchLabelClass).text($(this).text());
    $($switchClass).removeClass('active');
    setLocalStorageValue('selected_project', selected);
    updateDropdownLayout(selected);
    changeContentNotRelevantForProject();
  });

  initSwitch();
});
