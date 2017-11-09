var resetSwitchLayout = function() {
  $('ul.dropdown-list li').each(function() {
    if ($(this).css('display') !== null) {
      $(this).removeAttr('style');
    }
  });
  $('ul.dropdown-list').removeClass(window.localStorage.getItem('selected_project'));
  $('ul.switch-dropdown-list li').each(function() {
    if ($(this).css('display') !== null) {
      $(this).removeAttr('style');
    }
  });
  $('ul.switch-dropdown-list').removeClass(window.localStorage.getItem('selected_project'));
};

var updateDropdownLayout = function(selectedProject) {
  var switchClass = 'ul.switch-dropdown-list';
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
  if ($(this).is('a')) {     // Gjemmer menypunkt
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
  var $patternTypeLinks = $('li a.sg-acc-handle');
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
  case 'altinnett' :
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
  var $viewPortContents = $('#sg-viewport').contents();
  var $viewPortContentsHead = $viewPortContents.find('head link[rel=\'stylesheet\']');
  switch (project) {
  case 'altinnett':
    $viewPortContentsHead.last().after('<link rel=\'stylesheet\' href=\'/css/style.dist.altinnett.css\' type=\'text/css\' media=\'screen\'>');
    $viewPortContents.find('head link[href~=\'/css/style.dist.brreg.css\']').remove();
    break;
  case 'brreg':
    $viewPortContentsHead.last().after('<link rel=\'stylesheet\' href=\'/css/style.dist.brreg.css\' type=\'text/css\' media=\'screen\'>');
    $viewPortContents.contents().find('head link[href~=\'/css/style.dist.altinnett.css\']').remove();
    break;
  default:
    $viewPortContents.find('head link[href~=\'/css/style.dist.altinnett.css\']').remove();
    $viewPortContents.find('head link[href~=\'/css/style.dist.brreg.css\']').remove();
    break;
  }
}

function toggleWelcomeText(project) {
  var $viewPortContents = $('#sg-viewport').contents();
  if (project === 'brreg') {
    $viewPortContents.find('.welcome-panel-brreg').show();
    $viewPortContents.find('.welcome-panel-altinn').hide();
  } else {
    $viewPortContents.find('.welcome-panel-brreg').hide();
    $viewPortContents.find('.welcome-panel-altinn').show();
  }
}

function changeContentNotRelevantForProject() {
  var allHeaderElements = document.querySelectorAll('.sg-pattern-state');
  var iframeElements = document.querySelector('#sg-viewport').contentDocument.querySelectorAll('.sg-pattern-state');
  var project = getSelectedProject();
  if (getSelectedProject() === null) {
    setSelectedProject('altinn');
  }
  checkAndChangeComponentElements(project, allHeaderElements);
  checkAndChangeComponentElements(project, iframeElements);
  removePagesAndTemplatesFromNav(project);
  changeCss(project);
  toggleWelcomeText(project);
}

$('#sg-viewport').load(function() {   // iframe
  changeContentNotRelevantForProject();
});

$(document).ready(function() {
  var switchClass = '.switch-dropdown';
  $('.selLabel').click(function() {
    $('.switch-dropdown').toggleClass('active');
  });

  $(switchClass + '-list li').click(function() {
    var selected = $(this).attr('data-value');
    resetSwitchLayout();

    $(switchClass + ' .selLabel').text($(this).text());
    $(switchClass).removeClass('active');
    setLocalStorageValue('selected_project', selected);
    updateDropdownLayout(selected);
    changeContentNotRelevantForProject();
  });
  if (getSelectedProject() === null) {
    $(switchClass + '-list li:first-child').click();
  } else {
    $(switchClass + ' .selLabel').text($(switchClass + '-list li #project-' + getSelectedProject()).text());
    updateDropdownLayout(getSelectedProject());
  }
});

