/**
 * Created by Arabella Brayer on 8/11/2016.
 */


function GridController(model, view) {
    "use strict";

    this.model = model;
    this.view = view;
}


GridController.prototype.nextStep = function () {
    "use strict";

    var cellsToBeReversed = this.model.getCellsToBeReversed();
    var i;
    var y;
    var x;

    for (i = 0; i < cellsToBeReversed.length; ++i) {
        x = cellsToBeReversed[i][0];
        y = cellsToBeReversed[i][1];

        if (this.model.cooperate(x, y)) {
            this.model.doDefect(x, y);
            this.view.doDefect(x, y);
        }
        else {
            this.model.doCooperate(x, y);
            this.view.doCooperate(x, y);
        }
    }
};


GridController.prototype.reverse = function (x, y) {
    "use strict";

    console.assert(Number.isInteger(x), x);
    console.assert(Number.isInteger(y), y);

    if (this.model.cooperate(x, y)) {
        this.model.doDefect(x, y);
        this.view.doDefect(x, y);
    }
    else {
        this.model.doCooperate(x, y);
        this.view.doCooperate(x, y);
    }
};


GridController.prototype.setDim = function (x, y) {
    "use strict";

    console.assert(Number.isInteger(x), x);
    console.assert(Number.isInteger(y), y);

    this.model.setDim(x, y);
    this.view.resize();
};


GridController.prototype.createGrid = function () {
    "use strict";
    this.view.drawAll();
    console.log("grid ok");
};

GridController.prototype.update = function () {
    // TODO write the func
};

