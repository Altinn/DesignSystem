/* globals AltinnLoader:true */

AltinnLoader = {
  addLoader: function($target) {
    if ($target.find('.loader-container').length === 0) {
      $target.prepend('<div class="loader-container"><div class="loader loader-ellipsis"></div></div>');
    }
  },

  removeLoader: function($target) {
    $target.find('.loader-container').remove();
  }
};
