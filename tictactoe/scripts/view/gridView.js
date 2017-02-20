/**
 * Created by Arabella Brayer on 20/02/17.
 */

function GridView(tictactoe, gridModel) {
    "use strict";

    function createCanvasElement(gridView) {
        console.assert(gridView instanceof GridView, gridView);

        var canvas = document.createElement("canvas");

        canvas.setAttribute("width", 3 * gridView.cellSize);
        canvas.setAttribute("height", 3 * gridView.cellSize);
        canvas.addEventListener("click",
            function (event) {
                playWithThisCell(gridView, event);
            },
            false);

        document.getElementById("canvas").appendChild(canvas);

        return canvas;
    }


    function playWithThisCell(gridView, event) {
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
        tictactoe.controller.reverse(x, y);
    }


    this.cellSize = 50;

    this.gridModel = gridModel;
    this.canvas = createCanvasElement(this);
}

GridView.prototype.drawAll = function () {
    "use strict";

    console.log("GridView::drawAll, nbrows = ", NB_ROWS);
    var x;
    var y;

    for (x = 0; x < NB_ROWS; ++x) {
        for (y = 0; y < NB_COLS; ++y) {
            this.drawOne(x, y);
        }
    }
};

GridView.prototype.drawOne = function (x, y) {
    "use strict";

    console.assert(Number.isInteger(x), x);
    console.assert(Number.isInteger(y), y);
    console.assert((0 <= x) && (x < NB_COLS), x);
    console.assert((0 <= y) && (y < NB_ROWS), y);

    var ctx = this.getContext();

    ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
};



GridView.prototype.getContext = function () {
    "use strict";

    return this.canvas.getContext("2d");
};
