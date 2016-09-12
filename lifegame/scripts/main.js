/**
 * Created by Arabella Brayer on 6/09/2016.
 */

(function () {
    "use strict";

    var DEFAULT_NB_COLS = 20;
    var DEFAULT_NB_ROWS = 10;

    var gameOfLife;



    function CreateGameOfLife() {
        var grid = new Grid(DEFAULT_NB_COLS, DEFAULT_NB_ROWS);
        var view = new GridView(this, grid, DEFAULT_NB_COLS, DEFAULT_NB_ROWS);

        this.controller = new GridController(grid, view);
        console.log("CreateGameOfLife ok");
    }



    function changeParams(paramsForm) {
        console.assert(paramsForm instanceof HTMLElement, paramsForm);

        var nbCols = parseInt(paramsForm.nbCols.value, 10);
        var nbRows = parseInt(paramsForm.nbRows.value, 10);

        gameOfLife.controller.setDim(nbCols, nbRows);
        console.log("Data updated : cols = " + nbCols + " rows = " + nbRows);
        gameOfLife.controller.update();
    }


    function forward(gapForm) {
        console.assert(gapForm instanceof HTMLElement, gapForm);

        var nbSteps = parseInt(gapForm.steps.value, 10);
        var i;

        for (i = 0; i < nbSteps; ++i) {
            gameOfLife.controller.nextStep();
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
                    gameOfLife.controller.model.printMatrix();
                },
                false);

        document.getElementById("printNbNeighborsAliveButton")
            .addEventListener("click",
                function () {
                    gameOfLife.controller.model.printNbNeighborsAlive();
                },
                false);
    }



    /* Main */
    window.addEventListener("load",
        function () {
            gameOfLife = new CreateGameOfLife();
            gameOfLife.controller.update();

            // Set interface
            var paramsForm = document.getElementById("paramsForm");

            paramsForm.nbCols.value = gameOfLife.controller.model.getNbCols();
            paramsForm.nbRows.value = gameOfLife.controller.model.getNbRows();

            setListeners();
        },
        false);
}());
