/* globals $ */
var toggleArchivedState = function() {
  $('.sg-pattern-state.archived').parents('.sg-pattern').addClass('a-sg-js-showArchived');
  $('.a-sg-js-toggleArchived').prop('checked', false);
  $('.a-sg-js-toggleArchived').click(function() {
    if ($(this).is(':checked')) {
      $('.sg-pattern-state.archived').parents('.sg-pattern').removeClass('a-sg-js-showArchived');
    } else {
      $('.sg-pattern-state.archived').parents('.sg-pattern').addClass('a-sg-js-showArchived');
    }
  });
};
