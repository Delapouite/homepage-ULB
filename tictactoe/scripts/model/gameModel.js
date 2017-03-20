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
        let i;
        let currentPlayer = this.playerX_turn ? this.playerX : this.playerO;
        for (i = 0; i < WINNINGS.length; i++){
            let cells_are_equals = this.board[WINNINGS[i][0]] === this.board[WINNINGS[i][1]];
            cells_are_equals &= this.board[WINNINGS[i][1]] === this.board[WINNINGS[i][2]];
            let cells_are_not_empty = (this.board[WINNINGS[i][0]] != " ");
            if (cells_are_equals && cells_are_not_empty){
                return true;
            }
        }
        return false;
    }

    /**
     * Returns the left cells to play.
     *
     * @param board : the current array that represents the current game
     * @return {Array} the free cells left in an array
     */
    static available_moves(board){

        console.assert(board instanceof Array, board);

        let result = new Array();
        for (let i = 0; i < NB_CELLS; i++) {
            if(board[i] === ' '){
                result.push(i);
            }
        }
        // console.log("Game::available_moves");
        return result;
    }
}


