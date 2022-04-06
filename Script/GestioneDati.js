//Devo vedere di trasportare queste funzioni in ClassDati, oppure riuscire a dividerle meglio concettualmente


export { AggiornaMenu, GetSingolaBiciByID, GetPrice, SetAffittata }
import { CambiaScalaGrigi } from './ModifyDOM.js';
import * as ClassDati from './ClassDati.js';


function GetPrice(IDbici) {
    let indiceCategoria = ClassDati.GetIndexCategoria(IDbici);
    return ClassDati.GetPrice(ClassDati.GetNameCategoryByIndex(indiceCategoria));
}

/*
    Prendondo im ingresso l'ID di una bici restituisce un oggetto bici contenente i parametri della bici con l'ID specificato
*/
function GetSingolaBiciByID(IDbici) {
    return ClassDati.GetBiciByID(IDbici);
}


/*
    Prendendo in ingresso l'ID di una bici e il valore che si vuole attribuire ad Affittata, 
    controlla se quella bicicletta ha un valore opposto a quello passato come parametro e se così fosse lo cambia
    @valore --> si aspetta un valore booleano
    @return se il valore del parametro Affittata è diverso da quello passato come parametro lo modifica e restituisce true, altrimenti non varia il valore e restituisce false
*/
function SetAffittata(IDbicicletta, valore) {
    let variazione = ClassDati.SetAffitta(IDbicicletta, valore);
    return variazione;
}


/*
    Controlla che le bici che sono prenota siano grige e quelle non prenotate siano colorate
*/
function AggiornaMenu() {
    let satusAffittate = ClassDati.GetStatusAffittate();
    for (let item of satusAffittate) {
        CambiaScalaGrigi(item.ID, item.Valore);
    }
}