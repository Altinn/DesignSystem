/* globals $ */
function setupFormValidation(formId, buttonId) {
  var $submitBtn = $(buttonId);
  var wasSubmitted = false;
  var storedString = '';
  var validDropdown = function(el) {
    if (
      el.attr('required') !== undefined && el.attr('required') === 'required' &&
      el.attr('data-dropdowndefaultvalue') === el.find('.a-form-text').text()
    ) {
      el.closest('.a-form-group').addClass('has-error').find('.a-message-error').css('display', 'table');
    } else {
      el.closest('.a-form-group').removeClass('has-error').find('.a-message-error').css('display', 'none');
    }
  };
  var validAllDropdowns = function() {
    var invalids = [];
    $('.a-js-dropdownToValidate').each(function(index, el) {
      if (
        $(el).attr('required') !== undefined && $(el).attr('required') === 'required' &&
        $(el).attr('data-dropdowndefaultvalue') === $(el).find('.a-form-text').text()
      ) {
        invalids.push(index);
      }
    });
    return invalids.length === 0;
  };
  var validAllReferancials = function() {
    var invalids = [];
    $('.a-js-validateThisAgainstPrev').each(function(index, el) {
      if (
        $(el).closest('.a-form-group').hasClass('has-error')
      ) {
        invalids.push(index);
      }
    });
    return invalids.length === 0;
  };
  var validateBackwards = function(el) {
    if (el.prev().find('.a-js-dropdownToValidate').length > 0) {
      validDropdown(el.prev().find('.a-js-dropdownToValidate'));
      validateBackwards(el.prev());
    } else if (el.prev().hasClass('form-group')) {
      if (el.prev().find('input:not(.a-js-validateThisAgainstPrev)').length > 0) {
        el.prev().find('input:not(.a-js-validateThisAgainstPrev)').valid();
      }
      if (el.prev().find('.a-js-validateThisAgainstPrev').length > 0) {
        el.prev().find('.a-js-validateThisAgainstPrev').trigger('change');
      }
      if (el.prev().find('textarea').length > 0) {
        el.prev().find('textarea').valid();
      }
      validateBackwards(el.prev());
    }
  };
  var validateAgainstPrev = function() {
    if ($(this).closest('.form-group').prev().find('.a-message-error')
      .text() !== '') {
      $(this).closest('.form-group').find('.a-message-error').text(
        $(this).closest('.form-group').prev().find('.a-message-error')
          .text()
      );
      storedString = $(this).closest('.form-group').prev().find('.a-message-error')
        .text();
    } else {
      $(this).closest('.form-group').find('.a-message-error').text(
        storedString
      );
    }
    if ($(this).val() !==
      $(this).closest('.form-group').prev().find('input')
        .val() || $(this).val() === '') {
      setTimeout(function() {
        $(this).closest('.a-form-group').addClass('has-error').find('.a-message-error')
          .css('display', 'table');
      }.bind(this), 0);
    } else {
      $(this).closest('.a-form-group').removeClass('has-error').find('.a-message-error')
        .css('display', 'none');
    }
  };

  var validateForm = function() {
    var str;
    if ($(formId).validate().checkForm() && validAllDropdowns() && validAllReferancials()) {
      $submitBtn.prop('disabled', false);
      $submitBtn.removeClass('disabled');
    } else {
      $submitBtn.prop('disabled', 'disabled');
      $submitBtn.addClass('disabled');
    }

    if (!wasSubmitted) {
      $(formId).validate().submitted = {};
    }
  };

  $(formId + ' .a-js-dropdownToValidate').each(function() {
    $(this).attr('data-dropdowndefaultvalue', $(this).find('.a-form-text').text());
  });

  if (!buttonId) {
    $submitBtn = $(formId + ' button[type="submit"]');
  }
  $.validator.unobtrusive.parse($(formId));

  $submitBtn.addClass('disabled');
  $submitBtn.prop('disabled', 'disabled');

  $(formId).on('blur input change', '*', validateForm);

  $(formId + ' .a-js-dropdownToValidate').next().on('click', function() {
    setTimeout(function() {
      validDropdown($(this).prev());
    }.bind(this), 0);
    validateBackwards($(this).closest('.form-group'));
  });

  $(formId + ' .a-js-dropdownToValidate').on('blur', function() {
    validDropdown($(this));
    validateBackwards($(this).closest('.form-group'));
  });
  $('.a-js-certificateContainer').on('focus', function() {
    $('.a-js-certificateContainer').closest('label').addClass('a-custom-fileupload--focused');
  });
  $('.a-js-certificateContainer').on('blur', function() {
    $('.a-js-certificateContainer').closest('label').removeClass('a-custom-fileupload--focused');
  });
  $('.a-js-validateThisAgainstPrev').each(function() {
    storedString = $(this).closest('.form-group').prev().find('input')
      .attr('data-val-regex');
  });

  $(formId + ' .form-control').not('.a-js-validateThisAgainstPrev').on('blur change', function() {
    var $nextInput = $('#text-input-epost1').closest('.form-group').next().find('.a-js-validateThisAgainstPrev');
    if ($nextInput.length > 0 && $nextInput.val() !== '') {
      validateAgainstPrev.bind($nextInput)();
      setTimeout(function() {
        validateForm();
      }, 0);
    }
  });
  $('.a-js-validateThisAgainstPrev').on('keyup', function(e) {
    var hasError = $(this).closest('.form-group').hasClass('has-error');
    e.stopPropagation();
    if (hasError) {
      validateAgainstPrev.bind(this)();
    }
  });

  $('.a-js-validateThisAgainstPrev').on('change blur', function(e) {
    e.stopPropagation();
    validateAgainstPrev.bind(this)();
  });
}
