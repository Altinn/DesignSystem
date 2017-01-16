var rewire = require('rewire');
var compareTo = rewire('../../source/js/production/00-modules/compareTo.js');
var tableSort = rewire('../../source/js/production/00-modules/tableSort.js');
var compareTo = tableSort.__get__('compareTo');

describe('Alphanumeric sorting', function() {
  describe('Compare two empty values', function() {
    it('returns result without change', function() {
      //  given
      var a;
      var b;
      //  when
      var result = compareTo(a, b);
      //  then
      assert.equal(result, 0);
    });
  });
  describe('Compare value to empty value', function() {
    it('returns positive value', function() {
      //  given
      var a;
      var b = 2;
      //  when
      var result = compareTo(a, b);
      //  then
      assert.equal(result, 1);
    });
  });
  describe('Compare value to empty value', function() {
    it('returns negative value', function() {
      //  given
      var a = 2;
      var b;
      //  when
      var result = compareTo(a, b);
      //  then
      assert.equal(result, -1);
    });
  });
  describe('Compare two equal values', function() {
    it('returns result without change', function() {
      //  given
      var a = 1;
      var b = 1;
      //  when
      var result = compareTo(a, b);
      //  then
      assert.equal(result, 0);
    });
  });
  describe('Compare two different values, first larger than second', function() {
    it('returns positive value', function() {
      //  given
      var a = 2;
      var b = 1;
      //  when
      var result = compareTo(a, b);
      //  then
      assert.equal(result, 1);
    });
  });
  describe('Compare two different values, second larger than first', function() {
    it('returns negative value', function() {
      //  given
      var a = 1;
      var b = 2;
      //  when
      var result = compareTo(a, b);
      //  then
      assert.equal(result, -1);
    });
  });
  describe('Compare two different characters, second larger than first', function() {
    it('returns negative value', function() {
      //  given
      var a = 'a';
      var b = 'b';
      //  when
      var result = compareTo(a, b);
      //  then
      assert.equal(result, -1);
    });
  });
  describe('Compare two equal characters', function() {
    it('returns result without change', function() {
      //  given
      var a = 'b';
      var b = 'b';
      //  when
      var result = compareTo(a, b);
      //  then
      assert.equal(result, 0);
    });
  });
  describe('Compare two different characters, first larger than second', function() {
    it('returns positive value', function() {
      //  given
      var a = 'b';
      var b = 'a';
      //  when
      var result = compareTo(a, b);
      //  then
      assert.equal(result, 1);
    });
  });
  describe('Compare number characters', function() {
    it('returns negative value', function() {
      //  given
      var a = '18';
      var b = '65';
      //  when
      var result = compareTo(a, b);
      //  then
      assert.equal(result, -1);
    });
  });
  describe('Compare character value to number value', function() {
    it('returns positive value', function() {
      //  given
      var a = 'a';
      var b = 65;
      //  when
      var result = compareTo(a, b);
      //  then
      assert.equal(result, 1);
    });
  });
  describe('Compare character value to equal number value', function() {
    it('returns result without change', function() {
      //  given
      var a = '65';
      var b = 65;
      //  when
      var result = compareTo(a, b);
      //  then
      assert.equal(result, 0);
    });
  });
});
