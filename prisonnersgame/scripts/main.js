/**
 * Created by Arabella Brayer on 8/11/2016.
 */

(function () {
    "use strict";

    var DEFAULT_NB_COLS = 50;
    var DEFAULT_NB_ROWS = 50;
    // var DEFAULT_RATE_OF_COOPERATE = 0.5; // TODO add this option, after...
    var DEFAULT_T = 10;
    var DEFAULT_R = 7;
    var DEFAULT_P = 0;
    var DEFAULT_S = 0;

    var prisonner;



    function CreateWindow() {
        var grid = new Grid(DEFAULT_NB_COLS, DEFAULT_NB_ROWS, DEFAULT_T, DEFAULT_R, DEFAULT_P, DEFAULT_S);
        var view = new GridView(this, grid, DEFAULT_NB_COLS, DEFAULT_NB_ROWS);

        this.controller = new GridController(grid, view);
        console.log("CreatePrisonner grid ok");
    }

    function changeParams(paramsForm) {
        console.assert(paramsForm instanceof HTMLElement, paramsForm);

        var nbCols = parseInt(paramsForm.nbCols.value, 10);
        var nbRows = parseInt(paramsForm.nbRows.value, 10);
        prisonner.controller.setDim(nbCols, nbRows);
        prisonner.controller.createGrid();
        prisonner.controller.update();
        console.log("Data updated : cols = " + nbCols + " rows = " + nbRows);
    }

    function changePayoffs(payoffsForm) {
        console.assert(payoffsForm instanceof HTMLElement, payoffsForm);

        var T = parseInt(payoffsForm.t.value, 10);
        var R = parseInt(payoffsForm.r.value, 10);
        var P = parseInt(payoffsForm.p.value, 10);
        var S = parseInt(payoffsForm.s.value, 10);
        prisonner.controller.setPayoffs(T, R, P, S);
        prisonner.controller.createGrid();
        prisonner.controller.update();
        console.log("changePayoffs done");
    }

    function forward(gapForm) {
        console.assert(gapForm instanceof HTMLElement, gapForm);

        var nbSteps = parseInt(gapForm.steps.value, 10);
        var i;

        for (i = 0; i < nbSteps; ++i) {
            prisonner.controller.nextStep();
        }
    }


    function setListeners() {
        document.getElementById("changeParamsButton")
            .addEventListener("click",
                function () {
                    changeParams(document.getElementById("paramsForm"));
                },
                false);

        document.getElementById("changePayoffButton")
            .addEventListener("click",
                function () {
                    changePayoffs(document.getElementById("payoffsForm"));
                },
                false);

        document.getElementById("forwardButton")
            .addEventListener("click",
                function () {
                    forward(document.getElementById("gapForm"));
                },
                false);

        document.getElementById("printMatrixButton")
            .addEventListener("click",
                function () {
                    prisonner.controller.model.printMatrix();
                },
                false);

        document.getElementById("printNbNeighborsAliveButton")
            .addEventListener("click",
                function () {
                    prisonner.controller.model.printNbCooperatingNeighbors();
                },
                false);
    }



    /* Main */
    window.addEventListener("load",
        function () {
            prisonner = new CreateWindow();
            prisonner.controller.createGrid();
            prisonner.controller.update();
//
//             // Set interface
            var paramsForm = document.getElementById("paramsForm");
//
            paramsForm.nbCols.value = prisonner.controller.model.getNbCols();
            paramsForm.nbRows.value = prisonner.controller.model.getNbRows();
// TODO add other params : payoffs, percent, ...
            setListeners();
        },
        false);
}());
