/**
 * Created by Arabella Brayer on 20/02/17.
 */


"use strict";

class GridController{
    constructor(model, view) {
        console.assert(typeof (model) == "object");
        console.assert(typeof (view) == "object");

        this.model = model;
        this.view = view;

        console.log("GridController created");
    }

    update () {
        this.view.drawAll(); // update the whole view of the grid.
    }

}




