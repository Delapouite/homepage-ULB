/**
 * Created by Arabella Brayer on 20/02/17.
 */

function Game(IA) {
    "use strict";

    console.assert(IA != null);

    this.iaPlayer = IA; // IA is an automatically player. Can have different level of AI.
    this.currentState = new State(); // initialize the State as an empty grid, it's X turn.

}
