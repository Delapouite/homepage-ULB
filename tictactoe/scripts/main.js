/**
 * Created by Arabella Brayer on 20/02/17.
 */



(function () {
    "use strict";

    var ticTacToe;


    function CreateGameOfTicTacToe() {
        var player1 = new Player();
        var player2 = new Player();

        var model = new Game(player1, player2);
        var view = new GridView(model);

        // this.controller = new GridController(model, view);
        console.log("Create Game TicTacToe ok");
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
            // ticTacToe.controller.update();

            // setListeners();
        },
        false);
}());
