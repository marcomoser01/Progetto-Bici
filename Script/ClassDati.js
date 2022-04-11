import { creaDivMenu } from './GestioneDOM/ModifyDOM.js';
import { getDati } from './CaricaDati/CaricaFuzioniDati.js';

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



let toString = () => { return _DATI.toString() };
let getAllCategorie = () => { return _DATI.getAllCategorie() };
let getAllBiciclette = () => { return _DATI.getAllBiciclette() };
let getCategoria = (id, nomeCategoria, tipoRisultato) => { return _DATI.getCategoria(id, nomeCategoria, tipoRisultato) };
let findIndexBike = (arrayBiciclette, id) => { return _DATI.findIndexBike(arrayBiciclette, id) };
let getIndiciBicicletta = (id) => { return _DATI.getIndiciBicicletta(id) };
let getBikeOfCategory = (nomeCategoria) => { return _DATI.getBikeOfCategory(nomeCategoria) };
let getBiciclettaByID = (id) => { return _DATI.getBiciclettaByID(id) };
let getPrice = (categoria, id) => { return _DATI.getPrice(categoria, id) };
let setAffittata = (id, Affitta) => { return _DATI.setAffittata(id, Affitta) };
let changeBici = (Biciclette) => { return _DATI.changeBici(Biciclette) };
let isAffittata = (id) => { return _DATI.isAffittata(id) };
let getStatusAffittate = () => { return _DATI.getStatusAffittate() };
let calcolaPrezzoTotale = (arrayBiciclette, fasciaOraria) => { return _DATI.calcolaPrezzoTotale(arrayBiciclette, fasciaOraria) };