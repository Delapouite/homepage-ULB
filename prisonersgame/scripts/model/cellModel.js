/**
 * Created by Arabella Brayer on 8/11/16.
 */
var NOACTION = 0;
var COOPSTATE = 1;
var DEFECTSTATE = 2;

function Cell() {
    "use strict";

    this.action = NOACTION;
    this.score = 0;
}

Cell.prototype.setAction= function(newState){
    this.action = newState;
};

Cell.prototype.setScore = function(newScore){
    this.score = newScore;
};

Cell.prototype.addScore = function (adding) {
    this.score += adding;
};

Cell.prototype.cleanScore = function () {
    this.score = 0;
};
