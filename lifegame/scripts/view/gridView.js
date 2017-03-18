/**
 * Created by Arabella Brayer on 7/09/2016.
 */

function GridView(gameOfLife, gridModel, nbCols, nbRows) {
    "use strict";

    function createCanvasElement(gridView) {

        console.assert(gridView instanceof GridView, gridView);

        var canvas = document.createElement("canvas");

        canvas.setAttribute("width", nbCols * CELL_SIZE);
        canvas.setAttribute("height", nbRows * CELL_SIZE);
        canvas.addEventListener("click",
            function (event) {
                reverseCell(gridView, event);
            },
            false);

        document.getElementById("canvas").appendChild(canvas);

        return canvas;
    }


    function reverseCell(gridView, event) {
        console.assert(gridView instanceof GridView, gridView);
        console.assert(event instanceof Event, event);

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


        // var rect = gridView.canvas.getBoundingClientRect();
        //
        // var x = event.clientX - rect.left + document.body.scrollLeft + document.documentElement.scrollLeft;
        // var y = event.clientY - rect.top + document.body.scrollTop + document.documentElement.scrollTop;

        x = Math.floor(x/gridView.cellSize);
        y = Math.floor(y/gridView.cellSize);
        gameOfLife.controller.reverse(x, y);
    }


    this.cellSize = 15;

    this.colors  = {
        alive: "black",
        dead: "white"
    };

    this.gridModel = gridModel;
    this.canvas = createCanvasElement(this);
}


GridView.prototype.asleep = function (x, y) {
    "use strict";

    console.assert(Number.isInteger(x), x);
    console.assert(Number.isInteger(y), y);
    console.assert((0 <= x) && (x < this.gridModel.getNbCols()), x);
    console.assert((0 <= y) && (y < this.gridModel.getNbRows()), y);

    var ctx = this.getContext();

    // console.log("asleep" + y + ":" + x);
    ctx.fillStyle = this.colors.alive;
    ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);

    ctx.fillStyle = this.colors.dead;
    ctx.fillRect(x * this.cellSize + 1, y * this.cellSize + 1, this.cellSize - 2, this.cellSize - 2);
};


GridView.prototype.awake = function (x, y) {
    "use strict";

    console.assert(Number.isInteger(x), x);
    console.assert(Number.isInteger(y), y);
    console.assert((0 <= x) && (x < this.gridModel.getNbCols()), x);
    console.assert((0 <= y) && (y < this.gridModel.getNbRows()), y);

    var ctx = this.getContext();

    // console.log("awake " + y + ":" + x);
    ctx.fillStyle = this.colors.alive;
    ctx.fillRect(x * this.cellSize + 1, y * this.cellSize + 1, this.cellSize - 2, this.cellSize - 2);
};



GridView.prototype.drawAll = function () {
    "use strict";

    var ctx = this.getContext();
    var x;
    var y;

    for (y = 0; y < this.gridModel.getNbRows(); ++y) {
        for (x = 0; x < this.gridModel.getNbCols(); ++x) {
            this.drawOne(x, y, ctx);
        }
    }
};


GridView.prototype.drawOne = function (x, y) {
    "use strict";

    console.assert(Number.isInteger(x), x);
    console.assert(Number.isInteger(y), y);
    console.assert((0 <= x) && (x < this.gridModel.getNbCols()), x);
    console.assert((0 <= y) && (y < this.gridModel.getNbRows()), y);

    var ctx = this.getContext();

    if (this.gridModel.isAlive(x, y)) {
        ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
    }
    else {
        ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
    }
};


GridView.prototype.getContext = function () {
    "use strict";

    return this.canvas.getContext("2d");
};


GridView.prototype.resize = function () {
    "use strict";

    var canvas = this.canvas;

    canvas.setAttribute("width", this.gridModel.getNbCols() * this.cellSize);
    canvas.setAttribute("height", this.gridModel.getNbRows() * this.cellSize);
};
