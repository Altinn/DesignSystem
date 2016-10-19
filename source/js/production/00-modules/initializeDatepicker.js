/* globals $ */
var initializeDatepicker = function() {
  $('.form-control.date').datepicker({
    format: 'dd.mm.yyyy',
    language: 'no',
    todayHighlight: true,
    orientation: 'bottom left',
    maxViewMode: 0
  }).on('show', function(e) {
    $('.datepicker').find('.next').html('')
    $('.datepicker').find('.prev').html('')
    $('.datepicker').find('table').attr('cellpadding', '0')
    $('.datepicker').find('table').attr('cellspacing', '0')
    $('.datepicker').each(function() {
      if ($(this).find('.today').html().indexOf('<span') === -1) {
        $(this).find('.today').html('<span>' + $(this).find('.today').html() + '</span>')
      }
      if ($(this).find('.active').html().indexOf('<span') === -1) {
        $(this).find('.active').html('<span>' + $(this).find('.active').html() + '</span>')
      }
    })
  });
  $('.form-control.date').on('change', function() {
    $('.datepicker').each(function() {
      if ($(this).find('.today').html().indexOf('<span') === -1) {
        $(this).find('.today').html('<span>' + $(this).find('.today').html() + '</span>')
      }
      if ($(this).find('.active').html().indexOf('<span') === -1) {
        $(this).find('.active').html('<span>' + $(this).find('.active').html() + '</span>')
      }
    })
  })
};
