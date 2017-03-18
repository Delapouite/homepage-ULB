/**
 * Created by Arabella Brayer on 17/03/2017.
 */

"use strict";

/**
 * This class build a player. The Player class is a human player.
 * It can be derived to obtain IA strategies.
 *
 */
class Player {

    /**
     * A player is defined by the char to note
     * @param char
     */
    constructor(char) {
        // type here is obviously human.
        this.type = "human";
        this.char = char;
        this.score = 0;

    }

    /**
     * Not sure that is useful...
     */
    start_game() {
        console.log("Start new game from player of type ", this.type);
    }

    /**
     * Update the current score to keep trace in case of several games.
     *
     * @param gain the nwe score to add
     */
    update_score(gain) {
        this.score += gain;
    }

    /**
     * Displays the current game on the web console.
     *
     * @param value
     * @param board
     */
    display_reward(value, board){
        console.assert(value != null);
        console.log("Player::display_reward::Typeof value :", typeof (value));
        console.log("{} rewarded: {}").format(this.type, value);
    }

    /**
     * Returns the left cells to play.
     *
     * @param board : the current array that represents the current game
     * @return {Array} the free cells left in an array
     */
    available_moves(board) {

        console.assert(typeof (board) ==  "object");

        var result = new Array();
        for(var i = 0; i < board.length; i++){
            result.push(i+1);
        }
        //
        // for(var i = 0; i < result.length; i++){
        //     console.log(result[i]);
        // }
        console.log("Player::available_moves");
        return result;
    }

    /**
     * Function that make the player do a choice.
     *
     * @param board current game
     * @returns {number} piece to play with
     */
    play(board){
        var available_moves = this.available_moves(board);
        return Math.random() * available_moves.length;
    }
}


/**
 * Class of a stupid automatic player : strategy random.
 */
class RandomPlayer extends Player {
    constructor(char) {
        super(char);
        // this is a stupid player that can only play without any strategy
        this.type = "random";
    }

    play(board){
        var available_moves = this.available_moves(board);
        return Math.random() * available_moves.length;
    }

}