import { callFunction as callFunctionNodeElement } from './GestioneDOM/GeneraNodeElement.js';
import * as Prenotazioni from './Prenotazioni.js';
import { callFunction as callFunctionDati } from './ClassDati.js';



let CARRELLO = [];
let localStorageKey = 'carrello-biciclette';


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



/*
    Prende, se presenti, il carrello dal localStorage
*/
function pullCarrelloLocalStorage() {
    let localStorageString = localStorage.getItem(localStorageKey);

    if (localStorageString != null) {
        CARRELLO = JSON.parse(localStorageString);
    }
}

/*
    Mi dice se una bici è già stata seleziona
    @return restituisce o l'indice in cui si trova nell'array scelta, oppure -1
*/
function indiceBiciInCarrello(id) {
    CARRELLO = JSON.parse(localStorage.getItem(localStorageKey));
    if (CARRELLO == null) {
        CARRELLO = [];
    }

    return callFunctionDati('findIndexBike', CARRELLO, id);
}

function addElementInCarrello(id) {
    CARRELLO = JSON.parse(localStorage.getItem(localStorageKey));
    if (CARRELLO == null) {
        CARRELLO = [];
    }
    let dato = callFunctionDati('getBiciclettaByID', id);

    dato.FasciaOraria = 'HalfDay';
    CARRELLO.push(dato);
    localStorage.setItem(localStorageKey, JSON.stringify(CARRELLO));
}

function spliceCarrello(indice) {
    CARRELLO.splice(indice, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(CARRELLO));
}




/*
    Prenota le bici selezionate. Se non si fosse selezionata nessuna bicicletta visionerà un alert d'errore
*/
function prenota() {
    let prenotazione = Prenotazioni.PrenotaBici(CARRELLO);
    if (prenotazione == -1) {
        alert("Non è stata selezionata nessuna bicicletta, la invitiamo a selezionare delle biciclette");
    } else if (!prenotazione) {
        alert("Le bici non sono state prenotate");
    } else {
        alert("Le bici sono state prenotate per un costo totale di: " + callFunctionDati('calcolaPrezzoTotale', CARRELLO));
    }

    CARRELLO = [];
    callFunctionNodeElement('aggiornaMenu');
}

function getCarrello() {
    return CARRELLO;
}