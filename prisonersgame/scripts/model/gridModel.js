/**
 * Created by Arabella Brayer on 8/11/2016.
 */

function Grid(nbCols, nbRows, T, R, P, S, mode) {
    "use strict";

    this.setDim(nbCols, nbRows);
    this.initMatrix(nbCols, nbRows); // init this.cellMatrix
    this.t = T;
    this.r = R;
    this.p = P;
    this.s = S;
    this.mode = mode;
}

Grid.prototype.initMatrix = function (nbCols, nbRows) {
    "use strict";

    this.cellMatrix = this.generateMatrix(nbCols, nbRows);

    this.cleanCount();
    for (var i=0; i < nbCols; i++) {
        for(var j=0; j < nbRows; j++) {
            var state = Math.round(Math.random()+1);
            if(state == COOPSTATE){
                this.nbCoops++;
            } else {
                this.nbDefect++;
            }
            this.cellMatrix[i][j].setAction(state);
        }
    }
};

Grid.prototype.getRate = function () {
    return this.nbCoops / (this.nbRows * this.nbCols);
};


Grid.prototype.generateMatrix = function (nbCols, nbRows) {
    "use strict";
    var arr = [];
    for (var i=0; i < nbCols; i++) {
        arr[i] = [];
        for(var j=0; j < nbRows; j++) {
            arr[i][j] = new Cell();
        }
    }
    return arr;
};

Grid.prototype.changePayoff = function(selectedVar){
    switch (selectedVar){
        case TMINUS:
            this.t--;
            break;
        case TPLUS:
            this.t++;
            break;
        case RMINUS:
            this.r--;
            break;
        case RPLUS:
            this.r++;
            break;
        case PMINUS:
            this.p--;
            break;
        case PPLUS:
            this.p++;
            break;
        case SMINUS:
            this.s--;
            break;
        case SPLUS:
            this.s++;
            break;
    }
    this.initMatrix(this.nbCols, this.nbRows);
};

Grid.prototype.xchangeMode = function () {
    if(this.mode == MOORE){
        this.mode = VN;
    } else {
        this.mode = MOORE;
    }
    this.initMatrix(this.nbCols, this.nbRows);
};

Grid.prototype.cleanCount = function () {
    this.nbCoops = 0;
    this.nbDefect = 0;
};

Grid.prototype.doDefect = function (x, y) {
    "use strict";

    console.assert(Number.isInteger(x), x);
    console.assert(Number.isInteger(y), y);

    delete this.cellMatrix[x][y];
};


Grid.prototype.doCooperate = function (x, y) {
    "use strict";

    console.assert(Number.isInteger(x), x);
    console.assert(Number.isInteger(y), y);

    this.cellMatrix[x][y].setAction(COOPSTATE);
};


Grid.prototype.getNbCols = function () {
    "use strict";

    return this.nbCols;
};


Grid.prototype.getNbRows = function () {
    "use strict";

    return this.nbRows;
};


Grid.prototype.cooperate = function (x, y) {
    "use strict";

    console.assert(Number.isInteger(x), x);
    console.assert(Number.isInteger(y), y);

    return (this.cellMatrix[x][y].action == COOPSTATE);
};

/**
 * Compute the scores for all cell in the matrix.
 */
Grid.prototype.computeScores = function () {
    "use strict";

    var x;
    var y;
    for(x=0; x < this.nbCols; x++){
        for(y=0; y < this.nbRows; y++){
            this.computeScore(x, y);
        }
    }
};

Grid.prototype.isMooreMode = function () {
    return this.mode == MOORE;
};

Grid.prototype.computeScore = function (x, y) {
    "use strict";

    if(this.isMooreMode()){
        this.computeScoreMoore(x, y);
    } else {
        this.computeScoreVonNeumann(x, y);
    }
};

Number.prototype.mod = function(n) {
    var m = (( this % n) + n) % n;
    return m < 0 ? m + Math.abs(n) : m;
};

Grid.prototype.computeScoreMoore = function (x, y) {
    "use strict";

    for(var countx = -1; countx <= 1; countx++){
        for(var county = -1; county <= 1; county++){
            if (!(countx == 0 && county == 0)){
                this.cellMatrix[x][y].addScore(this.getScore(this.cellMatrix[x][y].action, this.cellMatrix[(x + countx).mod(this.nbCols)][(y + county).mod(this.nbRows)].action));
                // console.log("cell xy: "+x+":"+y+ "-> " + this.getScore(this.cellMatrix[x][y].action, this.cellMatrix[(x + countx).mod(this.nbCols)][(y + county).mod(this.nbRows)].action));
            }
        }
    }
};

