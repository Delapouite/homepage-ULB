/**
 * Created by Arabella Brayer on 8/11/2016.
 */

(function () {
    "use strict";

    var DEFAULT_NB_COLS = 50;
    var DEFAULT_NB_ROWS = 50;

    var prisonner;



    function CreateWindow() {
        var grid = new Grid(DEFAULT_NB_COLS, DEFAULT_NB_ROWS);
        var view = new GridView(this, grid, DEFAULT_NB_COLS, DEFAULT_NB_ROWS);

        this.controller = new GridController(grid, view);
        console.log("CreatePrisonner ok");
    }



    function changeParams(paramsForm) {
        console.assert(paramsForm instanceof HTMLElement, paramsForm);

        var nbCols = parseInt(paramsForm.nbCols.value, 10);
        var nbRows = parseInt(paramsForm.nbRows.value, 10);

        prisonner.controller.setDim(nbCols, nbRows);
        console.log("Data updated : cols = " + nbCols + " rows = " + nbRows);
        prisonner.controller.update();
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
            prisonner.controller.update();

            // Set interface
            var paramsForm = document.getElementById("paramsForm");

            paramsForm.nbCols.value = prisonner.controller.model.getNbCols();
            paramsForm.nbRows.value = prisonner.controller.model.getNbRows();

            setListeners();
        },
        false);
}());
