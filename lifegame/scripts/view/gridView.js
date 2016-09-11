/**
 * Created by Arabella Brayer on 7/09/16.
 */

var cellSize = 15;
var colors  = {
    alive: "#000000",
    dead: "#FFFFFF"
};

function GridView(gridModel, canvas) {
    this.gridModel = gridModel;
    this.canvas = canvas;
}

GridView.prototype.reSize = function () {
    document.getElementById("checkerboard").setAttribute("height", (this.gridModel.rows * cellSize).toString());
    document.getElementById("checkerboard").setAttribute("width", (this.gridModel.cols * cellSize).toString());
};

GridView.prototype.getContextOk = function () {
    return this.canvas.getContext;
};

GridView.prototype.getContext = function () {
    return this.canvas.getContext("2d");
};

GridView.prototype.drawAll = function () {
    if(this.getContextOk()) {
        var ctx = this.getContext();
        for (var x = 0; x < this.gridModel.cols; x++) {
            for (var y = 0; y < this.gridModel.rows; y++) {
                this.drawOne(x, y, ctx);
            }
        }
    }
};

function inverseCell(MyVars, event) {
    var x = new Number();
    var y = new Number();
    var canvas = document.getElementById("checkerboard");
    if (event.x != undefined && event.y != undefined) {
        console.log("pas ff method"); // non testé sous IE/Edge etc.
            x = event.x - canvas.offsetLeft;
            y = event.y - canvas.offsetTop;
    } else { // ff method
        console.log("ff method");
        var rect = canvas.getBoundingClientRect();
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
    }
    MyVars.controller.inverse(Math.floor(x/cellSize), Math.floor(y/cellSize));
}


GridView.prototype.drawOne = function (x, y, ctx) {
    if(this.gridModel.isAlive(x, y)) {
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    } else {
        ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
};

GridView.prototype.awake = function (x, y, ctx) {
    // console.log("awake " + y + ":" + x);
    ctx.fillStyle = colors.alive;
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
};

GridView.prototype.asleep = function (x, y, ctx) {
    // console.log("asleep" + y + ":" + x);
    ctx.fillStyle = colors.dead;
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    ctx.fillStyle= colors.alive;
    ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
};


// don't know how to create a stuff like a static method ?!
function createCanvasElement() {
    var canvas = document.createElement("canvas");
    canvas.setAttribute("width", defaultRows * cellSize);
    canvas.setAttribute("height", defaultCols * cellSize);
    canvas.setAttribute("id", "checkerboard");
    canvas.addEventListener("click", function(event){
        inverseCell(MyVars, event);
    });
    document.getElementById("can").appendChild(canvas);
    return canvas;
}