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
        // TODO qd on clique, on a le score de cette case

        document.getElementById("canvas").appendChild(canvas);

        return canvas;
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

GridView.prototype.countRefresh = function (turn) {
    document.getElementById("coopContent").innerHTML = this.gridModel.nbCoops;
    document.getElementById("defectContent").innerHTML = this.gridModel.nbDefect;
    document.getElementById("rateContent").innerHTML = Math.round(this.gridModel.getRate()*100)/100;
    document.getElementById("stepsContent").innerHTML = turn;
};
GridView.prototype.modeRefresh = function () {
    if(this.gridModel.mode == MOORE){
        document.getElementById("modeContent").innerHTML = "Moore";
    } else {
        document.getElementById("modeContent").innerHTML = "VN";
    }};

GridView.prototype.update = function () {
    "use strict";

    var x;
    var y;
    for (y = 0; y < this.gridModel.getNbRows(); ++y) {
        for (x = 0; x < this.gridModel.getNbCols(); ++x) {
            if(this.gridModel.cellMatrix[x][y].action == COOPSTATE){
                this.doCooperate(x, y);
            } else {
                this.doDefect(x, y);
            }
        }
    }
};


GridView.prototype.tableRefresh = function () {
    document.getElementById("tContent").innerHTML = this.gridModel.t;
    document.getElementById("pContent").innerHTML = this.gridModel.p;
    document.getElementById("rContent").innerHTML = this.gridModel.r;
    document.getElementById("sContent").innerHTML = this.gridModel.s;
};


GridView.prototype.setExpeResults = function (results) {
    var avgTot = [];
    console.log("display results");
    for(var i=0; i < results.length; i++){
        avgTot.push(0);
    } // init array avec des 0. FIXME sans doute moyen de faire plus joli :/

    for(var j=0; j < results.length; j++){
        for(var i=0; i < results[j].length; i++){
            avgTot[j] += results[i][j];
        }
        avgTot[j] = avgTot[j]/results.length;
        console.log("avg" + avgTot[j]);
    }
    var resultClass = [];
    for(var i=0; i < 10; i++){
        resultClass.push(0); // init class distribution
    }
    for(var i=0; i < results.length; i++){
        resultClass[Math.floor(results[i][100]*10)]++;
    }

    for(var i=0; i < 10; i++){
        console.log("end" + i +" à "+ (i+10) + " : " + resultClass[i]);
    }

    // construire les diagrams


    // une fois le canvas fait, il suffit de proposer un lien pour le voir en image, pour pouvoir
    // la dll proprement et mettre ça dans le rapport
    // window.location = this.canvas.toDataURL("image/png");

};