Grid.prototype.getScore = function (action1, action2) {
    "use strict";

    if(action1 == COOPSTATE){
        if(action2 == COOPSTATE){
            return this.r;
        } else { // player 2 defects
            return this.s;
        }
    } else { // player 1 defects
        if(action2 == COOPSTATE){
            return this.t;
        } else {
            return this.p;
        }
    }
};

Grid.prototype.computeScoreVonNeumann = function (x, y) {
    "use strict";

    this.cellMatrix[x][y].addScore(this.getScore(this.cellMatrix[x][y].action, this.cellMatrix[(x - 1).mod(this.nbCols)][y].action));
    this.cellMatrix[x][y].addScore(this.getScore(this.cellMatrix[x][y].action, this.cellMatrix[x][(y - 1).mod(this.nbRows)].action));
    this.cellMatrix[x][y].addScore(this.getScore(this.cellMatrix[x][y].action, this.cellMatrix[x][(y + 1).mod(this.nbRows)].action));
    this.cellMatrix[x][y].addScore(this.getScore(this.cellMatrix[x][y].action, this.cellMatrix[(x + 1).mod(this.nbCols)][y].action));
};

Grid.prototype.computeNewGrid = function () {
    "use strict";
    var newGrid = new Grid(this.nbCols, this.nbRows, this.t , this.r, this.p, this.s, this.mode);
    for(var x=0; x < this.nbCols; x++){
        for(var y=0; y < this.nbRows; y++){
            newGrid.cellMatrix[x][y].action = this.getBestNeighborAction(x, y);
        }
    }
    return newGrid;
};


Grid.prototype.getBestNeighborAction = function (x, y) {
    "use strict";

    console.assert(Number.isInteger(x), x);
    console.assert(Number.isInteger(y), y);

    var maxi = -80000; // infini
    var action = NOACTION;
    if(this.isMooreMode()){
        for(var countx = -1; countx <= 1; countx++){
            for(var county = -1; county <= 1; county++){
                if(this.cellMatrix[(x + countx).mod(this.nbCols)][(y + county).mod(this.nbRows)].score > maxi){
                    maxi = this.cellMatrix[(x + countx).mod(this.nbCols)][(y + county).mod(this.nbRows)].score;
                    action = this.cellMatrix[(x + countx).mod(this.nbCols)][(y + county).mod(this.nbRows)].action;
                }
            }
        }
    } else { // vn mode
        [maxi, action] = [this.cellMatrix[x][y].score, this.cellMatrix[x][y].action];
        [maxi, action] = this.compareNeibVN(this.cellMatrix[(x - 1).mod(this.nbCols)][y].score, maxi, action, this.cellMatrix[(x - 1).mod(this.nbCols)][y].action);
        [maxi, action] = this.compareNeibVN(this.cellMatrix[x][(y - 1).mod(this.nbRows)].score, maxi, action, this.cellMatrix[x][(y - 1).mod(this.nbRows)].action);
        [maxi, action] = this.compareNeibVN(this.cellMatrix[x][(y + 1).mod(this.nbRows)].score, maxi, action, this.cellMatrix[x][(y + 1).mod(this.nbRows)].action);
        [maxi, action] = this.compareNeibVN(this.cellMatrix[(x + 1).mod(this.nbCols)][y].score, maxi, action, this.cellMatrix[(x + 1).mod(this.nbCols)][y].action);
    }
    // console.log("getBestNeighborAction x y" + x +":" + y + ":::" + action);
    return action;
};

Grid.prototype.compareNeibVN = function (score1, score2, action1, action2) {
    if(score2 > score1){
        return action2;
    } else {
        return action1;
    }
};

Grid.prototype.printMatrix = function () {
    "use strict";

    var x;
    var y;
    var line;

    for (y = 0; y < this.getNbRows(); ++y) {
        line = (y < 10 ? " " : "") + y + "|";
        for (x = 0; x < this.getNbCols(); ++x) {
            line += (this.cooperate(x, y) ? "c" : "d");
        }
        console.log(line);
    }
};

Grid.prototype.printScores = function () {
    "use strict";

    var x;
    var y;
    var line;
    var nb;

    for (y = 0; y < this.getNbRows(); ++y) {
        line = (y < 10 ? " " : "") + y + "|";
        for (x = 0; x < this.getNbCols(); ++x) {
            line += (this.cellMatrix[x][y].score + "-");
        }
        console.log(line);
    }
};


Grid.prototype.setDim = function (nbCols, nbRows) {
    "use strict";

    this.nbCols = nbCols;
    this.nbRows = nbRows;
    this.initMatrix(nbCols, nbRows);
};

Grid.prototype.setMode = function (newMode) {
    this.mode = newMode;
    this.initMatrix(this.nbCols, this.nbRows);
};