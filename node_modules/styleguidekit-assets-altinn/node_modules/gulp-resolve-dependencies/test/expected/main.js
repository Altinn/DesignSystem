console.log('lib2.js');

/**
 * @requires lib2.js/lib2.js
 */
console.log('lib.js');

/**
 * @requires ../libs/lib.js
 * @requires ../libs/lib2.js/lib2.js
 */
console.log('test.js');

/**
 * @requires test/test.js
 */
console.log('main.js');
