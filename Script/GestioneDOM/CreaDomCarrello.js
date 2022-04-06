import { callFunction as callFunctionDati } from '../ClassDati.js';
import { GetCarrello } from '../GestioneInterazione.js';
import { callFunction as callFunctionNodeElement } from './GeneraNodeElement.js';

let CARRELLO;
let SCELTE = [];

export function creaDomCarrello() {
    let storage = localStorage.getItem("carrello-bici");
    callFunctionNodeElement('hiddenPrenota');
    setCarrelloDati();
    callFunctionNodeElement('removeAllChildNodes', "div-catalogo");




    creaDivCarrello();
    localStorage.setItem('carrello-bici', JSON.stringify(SCELTE));
}



function setCarrelloDati() {
    CARRELLO = GetCarrello();
}

/*
    Modifica il DOM della pagina inserendo il menù, caricato dinamicamento da un file json
    @dati --> dati delle biciclette per poter creare il menù
*/
function creaDivCarrello() {
    let divCatalogo = document.getElementById('div-catalogo');
    let label;
    for (let item of CARRELLO) {
        SCELTE.push({
            ID: item.ID,
            FasciaOraria: 'HalfDay'
        });
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

    divRow.appendChild(callFunctionNodeElement('creaDivBiciclettaSingola', item, false));
    divRow.appendChild(callFunctionNodeElement('creaRadioBottonPrice', item, SCELTE));
    return divRow;
}