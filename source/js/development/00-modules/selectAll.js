/* globals $ */
var selectAll = function () {
  var ctrlDown = false; var ctrlKey = 17; var cmdKey = 91; var aKey = 65
  var SelectText = function (element) {
    var doc = document; var text = $(element); var range, selection
    text.each(function (index, text) {
      if ($(text).is(':visible')) {
        if (doc.body.createTextRange) {
          range = document.body.createTextRange(); range.moveToElementText(text)
          range.select()
        } else if (window.getSelection) {
          selection = window.getSelection(); range = document.createRange()
          range.selectNodeContents(text); selection.removeAllRanges()
          selection.addRange(range)
        }
      }
    })
  }
  var CustomShortcut = function (e) {
    if (ctrlDown && (e.keyCode === aKey)) {
      e.preventDefault(); e.stopPropagation()
      SelectText('.language-markup code')
    }
  }
  $(document).keydown(function (e) {
    if (e.keyCode === ctrlKey || e.keyCode === cmdKey) ctrlDown = true
  }).keyup(function (e) {
    if (e.keyCode === ctrlKey || e.keyCode === cmdKey) ctrlDown = false
  })
  $('body').on('click', '.sg-pattern-extra-toggle', function () {
    setTimeout(function () {
      $('.language-markup').off('keydown', CustomShortcut).attr('tabindex', '1')
        .on('keydown', CustomShortcut)
    }, 500)
  })
}
