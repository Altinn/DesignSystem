// Hard-coded data, should be replaced with JSON
var availableTags = [
  { label: 'ACC Security level 2 MAG, Accenture Test', service: 'ACC Security level 2 MAG', serviceOwner: 'Accenture Test' },
  { label: 'Corres test 250116, Accenture Test', service: 'Corres test 250116', serviceOwner: 'Accenture Test' },
  { label: 'PSA Skatteoppgjør personlig, Skatteetaten', service: 'PSA Skatteoppgjør personlig', serviceOwner: 'Skatteetaten' },
  { label: 'RF-1400 Melding om flytting innenlands,Skatteetaten', service: 'RF-1400 Melding om flytting innenlands', serviceOwner: 'Skatteetaten' },
  { label: 'Aksjeoppgaven 2014, Skatteetaten', service: 'Aksjeoppgaven 2014', serviceOwner: 'Skatteetaten' },
  { label: 'Et veldig langt punkt i lista som bør gå over alle bredder og grenser, men samtidig oppføre seg riktig i layout. Se så lang tekst dette her er., accenture', service: 'Et veldig langt punkt i lista som bør gå over alle bredder og grenser, men samtidig oppføre seg riktig i layout. Se så lang tekst dette her er.', serviceOwner: 'accenture' }
];

// Hard-coded texts, should be replaced with custom strings
var title = 'Vanligste skjema og tjenester i din organisasjon';
var numberOfResultsLabel = ' treff. Bruk pil opp og pil ned for å navigere i resultatene.';
var noResultsLabel = 'Ingen treff';
var moreThanMaxLabel = 'Listen viser kun de første 100 treff. Vennligst begrens søket ditt';

var searchWithMultipleSelectInAutoComplete = function() {
  $.widget('custom.catcomplete', $.ui.autocomplete, ({
    _create: function() {
      this._super();
      this.widget().menu('option', 'items', '> :not(.a-js-autocomplete-header)');
      $('.ui-helper-hidden-accessible').addClass('sr-only');
    },
    _renderMenu: function(ul, items) {
      var that = this;
      var iLength = items.length;

      $.each(items, function(index, item) {
        // build  item in the list
        var innerHtmlForItem = '<div class="row"><div class="col-sm-7 col-md-5 col-lg-6 pl-md-2 pl-lg-2 pr-2" data-searchable="true"><span class="a-js-sortValue a-list-longtext" title="Jan Derek Sørensen Julius Andreas Gimli Arn MacGyver Chewbacka Highlander ElessarJankov">'
        + item.service +
        '</span></div><div class="d-none d-md-block col-md-3 col-lg-4 pl-md-2 pl-lg-1 pr-2" data-searchable="true"><span class="a-js-sortValue a-list-longtext" title="Testetat for Accenture">'
        + item.serviceOwner +
        '</span></div><div class="a-hiddenWhenSelected text-right col-sm-5 col-md-4 col-lg-1 pl-md-2 pl-lg-1 pr-sm-0 pr-md-4"><button type="button" class="a-btn-link a-nounderline hidden-xs-down  " aria-label="Tilbake" onclick="#" tabindex="-1"><span class="a-btn-icon-text ">+Legg til</span></button></div></div>';
        var li = that._renderItem(ul, item);
        // return $('<li>')
        li.data('item.autocomplete', item);
        li.children().first().remove();
        li.append(innerHtmlForItem);
        li.children().first().attr('role', 'button');
        li.attr('role', 'menu');
        li.addClass('a-dotted');
        /* var li = that._renderItemData(ul, item);
        console.log(li);
        li.attr('role', 'menu');
        li.addClass('a-dotted');
        li.children().first().attr('role', 'button');*/
      });

      if (iLength === availableTags.length) {
        ul.prepend('<li class=\'a-js-autocomplete-header a-dotted\'>' + title + '</li>');
      } else if (!items[0].isNoResultsLabel) {
        ul.prepend('<li class=\'a-js-autocomplete-header a-dotted\'>' + iLength + ' treff </li>');
      } else {
        $('.ui-autocomplete').children().first().addClass('a-js-autocomplete-header');
      }

      if (iLength >= 3) {
        ul.append('<li class=\'a-js-autocomplete-header a-dotted a-info\'>' + moreThanMaxLabel + '</li>');
      }
    }
  }));

  $('.a-js-autocomplete').catcomplete({
    // delay: 200, // set appropriate delay for ajax call
    source: availableTags,
    appendTo: '.a-autocomplete-container',
    minLength: 0,
    classes: {
      'ui-autocomplete': 'a-list',
      'ui-menu-item': 'a-dotted'
    },
    open: function(event, ui) {
      $('.ui-autocomplete').removeAttr('style'); // remove inline positioning and display of amount results
      $('.ui-autocomplete .ui-menu-item').not(':first-of-type').addClass('a-clickable');
    },
    messages: {
      noResults: noResultsLabel,
      results: function(count) {
        if (count === availableTags.length) {
          return title + '. ' + count + ' ' + numberOfResultsLabel;
        }

        return count + ' ' + numberOfResultsLabel;
      }
    },
    response: function(event, ui) {
      var el;
      console.log(ui.content.length);
      if (ui.content.length === 0) {
        el = {
          isNoResultsLabel: true,
          label: noResultsLabel,
          title: noResultsLabel
        };

        ui.content.push(el);
      }
    }
  }).bind('click', function(e) { // TODO should also open on tab focus? issue 3766
    if ($(this).catcomplete('widget').is(':visible')) {
      $(this).catcomplete('close');
    } else {
      $(this).catcomplete('search', $(this).val());
    }
  });
};
