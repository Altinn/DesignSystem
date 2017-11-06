/* globals $ */

/**
 * * * * * * * * * * * * * * * * * * * * *
 * Style Guide specific JavaScript CUSTOM
 * * * * * * * * * * * * * * * * * * * * *
 */

 /*
 * Get text from chosen theme
 */

 $(document).ready(function(){
   var str = $( '.a-dropdown-toggle #a-js-chosenTheme' ).text();
   $( '#a-js-showChosenTheme' ).html( str );
   console.log('Station 1 var str == ' + str);
 });


 /*
 * SWITCH BETWEEN PROJECTS
 */
 var that = this;
 $('body').on('click', '[data-toggle="altinn-dropdown"] .a-dropdown-item', function() {
 	var $dropdownElement = $(this).closest('[data-toggle="altinn-dropdown"]');
 	if ($(this).data('value')) {
 		$dropdownElement.find('.a-js-altinnDropdown-value').val($(this).data('value'));
 	}

 	$dropdownElement.find('.a-dropdown-toggle').html($(this).html());
 });

 /*
 * VIEW CORRECT NAV BASED ON CHOSEN PROJECT
 */

 $(".display-altinnett").hide();
 $(".display-brreg").hide();

 if (window.localStorage.getItem('persisted_style') === null) {
   window.localStorage.setItem('persisted_style', '1');
 }
 if (window.localStorage.getItem('persisted_html') === null) {
   window.localStorage.setItem('persisted_html', $('[data-toggle=\'altinn-dropdown\']').find('.dropdown-item').eq(0).html());
 }
 $('[data-toggle="altinn-dropdown"]').find('.a-js-altinnDropdown-value')
   .val(window.localStorage.getItem('persisted_style'));
 $('[data-toggle="altinn-dropdown"]').find('.a-dropdown-toggle')
   .html(window.localStorage.getItem('persisted_html'));
 switch (window.localStorage.getItem('persisted_style')) {
   case '1':
     $('.display-altinnett').hide();
     $('.display-brreg').hide();
     $('.display-altinn').show();
     $('link[rel=stylesheet][href~=\'/designsystem-styleguide/css/altinnett.css\']').remove();
     $('link[rel=stylesheet][href~=\'/designsystem-styleguide/css/brreg.css\']').remove();
     break;
   case '2':
     $('.display-altinnett').show();
     $('.display-altinn').hide();
     $('.display-brreg').hide();
     $('head link[rel=\'stylesheet\']').last()
       .after('<link rel=\'stylesheet\' href=\'/designsystem-styleguide/css/altinnett.css\' type=\'text/css\' media=\'screen\'>');
     $('link[rel=stylesheet][href~=\'/designsystem-styleguide/css/brreg.css\']').remove();
     break;
   case '3':
     $('.display-altinn').hide();
     $('.display-altinnett').hide();
     $('.display-brreg').show();
     $('head link[rel=\'stylesheet\']').last()
       .after('<link rel=\'stylesheet\' href=\'/designsystem-styleguide/css/brreg.css\' type=\'text/css\' media=\'screen\'>');
     $('link[rel=stylesheet][href~=\'/designsystem-styleguide/css/altinnett.css\']').remove();
     break;
 }

 $("[data-toggle='altinn-dropdown']").find(".dropdown-item").on("click", function() {
  window.localStorage.setItem('persisted_style', $(this).attr("data-value"));
  window.localStorage.setItem('persisted_html', $(this).html());
  switch($(this).attr("data-value")) {
    case "1":
      $(".display-altinnett").hide();
      $(".display-brreg").hide();
      $(".display-altinn").show();
      $('link[rel=stylesheet][href~="/designsystem-styleguide/css/altinnett.css"]').remove();
      $('link[rel=stylesheet][href~="/designsystem-styleguide/css/brreg.css"]').remove();
      $($('.iffframe').find('iframe')[0].contentWindow.document.getElementsByTagName('head')[0])
       .find('link[rel=stylesheet][href~=\'/designsystem-styleguide/css/altinnett.css\']').remove();
      $($('.iffframe').find('iframe')[0].contentWindow.document.getElementsByTagName('head')[0])
       .find('link[rel=stylesheet][href~=\'/designsystem-styleguide/css/brreg.css\']').remove();
      break;
    case "2":
      $(".display-altinnett").show();
      $(".display-altinn").hide();
      $(".display-brreg").hide();
      $("head link[rel='stylesheet']").last().after("<link rel='stylesheet' href='/designsystem-styleguide/css/altinnett.css' type='text/css' media='screen'>");
      $('link[rel=stylesheet][href~="/designsystem-styleguide/css/brreg.css"]').remove();
      var e = document.createElement('link');
      e.rel = 'stylesheet';
      e.type = 'text/css';
      e.href = '/designsystem-styleguide/css/altinnett.css';
      $($('.iffframe').find('iframe')[0].contentWindow.document.getElementsByTagName('head')[0])
       .find('link[rel=stylesheet][href~=\'/designsystem-styleguide/css/brreg.css\']').remove();
      $('.iffframe').find('iframe')[0].contentWindow.document.getElementsByTagName('head')[0].appendChild(e2);
      break;
    case "3":
      $(".display-altinn").hide();
      $(".display-altinnett").hide();
      $(".display-brreg").show();
      $("head link[rel='stylesheet']").last().after("<link rel='stylesheet' href='/designsystem-styleguide/css/brreg.css' type='text/css' media='screen'>");
      $('link[rel=stylesheet][href~="/designsystem-styleguide/css/altinnett.css"]').remove();
      var e = document.createElement('link');
      e.rel = 'stylesheet';
      e.type = 'text/css';
      e.href = '/designsystem-styleguide/css/brreg.css';
      $($('.iffframe').find('iframe')[0].contentWindow.document.getElementsByTagName('head')[0])
       .find('link[rel=stylesheet][href~=\'/designsystem-styleguide/css/altinnett.css\']').remove();
      $('.iffframe').find('iframe')[0].contentWindow.document.getElementsByTagName('head')[0].appendChild(e3);
      break;
  }
});


 /*!
 * TOGGLE navbar
 	+ hide the others
 	+ close when clicking outside of navbar
 */
