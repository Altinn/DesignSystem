/* globals $ */
var contactForm = function() {
  var $contactFormTrigger = $('#contact-form-trigger');

  if ($contactFormTrigger.length > 0) {
    $contactFormTrigger.on('click', function() {
      var ScontactFormLink;
      var fallbackUrl = $(this).data('fallback-url');

      if (window.parent.$) {
        ScontactFormLink = window.parent.$('#contact-form-link');
        if (ScontactFormLink.length > 0) {
          ScontactFormLink.click();
        } else if (fallbackUrl) {
          window.parent.location = fallbackUrl;
        }
      }
    });
  }
};
