var truncateToNumberOfLines = function(element) {
  var originalText = $(element).find('.sr-only').text();
  var $innerText = $(element).find('.a-js-inner-text');
  var containerHeight = $(element).height();
  var containerWidth = $(element).width();

  $innerText.text(originalText);
  while ($innerText.outerHeight() >= (containerHeight + 5) ||
   $innerText.outerWidth() >= (containerWidth)) {
    $innerText.text($innerText.text().trim().replace(/\s*.{4}$/, '...'));
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
    $(window).off('resize', truncateAllBoxButtons);
    $(window).resize(truncateAllBoxButtons);
  });

  if ($('.a-box-button-name').length > 0) {
    $(window).off('resize', truncateAllBoxButtons);
    $(window).resize(truncateAllBoxButtons);
  }
};
