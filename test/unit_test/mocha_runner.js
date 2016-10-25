//  Mocha variables
var Mocha;
var mocha;
var runner;

//  chai
chai = require('chai');
assert = chai.assert;
expect = chai.expect;

// mocha
Mocha = require('mocha');
mocha = new Mocha();

mocha.reporter('spec').ui('tdd');

runner = mocha.run();
