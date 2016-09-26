/* globals $ */
var toggleTheme = function () {
  $(function () {
    var toggleStuff = function (className) {
      $('body', $('iframe').contents()[0]).attr('class', className)
      localStorage.setItem('theme', className)
      $('body', '.ap-profile').attr('class', '')
    }
    $('#sg-switchtheme-blue', $('iframe').contents()[0]).off('change')
    $('#sg-switchtheme-grey', $('iframe').contents()[0]).off('change')
    $('#sg-switchtheme-white', $('iframe').contents()[0]).off('change')
    if (localStorage.getItem('theme') &&
      localStorage.getItem('theme') === 'business') {
      $('body', $('iframe').contents()[0]).attr('class', 'business')
      $('#sg-switchtheme-blue', $('iframe').contents()[0]).prop('checked', true)
    } else if (localStorage.getItem('theme') &&
      localStorage.getItem('theme') === 'private-person') {
      $('body', $('iframe').contents()[0]).attr('class', 'private-person')
      $('#sg-switchtheme-grey', $('iframe').contents()[0]).prop('checked', true)
    } else {
      $('body', $('iframe').contents()[0]).attr('class', 'neutral')
      $('#sg-switchtheme-white', $('iframe').contents()[0])
        .prop('checked', true)
    }
    $('#sg-switchtheme-blue', $('iframe').contents()[0]).on('change',
      function () { toggleStuff('business') })
    $('#sg-switchtheme-grey', $('iframe').contents()[0]).on('change',
      function () { toggleStuff('private-person') })
    $('#sg-switchtheme-white', $('iframe').contents()[0]).on('change',
      function () { toggleStuff('neutral') })
    $('body', '.ap-profile').attr('class', '')
  })
}
