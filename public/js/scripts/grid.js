/**
 * Created by Arabella Brayer on 28/06/16.
 */

var cols = 10;
var rows = 10;

function start() {
    var body = document.getElementsByTagName("body")[0];

    // créé un élément div pour le style : class = grid
    div = document.createElement("div");
    div.setAttribute("id", "grid");
    body.appendChild(div);

// devrait être dans un form
// le input submit a comme action de mettre à jour cols et rows, et de recréer la grille

    form = createForm();
    div.appendChild(form);


    // crée un élément <table> et un élément <tbody>
    table     = document.createElement("table");
    tablebody = document.createElement("tbody");

    // création des cellules
    for(var j = 0; j < cols; j++) {
        // crée une ligne de tableau
        var row = document.createElement("tr");

        for(var i = 0; i < rows; i++) {
            // Crée un élément <td> et un nœud texte, place le nœud texte
            // comme contenu texte de l'élément <td> et le place à la fin
            // de la ligne du tableau
            cell = document.createElement("td");
            button = document.createElement("input");
            button.setAttribute("type", "button");
            button.setAttribute("onclick", "modif(" + i + ", " + j + ");");
            button.setAttribute("id", "_"+i+"_"+j);
            button.setAttribute("class", "off");
            cell.appendChild(button);
            row.appendChild(cell);
        }
    // ajoute la ligne à la fin du corps du tableau
    tablebody.appendChild(row);
    }
    // place <tbody> dans l'élément <table>
    table.appendChild(tablebody);
    // ajoute <table> à l'élément <body>
    div.appendChild(table);
}

function modif(i, j) {
    if(isAlive(i, j)){
        document.getElementById("_"+i+"_"+j).setAttribute("class", "off");
    } else {
        document.getElementById("_"+i+"_"+j).setAttribute("class", "on");
    }
}

function isAlive(i, j) {
    elem = document.getElementById("_"+i+"_"+j);
    state = elem.getAttribute("class");
    return(state == "on");
}

function createInput(nameTag){
    input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("min", "1");
    input.setAttribute("max", "100");
    input.setAttribute("name", nameTag);
    input.setAttribute("id", nameTag);
    input.setAttribute("value", "10");
    return input;
}

function createLabel(nameTag, textContent) {
    elem = document.createElement("label");
    elem.setAttribute("name", nameTag);
    elem.textContent = textContent;
    return elem;
}

function createForm() {
    form = document.createElement("form");
    form.setAttribute("onsubmit", "updating(this);");
    // form.setAttribute("onclick", "updating(this);");

    // add le labelCol
    labelCol = createLabel("cols", "Columns");
    form.appendChild(labelCol);

    // add le input number
    inputcol = createInput("cols");
    form.appendChild(inputcol);

    labelRows = createLabel("rows", "Rows");
    form.appendChild(labelRows);

    // add le input
    inputrow = createInput("rows");
    form.appendChild(inputrow);

    // add le button
    button = document.createElement("button");
    button.setAttribute("type", "submit");
    form.appendChild(button);
    return form;
}

function updating(formu) {
    cols = formu.cols.value;
    rows = formu.rows.value;
    // update grid
    start();
}