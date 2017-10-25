/* globals $ */
var toggleSelectProfiles = function() {
  $('#selectedProfiles').hide();
  $('#profile-selection').hide();

  $('#alle-jeg-kan-representere-checkbutton-1').on('click', function() {
    $('#profile-selection').hide();
  });
  $('#select-profile-checkbutton-2').on('click', function() {
    $('#profile-selection').show();
  });
  $('#profiles-selected').on('click', function() {
    $('#forSelectionList').toggle();
    $('#selectedProfiles').toggle();
  });
};
