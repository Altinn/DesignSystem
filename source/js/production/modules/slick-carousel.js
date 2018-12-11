var setupSlickCarousel = function() {
  $(document).ready(function() {
    if ($('[data-slideshow]').length) {
      $('[data-slideshow]').each(function() {
        $(this).slick({
          infinite: false,
          appendArrows: $(this).next('[data-slideshow-buttons]'),
          prevArrow: '<button type="button" class="slick-prev an-slideshow-button an-slideshow-button-previous"><i class="ai ai-arrowright"><span class="sr-only">Forrige</span></i></button>',
          nextArrow: '<button type="button" class="slick-prev an-slideshow-button an-slideshow-button-next"><i class="ai ai-arrowright"><span class="sr-only">Neste</span></i></button>'
        });
      });
    }
  });
};
