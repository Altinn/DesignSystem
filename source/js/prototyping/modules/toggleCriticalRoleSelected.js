$('.a-js-selectable-checkbox').on('change', function(e) {
  var roleid; // Id for rollen som ble endret
  var isSelected; // Hvor vidt rollen ble valgt eller fjernet
  var $warn; // Selector for advarselstekst
  var $contnorm; // Container for vanlig "Ferdig"-knapp
  var $contcrit; // Container for rød "Jeg forstår"-knapp

  // Class på parent <li> som indikerer at denne er flagget som kritisk
  if (!$(e.target).parents('li.a-js-critical-role-selector').length) {
    return;
  }

  roleid = $(e.target).parents('li.a-js-critical-role-selector')[0].id;
  isSelected = $(e.target).is(':checked');
  $warn = $('.a-js-critical-role-msg-' + roleid);
  $contnorm = $('.a-js-standard-role-container');
  $contcrit = $('.a-js-critical-role-container');

  if (isSelected) {
    $warn.show();
    $contcrit.show();
    $contnorm.hide();
  } else {
    $warn.hide();
  }

  // Sjekk om det er igjen noen kritiske rolle-advarsler
  if (!$('.a-js-critical-role-msg').filter(':visible').length) {
    $contcrit.hide();
    $contnorm.show();
  }
});
