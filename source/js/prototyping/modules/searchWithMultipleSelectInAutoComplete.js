/* eslint vars-on-top: 1 */

// Hard-coded data, should be replaced with JSON
var availableTags = [
  { label: 'Distribusjonstjeneste for erklæring av ansvarsrett, Direktoratet for byggkvalitet', service: 'Distribusjonstjeneste for erklæring av ansvarsrett', serviceOwner: 'Direktoratet for byggkvalitet' },
  { label: 'Erklæring om ansvarsrett, Direktoratet for byggkvalitet', service: 'Erklæring om ansvarsrett', serviceOwner: 'Direktoratet for byggkvalitet' },
  { label: 'Ferdigattest, Direktoratet for byggkvalitet', service: 'Ferdigattest', serviceOwner: 'Direktoratet for byggkvalitet' },
  { label: 'Gjennomføringsplan, Direktoratet for byggkvalitet', service: 'Gjennomføringsplan', serviceOwner: 'Direktoratet for byggkvalitet' },
  { label: 'Melding fra Fellestjenester Bygg, Direktoratet for byggkvalitet', service: 'Melding fra Fellestjenester Bygg', serviceOwner: 'Direktoratet for byggkvalitet' }
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
        var innerHtmlForItem = '<div class="row">' +
          '<div class="col-sm-7 col-md-5 col-lg-6 pl-md-2 pl-lg-2 pr-2" data-searchable="true">' +
            '<span class="a-js-sortValue a-list-longtext" title="Jan Derek Sørensen Julius Andreas Gimli Arn MacGyver Chewbacka Highlander ElessarJankov">' + item.service + '</span>' +
          '</div>' +
          '<div class="d-none d-md-block col-md-3 col-lg-4 pl-md-2 pl-lg-1 pr-2" data-searchable="true">' +
            '<span class="a-js-sortValue a-list-longtext" title="Testetat for Accenture">' + item.serviceOwner + '</span>' +
          '</div>' +
          '<div class="text-right col-sm-5 col-md-4 col-lg-2 pl-md-2 pl-lg-1 pr-sm-0 pr-md-2">' +

              '<span class="a-fontBold a-btn-icon-text a-hiddenWhenSelected ">+Legg til</span>' +
              '<span class="a-fontBold d-none d-sm-block a-visibleWhenSelected">Lagt til</span>' +

          '</div>' +
        '</div>';

        var li = that._renderItemData(ul, item);
        li.data('item.autocomplete', item);
        li.children().first().remove();
        li.append(innerHtmlForItem);
        li.children().first().attr('role', 'button');
        li.attr('role', 'menu');
        li.addClass('a-dotted a-selectable');
        li.attr('id', 'menu-item-' + index);
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

      // Lukkeknapp
      /*
      ul.append('<li class="a-js-autocomplete-header ml-2 a-no-border-bottom">' +
                  '<div class="mt-1 mb-1 d-flex justify-content-center">' +
                    '<button id="closeAutoCompleteMenu" class="a-btn pl-1 pr-1">Lukk</button>' +
                  '</div>' +
                '</li>');
      */
    },
    oldClose: $.ui.autocomplete.prototype.close,
    close: function(event) {
      var bolClose;
      if (event) {
        bolClose = false;
      } else {
        bolClose = true;
      }

      // Actuall close
      if (bolClose) {
        this.oldClose(event);
      }

      return false;
    }
  }));

  $('.a-js-autocomplete-multiplecolumns').catcomplete({
    // delay: 200, // set appropriate delay for ajax call
    source: availableTags,
    appendTo: '.a-autocomplete-container',
    minLength: 0,
    classes: {
      'ui-autocomplete': 'a-list a-multipleSelectInAutoComplete',
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
      // console.log(ui.content.length);
      if (ui.content.length === 0) {
        el = {
          isNoResultsLabel: true,
          label: noResultsLabel,
          title: noResultsLabel
        };

        ui.content.push(el);
      }
    },

    // Select configured to stop setting the default input and modify the menu
    select: function(event, ui) {
      // Find menu element
      var autocompleteMenu = $('#ui-id-1');

      // Find selected right and add classes to closest list-item
      autocompleteMenu.find('span:contains(' + ui.item.service + ')')
        .closest('li')
        .addClass('a-dotted a-disabled a-success a-selectable a-selected');

      // Find menu and set focus to closest list-item of selected right
      autocompleteMenu.menu('focus', null, autocompleteMenu.find('span:contains(' + ui.item.service + ')').closest('li'));

      // ONLY FOR DESIGNSYSTEM PROTOTYPING
      // eslint-disable-next-line
      console.log('Prototyping feature needs to be commented out in searchWithMultipleSelectInAutoComplete.js');
      // Add the clicked rights to list, only if if not already in list
      if ($('.a-list-container').find('div:contains(' + ui.item.service + ')').length === 0) {
        // eslint-disable-next-line
        var firstListItem = $('#firstRow').clone();
        firstListItem.attr('id', 'last');
        firstListItem.find('div div:nth-child(1)').text(function() {
          return ui.item.service;
        });
        firstListItem.first().addClass('a-selected a-success');
        firstListItem.find('button:nth-of-type(3) > i').removeClass('a-iconStrikeThrough a-disabledIcon');
        $('.a-list-container > ul').append(firstListItem);
      }

      return false;
    },

    // Focus configured to stop input from updating input when keyboard is used
    focus: function(event, ui) {
      return false;
    }
  }).bind('click', function(e) { // TODO should also open on tab focus? issue 3766
    if ($(this).catcomplete('widget').is(':visible')) {
      $(this).catcomplete('close');
    } else {
      $(this).catcomplete('search', $(this).val());
    }
  });
};
