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
        this.board.fill(" ");  // this.board is [" ",*9]

        this.playerX = playerX;
        this.playerO = playerO;

        this.playerX_turn = Game.randomWhosTurn();

        if (this.playerX_turn) {
            console.log("X starts to play");
        } else {
            console.log("O starts to play");
        }


    }

    printMatrix () {
        for(let i = 0; i < NB_LINES; i++){
            let result = "-----------\n";
            result += "|";
            for (let j = 0; j < NB_LINES; j++){
                result += this.board[i*NB_LINES+j] + " |";
            }
            console.log(result);
        }
        console.log("-----------\n");
    }

    playOneTurnRandomly () {
        if(!this.playerX_turn){
            this.board[this.playerO.play(this.board)] = this.playerO.char; // IA can start
        }
    }

    playThisCell(x) {
        // TODO add a lot of checks !!
        if(this.playerX_turn){
            this.board[x] = this.playerX.char;
        }
    }

    static randomWhosTurn () {
        return Math.random() < 0.5;
    }

    // TODO implement !!!
    static isFinished(board){
        return false;
    }

}


