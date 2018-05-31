/*
  globals
  $,
  _anchors,
  addListExpandHandler,
  addListSortHandler,
  articleAnchors,
  autoFootnotes,
  AltinnDropdown,
  AltinnModal,
  AltinnQuickhelp
  cardsToggle,
  certificateHandler,
  codeLookup,
  collapseInboxMessage,
  colnavCustom,
  contactForm,
  feedbackToggle,
  fixPatternLinks,
  formatOrgNr,
  genericSearch,
  handleFocus,
  hideIntroInSubs,
  initializeDatepicker,
  initSearchWithHighlight,
  insetVariations,
  iOS11BugWorkAround,
  listenForAttachmentChanges,
  mobileNavigation,
  nameChecker,
  newsArchive
  onboarding,
  onConfirmDeletionClick,
  onFileInputChange,
  popoverGlobalInit,
  popoverLocalInit,
  preOpenModals,
  prototypingInteractionStarteENK,
  questionnaireInteraction,
  searchFilterView,
  searchWithAutocomplete,
  selectAll,
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
  toggleArchivedState,
  toggleFilter,
  toggleInstant,
  toggleSavedEdit,
  toggleSelectProfiles,
  toggleSwitch,
  toggleTheme,
  tooltip,
  truncateBoxButtonNames,
  uniformHeight,
  window
*/

window.devInit = function() {
  _anchors();
  addListExpandHandler();
  addListSortHandler();
  articleAnchors();
  autoFootnotes();
  AltinnDropdown.init();
  AltinnModal.init();
  AltinnQuickhelp.init();
  cardsToggle();
  certificateHandler();
  codeLookup();
  collapseInboxMessage();
  colnavCustom();
  contactForm();
  feedbackToggle();
  fixPatternLinks();
  formatOrgNr();
  handleFocus();
  hideIntroInSubs();
  genericSearch();
  initializeDatepicker();
  insetVariations();
  initSearchWithHighlight();
  iOS11BugWorkAround();
  listenForAttachmentChanges();
  mobileNavigation();
  nameChecker();
  newsArchive();
  onboarding();
  onConfirmDeletionClick();
  onFileInputChange();
  popoverGlobalInit();
  popoverLocalInit();
  preOpenModals();
  prototypingInteractionStarteENK();
  questionnaireInteraction();
  searchFilterView();
  searchWithAutocomplete();
  selectAll();
  sessionExpiredDialog();
  setupAddRightsHandler();
  setupExpandContent();
  setupFormValidation();
  setupListRowSelect();
  setupNestedCheckboxes();
  setupOnKeypress();
  setupSelectableCheckbox();
  setupTruncateLines();
  setValidatorSettings();
  subscribe();
  toggleArchivedState();
  toggleFilter();
  toggleInstant();
  toggleSavedEdit();
  toggleSelectProfiles();
  toggleSwitch();
  toggleTheme();
  tooltip();
  truncateBoxButtonNames();
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
// This is added  here to test the session invalidation function
//  window.sessionValidation = {
//    timeout: 2,
//  loggedOutMessage: 'Du har vært inaktiv i mer enn 30 minutter, og er nå logget ut.',
//  loggedIn: true
// };
window.devInit();
$('.html-escape').each(function() {
  $(this).text($(this).html());
});
// $('form').validate();
