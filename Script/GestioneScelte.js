//Gestisci i click delle immagini come evento e non come onclick




export { Prenota, GetCarrello }
import * as GestioneDati from './GestioneDati.js';
import * as Prenotazioni from './Prenotazioni.js';

let CARRELLO = [];


/*
    Mi dice se una bici è già stata seleziona
    @return restituisce o l'indice in cui si trova nell'array scelta, oppure -1
*/
export function IndiceBiciInCarrello(id) {
    let risultato = -1;
    for (let i in CARRELLO) {
        if (CARRELLO[i] == id) {
            risultato = i;
            break;
        }
    }
    return risultato;
}

export function AddElementInCarrello(id) {
    CARRELLO.push(id);
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
        alert("Le bici sono state prenotate per un costo totale di: " + CalcoloPrezzoTotale("HalfDay"));
    }

    CARRELLO = [];
    GestioneDati.AggiornaMenu();
}

/*
    Dato un array di oggetti che contengono delle biciclette calcola il costo totale di quelle biciclette
    @CARRELLO --> array di oggetti che contengono delle biciclette
    @return Restituisce un number che è il totale del costo
*/
function CalcoloPrezzoTotale(fasciaPrenotazione) {
    let costoTotale = 0,
        prezzi;
    for (let item of CARRELLO) {
        prezzi = GestioneDati.GetPrice(item);
        costoTotale += prezzi[fasciaPrenotazione];
    }
    return costoTotale;
}

function GetCarrello() {
    return CARRELLO;
}