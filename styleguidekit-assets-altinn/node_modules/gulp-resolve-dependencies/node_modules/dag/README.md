# dag

[![NPM Version](https://badge.fury.io/js/dag.png)](https://npmjs.org/package/dag) [![Build Status](https://travis-ci.org/floatdrop/dag.png?branch=master)](https://travis-ci.org/floatdrop/dag) [![Coverage Status](https://coveralls.io/repos/floatdrop/dag/badge.png?branch=master)](https://coveralls.io/r/floatdrop/dag) [![Code Climate](https://codeclimate.com/github/floatdrop/dag.png)](https://codeclimate.com/github/floatdrop/dag)

Helper for validating cyclic dependencies in [express-djinga](https://github.com/floatdrop/express-dinja).

## Usage

```js
var dag = new Dag();

dag.addEdge('A', 'B');
dag.addEdge('B', 'C');
dag.addEdge('C', 'A'); // Boom! Exception!
```

## License

The MIT License (MIT) © [Vsevolod Strukchinsky](floatdrop@gmail.com)
