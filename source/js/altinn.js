/*!
 * TOGGLE elements with the same parent + add "open"-class
 */
; (function ($, undefined) {
    $(function () {
        $('.js-toggle').click(function () {
            var self = $(this);
            if (self.hasClass('open')) {
                self.parent().find('.js-hide').slideUp(300);
                self.removeClass('open'); 
            } else {
                self.addClass('open');
                self.parent().find('.js-hide').slideDown(300);
            }
            return false;
        })
    });
}(jQuery));  

/*!
 * Show textarea for writing a message 
 */
; (function ($, undefined) {
    function showMaxLengthExceededWarning($textarea, $warning, $submit_btn){
        var max_message_length = 500;
        var max_message_length_string = "Maksimum tekstlengde er overskredet med {chars} tegn.";

        $textarea.on("keyup blur focus", function(){
            $submit_btn.removeClass("disabled");
            $warning.css("display", "none");
            var charsLeft = max_message_length - $textarea.val().length;
            if(charsLeft === max_message_length || charsLeft < 0){
                $submit_btn.addClass("disabled");
            }
            if(charsLeft < 0){
                $warning.text(max_message_length_string.replace("{chars}", Math.abs(charsLeft)));
                $warning.css("display", "block");
            }
        });
        $submit_btn.addClass("disabled");
    }

    $(".sk-unit-message-click").click(function(){
        var $container = $(this).parent();
        $container.find(".sk-unit-message-input, .sk-unit-post-message").show();
        var $textarea = $container.find(".sk-unit-message-input textarea");
        var $warning = $container.find(".sk-unit-message-warning");
        var $submit_btn = $container.find(".sk-unit-message-input a.sk-btn");
        showMaxLengthExceededWarning($textarea, $warning, $submit_btn);
        $textarea.focus();
    });

    $.each($(".sk-unit-message-write-reply textarea"), function(){
        var $container = $(this).parent();
        var $warning = $container.find(".sk-unit-message-warning");
        var $submit_btn = $container.find("a.sk-btn");
        showMaxLengthExceededWarning($(this), $warning, $submit_btn);
    });
}(jQuery));  


/*!
 * Toggle replys 
 */
; (function ($, undefined) {

    $.each($(".sk-toggle-replys"), function(){
        $(this).click(function() {
            var $toggle = $(this).closest("ul").find(".sk-hide-replys"); 
            if($toggle.css("display") == "none"){
              $toggle.css("display", "table"); 
            } else {
              $toggle.css("display", "none");
            }
        });
    });

}(jQuery));  

/*!
* TOGGLE topnav-elements and hide the others
*/
; (function ($, undefined) {
    function openExpandable($element){ 
        var expandable = "";
        if($element.hasClass("sk-toggle-teamsites")){
            expandable = ".sk-top-teamsites";
        } 
        else if($element.hasClass("sk-toggle-faves")){
            expandable = ".sk-top-faves";  
        }
        else if($element.hasClass("sk-toggle-search")){
            expandable = ".sk-top-search";  
        }
        else if($element.hasClass("sk-toggle-nav")){
            expandable = ".sk-top-nav";   
        }
        $element.addClass('open');
        if(expandable !== ""){
            $(expandable+".sk-expandable").toggle();
        }
    }

    function closeExpandable($element){
       $(".sk-expandable:visible").toggle();
        $element.removeClass('open'); 
    }

    function addClickOutsideExpandableEvent(){
        $(document).mouseup(function (e){
            if(!$(e.target).hasClass("sk-toggle-expandable open")){
                var $openExpandable = $(".sk-expandable:visible");
                if (!$openExpandable.is(e.target) 
                    && $openExpandable.has(e.target).length === 0)
                {
                    closeExpandable($(".sk-toggle-expandable.open"));
                }
            }
        });
    }

    $(function () {
        addClickOutsideExpandableEvent();
        $('.sk-toggle-expandable').click(function () {
            var self = $(this);
            if (self.hasClass('open')) {
                closeExpandable(self);        
            } else {
                closeExpandable($(".sk-toggle-expandable.open"));
                openExpandable(self);
            }
            return false;
        })

    });

}(jQuery));  

 

// Move HTML for Topbar, so the menu is placed in the right spot for mobile view
; (function ($, undefined) {

    function positionSkTopNav(){
      var $skTopNav = $("#sk-top-nav");
      var $skTopNavParent = $("#sk-top-nav").parent();
      if($(window).width() <= 768){
        $skTopNav.appendTo($skTopNavParent);
      } else {
        $skTopNav.prependTo($skTopNavParent);
      }
    }

    $(function () {
        $(window).resize(function() {
            positionSkTopNav();
        });
        positionSkTopNav();
    });

}(jQuery));  



// Add dim class to panels

; (function ($, undefined) {
    $(function () {
        
        $('.index-heading').click(function () {
           if ($(this).hasClass('expanded')) {
               $(this).removeClass('expanded');
               if ($('.panel-heading.expanded').length === 0) {
                   $('.panel-heading').removeClass('dim');
               }
               else {
                   $(this).addClass('dim')
               }
           } else {
               $('.panel-heading').removeClass('expanded');
               $(this).addClass('expanded');
               $('.panel-heading').addClass('dim');
               $('.panel-heading.expanded').removeClass('dim');
           }
       });
    });
}(jQuery));  


// INPUT Focus style
// If state on input is "focus", add class to a-input : "a-input-focus"


; (function ($, undefined) {
    $(function () {
        
        $("input.form-control").focus(function(){
        $(this).parent().addClass("a-input-focus");

        }).blur(function(){
               $(this).parent().removeClass("a-input-focus");
        })
    });
}(jQuery));  



// TOOLTIP AND POPOVERS

; (function ($, undefined) {
    $(function () {

      $('[data-toggle="tooltip"]').tooltip();

      $('[data-toggle="popover"]').popover(); 

      $('#example').popover(options);

    })
}(jQuery));  
 