(function ($, undefined) {
    $(window).resize(function() {
         // This will fire each time the window is resized:
         if($(window).width() < 768) {
             // if larger or equal

             $('body .a-st-overlay').animate({
         			opacity: "0"
         		}, 200, function(){
         			$('body .a-st-overlay').remove();
         		});

             $(".a-st-expandable:visible").animate({
         			left: "-300px"
         		}, 200, function() {
         		});

             $(".a-st-toggleNavbar:visible").animate({
         			left: "0px"

         		}, 200, function() {
         		});
             $(".a-st-toggleNavbar").removeClass('open');
         } else {
           $(".a-st-expandable").animate({
     				left: "0"
     			}, 200, function() {
     				// Animation complete.
     			});
           $(".a-st-toggleNavbar").animate({
     				left: "280px"
     			}, 200, function() {
     				// Animation complete.
     			});
           $(".a-st-toggleNavbar").addClass('open');
         }
     }).resize(); // This will simulate a resize to trigger the initial run.

 	function openExpandable($element){
 		var expandable = "";

 		if($element.hasClass("a-st-toggleNavbar")){
 			expandable = ".a-st-navbar";
 		}

 		$element.addClass('open');

 		$('<div class="a-st-overlay"></div>').appendTo('body');

 		$('body .a-st-overlay').animate({
 			opacity: "0.6"
 		}, 200, function(){

 		});

 		if(expandable !== ""){
 			$(expandable+".a-st-expandable").animate({
 				left: "0"
 			}, 200, function() {
 				// Animation complete.
 			});
       $(".a-st-toggleNavbar").animate({
 				left: "280px"
 			}, 200, function() {
 				// Animation complete.
 			});
 		}
 	}

 	function closeExpandable($element){
 		$('body .a-st-overlay').animate({
 			opacity: "0"
 		}, 200, function(){
 			$('body .a-st-overlay').remove();
 		});

 	  $(".a-st-expandable:visible").animate({
 			left: "-300px"

 		}, 200, function() {

 		});

     $(".a-st-toggleNavbar:visible").animate({
 			left: "0px"

 		}, 200, function() {

 		});

 		$element.removeClass('open');
 	}

 	function addClickOutsideExpandableEvent(){
 		$(document).mouseup(function (e){
 			if(!$(e.target).hasClass("a-st-toggleNavbar-expandable open")){
 				var $openExpandable = $(".a-st-expandable:visible");
 				var testClass = $(e.target).hasClass('.a-st-overlay');

 				if(testClass == true){
 					closeExpandable($("header .a-st-toggleNavbar-expandable.open"));
           $(".a-st-toggleNavbar").removeClass('open');
 				}
 			}

 			if($(e.target).hasClass('a-st-overlay') || $(e.target).hasClass('icon-cancel')){
 				closeExpandable($("header .a-st-toggleNavbar-expandable.open"));
         $(".a-st-toggleNavbar").removeClass('open');
 			}
 		});
 	}

 	$(function () {
 		addClickOutsideExpandableEvent();
 		$('.a-st-toggleNavbar-expandable').click(function () {
 			var self = $(this);

 			if (self.hasClass('open')) {
 				closeExpandable(self);
 			} else {
 				closeExpandable($("header .a-st-toggleNavbar-expandable.open"));
 				openExpandable(self);
 			}
 			return false;
 		});

 	});

 }(jQuery));
