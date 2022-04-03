import { GetCarrello } from './GestioneScelte.js';
import { GetDatiByID } from './ClassDati.js';

let CARRELLO;

export function CreaDomCarrello() {
    CARRELLO = GetDatiByID(GetCarrello());
    let divParagrafo = document.getElementById("div-catalogo");
    removeAllChildNodes(divParagrafo);
    CreaDivMenu();
}


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


/*
    Modifica il DOM della pagina inserendo il menù, caricato dinamicamento da un file json
    @dati --> dati delle biciclette per poter creare il menù
*/
function CreaDivMenu() {
    let divCatalogo = document.getElementById('div-catalogo');
    let label;

    for (let item of CARRELLO) {
        label = document.createElement('label');
        label.appendChild(CreaDivBiciclette(item));
        divCatalogo.insertBefore(label, null);
    }

}


/*
    Crea il div per un array di biciclette, con l'immagine e il modello. La lista delle biciclette viene suddivisa in nRow numero di righe volute
    @biciclette --> array di biciclette da inserire
    @nRow --> numero di righe sulle quali si vuole suddividere il div. Inserire false se lo si vuole fare tutto su una riga
    @return --> restituisce un div element node
*/
function CreaDivBiciclette(item) {
    let divBiciclette = document.createElement('div');
    let divRow = document.createElement('div');
    divRow.setAttribute('class', 'div-RowGrid');

    divBiciclette.appendChild(divRow);
    divRow = document.createElement('div');
    divRow.setAttribute('class', 'div-RowGrid');
    divRow.appendChild(CreaDivBiciclettaSingola(item));
    if (divRow.childNodes.length > 0) {
        divBiciclette.appendChild(divRow);
        divRow = document.createElement('div');
    }
    return divBiciclette;
}


/*
    Crea il div per la bicicletta singola, con l'immagine e il modello
    @bicicletta --> gli passo un oggetto bicicletta, contenente l'ID, il Modello e l'immagine
    @return --> restituisce un div element node
*/
function CreaDivBiciclettaSingola(bicicletta) {
    let divBici = CreaDOMDivBici(bicicletta);
    divBici.appendChild(CreaDOMImmagine(bicicletta), null);
    divBici.appendChild(CreaDOMModello(bicicletta));
    return divBici;
}



function CreaDOMDivBici(bicicletta) {
    let divBici = document.createElement('div');
    divBici.setAttribute('id', 'ID-bici-' + bicicletta.ID);
    divBici.setAttribute('class', 'div-bicicletta');
    divBici.addEventListener('click', () => { ClickBicicletta(bicicletta.ID) });
    divBici.addEventListener('mouseover', () => { MouseoverBicicletta(bicicletta.ID) });
    divBici.addEventListener('mouseout', () => { MouseoutBicicletta(bicicletta.ID) });
    return divBici;
}

function CreaDOMImmagine(bicicletta) {
    let img = document.createElement('img');
    img.setAttribute('class', 'img-biciletta');
    img.setAttribute('id', 'id-img-' + bicicletta.ID);
    img.src = bicicletta.Immagine;
    img.style.filter = "grayscale(0)";
    return img;
}

function CreaDOMModello(bicicletta) {
    let modello = document.createElement('p');
    modello.setAttribute('class', 'p-Modello');
    modello.setAttribute('id', 'id-p-' + bicicletta.ID);
    modello.innerText = bicicletta.Modello;
    return modello;
}