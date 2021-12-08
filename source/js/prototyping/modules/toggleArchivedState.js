/* globals $ */
var toggleArchivedState = function() {
  var archived = $('.sg-pattern-state.archived').parents('.sg-pattern');
  archived.addClass('a-sg-js-showArchived');
  $('.a-sg-js-toggleArchived').prop('checked', false);
  $('.a-sg-js-toggleArchived').click(function() {
    if ($(this).is(':checked')) {
      archived.removeClass('a-sg-js-showArchived');
    } else {
      archived.addClass('a-sg-js-showArchived');
    }
  });
};
