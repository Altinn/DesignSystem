/* globals AltinnDropdown */
/* globals AltinnDropdown:true */
AltinnDropdown = {
  init: function() {
    var that = this;
    $('body').on('click', '[data-toggle="altinn-dropdown"] .a-dropdown-item', function() {
      var $dropdownElement = $(this).closest('[data-toggle="altinn-dropdown"');
      if ($(this).data('value')) {
        $dropdownElement.find('.a-js-altinnDropdown-value').val($(this).data('value'));
      }

      $dropdownElement.find('.a-dropdown-toggle').html($(this).html());
    });
  }
};
