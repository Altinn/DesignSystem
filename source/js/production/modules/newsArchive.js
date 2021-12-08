/* globals $ */

var newsArchive = function() {
  var page = 1;
  var numberOfItemsPerPage = 5;
  var rootSelector = '.a-newsArchive';
  var articleCssSelector = '.a-linkArticle';
  var $loadMoreButton = $('.a-btn-loadMore');
  var articlesCount = $(articleCssSelector).length;

  function visibleItems() {
    return page * numberOfItemsPerPage;
  }

  function setButtonVisibility() {
    if (articlesCount <= visibleItems()) {
      $loadMoreButton.hide();
    }
  }

  if ($(rootSelector).length > 0) {
    $loadMoreButton.on('click', function() {
      var articles;
      page += 1;
      $(':nth-child(n+' + (visibleItems() + 1) + ')' + articleCssSelector).hide();
      $(':nth-child(-n+' + visibleItems() + ')' + articleCssSelector).show();
      setButtonVisibility();
    });

    setButtonVisibility();
  }
};
