/* global PluginUIExtension, $ */
var PluginUIExtension = {

  /**
   * The function defined as the onready callback within the plugin configuration.
   */
  init: function () {
    var $nav = $('#pl-pattern-nav-target');
    $nav.prepend(/*NAVLINKS-BEFORE-SNIPPET*/);
    $nav.append(/*NAVLINKS-AFTER-SNIPPET*/);

    var $rightList = $('.sg-checklist');
    $rightList.prepend(/*GEARLINKS-BEFORE-SNIPPET*/);
    $rightList.find('#sg-find').before(/*GEARLINKS-BEFORESEARCH-SNIPPET*/);
  }
};
