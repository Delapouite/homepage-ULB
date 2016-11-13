/**
 * Created by Arabella Brayer on 8/11/2016.
 */


function GridController(model, view) {
    "use strict";

    this.model = model;
    this.view = view;
    this.turn = 0; // turn number : if 0, random, else, imitation
}


GridController.prototype.nextStep = function () {
    "use strict";

    // 1 - calculer les nouveaux scores
    this.model.computeScores();
    // 2 - calculer les nouvelles actions
    this.model = this.model.computeActions();
    console.log("ça passe jusqu'ici");
    // 3 - mettre à jour...
    this.turn++;
    this.update();

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
    this.createGrid();
    this.update();
};

GridController.prototype.setMode = function (newMode) {
    "use strict";

    console.assert(Number.isInteger(newMode), newMode);

    this.setMode(newMode);
    this.createGrid();
    this.update();
};

GridController.prototype.changeMode = function () {
    "use strict";

    this.model.xchangeMode();
    this.view.modeRefresh();
    this.update();
};

GridController.prototype.modifPayoff = function (selectedVar) {
    "use strict";

    console.assert(Number.isInteger(selectedVar), selectedVar);
    this.model.changePayoff(selectedVar);
    this.view.tableRefresh();
    this.update();
};

GridController.prototype.load = function () {
    this.view.tableRefresh(this.turn);
    this.view.modeRefresh();
};

GridController.prototype.createGrid = function () {
    "use strict";

    this.view.drawAll();
    console.log("grid ok");
};

GridController.prototype.update = function () {
    this.view.update();
};

