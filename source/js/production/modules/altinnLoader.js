/* globals AltinnLoader:true */

AltinnLoader = {
  addLoader: function($target) {
    if ($target.find('.loader-container').length === 0) {
      $target.prepend('<div class="loader-container"><div class="loader loader-ellipsis"></div></div>');
    }
    $('button.a-modal-back').attr('disabled', true);
    $('button.a-modal-close').attr('disabled', true);
  },

  removeLoader: function($target) {
    $target.find('.loader-container').remove();
    $('button.a-modal-back').attr('disabled', false);
    $('button.a-modal-close').attr('disabled', false);
  }
};
