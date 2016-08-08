/* globals jQuery */
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

// Hide second level column menu when clicking on the active upper level item:
// (function ($) {
//   $(function () {
//     var upperLvlClicked = false; var stopPropagationNextClick = false
//     function handleClick (event) {
//       if (upperLvlClicked && !stopPropagationNextClick) {
//         stopPropagationNextClick = true
//         console.log($('.a-colnav.dropdown').children('li').eq(4).find('a'))
//         $('.a-colnav.dropdown').children('li').eq(4).find('a').click()
//       } else {
//         upperLvlClicked = true; stopPropagationNextClick = false
//       }
//     }
//     $('li.a-colnav').on('click', handleClick)
//     $('a.a-colnav-item').on('click', handleClick)
//   })
// }(jQuery))

// Adjust position of second level menu upon click:
(function ($) {
  $(function () {
    $('#colnav').on('mouseup', function (event) {
      $('.a-colnav-secondLevel').css('margin-left', '-1px')
      if (
        $(event.target).closest('ul').hasClass('a-colnav-secondLevel') ||
        $(event.target).closest('ul').hasClass('a-colnav-thirdLevel')
      ) {
        if (
          $('.a-colnav-secondLevel').find('.a-colnav-thirdLevel')
            .attr('aria-hidden') === 'true'
        ) {
          $('.a-colnav-secondLevel').animate({'margin-left': '-250px'}, 250)
        } else {
          $('.a-colnav-secondLevel').css('margin-left', '-250px')
        }
        $('.a-colnav-thirdLevel').css('margin-left', '-1px')
        $('.a-colnav-thirdLevel').css('left', '100%')
      } else if (
        $(event.target).closest('ul').hasClass('a-colnav') &&
        (
          $(event.target).closest('li').hasClass('is-active') ||
          $(event.target).hasClass('is-active')
        )
      ) {
        $('#colnav').find('.is-active').removeClass('is-active')
        $('.dim').removeClass('dim')
        $('.dim-second').removeClass('dim-second')
        $('.a-colnav-secondLevel').css('margin-left', '-10000px')
        $('.a-colnav-thirdLevel').css('margin-left', '-10000px')
      }
    })
  })
}(jQuery))

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



// Add dim class to colnav FIRST LEVEL (The panels that is not active)
// TODO: Combine first and second level javascript. On second level, make the items not DIM when menu is closed and another 2-level is opened (Reset)

; (function ($, undefined) {
    $(function () {

        $('.a-colnav-item').click(function () {
           if ($(this).hasClass('expanded')) {
               $(this).removeClass('expanded');
               if ($('.a-colnav-item.expanded').length === 0) {
                   $('.a-colnav-item').removeClass('dim-second-no');
               }
               else {
                   $(this).addClass('dim')
               }
           } else {
               $('.a-colnav-item').removeClass('expanded');
               $(this).addClass('expanded');
               $('.a-colnav-item').addClass('dim');
               $('.a-colnav-item.expanded').removeClass('dim');
           }
       });
    });
}(jQuery));

// Add dim class to colnav SECOND LEVEL

; (function ($, undefined) {
    $(function () {

        $('.a-colnav-item-second').click(function () {
           if ($(this).hasClass('expanded-second')) {
               $(this).removeClass('expanded-second');
               if ($('.a-colnav-item-second.expanded-second').length === 0) {
                   $('.a-colnav-item-second').removeClass('dim-second-no');
               }
               else {
                   $(this).addClass('dim-second')
               }
           } else {
               $('.a-colnav-item-second').removeClass('expanded-second');
               $(this).addClass('expanded-second');
               $('.a-colnav-item-second').addClass('dim-second');
               $('.a-colnav-item-second.expanded-second').removeClass('dim-second');
           }
       });
    });
}(jQuery));


/**
 * SmoothState
 */
$(function() {
  $('#main').smoothState();
});


/**
 * Anchor js
 * Add anchors to all h1s, h2s, h3s and h4s inside of .ap-content.
 */
anchors.options.placement = 'left';
anchors.options.class = 'a-anchor';
anchors.add('.ap-content h1, .ap-content h2, .ap-content h3, .ap-content h4');
