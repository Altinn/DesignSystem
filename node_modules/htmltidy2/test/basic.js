var tidy = require('../htmltidy').tidy;
var expect = require('expect.js');
var fs  = require('fs');



describe('Htmltidy2 Basic ', function () {
	

	it('Test 1 : ', function (done) {
		
		var fix = fs.readFileSync(__dirname + '/fixtures/basic.html',"utf8");
		var exp = fs.readFileSync(__dirname + '/expected/basic.html',"utf8");	

		tidy(fix, function(err, html) {
		  	expect(err).to.exist;
		  	expect(html).to.eql(exp);	
		  	done();
		});


	});	

});