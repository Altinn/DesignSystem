/* globals $ */
var autoFootnotes = function() {
  // Ideally we should have a generic class name here, but it would break
  // existing articles
  $('.epi-footnote').not('popovered').each(function(index) {
    $(this).hide().addClass('popovered');
    $(this).after(
      '<a href="javascript:void(0)" ' +
        'tabindex="0" ' +
        'class="a-linkArea a-helpIconButton a-helpIconButton--blue a-js-togglePopoverIcons" ' +
        'role="button" ' +
        'data-toggle="popover" ' +
        'data-popover-class="footnote"' +
        'data-trigger="click"' +
        'data-popover-content="epiFootnote_' + index + '">' +
        '<i class="ai ai-circle-plus a-js-popoverIconInitial"></i>' +
        '<i class="ai ai-circle-minus a-js-popoverIconExpanded"></i>' +
      '</a>' +
      '<div id="epiFootnote_' + index + '" style="display: none">' +
        $(this).html() +
      '</div>'
    );
  });
};
