import * as GestioneInterazione from '../GestioneInterazione.js';
import * as GeneraNodeElement from './GeneraNodeElement.js';
import * as ClassDati from '../ClassDati.js';

let CARRELLO;
let localStorageKey = 'carrello-biciclette';


export function creaDomCarrello() {
    CARRELLO = localStorage.getItem(localStorageKey);
    if (CARRELLO == null) {
        CARRELLO = [];
    }
    GeneraNodeElement.hiddenPrenota(false);
    setCarrelloDati();
    GeneraNodeElement.removeAllChildNodes("div-catalogo");

    creaDivCarrello();
    mostraPrezzoTotale();
    localStorage.setItem(localStorageKey, JSON.stringify(CARRELLO));
}



function setCarrelloDati() {
    CARRELLO = GestioneInterazione.getCarrello();
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

    divRow.appendChild(GeneraNodeElement.creaDivBiciclettaSingola(item, false));
    divRow.appendChild(GeneraNodeElement.creaRadioBottonPrice(item, CARRELLO));
    return divRow;
}

export function changeCarrello(carrello) {
    CARRELLO = carrello;
    mostraPrezzoTotale();
    localStorage.setItem(localStorageKey, JSON.stringify(CARRELLO));
}

function mostraPrezzoTotale() {
    let paragrafo = document.getElementById('p-PrezzoTotale');
    paragrafo.innerText = ClassDati.calcolaPrezzoTotale(CARRELLO) + '€';

}