var tidy = require('../htmltidy').tidy;
var expect = require('expect.js');
var fs  = require('fs');



describe('Htmltidy2 Complex ', function () {
	

	it('Test 1 : ', function (done) {
		
		var fix = fs.readFileSync(__dirname + '/fixtures/complex.html',"utf8");
		var exp = fs.readFileSync(__dirname + '/expected/complex.html',"utf8");

		tidy(fix, function(err, html) {
		  	expect(err).to.exist;
		  	expect(html).to.eql(exp);	
		  	done();
		});


	});	

});