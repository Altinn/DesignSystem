/* globals _anchors, hideIntroInSubs, insetVariations, toggleArchivedState,
  selectAll, toggleTheme, fixPatternLinks,
  preOpenModals, prototypingInteractionStarteENK, $, onboarding, codeLookup, nameChecker,
  setupAddRightsHandler */
window.devInit = function() {
  _anchors();
  hideIntroInSubs();
  insetVariations();
  toggleArchivedState();
  selectAll();
  toggleTheme();
  fixPatternLinks();
  preOpenModals();
  prototypingInteractionStarteENK();
  onboarding();
  codeLookup();
  nameChecker();
  setupAddRightsHandler();
  selectAll();
  toggleTheme();
};
window.devInit();
$('.html-escape').each(function() {
  $(this).text($(this).html());
});
// $('form').validate();
