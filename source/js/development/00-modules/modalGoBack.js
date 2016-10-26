/* globals $, smoothState */
var goBack = function() {
  var arr = [];
  $('.container').addClass('a-tempAnim');
  Object.keys(smoothState.cache).forEach(function(key, index) {
    arr.push(key);
  });
  delete smoothState.cache[arr[arr.length - 1]];
  arr.splice(-1, 1);
  smoothState.load(arr[arr.length - 1]);
};
