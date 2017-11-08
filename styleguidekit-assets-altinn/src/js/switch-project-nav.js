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

var removeComponentsNotRelevantForProject = function() {
  var allHeaderElements = document.querySelectorAll('.sg-pattern-state');
  var iframeElements = document.querySelector('#sg-viewport').contentDocument.querySelectorAll('.sg-pattern-state');
  checkComponentElements(allHeaderElements);
  checkComponentElements(iframeElements);
};

$('#sg-viewport').load(function() {
    removeComponentsNotRelevantForProject();
});

$(document).ready(function() {
  $('.selLabel').click(function() {
    $('.dropdown').toggleClass('active');
  });

  $('.dropdown-list li').click(function() {
      
      resetSwitchLayout();
      
      $('.selLabel').html($(this).html());
      $('.dropdown').removeClass('active');
      
      var selected  =  $(this).attr('data-value');
      window.localStorage.setItem('selected_project', selected);
      console.log('Project selection ' + window.localStorage.getItem('selected_project') + ' saved to localStorage');
      
      updateSwitchLayout(selected);
      
      removeComponentsNotRelevantForProject();
  });

  $('.dropdown-list li:first-child').click();
});

var resetSwitchLayout = function() {
    console.log('Resetting switch layout ...');
    $('ul.dropdown-list li').each(function (){
        if ($(this).css('display') !== null){
            $(this).removeAttr('style');
        }
    });
    $('ul.dropdown-list').removeClass(window.localStorage.getItem('selected_project'));
};

var updateSwitchLayout = function(selectedProject) {
    console.log('Updating project project switch based on ' + selectedProject + ' option ...');

    switch (selectedProject){
        case 'altinn':
            console.log('Processing option altinn');
            $('ul.dropdown-list li').eq(0).css('display', 'none');
            $('ul.dropdown-list').addClass('altinn');
            break;
        case 'brreg':
            console.log('option brreg');

            $('ul.dropdown-list li').eq(1).css('display', 'none');
            $('ul.dropdown-list').addClass('brreg');
            break;
        case 'altinnett':
            console.log('option altinnett');
            $('ul.dropdown-list li').eq(2).css('display', 'none');
            $('ul.dropdown-list').addClass('altinnett');
            break;
        default:
            console.error('Selected project [' + selectedProject + '] not found');
            break;
    }
};


