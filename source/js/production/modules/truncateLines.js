var truncateToNumberOfLines = function(element) {
  var originalText = $(element).find('.sr-only').text();
  var innerText = $($(element).find('.a-js-inner-text')[0]);
  var containerHeight = $(element).height();
  var containerWidth = $(element).width();

  $(element).find('.a-js-inner-text').text(originalText);
  while ($(innerText).outerHeight() >= (containerHeight + 5) ||
   $(innerText).outerWidth() >= (containerWidth)) {
    $(innerText).text(function(index, text) {
      return text.trim().replace(/\s*.{4}$/, '...');
    });
  }
};

var truncateAllBoxButtons = function() {
  $('.a-box-button-name').each(function() {
    truncateToNumberOfLines($(this));
  });
};

var truncateBoxButtonNames = function() {
  $('.a-box-button').on('click', function() {
    truncateAllBoxButtons();
  });

  $('.a-collapsePanel-body').on('shown.bs.collapse', function() {
    truncateAllBoxButtons();
    $(window).resize(truncateAllBoxButtons);
  });

  if ($('.a-box-button-name').length > 0) {
    $(window).resize(truncateAllBoxButtons);
  }
};
