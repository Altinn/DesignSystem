$(document).on('ready', function() {
  var $allWithTarget = $('.switch-container input[data-switch-target]');
  var allTargets = [];
  $.each($allWithTarget, function() {
    allTargets.push($(this).data('switch-target'));
  });

  $allWithTarget.on('click', function() {
    var $currentSwitch = $(this);
    $('#' + $currentSwitch.data('switch-target')).show();
    $.each(allTargets, function() {
      if ($currentSwitch.data('switch-target') !== this + '') {
        $('#' + this).hide();
      }
    });
  });
});
