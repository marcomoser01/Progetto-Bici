import { callFunction as callFunctionNodeElement } from './GeneraNodeElement.js';
import { callFunction as callFunctionDati } from './../ClassDati.js';
import { IndiceBiciInCarrello, AddElementInCarrello, SpliceCarrello } from '../GestioneInterazione.js';

export function callFunction(nomeFunzione, ...arg) {
    let risultato;
    try {
        let funzione = eval(nomeFunzione);
        risultato = funzione(...arg);
    } catch (e) {
        risultato = e;
    }
    return risultato;
}


function clickBicicletta(id) {
    if (callFunctionDati('isAffittata', id)) {
        alert("La bici è già stata prenotata");
    } else {
        let indiceElemento = IndiceBiciInCarrello(id);
        if (indiceElemento == -1) {
            AddElementInCarrello(id);
            callFunctionNodeElement('cambiaScalaGrigi', id, 1);
        } else {
            SpliceCarrello(indiceElemento);
            callFunctionNodeElement('cambiaScalaGrigi', id, 0);
        }
    }
}

function mouseoverBicicletta(id) {
    if (!imgIsGray(id)) {
        callFunctionNodeElement('cambiaScalaGrigi', id, 1);
    }
}

function mouseoutBicicletta(id) {
    if (imgIsGray(id)) {
        if (!callFunctionDati('isAffittata', id) && IndiceBiciInCarrello(id) == -1) {
            callFunctionNodeElement('cambiaScalaGrigi', id, 0);
        }
    }
}

function imgIsGray(id) {
    let DOMimmagine = document.getElementById('id-img-' + id);
    return (DOMimmagine.style.filter == "grayscale(1)") ? true : false;
}

function onchangeRadioButton(id, prezzo, scelte) {
    scelte[getIndexScelte(id, scelte)].FasciaOraria = prezzo;
}

function getIndexScelte(id, scelte) {
    let count = -1,
        indice = -1;
    do {
        count++;
        if (scelte[count].ID == id) {
            indice = count;
        }
    } while (count < SCELTE.length && indice == -1);
    return indice;
}