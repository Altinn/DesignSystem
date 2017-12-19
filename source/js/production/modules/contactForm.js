/* globals $ */
var contactForm = function() {
  $('body.a-stickyHelp-body').on('click', '#contact-form-trigger', function() {
    var ScontactFormLink;
    var $closeButton;

    if (window.parent.$) {
      ScontactFormLink = window.parent.$('#contact-form-link');
      $closeButton = window.parent.$('.a-stickyHelp-close');
      if (ScontactFormLink.length > 0) {
        ScontactFormLink.click();
        $closeButton.click();
        return false;
      }
    }

    return true;
  });
};
