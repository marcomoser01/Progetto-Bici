import { uploadDati } from "./CaricaFuzioniDati.js";
import { getDati } from './Firebase.js';

let _DATI = [],
    _pathBici = "../Dati/Biciclette.json",
    arrayPromise = [       
        $.getJSON(_pathBici, (dati) => { _DATI = dati; })
    ];

/*
    Prende i dati dai file json e li carica in _DATI. Successivamente manda i dati a GestioneDati e fa creare il menu.
*/
/*
Promise.all(arrayPromise).then(() => {
    getDati().then((values)=>{
        console.log(values);
    });
    uploadDati(_DATI);
});
*/

/*
    Prende i dati da firestore. Successivamente manda i dati a GestioneDati e fa creare il menu.
*/
$(document).ready(() => {
    $(document).ready(() => {
        getDati().then((values)=>{
            _DATI = values;
            console.log("ciao");
            uploadDati(_DATI);
        });
    });
});

/*
  Controlla se una determinata categoria è già presente nell'array
  @categoria --> Nome della categoria da cercare
  @return Restituise -1 se non è già stata inserita, altrimenti restituisce l'indice di riga in cui si trova
*/
function CategoriaEsistente(categoria) {
    let risultato = -1;
    for (let i = 0; i < _DATI.length; i++) {
        if (_DATI[i].Categoria.toUpperCase() == categoria.toUpperCase()) {
            risultato = i;
            break;
        }
    }
    return risultato;
}

function CaricaCategorie(categorieJson) {
    let oggetto = {};
    for (let item of categorieJson) {
        oggetto = {
            "Categoria": item.Categoria,
            "Biciclette": CaricaBici(item.Biciclette),
            "Prezzi": item.Prezzi
        };
        _DATI.push(oggetto);
    }
}

/*
    Serve per fare il push delle biciclette da il file json all'array _DATI
    @json --> Stringa contenente i dati delle biciclette
*/
function CaricaBici(biciJson) {
    let oggetto = [];

    for (var item of biciJson) {
        oggetto.push(CreaObjectBici(item));
    }

    return oggetto;
}

/*
    Crea il singolo oggetto bici che poi verrà pushatto nell'array
    @indiceCategoria --> Dice se la categoria è già esistente oppure no
    @item --> Bicicletta da inserire
    @return restituisce l'oggetto da inserire nell'array
*/
function CreaObjectBici(item) {
    let oggetto = {
        ID: item.ID,
        Modello: item.Modello,
        Affittata: item.Affittata,
        Immagine: item.Immagine
    };

    return oggetto;
}