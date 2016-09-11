/**
 * Created by Arabella Brayer on 7/09/16.
 */

function Grid(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.matrix = initMatrix(cols);
}

Grid.prototype.awake = function(x, y) {
    if(!(y in this.matrix[x])) {
        this.matrix[x][y] = true;
    }
};

Grid.prototype.asleep = function (x, y) {
    delete this.matrix[x][y];
};

Grid.prototype.isAlive = function(x, y) {
    return y in this.matrix[x];
};

Grid.prototype.setDim = function (x, y) {
    this.cols = x;
    this.rows = y;
    this.matrix = initMatrix(x);
};

Grid.prototype.getCells = function () {
//    returns the set of all alive cells
    var allCells = [];
    for(var x =0; x < this.cols; x++) {
        for(var cell in this.matrice[x]) {
            allCells.push([cell, x]);
        }
    }
    return allCells;
};

Grid.prototype.getFloorX = function (x) {
    return (x - 1 < 0 ? 0 : x - 1);
};

Grid.prototype.getFloorY = function (y) {
    return (y - 1 < 0 ? 0 : y - 1);
};

Grid.prototype.getCeilX = function (x) {
    return (x + 1 >= this.cols ? x : x + 1);
};

Grid.prototype.getCeilY = function (y) {
    return (y + 1 >= this.rows ? y : y + 1);
};

Grid.prototype.hasToBeAwaked = function (x, y) {
    /*
    return true if 3 alive cells are around, or 2 and the state is currently alive, false otherwise
     */
    var aliveAround = 0;

    for(var i = this.getFloorX(x); i <= this.getCeilX(x); i++) {
        for (var j = this.getFloorY(y); j <= this.getCeilY(y); j++) {
            if((i != x || j != y) && this.isAlive(i, j)) {
                aliveAround++;
            }
        }
    }
    return ( (aliveAround == 3) || (aliveAround == 2 && this.isAlive(x, y)) );
};

function initMatrix(cols) {
     var mat = new Object(); // reinit : erase the previous matrice if data in it
    for(var i =0; i < cols; i++) {
        mat[i] = new Object(); // init de toutes les lignes.
    }
    return mat;
}
