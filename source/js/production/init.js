/* globals questionnaireInteraction, drilldownInteraction, handleFocus,
mobileNavigation, propagateContent, toggleExpand, toggleFilter, uniformHeight,
tooltip, popover */
window.altinnInit = function () {
  drilldownInteraction(); handleFocus(); mobileNavigation(); popover()
  propagateContent(); questionnaireInteraction(); toggleExpand(); toggleFilter()
  tooltip(); uniformHeight()
}
window.altinnInit()
