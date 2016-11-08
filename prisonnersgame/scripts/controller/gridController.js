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
            this.model.asleep(x, y);
            this.view.asleep(x, y);
        }
        else {
            this.model.awake(x, y);
            this.view.awake(x, y);
        }
    }
};


GridController.prototype.reverse = function (x, y) {
    "use strict";

    console.assert(Number.isInteger(x), x);
    console.assert(Number.isInteger(y), y);

    if (this.model.isAlive(x, y)) {
        this.model.asleep(x, y);
        this.view.asleep(x, y);
    }
    else {
        this.model.awake(x, y);
        this.view.awake(x, y);
    }
};


GridController.prototype.setDim = function (x, y) {
    "use strict";

    console.assert(Number.isInteger(x), x);
    console.assert(Number.isInteger(y), y);

    this.model.setDim(x, y);
    this.view.resize();
};


GridController.prototype.update = function () {
    "use strict";

    this.view.drawAll();
};

