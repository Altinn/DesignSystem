var setupSlickCarousel = function() {
  if ($('[data-slideshow]').length) {
    $(document).ready(function() {
      $('[data-slideshow]').slick({
        infinite: false,
        appendArrows: $('[data-slideshow-buttons]'),
        prevArrow: '<button type="button" class="slick-prev an-slideshow__button an-slideshow__button--previous"><i class="ai ai-arrowright"><span class="sr-only">Forrige</span></i></button>',
        nextArrow: '<button type="button" class="slick-prev an-slideshow__button an-slideshow__button--next"><i class="ai ai-arrowright"><span class="sr-only">Neste</span></i></button>'
      });
    });
  }
};
