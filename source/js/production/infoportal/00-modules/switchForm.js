/* globals $, smoothState */
var switchForm = function() {
  $('[name="js-switchForm"]').each(function(index) {
    $(this).attr(
      'data-switchUrl',
      $(this).parent().parent().parent()
        .attr('data-switchUrl' + (index + 1))
    );
  });
  $('[name="js-switchForm"]').change(function() {
    if ($(this).is(':checked')) {
      window.drillDownGetSource($(this).attr('data-switchUrl'));
    }
  });
};
