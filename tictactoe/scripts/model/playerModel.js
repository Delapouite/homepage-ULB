/**
 * Created by Arabella Brayer on 17/03/2017.
 */

"use strict";

class Player {
    constructor() {
        // type here is obviously human.
        this.type = "human";
        this.score = 0;

    }

    start_game() {
        console.log("Start new game from player of type ", this.type);
    }
    update_score(gain) {
        this.score += gain;
    }

    display_reward(value, board){
        console.assert(value != null);
        console.log("Player::display_reward::Typeof value :", typeof (value));
        console.log("{} rewarded: {}").format(this.type, value);
    }

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
    }
}




class RandomPlayer extends Player {
    constructor() {
        // this is a stupid player that can only play without any strategy
        this.type = "random";
    }
}