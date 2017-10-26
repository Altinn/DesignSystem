/* globals
  colnavCustom,
  genericSearch,
  questionnaireInteraction,
  uniformHeight,
  articleAnchors,
  subscribe,
  setupFormValidation,
  listenForAttachmentChanges,
  newsArchive
  formatOrgNr,
  cardsToggle,
  onConfirmDeletionClick,
  setupListRowSelect,
  toggleSwitch,
  truncateBoxButtonNames,
  onFileInputChange,
  questionnaireInteraction,
  colnavCustom,
  handleFocus,
  mobileNavigation,
  toggleFilter,
  uniformHeight,
  tooltip,
  initializeDatepicker,
  onboarding,
  nameChecker,
  codeLookup,
  setupAddRightsHandler,
  onFileInputChange,
  toggleInstant,
  addListExpandHandler,
  addListSortHandler,
  setupListRowSelect,
  setupOnKeypress,
  genericSearch,
  toggleInstant,
  articleAnchors,
  feedbackToggle,
  setValidatorSettings,
  autoFootnotes,
  popoverLocalInit,
  popoverGlobalInit,
  setupSelectableCheckbox,
  window,
  setupTruncateLines,
  AltinnModal,
  setupExpandContent,
  AltinnDropdown,
  setupNestedCheckboxes,
  searchFilterView,
  AltinnQuickhelp
*/
window.infoportalInit = function() {
  colnavCustom();
  genericSearch();
  questionnaireInteraction();
  uniformHeight();
  articleAnchors();
  subscribe();
  setupFormValidation();
  listenForAttachmentChanges();
  newsArchive();
  setValidatorSettings();
  addListExpandHandler();
  setupOnKeypress();
  handleFocus();
  initializeDatepicker();
  addListSortHandler();
  mobileNavigation();
  toggleFilter();
  tooltip();
  toggleInstant();
  feedbackToggle();
  autoFootnotes();
  popoverLocalInit();
  popoverGlobalInit();
  setupSelectableCheckbox();
  setupTruncateLines();
  setupExpandContent();
  AltinnModal.init();
  AltinnDropdown.init();
  AltinnQuickhelp.init();
  setupNestedCheckboxes();
  searchFilterView();
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
