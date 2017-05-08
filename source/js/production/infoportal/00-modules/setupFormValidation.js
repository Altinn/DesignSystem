/* globals $ */
function setupFormValidation(formId, buttonId) {
  var $submitBtn = $(buttonId);
  var wasSubmitted = false;
  var validateBackwards = function(el) {
    if (el.prev().hasClass('form-group')) {
      if (el.prev().find('input').length > 0) {
        el.prev().find('input').valid();
      }
      if (el.prev().find('textarea').length > 0) {
        el.prev().find('textarea').valid();
      }
      validateBackwards(el.prev());
    }
  };

  if (!buttonId) {
    $submitBtn = $(formId + ' button[type="submit"]');
  }
  $.validator.unobtrusive.parse($(formId));

  $submitBtn.addClass('disabled');
  $submitBtn.prop('disabled', 'disabled');

  $(formId).on('blur input change', '*', function() {
    if ($(formId).validate().checkForm()) {
      $submitBtn.prop('disabled', false);
      $submitBtn.removeClass('disabled');
    } else {
      $submitBtn.prop('disabled', 'disabled');
      $submitBtn.addClass('disabled');
    }

    if (!wasSubmitted) {
      $(formId).validate().submitted = {};
    }
  });

  $(formId + ' input').on('blur', function() {
    // $(formId).valid();
    $(this).valid();
    validateBackwards($(this).closest('.form-group'));
  });

  $(formId + ' textarea').on('blur', function() {
    // $(formId).valid();
    $(this).valid();
    validateBackwards($(this).closest('.form-group'));
  });
}
