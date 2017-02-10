var availableTags = [
  'Vanligste skjema og tjenester',
  '1. ACC Security level 2 MAG',
  '2. Corres test 250116',
  '3. PSA Skatteoppgjør personlig',
  '4. RF-1400 Melding om flytting innenlands',
  '6. Aksjeoppgaven 2014',
  '7. Lese SvarUt – post fra kommunen',
  '9. Mine krav og betalinger',
  '10. Et veldig langt punkt i lista som bør gå over alle bredder og grenser, men samtidig oppføre seg riktig i layout. Se så lang tekst dette her er.'
];

var searchWithAutocomplete = function() {
  $('.a-js-autocomplete').autocomplete({
    source: availableTags,
    appendTo: '.a-autocomplete-container',
    minLength: 0,
    classes: {
      'ui-autocomplete': 'a-list',
      'ui-menu-item': 'a-dotted'
    },
    create: function(event, ui) {
      $('.ui-helper-hidden-accessible').appendTo('.a-autocomplete-container');
    },
    open: function(event, ui) {
      $('.ui-autocomplete').removeAttr('style');
      $('.ui-autocomplete .ui-menu-item').not(':first-of-type').addClass('a-clickable');
    }
  }).bind('click', function(e) { //TODO should also open on tab focus?
    if ($(this).autocomplete('widget').is(':visible')) {
      $(this).autocomplete('close');
    } else {
      $(this).autocomplete('search', $(this).val());
    }
  });
};
