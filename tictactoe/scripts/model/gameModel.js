/**
 * Created by Arabella Brayer on 20/02/17.
 */

var NB_CELLS = 9; // nb of cell to fill.
var NB_LINES = 3;
var WINNINGS = [[0,1,2], [0,3,6], [0,4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5],
    [6, 7, 8]];
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
        if(!this.hasWon() && !this.isFinished() && this.playerX_turn){
            this.board[x] = this.playerX.char;
        }
    }

    static randomWhosTurn () {
        return Math.random() < 0.5;
    }

    isFinished(){
        let i = 0;
        while (i < this.board.length){
            if(this.board[i] === ' '){
                return false;
            }
            i++;
        }
        return true;
    }

    hasWon(){
        let key;
        let currentPlayer = this.playerX_turn ? this.playerX : this.playerO;
        for (key in WINNINGS){
            if (this.board[key[0]] === currentPlayer.char && this.board[key[1]] === currentPlayer.char && this.board[key[2]] === currentPlayer.char){
                return true;
            }
        }
        return false;
    }

}


