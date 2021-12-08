/* globals $, Foundation */
var listenForAttachmentChanges = function(formId, errorMessageCallback) {
  var maxSizeInMb = 15;
  var maxSizeInBytes = maxSizeInMb * 1024 * 1024;
  var allowedExtensions = [
    'bmp', 'jpg', 'jpeg', 'png', 'gif', 'txt', 'log', 'csv', 'doc', 'docx', 'xls', 'xlsx', 'ppt',
    'pptx', 'pdf', 'odt', 'ods', 'odp', 'rtf', 'rar', 'zip', '7z', 'gdoc', 'gsheet', 'gslide', 'htm',
    'html', 'eml', 'msg'
  ];

  var fileInput = $(formId).find('.a-js-uploadAttachment').find('#newCertificateInput');
  var attachmentErrorBox = $(formId).find('.a-js-upload-error');
  var attachmentBox = $(formId).find('.a-js-attachment-box');
  var attachmentNameText = $(attachmentBox).find('.a-js-attachment-name');
  var deleteAttachmentButton = $(attachmentBox).find('.a-btn-delete');
  var selectedFile = '';

  attachmentErrorBox.hide();
  attachmentBox.hide();

  deleteAttachmentButton.click(function() {
    fileInput.val(''); // reset content
    attachmentBox.hide();
    attachmentErrorBox.hide();
    fileInput.parent().show();
  });

  $(fileInput).change(function(event) {
    if (event.target.files.length > 0) {
      selectedFile = event.target.files[0];
    }

    function handleFile(file) {
      var fileName = file.name;
      var extension = fileName.split('.').pop();
      var byteSize = file.size;

      var validExtension = $.inArray(extension, allowedExtensions) > -1;
      var validFileSize = maxSizeInBytes > byteSize;

      if (validExtension && validFileSize) {
        // success:
        // set file name and show 'attachment box'
        // hide 'error box'
        // hide upload button

        attachmentNameText.text(fileName);
        attachmentBox.show();
        attachmentErrorBox.hide();
        fileInput.parent().hide();
      } else {
        // failure:
        // hide 'attachment box'
        // show 'error box'
        // show upload button
        attachmentBox.hide();
        attachmentErrorBox.show();
        fileInput.parent().show();
      }

      if (!validFileSize) {
        attachmentErrorBox.find('.a-message-error').text(errorMessageCallback('size') + ': ' + maxSizeInMb + 'MB');
      } else if (!validExtension) {
        attachmentErrorBox.find('.a-message-error').text(errorMessageCallback('ext') + ': ' + allowedExtensions.join(', '));
      }
    }

    if (selectedFile) {
      handleFile(selectedFile);
    } else {
      attachmentBox.hide();
    }
  });
};
