/**
 * Created by Arabella Brayer on 20/02/17.
 */

var NB_CELLS = 9; // nb of cell to fill.
var NB_LINES = 3;
"use strict";


// tictactoe is an array of lenght 9. Only display consider it as a grid.
class Game {

    constructor(playerX, playerO){

        console.assert(playerX != null);
        console.assert(playerO != null);

        this.board = new Array(NB_CELLS);
        this.board.fill(" ");
        // this.board is [" ",*9]

        this.playerX = playerX;
        this.playerO = playerO;

        this.playerX_turn = this.whosTurn();

        if(this.playerX_turn){
            console.log("X starts to play");
        } else {
            console.log("O starts to play");
        }
        this.playerX.available_moves(this.board);
        this.playerO.available_moves(this.board);
    }


    whosTurn () {
        return Math.random() < 0.5 ? true : false;
    }
}


