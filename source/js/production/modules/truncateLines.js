var truncateToNumberOfLines = function(element) {
  var innerText = $($(element).find('.a-js-inner-text')[0]);
  var containerHeight = $(element).height();
  var containerWidth = $(element).width();

  while ($(innerText).outerHeight() >= (containerHeight + 5) ||
   $(innerText).outerWidth() >= (containerWidth + 5)) {
    $(innerText).text(function(index, text) {
      return text.trim().replace(/\s*.{4}$/, '...');
    });
  }
};

// adds ellipsis for text that spans over two lines
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
