/* globals $ */
var subscribe = function() {
  var validate = function(elem, skipVal) {
    if (skipVal) {
      $(elem).trigger('blur');
      $(elem).trigger('focus');
    } else if (elem[0].hasAttribute('aria-invalid')) {
      if (elem.attr('aria-invalid') === 'true') {
        elem.closest('.a-card').find('button').attr('disabled', 'disabled')
          .addClass('disabled');
      } else {
        elem.closest('.a-card').find('button').removeAttr('disabled')
          .removeClass('disabled');
      }
    } else if (elem.val().length === 0) {
      elem.closest('.a-card').find('button').attr('disabled', 'disabled')
        .addClass('disabled');
    }
  };
  if ($('.a-js-subscribe').length > 0) {
    $('.a-js-subscribe').each(function() {
      var _this = $(this);
      _this.closest('.a-card').find('.a-js-finishText').hide();
      _this.closest('.a-card').find('.a-js-altText').hide();
      _this.find('input').on('input', function() {
        validate($(this), true);
      });
      _this.find('input').on('focus', function() {
        validate($(this));
      });
      _this.find('input').on('blur', function() {
        validate($(this));
      });
      _this.find('input').on('keypress', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
          e.preventDefault();
          if (!_this.find('button').hasClass('disabled')) {
            _this.find('button').trigger('click');
          }
        }
      });
      _this.find('button').on('click', function() {
        var __this = $(this);
        _this.find('.a-form-group-items.input-group').addClass('disabled')
          .addClass('a-input-approved');
        _this.find('input').attr('disabled', 'disabled');
        _this.closest('.a-card').find('.a-js-finishText').show();
        _this.closest('.a-card').find('.a-js-altText').hide();
        __this.hide();
        $('.a-js-undo').on('click', function() {
          _this.find('.a-form-group-items.input-group').removeClass('disabled')
            .removeClass('a-input-approved');
          _this.find('input').removeAttr('disabled');
          _this.closest('.a-card').find('.a-js-finishText').hide();
          _this.closest('.a-card').find('.a-js-altText').show();
          __this.show();
        });
      });
    });
  }
};
