/* globals enableIOS11Fix, disableIOS11Fix, iOS11BugWorkAround */

var enableIOS11Fix = function() {
  // We disable scrolling by hiding everything not in view
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  // It seems we don't need to set these, but I'm leaving there here for now
  // Should be reversed in the disableIOS11Fix function if we enable them
  // document.body.style.height = '100%';
  // document.body.style.width = '100%';
};
var disableIOS11Fix = function() {
  document.body.style.overflow = 'auto';
  document.body.style.position = 'static';
  // document.body.style.height = '100%';
  // document.body.style.width = '100%';
};

var iOS11BugWorkAround = function() {
  $('.a-stickyHelp-close').on('click', function() {
    // When the close button in the sticky help window is clicked/tapped
    // we disable the fix, otherwise the page will not scroll
    window.parent.disableIOS11Fix();
  });
};

$(document).ready(function() {
  // Detect iOS 11_x affected by cursor position bug
  // Bug report: https://bugs.webkit.org/show_bug.cgi?id=176896
  // Needs to be updated if new versions are affected
  var ua = navigator.userAgent;
  var iOS = /iPad|iPhone|iPod/.test(ua);
  var iOS11 = /OS 11_/.test(ua);

  // Only apply this in the parent page, not in the modal
  if (iOS && iOS11) {
    if ($('body.a-stickyHelp-body').length === 0) {
      // We enable the fix only when the help button is clicked/tapped
      $('.a-stickyHelp-open').on('click', function() {
        enableIOS11Fix();
      });
    }
  }
});
