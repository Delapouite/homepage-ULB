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


    this.cellSize = 40;

    this.gridModel = gridModel;
    this.canvas = createCanvasElement(this);
}

GridView.prototype.drawAll = function () {
    "use strict";

    var ctx = this.getContext();
    var x;
    var y;

    for (y = 0; y < this.gridModel.NB_ROWS; ++y) {
        for (x = 0; x < this.gridModel.NB_COLS; ++x) {
            this.drawOne(x, y, ctx);
        }
    }
};

GridView.prototype.getContext = function () {
    "use strict";

    return this.canvas.getContext("2d");
};
