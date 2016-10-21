/* globals $ */
var onboarding = function() {
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
        // setInterval(function() {
          //
        // })
      }
    }
  });
};
