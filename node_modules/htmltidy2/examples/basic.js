
var tidy = require('../htmltidy').tidy;
var fs  = require('fs');
var text = '<table><tr><td>badly formatted html</tr>';

// default options
tidy(text, function(err, html) {
  // If the user has enabled warning messages, show them.
  if(err){
    console.log(err);
  }
  fs.writeFileSync('./test/expected/basic.html', html, 'utf8');
  console.log(html);
});



