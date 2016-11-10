/**
 * Created by Arabella Brayer on 8/11/2016.
 */

function GridView(prisonnerGame, gridModel, nbCols, nbRows) {
    "use strict";

    function createCanvasElement(gridView) {
        console.assert(gridView instanceof GridView, gridView);

        var canvas = document.createElement("canvas");

        canvas.setAttribute("width", nbCols * gridView.cellSize);
        canvas.setAttribute("height", nbRows * gridView.cellSize);
        // canvas.addEventListener("click",
        //     function (event) {
        //         reverseCell(gridView, event);
        //     },
        //     false);
        // Dans ce projet, on n'a pas besoin de changer soi-même, c'est fait random
        // pourrait être une option mais plus tard...

        document.getElementById("canvas").appendChild(canvas);

        return canvas;
    }

    function createSummerizeElement(gridView) {
        console.assert(gridView instanceof GridView, gridView);

        var summerize = document.createElement("summerize");
        var title = document.createElement("h3");
        title.a
        document.getElementById("summerize").appendChild(summerize);

        return summerize;

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

        x = Math.floor(x/gridView.cellSize);
        y = Math.floor(y/gridView.cellSize);
        prisonnerGame.controller.reverse(x, y);
    }


    this.cellSize = 10;

    this.colors  = {
        cooperate: "#FE2E2E",
        defect: "#5858FA",
        gridcolor: "black"
    };

    this.gridModel = gridModel;
    this.canvas = createCanvasElement(this);
}


GridView.prototype.doDefect = function (x, y) {
    "use strict";

    console.assert(Number.isInteger(x), x);
    console.assert(Number.isInteger(y), y);
    console.assert((0 <= x) && (x < this.gridModel.getNbCols()), x);
    console.assert((0 <= y) && (y < this.gridModel.getNbRows()), y);

    var ctx = this.getContext();

    ctx.fillStyle = this.colors.defect;
    ctx.fillRect(x * this.cellSize + 1, y * this.cellSize + 1, this.cellSize - 2, this.cellSize - 2);
};


GridView.prototype.doCooperate = function (x, y) {
    "use strict";

    console.assert(Number.isInteger(x), x);
    console.assert(Number.isInteger(y), y);
    console.assert((0 <= x) && (x < this.gridModel.getNbCols()), x);
    console.assert((0 <= y) && (y < this.gridModel.getNbRows()), y);

    var ctx = this.getContext();

    // ctx.fillStyle = this.colors.gridcolor;
    // ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);

    // console.log("doCooperate " + y + ":" + x);
    ctx.fillStyle = this.colors.cooperate;
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

    ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
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

GridView.prototype.update = function () {
    "use strict";

    var ctx = this.getContext();
    var x;
    var y;

    for (y = 0; y < this.gridModel.getNbRows(); ++y) {
        for (x = 0; x < this.gridModel.getNbCols(); ++x) {
            if(this.gridModel.cellMatrix[x][y].state == COOPSTATE){
                this.doCooperate(x, y);
            } else {
                this.doDefect(x, y);
            }

        }
    }
};