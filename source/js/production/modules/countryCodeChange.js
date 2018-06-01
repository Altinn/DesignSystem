var onCountryCodeChange = function() {
  var initialWidth = 55;
  $('.a-js-countryCode').keyup(function() {
    var inputVal = $(this).val();
    var newWidth;

    if (inputVal.length > 3) {
      newWidth = initialWidth + ((inputVal.length - 3) * 9);
      $(this).css('max-width', newWidth + 'px');
    } else {
      $(this).css('max-width', '');
    }
  });
};
