/**
 * Created by Arabella Brayer on 20/02/17.
 */

"use strict";

class GridController{
    constructor(model, view) {
        console.assert(model instanceof Game, model);
        console.assert(view instanceof GridView, view);

        this.model = model;
        this.view = view;

        console.log("GridController created");
    }

    playOneTurnRandomly() {
        this.model.playOneTurnRandomly();
        this.model.playerX_turn = true;
        this.update();
    }

    playThisCell(x) {
        this.model.playThisCell(x);
        this.model.playerX_turn = false;
        this.update();
    }

    update () {
        this.view.drawAll(); // update the whole view of the grid.
        this.view.updateWhosTurn(); // update the name of the current player etc.
    }


}




