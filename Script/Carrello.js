import * as CreaDomCarrello from './GestioneDOM/CreaDomCarrello.js';
import * as ClassDati from './ClassDati.js';


let CARRELLO;
let raccoltaFunzioniCarrello;
let localStorageKey = 'carrello-biciclette';

export function constructorCarrello() {
    CARRELLO = [];
    raccoltaFunzioniCarrello = {};
}

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
    raccoltaFunzioniCarrello.getLocalStorage = getLocalStorage;
    raccoltaFunzioniCarrello.setLocalStorage = setLocalStorage;
    raccoltaFunzioniCarrello.svuotaCarrello = svuotaCarrello;
    raccoltaFunzioniCarrello.indiceBiciInCarrello = indiceBiciInCarrello;
}

export function getLocalStorage() {
    CARRELLO = JSON.parse(localStorage.getItem(localStorageKey));
    if (CARRELLO == null) {
        CARRELLO = [];
    }

    ClassDati.getStatusAffittate().filter(filterByID).forEach(element => {
        if (isInCarrello(element.ID)) {
            spliceCarrello(element.ID);
        }
    });
}

function isInCarrello(id) {
    let presente = false;
    CARRELLO.forEach((element) => {
        if (element.ID == id) {
            presente = true;
        }
    });
    return presente;
}

function filterByID(item) {
    if (item.Valore == 1) {
        return true
    }
    return false;
}

export function setLocalStorage() {
    localStorage.setItem(localStorageKey, JSON.stringify(CARRELLO));
}

export function getCarrello() {
    return CARRELLO;
}

export function changeCarrello(id, fasciaOraria) {
    let indice = indiceBiciInCarrello(id);
    CARRELLO[indice].FasciaOraria = fasciaOraria;
    setLocalStorage();
    CreaDomCarrello.changeDOMTotalePrezzo();
}

/*
    Mi dice se una bici è già stata seleziona
    @return restituisce o l'indice in cui si trova nell'array CARRELLO, oppure -1
*/
export function indiceBiciInCarrello(id) {
    getLocalStorage();
    return ClassDati.findIndexBike(CARRELLO, id);
}

function addElementInCarrello(bicicletta) {
    getLocalStorage();
    bicicletta.FasciaOraria = 'HalfDay';
    if (indiceBiciInCarrello(bicicletta.ID)) {
        CARRELLO.push(bicicletta);
        setLocalStorage();
        return true;
    }
    return false;
}

export function addElementInCarrelloByID(id) {
    let bicicletta = ClassDati.getBiciclettaByID(id);
    addElementInCarrello(bicicletta);
}

/*
    Rimuove una bicicletta dal carrello

    @param indiceElemento --> posizione dell'elemento che si vuole rimuovere
*/
export function spliceCarrello(id) {
    let indice = indiceBiciInCarrello(id);
    if (indice >= 0) {
        CARRELLO.splice(indice, 1);
        setLocalStorage();
    }
}

/*
    Viene invocato solo quando si prenota. Serve questo metodo perchè altrimenti tramite spliceCarrello andava poi in errore quando si arrivava a chiamare getLocalStorage

    @param id --> id della bicicletta che si vuole rimuovere dal carrello
*/
export function rimuoviBiciPrenotata(id) {
    let risultato = ClassDati.getBiciclettaByID(id);
    CARRELLO = JSON.parse(localStorage.getItem(localStorageKey));
    if (CARRELLO == null) {
        CARRELLO = [];
    }
    let indice = ClassDati.findIndexBike(CARRELLO, id);
    if (indice >= 0) {
        CARRELLO.splice(indice, 1);
        setLocalStorage();
        risultato = null;
    }
    return risultato;
}

function svuotaCarrello() {
    CARRELLO = [];
    setLocalStorage();
}