/*
  globals
  AltinnDropdown,
  AltinnModal,
  AltinnQuickhelp,
  addListExpandHandler,
  addListSortHandler,
  articleAnchors,
  autoFootnotes,
  cardsToggle,
  codeLookup,
  colnavCustom,
  contactForm,
  feedbackToggle,
  formatOrgNr,
  genericSearch,
  handleFocus,
  initializeDatepicker,
  iOS11BugWorkAround,
  listenForAttachmentChanges,
  mobileNavigation,
  nameChecker,
  newsArchive,
  onConfirmDeletionClick,
  onFileInputChange,
  popoverGlobalInit,
  popoverLocalInit,
  questionnaireInteraction,
  searchFilterView,
  sessionExpiredDialog,
  setupAddRightsHandler,
  setupExpandContent,
  setupFormValidation,
  setupListRowSelect,
  setupNestedCheckboxes,
  setupOnKeypress,
  setupSelectableCheckbox,
  setupTruncateLines,
  setValidatorSettings,
  subscribe,
  toggleFilter,
  toggleInstant,
  toggleSwitch,
  tooltip,
  truncateBoxButtonNames,
  uniformHeight,
  window,
*/
window.infoportalInit = function() {
  AltinnModal.init();
  AltinnDropdown.init();
  AltinnQuickhelp.init();
  addListExpandHandler();
  addListSortHandler();
  articleAnchors();
  autoFootnotes(); // This should be called before popoverLocalInit
  colnavCustom();
  contactForm();
  feedbackToggle();
  genericSearch();
  handleFocus();
  initializeDatepicker();
  iOS11BugWorkAround();
  listenForAttachmentChanges();
  mobileNavigation();
  newsArchive();
  popoverGlobalInit();
  popoverLocalInit();
  questionnaireInteraction();
  searchFilterView();
  sessionExpiredDialog();
  setupExpandContent();
  setupFormValidation();
  setupNestedCheckboxes();
  setupOnKeypress();
  setupSelectableCheckbox();
  setupTruncateLines();
  setValidatorSettings();
  subscribe();
  toggleFilter();
  toggleInstant();
  tooltip();
  uniformHeight();

  $.fn.modal.Constructor.prototype._enforceFocus = function() {
    $(document)
      .off('focusin.bs.modal')
      .on('focusin.bs.modal', $.proxy(function(event) {
        if (document !== event.target &&
            this._element !== event.target &&
            !$(this._element).has(event.target).length
            && !$(event.target).hasClass('popover')
            && !$(event.target).closest('.popover').length > 0) {
          this._element.focus();
        }
      }, this));
  };
  function setupForm1() {
    $('body').off('focus', '#contactForm', setupForm1);
    setupFormValidation('#contactForm', '#a-js-contactForm-submit');
  }
  function setupForm2() {
    $('body').off('focus', '#contactForm2', setupForm2);
    setupFormValidation('#contactForm2', '#a-js-contactForm-submit2');
  }
  $('body').on('focus', '#contactForm', setupForm1);
  $('body').on('focus', '#contactForm2', setupForm2);

  function errorMessageCallback(type) {
    if (type === 'ext') {
      // Prefix to error message where the user tried to upload a forbidden file type
      return 'Tillatte filtyper';
    } else if (type === 'size') {
      // Prefix to error message where the user tried to upload a file which is too big
      return 'Maksimum filstørrelse';
    }
    return 'Det oppstod en feil';
  }
  listenForAttachmentChanges('#js-attachmentForm', errorMessageCallback);
};
window.infoportalInit();
// $(document).foundation();
