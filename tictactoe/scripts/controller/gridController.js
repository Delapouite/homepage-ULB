/**
 * Created by Arabella Brayer on 20/02/17.
 */



function GridController(model, view) {
    "use strict";

    console.assert(typeof (model) == Game);
    console.assert(typeof (view) == GridView);

    this.model = model;
    this.view = view;

    console.log("GridController created");
}



GridController.prototype.update = function () {
    "use strict";

    this.view.drawAll(); // update the whole view of the grid.
};
