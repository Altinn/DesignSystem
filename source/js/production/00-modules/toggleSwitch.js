$(document).on('ready', function() {
  var $allWithTarget = $('.switch-container input[data-switch-target]');
  var allTargets = [];
  $.each($allWithTarget, function() {
    allTargets.push($(this).data('switch-target'));
  });

  $allWithTarget.on('click', function() {
    $.each(allTargets, function() {
      $('#' + this).hide();
    });
    $('#' + $(this).data('switch-target')).show();
  });
});
