/* globals _anchors, hideIntroInSubs, insetVariations, toggleArchivedState,
  selectAll, toggleTheme, fixPatternLinks,
  preOpenModals, prototypingInteractionStarteENK, $, onboarding, codeLookup, nameChecker,
  setupAddRightsHandler, initSearchWithHighlight, certificateHandler */
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
  initSearchWithHighlight();
  setupAddRightsHandler();
  selectAll();
  toggleTheme();
  certificateHandler();
};
window.devInit();
$('.html-escape').each(function() {
  $(this).text($(this).html());
});
// $('form').validate();
