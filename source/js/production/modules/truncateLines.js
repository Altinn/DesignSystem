var truncateToNumberOfLines = function(element) {
  var originalText = $(element).find('.sr-only').text();
  var $innerText = $(element).find('.a-js-inner-text');
  var containerHeight = $(element).height();
  var containerWidth = $(element).width();
  var i;

  for (i = 0; i < 500; i++) {
    if ($innerText.outerHeight() >= (containerHeight + 5) ||
    $innerText.outerWidth() >= (containerWidth)) {
      $innerText.text($innerText.text().trim().replace(/\s*.{4}$/, '...'));
    } else {
      break;
    }
  }
};

var truncateAllBoxButtons = function() {
  $('.a-box-button-name').filter(':visible').each(function() {
    truncateToNumberOfLines($(this));
  });
  if ($('.a-box-button-name').length > 0) {
    $(window).off('resize', truncateAllBoxButtons);
    $(window).resize(truncateAllBoxButtons);
  }
};

var truncateBoxButtonNames = function() {
  truncateAllBoxButtons();

  $('.a-collapsePanel-body').on('shown.bs.collapse', function() {
    truncateAllBoxButtons();
  });

  $(document).on('click', '.a-box-button', function(e) {
    truncateAllBoxButtons();
  });
};
