$('.a-js-selectable-checkbox').on('change', function(e) { 

  // Class på parent <li> som indikerer at denne er flagget som kritisk
  if (!$(e.target).parents('li.a-js-critical-role-selector').length)
      return;   

  var roleid = $(e.target).parents('li.a-js-critical-role-selector')[0].id;
  var isSelected = $(e.target).is(':checked');
  var $warn = $('.a-js-critical-role-msg-' + roleid); // Selector for advarselstekst
  var $contnorm = $('.a-js-standard-role-container'); // Container for vanlig "Ferdig"-knapp
  var $contcrit = $('.a-js-critical-role-container'); // Container for rød "Jeg forstår"-knapp

  if (isSelected) {
      $warn.show();
      $contcrit.show();
      $contnorm.hide();
  }
  else {
      $warn.hide();
  }

  // Sjekk om det er igjen noen kritiske rolle-advarsler
  if (!$('.a-js-critical-role-msg').filter(':visible').length) {
      $contcrit.hide();
      $contnorm.show();
  }
});
