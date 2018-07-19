var toggleRoleRightsInit = function() {
  // When clicked on les, skrive or signer icon, toggle the disable on/off.
  $('.a-js-toggleRights').on('click', function() {
    $(this).toggleClass('a-iconStrikeThrough a-disabledIcon');
  });

  // When clicking on the delete or angre icon, toggle the deleted row on/off.
  $('.a-js-toggleRightsDelete').on('click', function() {
    $(this).closest('li').toggleClass('a-deleted a-selected a-defaultCursor');
  });
};
