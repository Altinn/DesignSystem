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

var checkComponentElements = function(elements) {
  var availableProjects = ['altinn', 'brreg', 'altinnett'];
  var project = getSelectedProject();
  if (getSelectedProject() === null) {
    setSelectedProject('altinn');
  }
  $.each(elements, function(index, element) {
    if ($(element).hasAnyProjectStateClass(availableProjects)) {
            // ligger prosjektdef på staten til patternet i md-fila
      if ($(element).hasClass(project)) {   // samsvar mellom valgt theme og staten på patternet
        $(element).toggleProjectComponent(false);
      } else {
        $(element).toggleProjectComponent(true);
      }
    }
  });
};

var removePagesAndTemplatesFromNav = function() {
  var project = getSelectedProject();
  $('a').filter('.sg-acc-handle').show();
  console.log('removePagesAndTemplatesFromNav');
  if (project === 'altinn') {
    $('a').filter(function() {
      return ('.sg-acc-handle' && $(this).text().toLowerCase() === 'maler-brreg');
    }).hide();
    $('a').filter(function() {
      return ('.sg-acc-handle' && $(this).text().toLowerCase() === 'sider-brreg');
    }).hide();
    $('a').filter(function() {
      return ('.sg-acc-handle' && $(this).text().toLowerCase() === 'maler-altinnett');
    }).hide();
    $('a').filter(function() {
      return ('.sg-acc-handle' && $(this).text().toLowerCase() === 'sider-altinnett');
    }).hide();
  } else if (project === 'brreg') {
    $('a').filter(function() {
      return ('.sg-acc-handle' && $(this).text().toLowerCase() === 'maler-infoportal');
    }).hide();
    $('a').filter(function() {
      return ('.sg-acc-handle' && $(this).text().toLowerCase() === 'sider-infoportal');
    }).hide();
    $('a').filter(function() {
      return ('.sg-acc-handle' && $(this).text().toLowerCase() === 'maler-altinnett');
    }).hide();
    $('a').filter(function() {
      return ('.sg-acc-handle' && $(this).text().toLowerCase() === 'sider-altinnett');
    }).hide();
    $('a').filter(function() {
      return ('.sg-acc-handle' && $(this).text().toLowerCase() === 'maler-portal');
    }).hide();
    $('a').filter(function() {
      return ('.sg-acc-handle' && $(this).text().toLowerCase() === 'sider-portal');
    }).hide();
  } else if (project === 'altinnett') {
    $('a').filter(function() {
      return ('.sg-acc-handle' && $(this).text().toLowerCase() === 'maler-brreg');
    }).hide();
    $('a').filter(function() {
      return ('.sg-acc-handle' && $(this).text().toLowerCase() === 'sider-brreg');
    }).hide();
    $('a').filter(function() {
      return ('.sg-acc-handle' && $(this).text().toLowerCase() === 'maler-infoportal');
    }).hide();
    $('a').filter(function() {
      return ('.sg-acc-handle' && $(this).text().toLowerCase() === 'sider-infoportal');
    }).hide();
    $('a').filter(function() {
      return ('.sg-acc-handle' && $(this).text().toLowerCase() === 'maler-portal');
    }).hide();
    $('a').filter(function() {
      return ('.sg-acc-handle' && $(this).text().toLowerCase() === 'sider-portal');
    }).hide();
  }
};

var removeComponentsNotRelevantForProject = function() {
  var allHeaderElements = document.querySelectorAll('.sg-pattern-state');
  var iframeElements = document.querySelector('#sg-viewport').contentDocument.querySelectorAll('.sg-pattern-state');
  checkComponentElements(allHeaderElements);
  checkComponentElements(iframeElements);
  removePagesAndTemplatesFromNav();
};

$('#sg-viewport').load(function() {
  removeComponentsNotRelevantForProject();
});

$(document).ready(function() {
  $('.selLabel').click(function() {
    $('.dropdown').toggleClass('active');
  });

  $('.dropdown-list li').click(function() {
    $('.selLabel').html($(this).html());
    $('.dropdown').removeClass('active');
    window.localStorage.setItem('selected_project', $(this).attr('data-value'));
    console.log('Project selection ' + window.localStorage.getItem('selected_project') + ' saved to localStorage');
    removeComponentsNotRelevantForProject();
  });

  $('.dropdown-list li:first-child').click();
});
