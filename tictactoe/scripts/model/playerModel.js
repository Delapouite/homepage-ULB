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
     * Function that make the player do a choice.
     *
     * @param board current game
     * @returns {number} piece to play with
     */
    play(board, cell){
        let available_moves = Game.available_moves(board);
        if(cell in available_moves){
            console.log("ok you can play this");
            board[cell] = this.char;
        }
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

    play(board, cell){
        let available_moves = Game.available_moves(board);
        let coup = Math.floor(Math.random() * available_moves.length);
        return available_moves[coup];
    }

}