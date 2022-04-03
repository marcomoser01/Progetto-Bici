import { GetCarrello } from './GestioneScelte.js';
import { GetDatiByID } from './ClassDati.js';

let CARRELLO;

export function creaDomCarrello() {
    hiddenPrenota();
    setCarrelloDati();
    removeAllChildNodes("div-catalogo");
    creaDivCarrello();
}

function hiddenPrenota() {
    let prenota = document.getElementById('BottonePrenota');
    if (prenota.getAttribute("hidden")) {
        prenota.removeAttribute("hidden");
    } else {
        prenota.setAttribute("hidden", "hidden");
    }

}

function setCarrelloDati() {
    CARRELLO = GetDatiByID(GetCarrello());
}

function removeAllChildNodes(id) {
    let div = document.getElementById(id);
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}


/*
    Modifica il DOM della pagina inserendo il menù, caricato dinamicamento da un file json
    @dati --> dati delle biciclette per poter creare il menù
*/
function creaDivCarrello() {
    let divCatalogo = document.getElementById('div-catalogo');
    let label;

    for (let item of CARRELLO) {
        label = document.createElement('label');
        label.appendChild(creaRowCarrello(item));
        divCatalogo.insertBefore(label, null);
    }

}


/*
    Crea il div per un array di biciclette, con l'immagine e il modello. La lista delle biciclette viene suddivisa in nRow numero di righe volute
    @biciclette --> array di biciclette da inserire
    @nRow --> numero di righe sulle quali si vuole suddividere il div. Inserire false se lo si vuole fare tutto su una riga
    @return --> restituisce un div element node
*/
function creaRowCarrello(item) {
    let divRow = document.createElement('div');
    divRow.setAttribute('class', 'div-RowGrid div-RowCarrello');

    divRow.appendChild(creaDivBiciclettaSingola(item));
    divRow.appendChild(creaRadioBottonPrice(item));
    return divRow;
}


/*
    Crea il div per la bicicletta singola, con l'immagine e il modello
    @bicicletta --> gli passo un oggetto bicicletta, contenente l'ID, il Modello e l'immagine
    @return --> restituisce un div element node
*/
function creaDivBiciclettaSingola(bicicletta) {
    let divBici = creaDOMDivBici(bicicletta);
    divBici.appendChild(creaDOMImmagine(bicicletta), null);
    divBici.appendChild(creaDOMModello(bicicletta));
    return divBici;
}

function creaRadioBottonPrice(bicicletta) {
    let Form = document.createElement('form');
    for (let item of Object.keys(bicicletta.Prezzi)) {
        Form.appendChild(createDivRadio(bicicletta.ID, [item, bicicletta.Prezzi[item]]));
    }
    return Form;
}

function createDivRadio(id, prezzo) {
    let label = document.createElement('label');
    let input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('class', 'input-radio');
    input.setAttribute('id', 'radio-bici-' + id);
    input.setAttribute('name', 'prezzo');
    input.setAttribute('value', prezzo[0]);
    label.appendChild(input);
    label.appendChild(document.createTextNode(prezzo[0] + ":\t" + prezzo[1]));
    return label;
}


function creaDOMDivBici(bicicletta) {
    let divBici = document.createElement('div');
    divBici.setAttribute('id', 'ID-bici-' + bicicletta.ID);
    divBici.setAttribute('class', 'div-bicicletta');
    /*
    divBici.addEventListener('click', () => { ClickBicicletta(bicicletta.ID) });
    divBici.addEventListener('mouseover', () => { MouseoverBicicletta(bicicletta.ID) });
    divBici.addEventListener('mouseout', () => { MouseoutBicicletta(bicicletta.ID) });
    */
    return divBici;
}

function creaDOMImmagine(bicicletta) {
    let img = document.createElement('img');
    img.setAttribute('class', 'img-biciletta');
    img.setAttribute('id', 'id-img-' + bicicletta.ID);
    img.src = bicicletta.Immagine;
    img.style.filter = "grayscale(0)";
    return img;
}

function creaDOMModello(bicicletta) {
    let modello = document.createElement('p');
    modello.setAttribute('class', 'p-Modello');
    modello.setAttribute('id', 'id-p-' + bicicletta.ID);
    modello.innerText = bicicletta.Modello;
    return modello;
}