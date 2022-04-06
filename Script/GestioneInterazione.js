//Gestisci i click delle immagini come evento e non come onclick




export { Prenota, GetCarrello }
import { AggiornaMenu }from './GestioneDOM/ModifyDOM.js';
import * as Prenotazioni from './Prenotazioni.js';
import { callFunction as callFunctionDati } from './ClassDati.js';

let CARRELLO = [];
let localStorageKey = 'carrello-biciclette';


/*
    Prende, se presenti, il carrello dal localStorage
*/
export function pullCarrelloLocalStorage() {
    let localStorageString = localStorage.getItem(localStorageKey);

    if (localStorageString != null) {
        CARRELLO = JSON.parse(localStorageString);
    }
    CARRELLO.forEach((bicicletta) => {
        callFunctionDati('setAffittata', bicicletta.ID, true);
    })
}

export function pushCarrelloLocalStorage() {
    localStorage.setItem(localStorageKey, JSON.stringify(CARRELLO));
}

/*
    Mi dice se una bici è già stata seleziona
    @return restituisce o l'indice in cui si trova nell'array scelta, oppure -1
*/
export function IndiceBiciInCarrello(id) {
    return callFunctionDati('findIndexBike', CARRELLO, id);
}

export function AddElementInCarrello(id) {
    let dato = callFunctionDati('getBiciclettaByID', id);

    dato.FasciaOraria = 'HalfDay';
    CARRELLO.push(dato);
}

export function SpliceCarrello(indice) {
    CARRELLO.splice(indice, 1);
}




/*
    Prenota le bici selezionate. Se non si fosse selezionata nessuna bicicletta visionerà un alert d'errore
*/
function Prenota() {
    let prenotazione = Prenotazioni.PrenotaBici(CARRELLO);
    if (prenotazione == -1) {
        alert("Non è stata selezionata nessuna bicicletta, la invitiamo a selezionare delle biciclette");
    } else if (!prenotazione) {
        alert("Le bici non sono state prenotate");
    } else {
        alert("Le bici sono state prenotate per un costo totale di: " + callFunctionDati('calcolaPrezzoTotale', CARRELLO, 'HalfDay'));
    }

    CARRELLO = [];
    AggiornaMenu();
}

function GetCarrello() {
    return CARRELLO;
}