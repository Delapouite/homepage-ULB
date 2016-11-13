/**
 * Created by Arabella Brayer on 8/11/16.
 */
var NOACTION = 0;
var COOPSTATE = 1;
var DEFECTSTATE = 2;

function Cell() {
    "use strict";

    this.state = NOACTION;
    this.score = 0;
    this.n = 0; // FIXME give the n at the construction of object... Better ;)
}

Cell.prototype.setState= function(newState){
    this.state = newState;
};

Cell.prototype.setScore = function(newScore){
    this.score = newScore;
};

Cell.prototype.addScore = function (adding) {
    this.score += adding;
    this.n += 1;
};

Cell.prototype.cleanScore = function () {
    this.score = 0;
    this.n = 0;
};

Cell.prototype.getAverageScore = function () {
    return this.score / this.n;
};