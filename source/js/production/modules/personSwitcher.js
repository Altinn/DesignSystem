$('.a-dropdown-personswitchList').on('click', 'button[data-toggle="collapse"]', function(event) {
  event.preventDefault();
  event.stopPropagation();
  $($(this).data('target')).collapse('toggle');
});

// For setting the background-color when favorite star is hovered
$('.a-listWithSubLevels').children().hover(function(){
  if(!$(this).parent().find("button.a-btn-shadow-large").is(':disabled') && ($(this).is('.a-favourite') || $(this).is('.a-btn-shadow-large')) ){
    $(this).parent().find("button.a-btn-shadow-large").css("background", "#CFF0FF");
    $(this).parent().find("button.a-btn-shadow-large.a-bgGreyLight").css("background", "#E2E2E2");
  }}, 
  function(){
    if(!$(this).parent().find("button.a-btn-shadow-large").is(':disabled') && ($(this).is('.a-favourite') || $(this).is('.a-btn-shadow-large'))){
      $(this).parent().find("button.a-btn-shadow-large").css("background", "#E3F7FF");
      $(this).parent().find("button.a-btn-shadow-large.a-bgGreyLight").css("background", "#EFEFEF");
  }});
