/* globals $ */
var hideIntroInSubs = function () {
  if (JSON.parse($('#sg-pattern-data-footer').text()).patternPartial !== undefined) {
    $('.sg-top').hide()
    $('.sg-statesExplanation').hide()
  }
}
