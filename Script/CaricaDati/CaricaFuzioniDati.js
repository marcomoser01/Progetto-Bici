import { ConstructorDati } from '../ClassDati.js';
import * as Firebase from './Firebase.js';


let _DATI;
let raccoltaFunzioni = {};



//Prende i dati da firestore. Successivamente manda i dati a GestioneDati e fa creare il menu.
$(document).ready(() => {
    Firebase.getDati().then((dati) => {
        _DATI = dati;
        uploadDati();
    });
});

async function pushDati() {
    await Firebase.pushDati(_DATI);
}

export function getDati() {
    return _DATI;
}

/*
    La funzione serve per caricare nell'oggetto raccoltaFunzioni tutte le funzioni che potrebbero servire all'utente.
    Si potrebbe dire che l'ho gestito quasi come una Classa java con però i dati privati.
    Questo file diciamo che si comporta un po' come back and
*/
export function uploadDati() {
    setRaccoltaFunzioni();
    ConstructorDati(raccoltaFunzioni);
}

function setRaccoltaFunzioni() {
    raccoltaFunzioni.toString = datiToString;
    raccoltaFunzioni.getAllCategorie = getAllCategorie;
    raccoltaFunzioni.getAllBiciclette = getAllBiciclette;
    raccoltaFunzioni.getCategoria = getCategoria;
    raccoltaFunzioni.findIndexBike = findIndexBike;
    raccoltaFunzioni.getIndiciBicicletta = getIndiciBicicletta;
    raccoltaFunzioni.getBikeOfCategory = getBikeOfCategory;
    raccoltaFunzioni.getBiciclettaByID = getBiciclettaByID;
    raccoltaFunzioni.getPrice = getPrice;
    raccoltaFunzioni.setAffittata = setAffittata;
    raccoltaFunzioni.changeBici = changeBici;
    raccoltaFunzioni.isAffittata = isAffittata;
    raccoltaFunzioni.getStatusAffittate = getStatusAffittate;
    raccoltaFunzioni.calcolaPrezzoTotale = calcolaPrezzoTotale;
    raccoltaFunzioni.downloadDati = Firebase.getDati;
    raccoltaFunzioni.pushDati = pushDati;
}



function datiToString() {
    let s = "";

    for (let i = 0; i < _DATI.length; i++) {
        s += "Categoria: " + _DATI[i].Categoria + "\n";
        for (let k = 0; k < _DATI[i].Biciclette.length; k++) {
            s += "ID: " + _DATI[i].Biciclette[k].ID +
                "\tModello: " + _DATI[i].Biciclette[k].Modello + "\n";
        }
    }

    return s;
}

/*
    @return Restituisce un array contenente tutte le categorie
*/
function getAllCategorie() {
    let categorie = [];

    _DATI.forEach((categoria) => categorie.push(categoria.Categoria));

    return categorie;
}

/*
    @return Restituisce un array contenente tutte le biciclette
*/
function getAllBiciclette() {
    let biciclette = [];

    for (let categoria of _DATI) {
        for (let bicicletta of categoria.Biciclette) {
            biciclette.push(bicicletta);
        }
    }
    return biciclette;
}

/*
    Prendendo in ingresso il nome di una categoria mi restituisce le biciclette di quella categoria

    @param nome, in stringa, della categoria di cui si vuole avere le bici
    @return restituisce un array di oggetti bicicletta
*/
function getBikeOfCategory(nomeCategoria) {
    let indiceCategoria = getCategoria(null, nomeCategoria),
        risultato;

    if (indiceCategoria != -1) {
        risultato = _DATI[indiceCategoria].Biciclette;
    } else {
        risultato = -1;
    }

    return risultato;
}

