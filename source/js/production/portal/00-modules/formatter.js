/* globals $ */
var formatOrgNr = function() {
  $('.a-js-orgNr').on('keyup', function() {
    var number;
    this.value = this.value.replace(/ /g, '');
    number = this.value;
    this.value = number.replace(/(.{3})/g, '$1 ').trim();
  });
};
