/* globals $ */
var contactForm = function() {
  $('body.a-stickyHelp-body').on('click', '#contact-form-trigger', function() {
    var ScontactFormLink;

    if (window.parent.$) {
      ScontactFormLink = window.parent.$('#contact-form-link');
      if (ScontactFormLink.length > 0) {
        ScontactFormLink.click();
        return false;
      }
    }

    return true;
  });
};