/*
    Restituisce la categoria secondo il tipo specificato

    @param id --> se si desidera fare la ricerca attraverso l'id specificarne uno. Se si volesse fare la ricerca tramite nomeCategoria passare come valore null.
    @param nomeCategoria --> nome della categoria per la quale si vuole sapere l'indice. Se si volesse fare la ricerca tramite id passare come valore null
    @param tipoRisultato --> scrivere 'nome' se desidera che gli venga restituito il nome come stringa, oppure 'indice' se desidera che gli venga restituito l'indice.
                                Di default varrà 'indice'.
                                Nel caso in cui si faccia la ricerca tramite nomeCategoria verrà preso di default indice.
                                Nel caso in cui venga passato sia l'id che il nomeCategoria, effettuerà la ricerca tramite id.
    @return restituisce in base alla richiesta o l'indice della categoria, oppure il nome della categoira. Restituirà -1 casomai non ci sia la categoria oppure siano stati passati dati sbagliati
*/
function getCategoria(id = -1, nomeCategoria = '', tipoRisultato = 'indice') {
    let risultato = -1,
        scelta;

    if (id != null && typeof(id) == 'number' && id != -1) {
        scelta = 0;
    } else if (nomeCategoria != null && typeof(nomeCategoria) == 'string') {
        scelta = 1;
    }

    switch (scelta) {
        case 0:
            risultato = getCategoriaByID(id);
            break;

        case 1:
            risultato = getCategoriaByNome(nomeCategoria);
            tipoRisultato = 'indice';
            break;
    }
    (risultato == -1) ? tipoRisultato = '': null;
    switch (tipoRisultato.toLowerCase()) {
        case 'nome':
            risultato = _DATI[risultato].Categoria;
            break;

        case 'indice':
            null;
            break;

        default:
            risultato = -1;
            break;
    }

    return risultato;
}

/*
    Cerca se è presente un determinato id nell'array biciclette

    @param array contenete le biciclette nelle quali voglio controllare
    @param id della bicicletta che si vuole trovare
    @return restituisce l'indice della cella in cui è presente l'id della bicicletta da cercare, se non dovesse essere presente restituisce -1
*/
function findIndexBike(arrayBiciclette, id) {
    let risultato = -1,
        count = 0;

    while (risultato == -1 && count < arrayBiciclette.length) {
        (arrayBiciclette[count].ID == id) ? risultato = count: count++;
    }

    return risultato;
}

/*
    Restituisce gli indici di categoria della categoria e dell'array biciclette

    @param id --> id della bicicletta che si vuole cercare
    @return restituisc un array avente in posizione 0 l'indice di categoria e in posizione 0 l'indice dell'array biciclette. Nel caso in cui non sia presente restituirà un array [-1, -1]
*/
function getIndiciBicicletta(id) {
    let indiceCategoria = -1,
        indiceBiciclette = -1;

    for (let i = 0; i < _DATI.length; i++) {
        indiceBiciclette = findIndexBike(_DATI[i].Biciclette, id);
        if (indiceBiciclette != -1) {
            indiceCategoria = i;
            break;
        }
    }

    return [indiceCategoria, indiceBiciclette];
}

/*
    Restituisce la bicicletta desiderata

    @param id della bicicletta di cui si vuole sapere
    @return restituisce l'oggetto bicicletta se viene trovato, altrimenti false
*/
function getBiciclettaByID(id) {
    let risultato = false,
        indici = getIndiciBicicletta(id);

    if (indici[0] != -1) {
        (indici[1] != -1) ? risultato = _DATI[indici[0]].Biciclette[indici[1]]: null;
    }

    return risultato;
}

/*
    Restituisce un oggetto contenente i prezzi di una determinata categoria

    @param --> nome della categoria. Mettere null se la ricerca viene fatta tramite id
    @param id --> id della bicicletta di cui si vuole sapere la fascia prezzi. Mettere null se la ricerca viene fatta tramite categoria
    @return restituisce un oggetto contenete i prezzi, altrimenti false
*/
function getPrice(categoria, id = null) {
    let risultato = false,
        indiceCategoria;

    if (categoria != null) {
        indiceCategoria = getCategoria(null, categoria, 'indice');
    } else {
        indiceCategoria = getCategoria(id, null, 'indice');
    }

    (indiceCategoria != -1) ? risultato = _DATI[indiceCategoria].Prezzi: null;

    return risultato;
}

