import * as GeneraNodeElement from './GestioneDOM/GeneraNodeElement.js';
import * as ClassDati from './ClassDati.js';
import * as GestioneInterazione from './GestioneInterazione.js';

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

export function clickBicicletta(id) {
    if (ClassDati.isAffittata(id)) {
        alert("La bici è già stata prenotata");
    } else {
        let indiceElemento = GestioneInterazione.indiceBiciInCarrello(id);
        if (indiceElemento == -1) {
            GestioneInterazione.addElementInCarrello(id);
            GeneraNodeElement.cambiaScalaGrigi(id, 1);
        } else {
            GestioneInterazione.spliceCarrello(indiceElemento);
            GeneraNodeElement.cambiaScalaGrigi(id, 0);
        }
    }
}

export function mouseoverBicicletta(id) {
    if (!imgIsGray(id)) {
        GeneraNodeElement.cambiaScalaGrigi(id, 1);
    }
}

export function mouseoutBicicletta(id) {
    if (imgIsGray(id)) {
        if (!ClassDati.isAffittata(id) && GestioneInterazione.indiceBiciInCarrello(id) == -1) {
            GeneraNodeElement.cambiaScalaGrigi(id, 0);
        }
    }
}

export function imgIsGray(id) {
    let DOMimmagine = document.getElementById('id-img-' + id);
    return (DOMimmagine.style.filter == "grayscale(1)") ? true : false;
}

export function onchangeRadioButton(id, prezzo, CARRELLO) {
    CARRELLO[getIndexScelte(id, CARRELLO)].FasciaOraria = prezzo;
    GestioneInterazione.changeCarrello(CARRELLO);
}

function getIndexScelte(id, CARRELLO) {
    let count = -1,
        indice = -1;
    do {
        count++;
        if (CARRELLO[count].ID == id) {
            indice = count;
        }
    } while (count < CARRELLO.length && indice == -1);
    return indice;
}