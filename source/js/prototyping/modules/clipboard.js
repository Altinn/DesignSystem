/* globals Clipboard */
var clipboard = new Clipboard('.a-js-btnCopy');
clipboard.on('success', function(e) {
  $('.a-js-clipboardMsg').html('Kopiert til utklippstavlen');
  e.clearSelection();
});

clipboard.on('error', function(e) {
  $('.a-js-clipboardMsg').html('Trykk CTRL+C/CMD+C for å kopiere org.nr.');
});
