/**
 * Created by Arabella Brayer on 20/02/17.
 */



(function () {
    "use strict";

    var ticTacToe;
    /* var of the game */

    class CreateGameOfTicTacToe {
        constructor(mode = "random"){
            console.log("mode = " + mode);
            var player1 = new Player('X');
            if(mode === "random"){
                var player2 = new RandomPlayer('O');
            }

            var model = new Game(player1, player2);
            var view = new GridView(model);

            this.controller = new GridController(model, view);
            console.log("Create Game TicTacToe ok");
        }
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
            ticTacToe.controller.play_one_turn();
            ticTacToe.controller.update();

            setListeners();
        },
        false);
}());
