/**
 * Created by Arabella Brayer on 20/02/17.
 */



(function () {
    "use strict";

    let ticTacToe;
    /* var of the game */

    class CreateGameOfTicTacToe {
        constructor(mode = "random"){
            console.log("mode = " + mode);
            let player1 = new Player('X');
            let player2;
            if(mode === "random"){
                player2 = new RandomPlayer('O');
            }

            let model = new Game(player1, player2);
            let view = new GridView(model);

            this.controller = new GridController(model, view);
            view.createCanvasElement(this.controller);
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
            ticTacToe.controller.playOneTurnRandomly();
            ticTacToe.controller.update();

            setListeners();
        },
        false);
}());
