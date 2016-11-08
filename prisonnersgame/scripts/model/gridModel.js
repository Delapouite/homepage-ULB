/**
 * Created by Arabella Brayer on 8/11/2016.
 */

function Grid(nbCols, nbRows) {
    "use strict";
    this.setDim(nbCols, nbRows);
}

Grid.prototype.initMatrix = function () {
    var arr = [];
    for (var i=0; i < this.getNbRows(); i++) {
        arr[i] = [];
        for(var j=0; j < this.getNbCols(); j++) {
            arr[i][j] = new Cell();
        }
    }

    return arr;
};

Grid.prototype.doDefect = function (x, y) {
    "use strict";

    console.assert(Number.isInteger(x), x);
    console.assert(Number.isInteger(y), y);

    var key = this.coordsToKey(x, y);

    delete this.cooperatingCells[key];
};


Grid.prototype.doCooperate = function (x, y) {
    "use strict";

    console.assert(Number.isInteger(x), x);
    console.assert(Number.isInteger(y), y);

    var key = this.coordsToKey(x, y);

    this.cooperatingCells[key] = null;
};


Grid.prototype.coordsToKey = function (x, y) {
    console.assert(Number.isInteger(x), x);
    console.assert(Number.isInteger(y), y);
    console.assert((0 <= x) && (x < this.getNbCols()), x);
    console.assert((0 <= y) && (y < this.getNbRows()), y);

    return x + "," + y;
};


Grid.prototype.getAliveAndNeighborsCells = function () {
    "use strict";
// TODO refactoring, this is not adapted here
    // Builds a set of all "x,y" that are cooperate cells or their neighbors
    var set = {};  // associative array used like as set of keys
    var key;
    var x;
    var y;
    var neighborX;
    var neighborY;

    for (key in this.cooperatingCells) {
        key = this.keyToCoords(key);
        x = key[0];
        y = key[1];

        // For each neighbor of cell (x, y)
        for (neighborY = this.getFloorY(y); neighborY <= this.getCeilY(y); ++neighborY) {
            for (neighborX = this.getFloorX(x); neighborX <= this.getCeilX(x); ++neighborX) {
                set[this.coordsToKey(neighborX, neighborY)] = null;
            }
        }
    }


    // Converts set to an array of [x, y]
    var cells = [];

    for (key in set) {
        cells.push(this.keyToCoords(key));
    }

    return cells;
};


Grid.prototype.getCeilX = function (x) {
    "use strict";

    return Math.min(this.nbCols - 1, x + 1);
};


Grid.prototype.getCeilY = function (y) {
    "use strict";

    return Math.min(this.nbRows - 1, y + 1);
};


Grid.prototype.getCellsToBeReversed = function () {
    "use strict";

    var cells = this.getAliveAndNeighborsCells();
    var i;
    var x;
    var y;
    var cellsToBeReversed = [];

    for (i = 0; i < cells.length; ++i) {
        x = cells[i][0];
        y = cells[i][1];
        if (this.hasToCooperate(x, y) !== this.cooperate(x, y)) {
            cellsToBeReversed.push([x, y]);
        }
    }

    return cellsToBeReversed;
};


Grid.prototype.getFloorX = function (x) {
    "use strict";

    return Math.max(0, x - 1);
};


Grid.prototype.getFloorY = function (y) {
    "use strict";

    return Math.max(0, y - 1);
};


Grid.prototype.getNbCols = function () {
    "use strict";

    return this.nbCols;
};


Grid.prototype.getNbRows = function () {
    "use strict";

    return this.nbRows;
};


/**
 * Return true if the neighbour with highest score is cooperating
 * false otherwise
 *
 */
Grid.prototype.hasToCooperate = function (x, y) {
    "use strict";

    console.assert(Number.isInteger(x), x);
    console.assert(Number.isInteger(y), y);

    var nb = this.betterNeighbor(x, y);

    return (nb === 3) || (nb === 2 && this.cooperate(x, y));
};


Grid.prototype.cooperate = function (x, y) {
    "use strict";

    console.assert(Number.isInteger(x), x);
    console.assert(Number.isInteger(y), y);

    var key = this.coordsToKey(x, y);

    return (key in this.cooperatingCells);
};


Grid.prototype.keyToCoords = function (key) {
    console.assert(typeof key === "string");

    key = key.split(",");

    console.assert(key.length === 2);

    var x = parseInt(key[0], 10);
    var y = parseInt(key[1], 10);

    console.assert((0 <= x) && (x < this.getNbCols()), x);
    console.assert((0 <= y) && (y < this.getNbRows()), y);

    return [x, y];
};


Grid.prototype.betterNeighbor = function (x, y) {
    // TODO refactorign total
    "use strict";

    console.assert(Number.isInteger(x), x);
    console.assert(Number.isInteger(y), y);

    var nb = 0;
    var i;
    var j;

    for (j = this.getFloorY(y); j <= this.getCeilY(y); ++j) {
        for (i = this.getFloorX(x); i <= this.getCeilX(x); ++i) {
            if ((i !== x || j !== y) && this.cooperate(i, j)) {
                ++nb;
            }
        }
    }

    return nb;
};


Grid.prototype.printMatrix = function () {
    "use strict";

    var x;
    var y;
    var line;

    for (y = 0; y < this.getNbRows(); ++y) {
        line = (y < 10 ? " " : "") + y + "|";
        for (x = 0; x < this.getNbCols(); ++x) {
            line += (this.cooperate(x, y) ? "x" : ".");
        }
        console.log(line);
    }
};

Grid.prototype.printNbCooperatingNeighbors = function () {
    "use strict";

    var x;
    var y;
    var line;
    var nb;

    for (y = 0; y < this.getNbRows(); ++y) {
        line = (y < 10 ? " " : "") + y + "|";
        for (x = 0; x < this.getNbCols(); ++x) {
            nb = this.betterNeighbor(x, y);
            line += (nb > 0 ? this.betterNeighbor(x, y) : ".");
        }
        console.log(line);
    }
};


Grid.prototype.setDim = function (nbCols, nbRows) {
    "use strict";

    this.nbCols = nbCols;
    this.nbRows = nbRows;
    this.cellMatrix = this.initMatrix();  // associative array used like as set of keys
};
