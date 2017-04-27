var setupExpandContent = function() {
  var expandContent = function() {
    $($(this).data('target')).addClass('a-expanded');
    $(this).hide();
  };

  $('*[data-toggle="altinn-expand"]').each(function() {
    var targetId = $(this).data('target');
    var $target = $(targetId);

    var targetHeight = $target.outerHeight();
    $(this).off('click', expandContent);
    if (targetHeight > 320) {
      $target.addClass('a-expandable-content');
      $(this).on('click', expandContent);
    } else {
      $(this).hide();
    }
  });
};

