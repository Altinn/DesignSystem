/* globals currentRequest, AltinnQuickhelp */
/* globals AltinnQuickhelp:true */
AltinnQuickhelp = {
  loadQuickhelp: function(settings) {
    var that = this;
    var currentRequest = $.ajax({
      url: settings.url,
      beforeSend: function() {
        if (typeof currentRequest !== 'undefined') {
          currentRequest.abort();
        }
      }
    }).done(function(data) {
      var quickhelpPage = $('<div/>', {
        class: 'a-quickhelpPage-start',
        id: 'a-js-quickhelpPage',
        html: data
      });
      var page = $('<div/>', {
        class: 'a-page a-current-page',
        data: {
          'page-index': 1
        },
        html: quickhelpPage
      });
      $(settings.target + ' .a-stickyHelp-content-target').append(page);
      $(settings.target).find('.a-current-page').first().data();
      $('.a-js-stickyHelpCategory').html($(settings.target).find('.a-stickyHelp-content-target').attr('data-category'));
      $('.a-js-stickyHelpCategoryLink').attr('data-url', $(settings.target).find('.a-stickyHelp-content-target').attr('data-url'));
    });
  },
  listeners: function(target) {
    var that = this;
    $('.a-stickyHelp-search').find('input').on('keyup', function(e) {
      var keyCode = e.keyCode || e.which;
      if (keyCode === 13 && encodeURIComponent($(this)[0].value).length > 0) {
        that.nextquickhelpPage({
          url: 'http://altinn-dev.dev.bouvet.no/api/quicksearch/' + encodeURIComponent($(this)[0].value) + '/no',
          target: target
        });
      }
    });
    $('.a-stickyHelp-search').find('button').on('click', function(e) {
      if (encodeURIComponent($('.a-js-stickyhelpSearch')[0].value).length > 0) {
        that.nextquickhelpPage({
          url: 'http://altinn-dev.dev.bouvet.no/api/quicksearch/' + encodeURIComponent($('.a-js-stickyhelpSearch')[0].value) + '/no',
          target: target
        });
      }
    });
  },
  nextquickhelpPage: function(settings) {
    var currentRequest = $.ajax({
      url: settings.url,
      beforeSend: function() {
        if (typeof currentRequest !== 'undefined') {
          currentRequest.abort();
        }
      }
    }).done(function(data) {
      var current;
      var quickhelpPage = $('<div/>', {
        class: 'quickhelpPage',
        html: data
      });
      var existingPages;
      var newPage;
      var newPageIndex;
      existingPages = $(settings.target + ' :data(page-index)');
      newPageIndex = existingPages.length + 1;
      newPage = $('<div/>', {
        class: 'a-page a-next-page',
        data: {
          'page-index': newPageIndex
        },
        html: quickhelpPage
      });
      $(settings.target + ' .a-stickyHelp-content-target').append(newPage);
      $(settings.target).animate({
        scrollTop: 0
      }, 20);
      current = $(settings.target + ' .a-current-page');
      setTimeout(function() {
        current.removeClass('a-current-page').addClass('a-previous-page');
        newPage.removeClass('a-next-page').addClass('a-current-page');
        $(newPage).data();
      }, 0);
      current.on('transitionend', function() {
        if (settings.clearHistory) {
          $(settings.target + ' :data(page-index)').not('.a-current-page').remove();
        } else {
          // current.hide().off();
          current.off();
        }
      });
      $('#a-js-stickyHelp-back').addClass('d-block');
    });
  },
  previousquickhelpPage: function(settings) {
    var current;
    var allPages;
    var previous;
    var pagesToPop;
    if (!settings.pagesToPop) {
      pagesToPop = 1;
    } else {
      pagesToPop = settings.pagesToPop;
    }
    current = $(settings.target + ' .a-current-page');
    allPages = $(settings.target + ' :data(page-index)');
    previous = allPages.filter(function() {
      return $(this).data('page-index') === allPages.length - 1;
    });
    // previous.show();
    previous.addClass('a-current-page').removeClass('a-next-page');
    current.removeClass('a-current-page').addClass('a-next-page');
    setTimeout(function() {
      previous.addClass('a-current-page').removeClass('a-previous-page');
    }, 0);
    current.on('transitionend', function() {
      var previousPages = allPages.filter(function() {
        return $(this).data('page-index') > allPages.length - pagesToPop;
      });
      previousPages.remove();
    });
    if (allPages.length === 2) {
      $('#a-js-stickyHelp-back').removeClass('d-block');
    }
  },
  init: function() {
    var that = this;
    that.listeners('#a-stickyHelp');
    that.loadQuickhelp({
      url: '../../patterns/03-maler-portal-_70-hurtighjelp-10-hurtighjelp-start/03-maler-portal-_70-hurtighjelp-10-hurtighjelp-start.markup-only.html',
      target: '#a-stickyHelp'
    });
    $('body').on('click', '[data-toggle="quickhelp"]', function() {
      var $source = $(this);
      if ($source.data().action === 'load') {
        that.loadQuickhelp({
          url: $source.data().url,
          target: $source.data().target
        });
      } else if ($source.data().action === 'next') {
        that.nextquickhelpPage({ url: $source.data().url,
          target: $source.data().target });
      } else if ($source.data().action === 'back') {
        that.previousquickhelpPage({
          target: $source.data().target,
          pagesToPop: $source.data().pages
        });
      }
    });
    if ($('.quickhelpPage').find('.a-text').length !== 0) {
      $('.quickhelpPage').parent('.a-page').addClass('a-page-hasArticleInside');
    }
  }
};
