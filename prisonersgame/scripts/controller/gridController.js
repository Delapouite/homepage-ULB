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
    this.model.computeNewGrid();

    // 3 - mettre à jour...
    this.turn++;
    this.update();
};


GridController.prototype.setDim = function (x, y) {
    "use strict";

    console.assert(Number.isInteger(x), x);
    console.assert(Number.isInteger(y), y);

    this.model.setDim(x, y);
    this.view.resize();
    this.createGrid();
    this.turn = 0;
    this.view.countRefresh(this.turn);
    this.update();
};

GridController.prototype.setMode = function (newMode) {
    "use strict";

    console.assert(Number.isInteger(newMode), newMode);

    this.setMode(newMode);
    this.createGrid();
    this.turn = 0;
    this.view.countRefresh(this.turn);
    this.update();
};

GridController.prototype.changeMode = function () {
    "use strict";

    this.model.xchangeMode();
    this.view.modeRefresh();
    this.turn = 0;
    this.view.countRefresh(this.turn);
    this.update();
};

GridController.prototype.modifPayoff = function (selectedVar) {
    "use strict";

    console.assert(Number.isInteger(selectedVar), selectedVar);
    this.model.changePayoff(selectedVar);
    this.view.tableRefresh();
    this.turn = 0;
    this.view.countRefresh(this.turn);
    this.update();
};

GridController.prototype.load = function () {
    this.view.tableRefresh();
    // this.view.countRefresh(this.turn);
    this.view.modeRefresh();
};

GridController.prototype.createGrid = function () {
    "use strict";

    this.view.drawAll();
    console.log("grid ok");
};

GridController.prototype.update = function () {
    this.view.update();
    this.view.countRefresh(this.turn);
    this.view.makeImg();
};

GridController.prototype.experiment = function () {
    console.log("perform an experiment an plot functions");
    var results = [];
    for(var i=0; i < 100; i++){
        var result = [];
        var currentGrid = new Grid(this.model.nbCols, this.model.nbRows, this.model.t, this.model.r, this.model.p, this.model.s, this.model.mode);
        for(var j=0; j < 100; j++){
            result.push(currentGrid.getRate());
            currentGrid.computeScores();
            currentGrid.computeNewGrid();
        }
        results.push(result);
    }

    this.view.setExpeResults(results);
};