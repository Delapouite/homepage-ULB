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
    });
});