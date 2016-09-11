/**
 * Created by Arabella Brayer on 7/09/16.
 */

function GridController(model, view) {
    this.model = model;
    this.view = view;
}

GridController.prototype.getContextOk = function () {
    return this.view.getContextOk();
};

GridController.prototype.update = function () {
    this.view.drawAll();
};

GridController.prototype.setDim = function(x, y) {
    this.model.setDim(x, y);
    this.view.reSize();
};

GridController.prototype.inverse = function (x, y) {
    if(this.model.isAlive(x, y)) {
        this.model.asleep(x, y);
        this.view.asleep(x, y, this.view.getContext());
    } else {
        this.model.awake(x, y);
        this.view.awake(x, y, this.view.getContext());
    }
};

GridController.prototype.nextStep = function () {
    // on créé une matrice de même dimension mais vide
    var temp = initMatrix(this.model.cols);
    // on fait un parcours de la matrice d'origine
    for(var y = 0; y < this.model.cols; y++) { // on fait qd même un parcours d'array par colonne, method qui peut être améliorée
        // FIXME on ne devrait as à avoir à manipuler l'objet, seulement un iterator
        for(var x in this.model.matrix[y]) {
            x = parseInt(x); // La var enregistrée dans la matrice est un string
            // chaque celule active va potentiellement réveiller son voisinage (ou pas)
            // on fait un parcours de ce voisinage

            for(var xp = this.model.getFloorX(x); xp <= this.model.getCeilX(x); xp++) {
                for (var yp = this.model.getFloorY(y); yp <= this.model.getCeilY(y); yp++) {
                    // pour chaque cel à mettre à jour, on vérifie que ça n'a pas
                    // déjà été fait dans la nouvelle matrice
                    if(!(xp in temp[yp])) {
                        if(this.model.hasToBeAwaked(yp, xp)) {
                            temp[yp][xp] = true;
                        } else if (x == xp && yp == y) {
                            temp[yp][xp] = false; // pour endormir les celules qui doivent mourir
                        }
                    }
                }
            }
        }
    }
    // on a ttes les data dans la nouvelle matrice. Les enr à faux sont à asleep, ceux à true sont à awake
    for(var y = 0; y < this.model.cols; y++) {
        for (var x in temp[y]) {
            if(temp[y][x]) {
                this.model.awake(y, x);
                this.view.awake(y, x, this.view.getContext());
            } else {
                this.model.asleep(y, x);
                this.view.asleep(y, x, this.view.getContext());
            }
        }
    }

};