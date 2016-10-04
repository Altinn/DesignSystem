/* globals $ */
var aTagSpaceExpand = function () {
  $('a.collapsed').each(function () {
    $(this).on('keydown', function (e) {
      if (e.keyCode === 32 || e.keycode === 13 || e.which === 32 || e.which === 13) {
        e.stopPropagation(); e.preventDefault()
        $(e.target).trigger($.Event('click'))
      }
    })
  })
}
