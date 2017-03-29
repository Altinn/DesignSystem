$('.a-collapsePanel-body').on('show.bs.collapse', function() {
  var $collapsePanelHeader = $(this).siblings('.a-js-index-heading').first();
  $('.a-js-index-heading').removeClass('expanded');
  $collapsePanelHeader.addClass('expanded');
  $('.a-js-index-heading').addClass('dim');
  $('.a-js-index-heading.expanded').removeClass('dim');
});

$('.a-collapsePanel-body').on('hide.bs.collapse', function() {
  var $collapsePanelHeader = $(this).siblings('.a-js-index-heading').first();
  $collapsePanelHeader.removeClass('expanded');
  if ($('.a-js-index-heading.expanded').length === 0) {
    $('.a-js-index-heading').removeClass('dim');
  } else {
    $collapsePanelHeader.addClass('dim');
  }
});
