var articleAnchors = function() {
  if ($('.a-breadcrumb').length > 0 && $('.sg-pattern-category').length === 0) {
    window.anchors.options.placement = 'left';
    window.anchors.options.class = 'a-sg-anchor';
    window.anchors.add('h2');
    window.anchors.add('h3');
  }
};
