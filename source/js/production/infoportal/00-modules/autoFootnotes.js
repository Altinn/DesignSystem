var autoFootnotes = function() {
  $('.epi-footnote').each(function(index) {
    $(this).hide();
    $(this).after(
      '<a href="javascript:void(0)" ' +
        'tabindex="0" ' +
        'class="a-linkArea a-helpIconButton a-helpIconButton--blue a-js-togglePopoverIcons" ' +
        'role="button" ' +
        'data-toggle="popover" ' +
        'data-animation="false" ' +
        'data-target="#myPopup" ' +
        'data-placement="bottom" ' +
        'data-popover-content="epiFootnote_' + index + '">' +
        '<i class="ai ai-circle-plus"></i>' +
        '<i class="ai ai-circle-minus"></i>' +
        '<span class="sr-only">Vis mer info</span>' +
      '</a>' +
      '<div id="epiFootnote_' + index + '" style="display: none">' +
        $(this).html() +
      '</div>'
    );
    $('#epiFootnote_' + index).popover();
  });
};
