$('button.a-personSwitcher').on('click', function() {
  if ($('button.navbar-toggler').attr('data-jsexpanded') === 'true') {
    event.preventDefault();
    event.stopPropagation();
    $('button.navbar-toggler').trigger('click');
  }
})

$('.a-dropdown-personswitchList').on('click', 'button[data-toggle="collapse"]', function(event) {
  event.preventDefault();
  event.stopPropagation();
  $($(this).data('target')).collapse('toggle');
});

// For setting the background-color when favorite star is hovered
$('.a-listWithSubLevels').children().hover(function(){
  if (!$(this).parent().find('button.a-btn-shadow-large').is(':disabled') && ($(this).is('.a-favourite') || $(this).is('.a-btn-shadow-large')) ){
    $(this).parent().find('button.a-btn-shadow-large').css('background', '#CFF0FF');
    $(this).parent().find('button.a-btn-shadow-large.a-bgGreyLight').css('background', '#E2E2E2');
  }}, 
  function(){
    if (!$(this).parent().find('button.a-btn-shadow-large').is(':disabled') && ($(this).is('.a-favourite') || $(this).is('.a-btn-shadow-large'))){
      $(this).parent().find('button.a-btn-shadow-large').css('background', '#E3F7FF');
      $(this).parent().find('button.a-btn-shadow-large.a-bgGreyLight').css('background', '#EFEFEF');
    }
  });

// Select the node that will be observed for mutations
var targetNode = document.getElementsByClassName('navbar-toggler')[0];

// Options for the observer (which mutations to observe)
var config = { attributes: true, childList: true };

// Callback function to execute when mutations are observed
var callback = function(mutationsList) {
    for(var mutation of mutationsList) {
		  if ($(mutation.target).attr('data-jsexpanded') === 'false') {
        $('.a-login-container').css('display', '');
      }
      else {
        $('.a-login-container').css('display', 'none');
      }
    }
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);