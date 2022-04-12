import * as CreaDomCarrello from './GestioneDOM/CreaDomCarrello.js';
import * as ClassDati from './ClassDati.js';

export { getCarrello, changeCarrello, addElementInCarrello, addElementInCarrelloByID, spliceCarrello }

let CARRELLO = [];
let raccoltaFunzioniCarrello = {};
let localStorageKey = 'carrello-biciclette';

export function exportCarrello() {
    setFunzioni();
    return raccoltaFunzioniCarrello;
}

function setFunzioni() {
    raccoltaFunzioniCarrello.getCarrello = getCarrello;
    raccoltaFunzioniCarrello.changeCarrello = changeCarrello;
    raccoltaFunzioniCarrello.addElementInCarrello = addElementInCarrello;
    raccoltaFunzioniCarrello.addElementInCarrelloByID = addElementInCarrelloByID;
    raccoltaFunzioniCarrello.spliceCarrello = spliceCarrello;
}


function getLocalStorage() {
    CARRELLO = JSON.parse(localStorage.getItem(localStorageKey));
    if (CARRELLO == null) {
        CARRELLO = [];
    }

    ClassDati.getStatusAffittate().filter(filterByID).forEach(element => {
        spliceCarrello(element.ID);
    });
}

function filterByID(item) {
    if (item.Valore == 1) {
        return true
    }
    return false;
}

function setLocalStorage() {
    localStorage.setItem(localStorageKey, JSON.stringify(CARRELLO));
}

function getCarrello() {
    return CARRELLO;
}

function changeCarrello(carrello) {
    CARRELLO = carrello;
    CreaDomCarrello.changeCarrello(carrello);
}

/*
    Mi dice se una bici è già stata seleziona
    @return restituisce o l'indice in cui si trova nell'array scelta, oppure -1
*/
function indiceBiciInCarrello(id) {
    getLocalStorage();
    return ClassDati.findIndexBike(CARRELLO, id);
}

function addElementInCarrello(bicicletta) {
    bicicletta.FasciaOraria = 'HalfDay';
    if (indiceBiciInCarrello(bicicletta.ID)) {
        CARRELLO.push(bicicletta);
        return true;
    }
    return false;
}

function addElementInCarrelloByID(id) {
    let bicicletta = ClassDati.getBiciclettaByID(id);
    addElementInCarrello(bicicletta);
}

/*
    Rimuove una bicicletta dal carrello

    @param indiceElemento --> posizione dell'elemento che si vuole rimuovere
*/
function spliceCarrello(id) {
    let indiceBiciInCarrello = indiceBiciInCarrello(id);
    if (indiceBiciInCarrello > 0) {
        CARRELLO.splice(indiceElemento, 1);
        setLocalStorage();
    }
}