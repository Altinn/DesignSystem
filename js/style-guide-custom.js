/* globals $ */

/**
 * * * * * * * * * * * * * * * * * * * * *
 * Style Guide specific JavaScript CUSTOM
 * * * * * * * * * * * * * * * * * * * * *
 */

function getLocalStorageValue(key) {
	return window.localStorage.getItem(key);
}
function setLocalStorageValue(key, value) {
	window.localStorage.setItem(key, value);
}

function getPersistedStyle() {
  return getLocalStorageValue('persisted_style');
}

function setPersistedStyle(value) {
  setLocalStorageValue('persisted_style', value);
}

function getPersistedHtml() {
  return getLocalStorageValue('persisted_html');
}

function setPersistedHtml(value) {
  setLocalStorageValue('persisted_html', value);
}

/*
* LIVE SEARCH IN COMPONENTS
*/

jQuery(document).ready(function($) {
  $('.live-search-list li.c-lined-list__item').each(function(){
      $(this).attr('data-search-term', $(this).text().toLowerCase());
  });
   $('.live-search-box').on('keyup', function(){
     var searchTerm = $(this).val().toLowerCase();
     var hit = false;
     $('.no-results-element').hide(); // this element should have the text “Ingen treff”
     $('.live-search-list li.c-lined-list__item').each(function(){
         if ($(this).filter('[data-search-term *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
             $(this).show();
             $('.live-search-title').show();
             hit = true;
         } else {
             $(this).hide();
             $('.live-search-title').hide();
         }
     });
     if (hit === false) {
         $('.no-results-element').show();
     }
 });
});

 /*
 * LIVE SEARCH IN TEMPLATES
 */

jQuery(document).ready(function($) {
   $('.live-search-list li').each(function(){
       $(this).attr('data-search-term', $(this).text().toLowerCase());
   });
    $('.live-search-box').on('keyup', function(){
      var searchTerm = $(this).val().toLowerCase();
      var hit = false;
      $('.no-results-element').hide(); // this element should have the text “Ingen treff”
      $('.live-search-list li').each(function(){
          if ($(this).filter('[data-search-term *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
              $(this).show();
              $('.live-search-title').show();
              hit = true;
          } else {
              $(this).hide();
              $('.live-search-title').hide();
          }
      });
      if (hit === false) {
          $('.no-results-element').show();
      }
  });
});

 /*
 * Get text from chosen theme
 */

 jQuery(document).ready(function($){
   var str = $( '.a-dropdown-toggle #a-js-chosenTheme' ).text();
   $( '#a-js-showChosenTheme' ).html( str );
 });


 /*
 * SWITCH BETWEEN PROJECTS
 */
function setProject(project) {
  var projectCssClassPrefix = 'project-';
  var $body = $('body');
  var i;
  var cssClasses = $body.attr('class').split(' ').filter(function(elem) {
   return elem.indexOf(projectCssClassPrefix) == 0;
  });
  for (i = 0; i < cssClasses.length; i = i+1) {
   $body.removeClass(cssClasses[i]);
  }
	$body.addClass(projectCssClassPrefix + project);
	$('.display-brreg').hide();
	$('.display-altinn').hide();
	$('.display-' + project).show();
}

 $('body').on('click', '[data-toggle="altinn-dropdown"] .a-dropdown-item', function() {
  var $dropdownElement = $(this).closest('[data-toggle="altinn-dropdown"]');
  var project = $(this).data('project');
  setProject(project);
  $dropdownElement.find('.a-dropdown-toggle').html($(this).html());
  setPersistedStyle(project);
  setPersistedHtml($(this).html());
 });

 /*
 * VIEW CORRECT NAV BASED ON CHOSEN PROJECT
 */
if (getPersistedStyle() === null) {
	setPersistedStyle('altinn')
}
if (getPersistedHtml() === null) {
	setPersistedHtml($('[data-toggle=\'altinn-dropdown\']').find('.dropdown-item').eq(0).html())
}
$('[data-toggle="altinn-dropdown"]').find('.a-dropdown-toggle')
	.html(getPersistedHtml())

setProject(getPersistedStyle());

 /*!
 * TOGGLE navbar
 	+ hide the others
 	+ close when clicking outside of navbar
 */
 ;(function ($, undefined) {

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
 		})

 	});

 }(jQuery));
