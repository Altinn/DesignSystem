var tidy = require('../htmltidy').tidy;
var expect = require('expect.js');
var fs  = require('fs');



describe('Htmltidy2 Options ', function () {
	

	it('Test 1 : ', function (done) {
		
		var fix = fs.readFileSync(__dirname + '/fixtures/basic.html',"utf8");
		var exp = fs.readFileSync(__dirname + '/expected/options.html',"utf8");	
		var opts = {
			  doctype: 'html5',
			  indent: true,
			  bare: true,
			  breakBeforeBr: true,
			  hideComments: true,
			  fixUri: true,
			  wrap: 0
			};
		tidy(fix,opts, function(err, html) {
		  	expect(err).to.exist;
		  	expect(html).to.eql(exp);	
		  	done();
		});


	});	

});