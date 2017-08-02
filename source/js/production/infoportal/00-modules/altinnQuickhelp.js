/* globals currentRequest, AltinnQuickhelp */
/* globals AltinnQuickhelp:true */
AltinnQuickhelp = {
  listeners: function(target) {
    var that = this;
    $('.a-stickyHelp-search').find('input').on('keyup', function(e) {
      var keyCode = e.keyCode || e.which;
      if (keyCode === 13 && encodeURIComponent($(this)[0].value).length > 0) {
        that.nextquickhelpPage({
          url: $('#a-stickyHelp').attr('data-api') +
            encodeURIComponent($(this)[0].value) + '/' + $('html').attr('lang'),
          target: target
        });
      }
    });
    $('.a-stickyHelp-search').find('button').on('click', function(e) {
      if (encodeURIComponent($('.a-js-stickyhelpSearch')[0].value).length > 0) {
        that.nextquickhelpPage({
          url: $('#a-stickyHelp').attr('data-api') +
            encodeURIComponent($('.a-js-stickyhelpSearch')[0].value) + '/' +
            $('html').attr('lang'),
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
      var quickhelpPage = $('<div/>', { class: 'quickhelpPage', html: data });
      var current; var existingPages; var newPage; var newPageIndex;
      existingPages = $(settings.target + ' :data(page-index)');
      newPageIndex = existingPages.length + 1;
      newPage = $('<div/>', {
        class: 'a-page a-next-page',
        data: { 'page-index': newPageIndex },
        html: quickhelpPage
      });
      $(settings.target + ' .a-stickyHelp-content-target').append(newPage);
      $(settings.target).animate({ scrollTop: 0 }, 20);
      current = $(settings.target + ' .a-current-page');
      setTimeout(function() {
        current.removeClass('a-current-page').addClass('a-previous-page');
        newPage.removeClass('a-next-page').addClass('a-current-page');
        $(newPage).data();
      }, 0);
      current.on('transitionend', function() {
        if (settings.clearHistory) {
          $(settings.target + ' :data(page-index)').not('.a-current-page')
            .remove();
        } else {
          current.off();
        }
      });
      $('#a-js-stickyHelp-back').addClass('d-block');
    });
  },
  previousquickhelpPage: function(settings) {
    var current; var allPages; var previous; var pagesToPop;
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
    var that = this; that.listeners('#a-stickyHelp');
    $('body').on('click', '[data-toggle="quickhelp"]', function() {
      var $source = $(this);
      if ($source.data().action === 'next') {
        that.nextquickhelpPage({
          url: $source.data().url, target: $source.data().target
        });
      } else if ($source.data().action === 'back') {
        that.previousquickhelpPage({
          target: $source.data().target, pagesToPop: $source.data().pages
        });
      }
    });
    $('.a-current-page').data({ 'page-index': 1 });
    $('.a-js-stickyHelpCategory')
      .html($('#a-stickyHelp').find('.a-stickyHelp-content-target')
        .attr('data-category')
      );
    $('.a-js-stickyHelpCategoryLink').attr('data-url', $('#a-stickyHelp')
        .find('.a-stickyHelp-content-target').attr('data-url')
      );
    $('body').on('click', '.a-stickyHelp-open', function() {
      if (!$('.a-js-stickyHelpFrame').attr('src')) {
        $('.a-js-stickyHelpFrame')
          .attr('src', $('.a-js-stickyHelpFrame').attr('data-src'));
      }
    });
    if ($('.quickhelpPage').find('.a-text').length !== 0) {
      $('.quickhelpPage').parent('.a-page').addClass('a-page-hasArticleInside');
    }
  }
};
