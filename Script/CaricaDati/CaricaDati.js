import { uploadDati } from "./CaricaFuzioniDati.js";


let _DATI = [],
    _pathBici = "../Dati/bici.json",
    _pathPrezzi = "../Dati/prezzi.json";


/*
    Prende i dati dai file json e li carica in _DATI. Successivamente manda i dati a GestioneDati e fa creare il menu.
*/
$(document).ready(function() {
    $.ajax({
        url: _pathBici,
        type: "get",
        success: function(biciJson) {
            CaricaBici(biciJson);
        },
        complete: function() {
            $.ajax({
                url: _pathPrezzi,
                type: "get",
                success: function(prezziJson) {
                    CaricaPrezzi(prezziJson);
                },
                complete: function() {
                    uploadDati(_DATI);
                }
            });
        }

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

/*
    Serve per fare il push delle biciclette da il file json all'array _DATI
    @json --> Stringa contenente i dati delle biciclette
*/
function CaricaBici(biciJson) {
    let indiceCategoria, oggetto;
    for (var item of biciJson) {
        indiceCategoria = CategoriaEsistente(item.Categoria);
        oggetto = CreaObjectBici(indiceCategoria, item);

        (indiceCategoria == -1) ? _DATI.push(oggetto): _DATI[indiceCategoria].Biciclette.push(oggetto);
    }
}

/*
    Crea il singolo oggetto bici che poi verrà pushatto nell'array
    @indiceCategoria --> Dice se la categoria è già esistente oppure no
    @item --> Bicicletta da inserire
    @return restituisce l'oggetto da inserire nell'array
*/
function CreaObjectBici(indiceCategoria, item) {
    let oggetto;
    if (indiceCategoria == -1) {
        oggetto = {
            Categoria: item.Categoria,
            Biciclette: [{
                ID: item.ID,
                Modello: item.Modello,
                Affittata: item.Affittata,
                Immagine: item.Immagine
            }]
        };
    } else {
        oggetto = {
            ID: item.ID,
            Modello: item.Modello,
            Affittata: item.Affittata,
            Immagine: item.Immagine
        };
    }
    return oggetto;
}

/*
    Serve per fare il push dei prezzi da il file json all'array _DATI
    @json --> Stringa contenente i dati dei prezzi
*/
function CaricaPrezzi(prezzoJson) {
    let indiceCategoria, oggetto;
    for (var item of prezzoJson) {
        indiceCategoria = CategoriaEsistente(item.Categoria);
        oggetto = CreaObjectPrezzo(indiceCategoria, item);

        (indiceCategoria == -1) ? _DATI.push(oggetto): _DATI[indiceCategoria].Prezzi = oggetto;
    }
}

/*
    Crea il singolo oggetto prezo che poi verrà pushatto nell'array
    @indiceCategoria --> Dice se la categoria è già esistente oppure no
    @item --> Prezzo da inserire
    @return restituisce l'oggetto da inserire nell'array
*/
function CreaObjectPrezzo(indiceCategoria, item) {
    let prezzo;
    if (indiceCategoria == -1) {
        prezzo = {
            Categoria: item.Categoria,
            Biciclette: [],
            Prezzi: {
                HalfDay: item.HalfDay,
                FullDay: item.FullDay,
                FourDays: item.FourDays,
                OneWeek: item.OneWeek
            }
        };
    } else {
        _DATI[indiceCategoria].Prezzi
        prezzo = {
            HalfDay: item.HalfDay,
            FullDay: item.FullDay,
            FourDays: item.FourDays,
            OneWeek: item.OneWeek
        };
    }
    return prezzo;
}