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
}


Cell.prototype.setState= function(newState){
    this.state = newState;
};

Cell.prototype.setScore = function(newScore){

};