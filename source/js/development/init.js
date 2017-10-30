/* globals _anchors, hideIntroInSubs, insetVariations, toggleArchivedState,
  selectAll, toggleTheme, fixPatternLinks,
  preOpenModals, prototypingInteractionStarteENK, $, onboarding, codeLookup, nameChecker,
  setupAddRightsHandler, initSearchWithHighlight, certificateHandler,
  searchWithAutocomplete, toggleSelectProfiles */
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
  searchWithAutocomplete();
  toggleSelectProfiles();
};
window.devInit();
$('.html-escape').each(function() {
  $(this).text($(this).html());
});
// $('form').validate();
