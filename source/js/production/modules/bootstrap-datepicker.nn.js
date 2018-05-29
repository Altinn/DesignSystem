/* globals jQuery */
/* eslint dot-notation: "warn" */
(function($) {
  $.fn.datepicker.dates['nn'] = {
    days: ['sundag', 'måndag', 'tysdag', 'onsdag', 'torsdag', 'fredag', 'laurdag'],
    daysShort: ['sun', 'mån', 'tys', 'ons', 'tor', 'fre', 'lau'],
    daysMin: ['su', 'må', 'ty', 'on', 'to', 'fr', 'la'],
    months: ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'],
    monthsShort: ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'],
    today: 'i dag',
    monthsTitle: 'Månadar',
    clear: 'Nullstill',
    weekStart: 1,
    format: 'dd.mm.yyyy'
  };
}(jQuery));