/*
    Mi dice se una determinata bici è affittata

    @param id della bici
*/
function isAffittata(id) {
    let indici = getIndiciBicicletta(id),
        risultato = false;

    (indici[0] != -1 && _DATI[indici[0]].Biciclette[indici[1]].Affittata) ? risultato = true: null;

    return risultato;
}

/*
    Cambia il valore presente nel parametro Affittata di una determinata bicicletta

    @param id della bici sulla quale si vuole lavorare
    @param valore che si vuole dare al parametro Affittata
    @return restituisce true se il parametro viene modificato, false se il valore di Affittata era già quello di Affitta
*/
function setAffittata(id, Affitta) {
    let indici = getIndiciBicicletta(id),
        risultato = false;


    if (indici[0] != -1 && _DATI[indici[0]].Biciclette[indici[1]].Affittata != Affitta) {
        _DATI[indici[0]].Biciclette[indici[1]].Affittata = Affitta;
        risultato = true;
    }

    return risultato;
}

/*
    Cambia i dati di una determinata bicicletta

    @param Bicicletta --> nuova bicicletta che andrà a sostituire la bicicletta con lo stesso ID i _DATI
    @return restitiusce true se è stato modificato altrimenti false
*/
function changeBici(Biciclette) {
    let indici = getIndiciBicicletta(Biciclette.ID),
        risultato = false;

    if (indici[0] != -1) {
        _DATI[indici[0]].Biciclette[indici[1]] = Biciclette;
        risultato = true;
    }

    return risultato;
}

/*
    Restituisce un array contenente l'ID e il valore di Affittata

    @return è un array di oggetti di due parametri, ID e valore, dove valore è int e può valere o 0 non affittata oppure 1 affittata
*/
function getStatusAffittate() {
    let risultato = [];

    for (let cat of _DATI) {
        for (let bici of cat.Biciclette) {
            if (bici.Affittata) {
                risultato.push({
                    ID: bici.ID,
                    Valore: 1
                });
            } else {
                risultato.push({
                    ID: bici.ID,
                    Valore: 0
                });
            }

        }
    }

    return risultato;
}

/*
    Calcola il prezzo totale

    @param arrayBiciclette --> array delle biciclette di cui si vuole calcolare il prezzo totale.
                                Ogni bicicletta deve contenere la fascia di prezzo come parametro
    @return restituisce il costo totale 
*/
function calcolaPrezzoTotale(arrayBiciclette) {
    let risultato = 0;

    for (let item of arrayBiciclette) {
        risultato += getPrice(getCategoria(item.ID, null, 'nome'))[item.FasciaOraria];
    }

    return risultato;
}





function getCategoriaByID(id) {
    let categorieCount = 0,
        bicicletteCount = 0,
        indexCategoria = -1;

    do {
        do {
            if (_DATI[categorieCount].Biciclette[bicicletteCount].ID == id) {
                indexCategoria = categorieCount;
            }
            bicicletteCount++;

        } while (bicicletteCount < _DATI[categorieCount].Biciclette.length && indexCategoria == -1);

        bicicletteCount = 0;
        categorieCount++;

    } while (categorieCount < _DATI.length && indexCategoria == -1);

    return indexCategoria;
}

function getCategoriaByNome(nomeCategoria) {
    let risultato = -1,
        arrayCategoire = getAllCategorie(),
        count = 0;

    do {
        if (arrayCategoire[count].toLowerCase() == nomeCategoria.toLowerCase()) {
            risultato = count;
        }
        count++;
    } while (count < arrayCategoire.length && risultato == -1);

    return risultato;
}