/**
 * Created by Arabella Brayer on 19/03/17.
 */

describe("The name validator", function () {

    describe("Checks for finished grid", function () {

        it("should be false if the grid is not full", function () {

            let playerOne = new Player("X");
            let playerTwo = new Player("O");
            let game = new Game(playerOne, playerTwo);
            expect(game.isFinished()).toBe(false);
        });

        it("shoud be true if the grid is full", function () {
            let playerOne = new Player("X");
            let playerTwo = new Player("O");
            let game = new Game(playerOne, playerTwo);
            game.board.fill('X');
            expect(game.isFinished()).toBe(true);
        });

        it("shoud be true even if the grid is full with non-known chars", function () {
            let playerOne = new Player("X");
            let playerTwo = new Player("O");
            let game = new Game(playerOne, playerTwo);
            game.board.fill('P');
            expect(game.isFinished()).toBe(true);
        });
    });

    describe("Checks if the available celles are really available...", function () {

        it("shoud give and array of 0 to 8 if the grid is empty", function () {
            let emptyGrid = new Array(9);
            emptyGrid.fill(' ');
            let av = Game.available_moves(emptyGrid);
            let expected = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            for(let i = 0; i < NB_CELLS; i++){
                expect(av[i] === expected[i]).toBe(true);
            }

        });

        it("shoud give and array of less elements if the grid is not empty", function () {
            let notEmptyGrid = new Array(9);
            notEmptyGrid.fill(' ');
            notEmptyGrid[1] = 'X';
            notEmptyGrid[2] = 'X';

            let av = Game.available_moves(notEmptyGrid);
            console.log(av);
            let expected = [0, 3, 4, 5, 6, 7, 8];
            for(let i = 0; i < NB_CELLS; i++){
                expect(av[i] === expected[i]).toBe(true);
            }

        });



    });


});