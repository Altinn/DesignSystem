/* globals $ */
var toggleSavedEdit = function() {
  $(function() {
    $('.a-js-toggleEdit').on('click', function() {
      $('.js-edit').toggleClass('d-none');
    });
  });
};
