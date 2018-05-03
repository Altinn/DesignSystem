
var http = require('http');
var tidy = require('../htmltidy');
var fs = require('fs');

// setup options
var opts = {
  doctype: 'html5',
  indent: true,
  bare: true,
  breakBeforeBr: true,
  hideComments: true,
  fixUri: true,
  wrap: 0
};

var worker = tidy.createWorker(opts);

http.get({
  host: "www.example.com",
  path: "/" },
  function (res) {
    res.pipe(worker).pipe(fs.createWriteStream('./test/expected/example.html'));
  });
