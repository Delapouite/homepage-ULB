/**
 * Created by Arabella Brayer on 20/02/17.
 */



(function () {
    "use strict";

    var ticTacToe;


    function CreateGameOfTicTacToe() {
        var grid = new Grid();
        var view = new GridView(this, grid);

        this.controller = new GridController(grid, view);
        console.log("CreateGameTicTacToe ok");
    }

    function setListeners() {

        document.getElementById("printMatrixButton")
            .addEventListener("click",
                function () {
                    ticTacToe.controller.model.printMatrix();
                },
                false);
    }



    /* Main */
    window.addEventListener("load",
        function () {
            ticTacToe = new CreateGameOfTicTacToe();
            ticTacToe.controller.update();

            setListeners();
        },
        false);
}());
