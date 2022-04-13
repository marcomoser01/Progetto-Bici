import * as ClassDati from './ClassDati.js';
import * as Carrello from './Carrello.js';
import * as DomCarrello from './GestioneDOM/CreaDomCarrello.js';

/*
    Prenota le bici nel carrello
*/
export function Prenota() {
    let prenotazioni = [],
        prezzoTotale = ClassDati.calcolaPrezzoTotale(Carrello.getCarrello());
    //Nel caso ce ne siano di già prenotate prenoterà quelle prenotabile e le altre le lascierà nel carrello (che verranno però poi rimosse alla prima invoncazione del getLocalStorage)
    Carrello.getCarrello().forEach(element => {
        if (ClassDati.setAffittata(element.ID, true)) {
            prenotazioni.push(Carrello.rimuoviBiciPrenotata(element.ID));
        }
    });
    DomCarrello.creaDomCarrello();
    ClassDati.pushDati();

    prenotazioni = prenotazioni.filter(pren => pren != null);
    if (prenotazioni.length == 0) {
        alert("Le bici sono state prenotate per un costo totale di: " + prezzoTotale);
    } else {
        //Non gestito ma eventualmente si potrebbe dire quanto si è speso per quelle prenotate
        alert("Le bici non sono state prenotate");
    }
}