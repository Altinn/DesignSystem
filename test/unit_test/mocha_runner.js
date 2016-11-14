//  Mocha variables
var Mocha;
var mocha;
var runner;
var rewire;

//  chai
chai = require('chai');
assert = chai.assert;
expect = chai.expect;

// mocha
Mocha = require('mocha');
mocha = new Mocha();

//  rewire
rewire = require('rewire');

mocha.reporter('spec').ui('tdd');

mocha.addFile('./test/unit_test/alphanumeric_sorting.js');

runner = mocha.run();
