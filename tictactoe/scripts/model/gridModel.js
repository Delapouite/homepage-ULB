/**
 * Created by Arabella Brayer on 20/02/17.
 */

function Grid() {
    
}


var NB_COLS = 3;
var NB_ROWS = 3;


Grid.prototype.coordsToKey = function (x, y) {
    console.assert(Number.isInteger(x), x);
    console.assert(Number.isInteger(y), y);
    console.assert((0 <= x) && (x < this.getNbCols()), x);
    console.assert((0 <= y) && (y < this.getNbRows()), y);

    return x + "," + y;
};
