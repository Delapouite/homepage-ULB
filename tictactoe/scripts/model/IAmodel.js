/**
 * Created by Arabella Brayer on 20/02/17.
 */

/**
 * This object is the IA player. It can play with three differents modes.
 *
 * @param mode 0 = random, 1 = with beginning IA, 2 : with MiniMax function
 * @constructor
 */

function IA(mode) {
    "use strict";
    console.assert(Number.isInteger(mode), mode);

    var gameMode = mode;
    var game = new Game();

}