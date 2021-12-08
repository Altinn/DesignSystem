/* globals goBack */
var onConfirmDeletionClick = function() {
  var $list = $('ul[data-list-selectable="true"]');
  var $segmentDone = $('.segment-done');
  var goToReceipt = false;

  if ($list.find('li.a-selected:not(.a-list-header)').length === $list.find('li:not(.a-list-header)').length) {
    goToReceipt = true;
  } else {
    $list.find('li.a-selected')
      .addClass('a-deleted')
      .addClass('a-disabled')
      .removeClass('a-selected')
      .removeAttr('tabindex');
    $segmentDone.hide();
  }

  return goToReceipt;
};

var handleModalClose = function(src, targetUrl) {
  var hasSelectedRows = $('ul[data-list-selectable="true"] li.a-selected:not(.a-list-header)').length > 0;
  if (!hasSelectedRows) {
    $(src).popover('disable');
    location.href = targetUrl;
  }
};

var setupListRowSelect = function() {
  var $list = $('ul[data-list-selectable="true"]');
  var $segmentDone = $('.segment-done');

  $list.on('click', 'li.a-selectable:not(.a-list-header)', function() {
    if (!$(this).hasClass('a-deleted')) {
      $(this).toggleClass('a-selected');
      if ($list.find('li.a-selected').length > 0) {
        $segmentDone.show();
      } else {
        $segmentDone.hide();
      }
    }
  });

  $('.a-js-add-remove-all').on('click', function() {
    if ($list.find('li.a-selected:not(.a-list-header)').length === $list.find('li:not(.a-list-header)').length) {
      $list.find('li:not(.a-list-header)').removeClass('a-selected');
      $segmentDone.hide();
    } else {
      $list.find('li:not(.a-list-header)').addClass('a-selected');
      $segmentDone.show();
    }
  });

  $('.a-js-cancel-deletion').on('click', function() {
    $list.find('li:not(.a-list-header)').removeClass('a-selected');
    $segmentDone.hide();
  });
};
