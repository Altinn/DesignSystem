var tidy = require('../htmltidy').tidy;
tidy('<table><tr><td>badly formatted html</tr>', {
    showErrors: true, // `Error: write EPIPE` if set to true or false
}, function(err, html) {
    console.log(err); // also have to try to `console.log(err);``
});