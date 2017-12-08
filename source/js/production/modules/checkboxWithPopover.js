  $('.a-switch').find('[data-toggle=popover]').on('change', function() {
    if ($(this).is(':checked')) {
      $(this).popover('hide');
    } else {
      $(this).popover('show');
    }
  });

