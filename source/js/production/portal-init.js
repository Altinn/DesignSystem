/*
  globals
  AltinnDropdown,
  AltinnModal,
  AltinnQuickhelp
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
  mobileNavigation,
  nameChecker,
  onboarding,
  onConfirmDeletionClick,
  onFileInputChange,
  popoverGlobalInit,
  popoverLocalInit,
  questionnaireInteraction,
  searchFilterView,
  setupAddRightsHandler,
  setupExpandContent,
  setupListRowSelect,
  setupNestedCheckboxes,
  setupOnKeypress,
  setupSelectableCheckbox,
  setupTruncateLines,
  setValidatorSettings,
  toggleFilter,
  toggleInstant,
  toggleSwitch,
  tooltip,
  truncateBoxButtonNames,
  uniformHeight,
  window,
*/

window.portalInit = function() {
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

  AltinnModal.init();
  AltinnDropdown.init();
  AltinnQuickhelp.init();
  addListExpandHandler();
  addListSortHandler();
  autoFootnotes();
  cardsToggle();
  contactForm();
  feedbackToggle();
  formatOrgNr();
  handleFocus();
  initializeDatepicker();
  mobileNavigation();
  onConfirmDeletionClick();
  onFileInputChange();
  popoverGlobalInit();
  popoverLocalInit();
  searchFilterView();
  setupExpandContent();
  setupListRowSelect();
  setupNestedCheckboxes();
  setupOnKeypress();
  setupSelectableCheckbox();
  setupTruncateLines();
  setValidatorSettings();
  toggleFilter();
  toggleInstant();
  toggleSwitch();
  tooltip();
  truncateBoxButtonNames();
};
window.portalInit();
