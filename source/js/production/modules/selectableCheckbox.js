var setupSelectableCheckbox = function() {
  $('body').on('change', '.a-js-selectable-checkbox', function() {
    if ($(this).is(':checked')) {
      $(this).closest('.a-selectable').addClass('a-selected');
    } else {
      $(this).closest('.a-selectable').removeClass('a-selected');
    }
  });

  $('body').on('focus', '.a-js-selectable-checkbox', function() {
    $(this).closest('.a-selectable').addClass('a-focus');
  });

  $('body').on('blur', '.a-js-selectable-checkbox', function() {
    $(this).closest('.a-selectable').removeClass('a-focus');
  });
};
