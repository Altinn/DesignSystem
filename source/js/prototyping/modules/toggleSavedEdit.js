/* globals $ */
var toggleSavedEdit = function() {
  $(function() {
    $('.a-js-toggleEdit').on('click', function() {
      $('.js-edit').toggleClass('invisible');
    });
    $('.js-edit').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
    });
  });
};
