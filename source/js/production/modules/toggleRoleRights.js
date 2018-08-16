var toggleRoleRightsInit = function() {
  // When clicked on les, skrive or signer icon, toggle the disable on/off.
  $('.a-js-toggleRights').on('click', function() {
    $(this).children(':first').toggleClass('a-iconStrikeThrough a-disabledIcon');
  });

  // When clicking on the delete or angre icon, toggle the deleted row on/off.
  $('.a-js-toggleRightsDelete').on('click', function() {
    $(this).closest('li').toggleClass('a-deleted a-selected a-defaultCursor');

    // if closest li has class a-deleted.
    if ($(this).closest('li').hasClass('a-deleted')) {
      // remove tabindex of rights buttons
      $(this)
        .parent()
        .prev()
        .children()
        .prop('tabindex', '-1');

      // set tabindex -1 on ai-del
      $(this).prop('tabindex', '-1');

      // set tabdindex and focus to ai-undo
      $(this).next().prop('tabindex', '0');
      $(this).next().focus();
    // else if closest li does not have a-deleted
    } else {
      $(this)
      .parent()
      .prev()
      .children()
      .prop('tabindex', '0');

      // set tabindex -1 on ai-undo
      $(this).prop('tabindex', '-1');

      // set focus to ai-del
      $(this).prev().prop('tabindex', '0');
      $(this).prev().focus();
    }
  });
};
