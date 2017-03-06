var setValidatorSettings = function() {
  var defaultOptions = {
    highlight: function(element, errorClass, validClass) {
      $(element).closest('.form-group').addClass(errorClass);
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).closest('.form-group').removeClass(errorClass);
    },
    focusInvalid: false
  };
  $.validator.setDefaults(defaultOptions);
  $.validator.unobtrusive.options = {
    errorClass: 'has-error',
    invalidHandler: function(e, validator) {
      try {
        // alert('invlaidHandler needs to be set here not in jquery.validate');
      } catch (err) {
        // Ignore IE throwing errors when focusing hidden elements
      }
    }
  };
  $(function() {
    $('span.field-validation-valid, span.field-validation-error').addClass('help-block');
  });
};
