var onCountryCodeChange = function() {
  $('.a-js-countryCode').keyup(function() {
    var inputVal = $(this).val();
    switch (inputVal.length) {
    case 4:
      $(this).css('max-width', '62px');
      break;
    case 5:
      $(this).css('max-width', '71px');
      break;
    case 6:
      $(this).css('max-width', '80px');
      break;
    default:
      $(this).css('max-width', '55px');
    }
  });
};
