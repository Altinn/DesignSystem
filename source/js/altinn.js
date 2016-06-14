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


/*!
 * COLAPSE "Mobile navigation" + add "open"-class
 */
; (function ($, undefined) {

    $(function () {

        $('.ap-sideNav-mobilebar').click(function () {
            var self = $(this);
            var searchButton = $('.a-toggle-search').hasClass('open');

            if (self.hasClass('open')) {
                $('.ap-sideNav-collapse').slideUp(300);
                self.removeClass('open');
            } else {
                if (searchButton === true) {
                    $('.a-search').slideUp(300);
                    $('.a-toggle-search').removeClass('open');

                }
                self.addClass('open');
                $('.ap-sideNav-collapse').slideDown(300);
            }

            return false;
        })
    });

}(jQuery));


// smoothState
$(function() {
  $('#main').smoothState();
});
