import * as Prenotazioni from './Prenotazioni.js';
import * as ClassDati from './ClassDati.js';
import * as CreaDomCarrello from './GestioneDOM/CreaDomCarrello.js';


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

export function getCarrello() {
    return CARRELLO;
}

export function changeCarrello(carrello) {
    CARRELLO = carrello;
    CreaDomCarrello.changeCarrello(carrello);
}


/*
    Prende, se presenti, il carrello dal localStorage
*/
export function pullCarrelloLocalStorage() {
    let localStorageString = localStorage.getItem(localStorageKey);

    if (localStorageString != null) {
        CARRELLO = JSON.parse(localStorageString);
    }

    controlloPrenotate();
}

/*
    Mi dice se una bici è già stata seleziona
    @return restituisce o l'indice in cui si trova nell'array scelta, oppure -1
*/
export function indiceBiciInCarrello(id) {
    CARRELLO = JSON.parse(localStorage.getItem(localStorageKey));
    if (CARRELLO == null) {
        CARRELLO = [];
    }

    return ClassDati.findIndexBike(CARRELLO, id);
}

export function addElementInCarrello(id) {
    CARRELLO = JSON.parse(localStorage.getItem(localStorageKey));
    if (CARRELLO == null) {
        CARRELLO = [];
    }
    let dato = ClassDati.getBiciclettaByID(id);

    dato.FasciaOraria = 'HalfDay';
    CARRELLO.push(dato);
    localStorage.setItem(localStorageKey, JSON.stringify(CARRELLO));
}

/*
    Prenota le bici selezionate. Se non si fosse selezionata nessuna bicicletta visionerà un alert d'errore
*/
export function prenota() {
    let prenotazione = Prenotazioni.PrenotaBici(CARRELLO);
    if (prenotazione == -1) {
        alert("Non è stata selezionata nessuna bicicletta, la invitiamo a selezionare delle biciclette");
    } else if (!prenotazione) {
        alert("Le bici non sono state prenotate");
    } else {
        alert("Le bici sono state prenotate per un costo totale di: " + ClassDati.calcolaPrezzoTotale(CARRELLO));
    }

    CARRELLO = [];
    localStorage.setItem(localStorageKey, JSON.stringify(CARRELLO));
    CreaDomCarrello.creaDomCarrello();
}



/*
    ATTENZIONE!!! Funzioni di ordine superioreeee
*/


export function spliceCarrello(id) {
    if (CARRELLO.length > 0) {
        let count = 0,
            risultato = false;

        do {
            if (CARRELLO[count].ID == id) {
                CARRELLO.splice(count, 1);
            }
            count++;
        } while (count < CARRELLO.length && !risultato);

        localStorage.setItem(localStorageKey, JSON.stringify(CARRELLO));
    }
}

function controlloPrenotate() {
    //
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