$(document).ready(function() {
  // Detect iOS 11_x affected by cursor position bug
  // Bug report: https://bugs.webkit.org/show_bug.cgi?id=176896
  // Needs to be updated if new versions are affected
  var ua = navigator.userAgent;
  var iOS = /iPad|iPhone|iPod/.test(ua);
  var iOS11 = /OS 11_/.test(ua);

  // Only apply this in the parent page, not in the modal
  if ($('body.a-stickyHelp-body').length === 0 && iOS && iOS11) {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    document.body.style.width = '100%';
    document.body.style.position = 'fixed';
  }
});
