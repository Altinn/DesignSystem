/* globals $ */
var onboarding = function() {
  var x = 400; var y = 600; var r = 64;
  var _r = r - 8;
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
      }
    } else if (e.keyCode === 39 && $('.onboarding-wrapper').length > 0) {
      e.preventDefault(); e.stopPropagation();
      $('.onboarding-wrapper').html(
        $('.onboarding-wrapper').html()
          .replace(/570 562/g, '5@7@0 5@5@6')
          .replace(/578 570/g, '5@8@6 5@7@0')
          .replace(/570 578/g, '5@7@0 5@8@6')
          .replace(/562 570/g, '5@5@6 5@7@0')
          .replace(/ 8 /g, ' 16 ')
        ).css('left', x + 'px').css('top', y + 'px');
      $('.onboarding-wrapper').html(
        $('.onboarding-wrapper').html().replace(/@/g, '')
      );
    } else if (e.keyCode === 37 && $('.onboarding-wrapper').length > 0) {
      e.preventDefault(); e.stopPropagation();
      $('.onboarding-wrapper').html(
        $('.onboarding-wrapper').html()
          .replace(/570/g, '570')
        ).css('left', 0 + 'px').css('top', 0 + 'px');
    }
  });
};
