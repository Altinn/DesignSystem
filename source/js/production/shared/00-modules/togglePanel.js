$('.a-collapsePanel-body').on('show.bs.collapse', function() {
  var that = this;
  setTimeout(function() {
    var $collapsePanelHeader = $(that).siblings('.a-js-index-heading').first();
    $collapsePanelHeader.find('.a-inboxHeadingContent')
      .removeClass('a-msgUnread')
      .find('.a-msgIconSecondary')
      .closest('.a-msgIconWrapper')
      .find('.ai')
      .hide()
      .siblings('.a-msgIconSecondary')
      .show();

    $('.a-collapsePanel').removeClass('expanded');
    $(that).closest('.a-collapsePanel').addClass('expanded');
    $('.a-js-index-heading').addClass('dim');
    $('.a-collapsePanel.expanded').find('.a-js-index-heading').removeClass('dim');
  }, 0);
});

$('.a-collapsePanel-body').on('hide.bs.collapse', function() {
  var that = this;
  setTimeout(function() {
    var $collapsePanelHeader = $(that).siblings('.a-js-index-heading').first();
    $(that).closest('.a-collapsePanel').removeClass('expanded');
    if ($('.a-collapsePanel.expanded').length === 0) {
      $('.a-js-index-heading').removeClass('dim');
    } else {
      $collapsePanelHeader.addClass('dim');
    }
  }, 0);
});
