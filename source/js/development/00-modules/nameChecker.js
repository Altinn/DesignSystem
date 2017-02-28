/* globals $ */
var nameChecker = function() {
  var btnText; var initAction; var toggleBtns;
  if ($('.a-js-validator').length > 0) {
    btnText = $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(0)
    .text();
    initAction = '$(".a-js-validator").find("input[type=text]")' +
    '.attr("disabled", "disabled").parent().addClass("disabled")' +
    '.addClass("a-input-approved");' +
    '$(".a-js-validator").find(".a-validatorInfo").eq(0).hide();' +
    '$(".a-js-validator").find(".a-validatorInfo").eq(1).show();' +
    '$(".a-js-validator").find(".a-btn-group").find(".a-btn").eq(0)' +
    '.html("Velg navn").removeAttr("onclick")' +
    '.addClass("a-js-smoothStateEnabled");' +
    '$(".a-js-tryAnother").show();' +
    'window.smoothStateMod();';
    $('.a-js-validator').find('.a-validatorInfo').eq(1).find('i')
    .addClass('a-validatorInfo-icon-approved');
    $('.a-js-validator').find('.a-validatorInfo').css('display', 'inline-block')
    .eq(1)
    .hide();
    if ($('.a-js-tryAnother').length === 0) {
      $('<button/>', {
        type: 'button',
        class: 'a-btn-link a-js-tryAnother',
        text: 'Prøv et annet navn'
      }).appendTo('.a-btn-group', '.a-js-validator');
    }
    $('.a-js-tryAnother').hide().on('click', function() {
      $('.a-js-validator').find('input[type=text]').removeAttr('disabled')
      .parent()
      .removeClass('disabled')
      .removeClass('a-input-approved');
      $('.a-js-tryAnother').hide();
      $('.a-js-validator').find('.a-validatorInfo').eq(0).show();
      $('.a-js-validator').find('.a-validatorInfo').eq(1).hide();
      $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(0)
      .html(btnText)
      .removeClass('a-js-smoothStateEnabled')
      .attr('onclick', '$(".a-js-validator").find(".a-message-error").show()')
      .hide();
      $('.a-js-validator').find('input[type=text]').val('');
      $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(1)
      .show();
    });
    $('.a-js-validator').find('.a-message-error');
    toggleBtns = function(el) {
      if ($(el).length > 0 && $(el).val().length > 0) {
        $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(0)
        .show();
        $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(1)
        .hide();
        if (
          $('.a-js-validator').find('input[type=text]').val()
          .indexOf($('.a-personSwitcher-name').attr('title').toLowerCase()
          .split(' ')[1]) !== -1 ||
          $('.a-js-validator').find('input[type=text]').val()
          .indexOf($('.a-personSwitcher-name').attr('title')
          .split(' ')[1]) !== -1
        ) {
          $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(0)
          .attr('onclick', initAction);
        } else {
          $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(0)
          .attr('onclick',
          '$(".a-js-validator").find(".a-message-error").show()');
        }
      } else {
        $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(0)
        .hide();
        $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(1)
        .show();
      }
    };
    toggleBtns($('.a-js-validator').find('input[type=text]'));
    $('.a-js-validator').find('input[type=text]').on('keyup', function(e) {
      if (e.which !== 13) {
        $('.a-js-validator').find('.a-message-error').hide();
      }
      toggleBtns(this);
    });
    $('.a-js-validator').find('input[type=text]').on('keydown', function(e) {
      $('.a-js-validator').find('.a-message-error').hide();
      if (e.which === 13) {
        e.preventDefault(); e.stopPropagation();
        if ($('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(0)
        .is(':visible')) {
          $('.a-js-validator').find('.a-btn-group').find('.a-btn').eq(0)
          .click();
        }
      }
    });
    $('.a-js-validator').find('input[type=text]').on('change', function() {
      $('.a-js-validator').find('.a-message-error').hide();
      toggleBtns(this);
    });
  }
};
