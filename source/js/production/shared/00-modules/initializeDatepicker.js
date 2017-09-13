/* globals $ */
var initializeDatepicker = function() {
  if ($('.a-overlay-container').length > 0) {
    $('.a-overlay-container').attr('id', 'picker-container');
  } else {
    $('body').attr('id', 'picker-container');
  }
  $('.form-control.date').datepicker({
    format: 'dd.mm.yyyy',
    language: 'no',
    todayHighlight: true,
    orientation: 'bottom left',
    autoclose: true,
    maxViewMode: 0,
    container: '#picker-container',
    templates: {
      leftArrow: '<i class="ai ai-back"></i>',
      rightArrow: '<i class="ai ai-arrowright"></i>'
    }
  }).on('show', function(e) {
    $('.datepicker').find('table').attr('cellpadding', '0');
    $('.datepicker').find('table').attr('cellspacing', '0');
  });
  if ($('.form-control.date').length > 0) {
    $('body').on('click', function(e) {
      $('.datepicker').hide();
    });
    $('.form-control.date').datepicker('setDate', new Date());
    $('.form-control.date').on('click', function(e) {
      e.stopPropagation(); e.preventDefault();
    });
    $('.datepicker').on('click', function(e) {
      e.stopPropagation(); e.preventDefault();
    });
  }
};
