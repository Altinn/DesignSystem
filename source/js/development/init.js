/* globals _anchors, hideIntroInSubs, insetVariations, selectAll, toggleTheme, fixPatternLinks,
preOpenModals, prototypingInteractionStarteENK $ */
window.altinnDev = function() {
  _anchors();
  hideIntroInSubs();
  insetVariations();
  selectAll();
  toggleTheme();
  fixPatternLinks();
  preOpenModals();
  prototypingInteractionStarteENK();
};
window.altinnDev();
$('.html-escape').each(function() {
  $(this).text($(this).html());
});
