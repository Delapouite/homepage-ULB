/**
 * Created by Arabella Brayer on 20/02/17.
 */

"use strict";


var CELL_SIZE = 50;

class GridView {

    constructor(gridModel) {

        this.gridModel = gridModel;
        this.canvas = this.createCanvasElement(this, this.gridModel);

    }

    createCanvasElement(gridView, model) {
        console.assert(gridView instanceof GridView, gridView);

        var canvas = document.createElement("canvas");

        canvas.setAttribute("width", 3 * CELL_SIZE);
        canvas.setAttribute("height", 3 * CELL_SIZE);
        canvas.addEventListener("click",
            function (event) {
                playWithThisCell(gridView, model, event);
            },
            false);

        document.getElementById("canvas").appendChild(canvas);
        return canvas;

    }

    drawAll () {

        var i;
        var j;

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

        var ctx = this.getContext();

        ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        if(this.gridModel.board[y * 3 + x + 1] === "X"){
            ctx.beginPath();

            ctx.moveTo(x - 20, y - 20);
            ctx.lineTo(x + 20, y + 20);

            ctx.moveTo(x + 20, y - 20);
            ctx.lineTo(x - 20, y + 20);
            ctx.stroke();
        } else if (this.gridModel.board[y * 3 + x + 1] === "O"){
            //draw a circle
            ctx.beginPath();
            ctx.arc(x + CELL_SIZE/2, y + CELL_SIZE/2, 10, 0, Math.PI*2, true);
            ctx.closePath();
            ctx.stroke();
        } else {
            console.log("x:y :" + x +", " + y + " -> " + (x * 3 + y) + this.gridModel.board[x * 3 + y] + (this.gridModel.board[x * 3 + y] == " "));
        }
    }

    getContext () {
        return this.canvas.getContext("2d");
    }

}

function playWithThisCell(gridView, model, event) {
    console.assert(gridView instanceof GridView, gridView);
    console.assert(event instanceof Event, event);

    // if(!model.playerX_turn){
    //     console.log("It is not your turn !!");
    //     return;
    // }

    var x;
    var y;

    if (event.x !== undefined && event.y !== undefined) {
        console.log("pas ff method"); // non testé sous IE/Edge etc.
        x = event.x - canvas.offsetLeft;
        y = event.y - canvas.offsetTop;
    } else { // ff method
        console.log("ff method");
        var rect = gridView.canvas.getBoundingClientRect();
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
    }

    x = Math.floor(x/CELL_SIZE);
    y = Math.floor(y/CELL_SIZE);

    console.log("x : ", x, ", y : ", y);
    console.log("cell nb : ", y * 3 + x + 1);
    return y * 3 + x + 1;
}

