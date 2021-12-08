/* globals $ */
var toggleSelectProfiles = function() {
  $('#selectedProfiles').hide();
  $('#profile-selection').hide();

  $('#alle-jeg-kan-representere-checkbutton-1,#alle-jeg-kan-representere-checkbutton-3').on('click', function() {
    $('#profile-selection').hide();
  });
  $('#select-profile-checkbutton-2').on('click', function() {
    $('#profile-selection').show();
  });
};
