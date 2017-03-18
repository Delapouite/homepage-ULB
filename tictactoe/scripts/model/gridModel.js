/**
 * Created by Arabella Brayer on 20/02/17.
 */

"use strict";
function Grid() {

}

var NB_CELLS = 9; // nb of cell to fill.
var NB_LINES = 3;
// tictactoe is an array of lenght 9. Only display consider it as a grid.

Grid.prototype.coordsToKey = function (x, y) {

    console.assert(Number.isInteger(x), x);
    console.assert(Number.isInteger(y), y);

    console.assert((0 <= x) && (x < this.NB_CELLS / this.NB_LINES, x));
    console.assert((0 <= y) && (y < this.NB_CELLS / this.NB_LINES, y));

    return x + "," + y;
};

Grid.prototype.printMatrix = function () {
    "use strict";

    var x;
    var y;
    var line;

    for (y = 0; y < this.getNbRows(); ++y) {
        line = (y < 10 ? " " : "") + y + "|";
        for (x = 0; x < this.getNbCols(); ++x) {
            line += (this.isAlive(x, y) ? "x" : ".");
        }
        console.log(line);
    }
};