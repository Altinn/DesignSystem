var setupSlickCarousel = function() {
  if ($('.an-slideshow').length) {
    $(document).ready(function() {
      $('.an-slideshow__list').slick({
        infinite: false
      });
      $('.slick-prev').css('display', 'none');
      $('.slick-arrow').click(function() {
        $('.slick-prev').removeAttr('style');
        if ($('.slick-current').attr('data-slick-index') === 0) {
          $('.slick-prev').css('display', 'none');
        }
        if ($('.slick-slide').length - 1 === $('.slick-current').attr('data-slick-index')) {
          $('.slick-next').css('display', 'none');
        } else {
          $('.slick-next').removeAttr('style');
        }
      }
    );
    });
  }
};
