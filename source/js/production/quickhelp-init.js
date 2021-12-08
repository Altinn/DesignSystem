/*
  globals
  AltinnModal,
  AltinnQuickhelp,
  handleFocus,
  iOS11BugWorkAround,
  window,
*/
window.infoportalInit = function() {
  AltinnModal.init();
  AltinnQuickhelp.init();
  handleFocus();
  iOS11BugWorkAround();
};
window.infoportalInit();
// $(document).foundation();
