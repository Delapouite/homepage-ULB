/**
 * Created by Arabella Brayer on 20/02/17.
 */

"use strict";


const CELL_SIZE = 50;
const WIDTH_CIRCLE = 5;
const WIDTH_NORMAL = 1;
const COLOR_O = 'red';
const COLOR_X = 'blue';
const COLOR_NORMAL = 'black';

class GridView {

    constructor(gridModel) {

        console.assert(gridModel instanceof Game, gridModel);

        this.gridModel = gridModel;
    }

    createCanvasElement(controller) {
        console.assert(controller instanceof GridController, controller);

        this.canvas = document.createElement("canvas");
        let view = this; // because function event does not know this... Must initialize a variable.
        this.canvas.setAttribute("width", 3 * CELL_SIZE);
        this.canvas.setAttribute("height", 3 * CELL_SIZE);
        this.canvas.addEventListener("click",
            function (event) {
                playWithThisCell(view, controller, event);
            },
            false);

        document.getElementById("canvas").appendChild(this.canvas);
    }

    drawAll () {

        let i;
        let j;

        for (i = 0; i < NB_LINES; ++i) {
            for (j = 0; j < NB_LINES; ++j) {
                this.drawOne(i, j);
            }
        }
    }

    drawOne (x, y) {

        console.assert(Number.isInteger(x), x);
        console.assert(Number.isInteger(y), y);
        console.assert((0 <= x) && (x < NB_LINES), x);
        console.assert((0 <= y) && (y < NB_LINES), y);

        let ctx = this.getContext();

        ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        if(this.gridModel.board[y * 3 + x] === "X"){
            ctx.beginPath();

            ctx.lineWidth = WIDTH_CIRCLE;
            ctx.strokeStyle = COLOR_X;

            ctx.moveTo((x + 0.5) * CELL_SIZE - 20, (y + 0.5) * CELL_SIZE - 20);
            ctx.lineTo((x + 0.5) * CELL_SIZE + 20, (y + 0.5) * CELL_SIZE + 20);

            ctx.moveTo((x + 0.5) * CELL_SIZE + 20, (y + 0.5) * CELL_SIZE - 20);
            ctx.lineTo((x + 0.5) * CELL_SIZE - 20, (y + 0.5) * CELL_SIZE + 20);
            ctx.stroke();
            ctx.lineWidth = WIDTH_NORMAL;
            ctx.strokeStyle = COLOR_NORMAL;
        } else if (this.gridModel.board[y * 3 + x] === "O") {
            //draw a circle
            ctx.beginPath();
            ctx.arc((x + 0.5) * CELL_SIZE, (y + 0.5) * CELL_SIZE, CELL_SIZE/3, 0, Math.PI * 2, true);
            ctx.lineWidth = WIDTH_CIRCLE;
            ctx.strokeStyle = COLOR_O;
            ctx.closePath();
            ctx.stroke();
            ctx.lineWidth = WIDTH_NORMAL;
            ctx.strokeStyle = COLOR_NORMAL;
        }
        // } else {
        //     console.log("x:y :" + x +", " + y + " -> " + (x * 3 + y) + this.gridModel.board[x * 3 + y] + " " + (this.gridModel.board[x * 3 + y] == " "));
        // }
    }

    getContext () {
        return this.canvas.getContext("2d");
    }

    updateWhosTurn () {

        let txt = "Player ";
        if(this.gridModel.playerX_turn){
            txt += this.gridModel.playerX.char + " ";
        } else {
            txt += this.gridModel.playerO.char + " ";
        }
        document.getElementById("currentPlayer").innerHTML = txt + "is now playing";

    }

}

function playWithThisCell(gridView, controller, event) {
    console.assert(gridView instanceof GridView, gridView);
    console.assert(controller instanceof GridController, controller);
    console.assert(event instanceof Event, event);

    if(!controller.model.playerX_turn){
        console.log("It is not your turn !!");
        return;
    }

    let x;
    let y;

    if (event.x !== undefined && event.y !== undefined) {
        console.log("pas ff method"); // non testé sous IE/Edge etc.
        x = event.x - gridView.canvas.offsetLeft;
        y = event.y - gridView.canvas.offsetTop;
    } else { // ff method
        console.log("ff method");
        let rect = gridView.canvas.getBoundingClientRect();
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
    }

    x = Math.floor(x/CELL_SIZE);
    y = Math.floor(y/CELL_SIZE);

    console.log("x : ", x, ", y : ", y);
    console.log("cell nb : ", y * 3 + x);
    controller.playThisCell(y * 3 + x);
}

