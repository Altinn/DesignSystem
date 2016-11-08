/* globals $ */
var onboarding = function() {
  var ratio; var count = -1; var originalWidth; var steps = [];
  var horizontalJiggle; var verticalJiggle;
  $('.sg-main').find('*:nth-child(5n)').each(function() {
    if ($(this).width() > 0) {
      steps.push({
        element: $(this)
      });
    }
  });
  function seek(e) {
    ratio = (steps[count].element.width() / 15);
    e.preventDefault(); e.stopPropagation();
    if (steps[count - 1]) {
      if (
        steps[count - 1].element.offset().left <
        steps[count].element.offset().left
      ) {
        horizontalJiggle = 10;
      } else if (
        steps[count - 1].element.offset().left >
        steps[count].element.offset().left
      ) {
        horizontalJiggle = -10;
      } else {
        horizontalJiggle = 0;
      }
      if (
        steps[count - 1].element.offset().top <
        steps[count].element.offset().top
      ) {
        verticalJiggle = 10;
      } else if (
        steps[count - 1].element.offset().top >
        steps[count].element.offset().top
      ) {
        verticalJiggle = -10;
      } else {
        verticalJiggle = 0;
      }
    } else {
      horizontalJiggle = 0; verticalJiggle = 0;
    }
    $('.onboarding-wrapper').css(
      'transform',
      'matrix(' + ratio + ', 0, 0, ' + ratio + ',' +
        (
          steps[count].element.offset().left +
          (steps[count].element.width() / 2)
        ) + ',' +
        (
          steps[count].element.offset().top +
          (steps[count].element.height() / 2)
        )
    ).css('top', verticalJiggle + 'px').css('left', horizontalJiggle + 'px');
    setTimeout(function() {
      $('.onboarding-wrapper')
        .css('top', (verticalJiggle * -0.5) + 'px')
        .css('left', (horizontalJiggle * -0.5) + 'px');
      setTimeout(function() {
        $('.onboarding-wrapper')
          .css('top', (verticalJiggle * 0.25) + 'px')
          .css('left', (horizontalJiggle * 0.25) + 'px');
        setTimeout(function() {
          $('.onboarding-wrapper')
            .css('top', (verticalJiggle * -0.125) + 'px')
            .css('left', (horizontalJiggle * -0.125) + 'px');
          setTimeout(function() {
            $('.onboarding-wrapper').css('top', '0px').css('left', '0px');
          }, 100);
        }, 100);
      }, 100);
    }, 450);
    $('html, body').animate({
      scrollTop: steps[count].element.offset().top - (200)
    }, 200);
  }
  $(document).keydown(function(e) {
    /* CTRL + O keydown combo */
    if (e.ctrlKey && e.keyCode === 79) {
      if ($('.onboarding-wrapper').length > 0) {
        $('.onboarding-wrapper').remove();
      } else {
        $('body').append(
          '<span class="onboarding-wrapper">' +
            '<svg xmlns="http://www.w3.org/2000/svg width="1140" ' +
              'height="1140" version="1.1">' +
              '<path style="color:#000000;opacity:0.5" ' +
                'd="M 0 0 L 0 1140 L 1140 1140 L 1140 0 L 0 0 z M 570 562 A ' +
                  '8 8 0 0 1 578 570 A 8 8 0 0 1 570 578 A 8 8 0 0 1 562 570 ' +
                  'A 8 8 0 0 1 570 562 z" ' +
                'id="cutout" />' +
            '</svg>' +
          '</span>'
        );
        setInterval(function() {
          count += 1; seek(e);
        }, 1000);
      }
    } else if (e.keyCode === 39 && $('.onboarding-wrapper').length > 0) {
      count += 1; seek(e);
    } else if (e.keyCode === 37 && $('.onboarding-wrapper').length > 0) {
      count += -1; seek(e);
    }
  });
};
