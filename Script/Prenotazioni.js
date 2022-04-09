import { callFunction as callFunctionDati } from './ClassDati.js';




/*
    Prenota le bici presenti in scelte

    @param array contenete gli id delle biciclette
    @return restituisce true se ha prenotato tutte le bici, false nel caso in cui non sia riuscito a prenotarle tutte, -1 nel caso in cui l'array fosse vuoto
*/
export function PrenotaBici(scelte) {
    let prenotate = false,
        biciPrenotate = [],
        count = 0;


    try {

        do {
            if (PrenotaBiciSingola(scelte[count])) {
                biciPrenotate.push(callFunctionDati('getBiciclettaByID', scelte[count]));
                prenotate = true;
            } else {
                prenotate = false;
            }
            count++;

        } while (prenotate && count < scelte.length);

    } catch (err) {
        (err instanceof TypeError) ? prenotate = -1: null;
    }

    (!prenotate) ? RestituisciBici(biciPrenotate): null;

    return prenotate;

}

/*
    Prenota se è possibile la bicicletta che è stata passata come parametro
    @return --> Restituisce true o false in pase all'avvenuta prenotazione oppure no
*/
function PrenotaBiciSingola(Bicicletta) {
    let affittata;
    (callFunctionDati('setAffittata', Bicicletta.ID, true)) ? affittata = true: affittata = false;

    return affittata;
}

/*
    Il metodo prende in ingresso un array di biciclette e imposta il valore Affittata di ogni bicicletta a false
    @biciclette --> array contenente oggetti di tipo bici
*/
function RestituisciBici(biciPrenotate) {
    for (let item of biciPrenotate) {
        RestituisciBiciSingola(item.ID);
    }
}

/*
    Il metodo serve per quando si è affitata una bicicletta e la si vuole restituire. Quindi va a settare a false il valore del parametro affittata
    @return Restituisce true o false in base al compimento della restituzione
*/
function RestituisciBiciSingola(Bicicletta) {
    let restituita;
    (callFunctionDati('setAffittata', Bicicletta.ID, true)) ? restituita = true: restituita = false;
    return restituita;
}