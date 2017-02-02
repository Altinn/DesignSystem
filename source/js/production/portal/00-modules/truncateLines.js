var truncateToNumberOfLines = function(element) {
  var p=$($(element).find('div')[0]);
  var divh=$(element).height();
  if ($(p).outerHeight() >= (divh + 5)) {
    while ($(p).outerHeight() >= (divh + 5)) {
      $(p).text(function (index, text) {
        return text.replace(/\W*\s(\S)*$/, '...');
      });
    }
  }
}

var truncateBoxButtonNames = function() {
  $('.a-box-button').on('click', function() {
    $('.a-box-button-name').each(function() {
      truncateToNumberOfLines($(this));
    });
  });

  $('.a-collapsePanel-body').on('shown.bs.collapse', function() {
    $('.a-box-button-name').each(function() {
      truncateToNumberOfLines($(this));
    });
  });
};
