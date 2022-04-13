import { creaDivMenu } from './GestioneDOM/ModifyDOM.js';
import { getDati, uploadDati } from './CaricaDati/CaricaFuzioniDati.js';

let _DATI = [];

export function ConstructorDati(dati) {
    _DATI = dati;
    callCreaDivMenu();
}

export function callCreaDivMenu() {
    creaDivMenu(getDati());
}

/*
    Tenta di chiamare la funzione richiesta

    @param nomeFunzione --> nome della funzione che si desidera chiamare
    @param ...arg --> 0 o più argomenti necessari alla funzione
    @return Restituisce o il risultato della funzione, oppure un ReferenceError
*/
/*
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
*/



export let toString = () => { return _DATI.toString() };
export let getAllCategorie = () => { return _DATI.getAllCategorie() };
export let getAllBiciclette = () => { return _DATI.getAllBiciclette() };
export let getCategoria = (id, nomeCategoria, tipoRisultato) => { return _DATI.getCategoria(id, nomeCategoria, tipoRisultato) };
export let findIndexBike = (arrayBiciclette, id) => { return _DATI.findIndexBike(arrayBiciclette, id) };
export let getIndiciBicicletta = (id) => { return _DATI.getIndiciBicicletta(id) };
export let getBikeOfCategory = (nomeCategoria) => { return _DATI.getBikeOfCategory(nomeCategoria) };
export let getBiciclettaByID = (id) => { return _DATI.getBiciclettaByID(id) };
export let getPrice = (categoria, id) => { return _DATI.getPrice(categoria, id) };
export let setAffittata = (id, Affitta) => { return _DATI.setAffittata(id, Affitta) };
export let changeBici = (Biciclette) => { return _DATI.changeBici(Biciclette) };
export let isAffittata = (id) => { return _DATI.isAffittata(id) };
export let getStatusAffittate = () => { return _DATI.getStatusAffittate() };
export let calcolaPrezzoTotale = (arrayBiciclette, fasciaOraria) => { return _DATI.calcolaPrezzoTotale(arrayBiciclette, fasciaOraria) };
export let pushDati = async() => { await _DATI.pushDati() };

/*
    Mette tutte le bici. Questo è un bottone presente solo per la fase di testing
*/
export function setAllPrenotabili() {
    let dati = getDati();
    dati.forEach(element => {
        element.Biciclette.forEach((bicicletta) => {
            bicicletta.Affittata = false;
        });
    });
    pushDati().then(uploadDati());
}