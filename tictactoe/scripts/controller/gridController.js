/**
 * Created by Arabella Brayer on 20/02/17.
 */



function GridController(model, view) {
    "use strict";

    this.model = model;
    this.view = view;
}



GridController.prototype.update = function () {
    "use strict";

    this.view.drawAll(); // update the whole view of the grid.
};
