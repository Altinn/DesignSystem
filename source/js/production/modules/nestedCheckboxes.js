var setupNestedCheckboxes = function() {
  $('[data-toggle="nestedCheckbox"]').on('change', function() {
    var target = $(this).data('target');
    if ($(this).is(':checked')) {
      $(target).show();
    } else {
      $(target).hide();
    }
  });

  $('[data-toggle="nestedCheckbox"]').each(function() {
    if (!$(this).is(':checked')) {
      $($(this).data('target')).hide();
    }
  });
};
