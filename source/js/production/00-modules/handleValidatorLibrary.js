/* globals $ */
var handleValidatorLibrary = function() {
  $('.form-group').each(function() {
    var self = $(this);
    if (self.attr('data-toggle') === 'validator') {
      self.parent().attr('data-toggle', 'validator')
        .attr('data-delay', self.attr('data-delay')).validator();
    }
  });
};
