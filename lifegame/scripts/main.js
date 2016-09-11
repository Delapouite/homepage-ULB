/**
 * Created by Arabella Brayer on 6/09/16.
 */
var defaultCols = 10;
var defaultRows = 10;

var MyVars;
// MyVar is the set of global values needed by the application.
// init of this globals are defined in the InitVars function


function InitVars() {
    var canvas = createCanvasElement();
    grid = new Grid(defaultCols, defaultRows);
    view = new GridView(grid, canvas);
    this.controller = new GridController(grid, view);
    console.log("InitVars ok");
}

InitVars.prototype.getContextOk = function () {
    return this.controller.getContextOk();
};

function main() {
    MyVars = MyVars || new InitVars();
    if (MyVars.getContextOk()) {
        MyVars.controller.update();
    } else {
        alert("Technical problem");
    }
}

function changeParams(choices_in_form) {
    MyVars.controller.setDim(choices_in_form.cols.value, choices_in_form.rows.value);
    console.log("Data updated : cols = " + choices_in_form.cols.value + " rows = " + choices_in_form.rows.value);
    main();
}

function forward(gapForm) {
    // faudrait ptete s'assurer qu'il s'agit bien d'un entier...
    for(var i=0; i < gapForm.steps.value; i++) {
        MyVars.controller.nextStep();
    }
}