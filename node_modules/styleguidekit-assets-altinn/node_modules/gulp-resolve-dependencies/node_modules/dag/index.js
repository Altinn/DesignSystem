'use strict';

var Dag = function Dag() {
    if (!(this instanceof Dag)) {
        return new Dag();
    }
    this._rEdges = {};
};

Dag.prototype.findCycle = function findCycle(verticle) {
    var self = this;
    function find(start) {
        if (!self._rEdges[start]) { return false; }
        for (var i = 0; i < self._rEdges[start].length; i++) {
            var parent = self._rEdges[start][i];
            if (parent === verticle || find(parent)) {
                return true;
            }
        }
        return false;
    }

    return find(verticle);
};

Dag.prototype.addEdge = function addEdge(from, to) {
    if (!this._rEdges[to]) {
        this._rEdges[to] = [];
    }

    this._rEdges[to].push(from);

    if (this.findCycle(from)) {
        throw new Error('Cycle found: ' + from + ' -> ' + to);
    }
};

module.exports = Dag;
