let _DATI = [];

export function ConstructorDati(dati) {
    _DATI = dati;
    console.log(_DATI);
}

export function toString() {
    return _DATI.toString();
}

/*
    Prendendo in ingresso il nome di una categoria e restituisce l'indice della cella della categoria

    @param Nome della categoria
    @result restituisce l'indice della categoria, altrimenti restituisce -1
*/
function GetIndexCategoriaByStringName(nomeCategoria) {
    let index = 0,
        trovata = false;
    do {
        (_DATI[index].Categoria == nomeCategoria) ? trovata = true: index++;
    } while (index < _DATI.length && !trovata);
    (!trovata) ? index = -1: null;
    return index;
}

/*
    Prendendo in ingresso l'ID di una specifica bicicletta restituisce l'indice della cella della categoria della bicicletta

    @param ID della bicicletta della quale si vuole sapere a che categoria è collegata
    @result restituisce l'indice della categoria in cui è presente la bicicletta, altrimenti restituisce -1
*/
export function GetIndexCategoria(ID) {
    let index = 0,
        trovata = false;
    do {
        (IsInQuestaCategoria(_DATI[index].Biciclette, ID)) ? trovata = true: index++;
    } while (index < _DATI.length && !trovata);
    (!trovata) ? index = -1: null;
    return index;
}

/*
    Restituisce il nome della categoria prendendo in ingresso l'indice

    @param id della categoria
    @return restituisce una stringa contenete il nome della categoria
*/
export function GetNameCategoryByIndex(ID) {
    return _DATI[ID].Categoria;
}

/*
    Preso in ingresso un array di biciclette ed un id specifico, mi dice se una bicicletta con quel determinato id è presente in quel specifico sottogruppo

    @param array delle biciclette sulle quali controllare
    @param id della bicicletta di cui si vuole sapere se è presente
    @return restituisce true se è presente, false se non dovesse essere presente
*/
function IsInQuestaCategoria(biciclette, id) {
    let trovato = false,
        indice = 0;
    while (indice < biciclette.length && !trovato) {
        (biciclette[indice].ID == id) ? trovato = true: indice++;
    }
    return trovato;
}

/*
    Cerca se è presente un determinato ID nell'array biciclette

    @param array contenete le biciclette nelle quali voglio controllare
    @param ID della bicicletta che si vuole trovare
    @return restituisce l'indice della cella in cui è presente l'id della bicicletta da cercare, se non dovesse essere presente restituisce -1
*/
function FindIndexBike(biciclette, ID) {
    let risultato = -1,
        count = 0;
    while (risultato == -1 && count < biciclette.length) {
        (biciclette[count].ID == ID) ? risultato = count: count++;
    }
    return risultato;
}

/*
    Mi restituisce un array contenete gli indici
    
    @param ID della bicicletta di cui si vuole trovare gli indici
    @return Mi restituisce un array. L'indice di categoria è in posizione 0 e l'indice della bicicletta è in posizione 1
*/
function GetIndici(ID) {
    let indici = [];
    indici.push(GetIndexCategoria(ID));
    indici.push(FindIndexBike(_DATI[indici[0]].Biciclette, ID));
    return indici;
}

/*
    Restituisce la bicicletta desiderata

    @param ID della bicicletta di cui si vuole sapere
    @return restituisce l'oggetto bicicletta se viene trovato, altrimenti false
*/
export function GetBiciByID(ID) {
    let risultato = false,
        indici = GetIndici(ID);
    if (indici[0] != -1) {
        (indici[1] != -1) ? risultato = _DATI[indici[0]].Biciclette[indici[1]]: null;
    }
    return risultato;
}

/*
    Restituisce un oggetto contenente i prezzi di una determinata categoria

    @param nome della categoria
    @return restituisce un oggetto contenete i prezzi, altrimenti false
*/
export function GetPrice(categoria) {
    let risultato = false,
        indiceCategoria = GetIndexCategoriaByStringName(categoria);
    (indiceCategoria != -1) ? risultato = _DATI[indiceCategoria].Prezzi: null;
    return risultato;
}

/*
    Cambia il valore presente nel parametro Affittata di una determinata bicicletta

    @param ID della bici sulla quale si vuole lavorare
    @param valore che si vuole dare al parametro Affittata
    @return restituisce true se il parametro viene modificato, false se il valore di Affittata era già quello di Affitta
*/
export function SetAffitta(ID, Affitta) {
    let indici = GetIndici(ID),
        risultato = false;
    if (_DATI[indici[0]].Biciclette[indici[1]].Affitta != Affitta) {
        _DATI[indici[0]].Biciclette[indici[1]].Affitta = Affitta;
        risultato = true;
    }
    return risultato;
}

export function ChangeBici(Bici) {
    let indici = GetIndici(Bici.ID);
    _DATI[indici[0]].Biciclette[indici[1]] = Bici;
}

/*
    Mi dice se una determinata bici è affittata

    @param ID della bici
*/
export function IsAffittata(ID) {
    let indici = GetIndici(ID),
        risultato = false;
    (_DATI[indici[0]].Biciclette[indici[1]].Affitta) ? risultato = true: null;
    return risultato;
}




/*
    Restituisce un array contenente l'ID e il valore di Affittata

    @return è un array di oggetti di due parametri, ID e valore, dove valore è int e può valere o 0 non affittata oppure 1 affittata
*/
export function GetStatusAffittate() {
    let risultato = [];
    for (let cat of _DATI) {
        for (let bici of cat.Biciclette) {
            if (bici.Affitta) {
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

export function GetDatiByID(ID) {
    let bicicletta = GetBiciByID(ID);
    bicicletta.Prezzi = GetPrice(GetNameCategoryByIndex(GetIndexCategoria(ID)));
    return bicicletta;

}