/* globals
  setupExpandContent
*/
$('body').on('show.bs.collapse', '.a-collapsePanel-body', function() {
  var that = this;

  setTimeout(function() {
    var $collapsePanelHeader = $(that).siblings('.a-js-index-heading').first();
    var $msgIconWrapper = $collapsePanelHeader.find('.a-inboxHeadingContent')
    .find('.a-msgIconSecondary')
    .closest('.a-msgIconWrapper');

    $msgIconWrapper.find('.reg')
      .hide()
      .siblings('.a-msgIconSecondary')
      .show();

    $msgIconWrapper.find('span').attr('aria-hidden', true);
    $msgIconWrapper.find('span:last-of-type').removeAttr('aria-hidden');

    $('.a-collapsePanel').removeClass('expanded');
    $(that).closest('.a-collapsePanel').addClass('expanded');
    $('.a-js-index-heading').addClass('dim');
    $('.a-collapsePanel.expanded').find('.a-js-index-heading').removeClass('dim');
    setupExpandContent();
  }, 0);
});

$('body').on('hide.bs.collapse', '.a-collapsePanel-body', function() {
  var that = this;
  setTimeout(function() {
    var $collapsePanelHeader = $(that).siblings('.a-js-index-heading').first();
    $collapsePanelHeader.find('.a-inboxHeadingContent').removeClass('a-msgUnread');
    $(that).closest('.a-collapsePanel').removeClass('expanded');
    if ($('.a-collapsePanel.expanded').length === 0) {
      $('.a-js-index-heading').removeClass('dim');
    } else {
      $collapsePanelHeader.addClass('dim');
    }
  }, 0);
});
