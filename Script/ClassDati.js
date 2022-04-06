let _DATI = [];

export function ConstructorDati(dati) {
    _DATI = dati;
    console.log(_DATI);
    console.log(callFunction('isAffittata'));
}

/*
    Tenta di chiamare la funzione richiesta

    @param nomeFunzione --> nome della funzione che si desidera chiamare
    @param ...arg --> 0 o più argomenti necessari alla funzione
    @return Restituisce o il risultato della funzione, oppure un ReferenceError
*/
export function callFunction(nomeFunzione, ...arg) {
    let risultato;
    try {
        let funzione = eval(nomeFunzione);
        risultato = funzione(...arg);
    } catch (e){
        risultato = e;
    }
    return risultato;
}


let toString = () => { return _DATI.toString() };
let getAllCategorie = () => { return _DATI.getAllCategorie() };
let getAllBiciclette = () => { return  _DATI.getAllBiciclette()};
let getCategoria = (id, nomeCategoria, tipoRisultato) => { return _DATI.getCategoria(id, nomeCategoria, tipoRisultato) };
let findIndexBike = (arrayBiciclette) => { return _DATI.findIndexBike(arrayBiciclette) };
let getIndiciBicicletta = (id) => { return _DATI.getIndiciBicicletta(id) };
let getBikeOfCategory = (nomeCategoria) => { return _DATI.getBikeOfCategory(nomeCategoria) };
let getBiciclettaByID = (id) => { return _DATI.getBiciclettaByID(id) };
let getPrice = (categoria) => { return _DATI.getPrice(categoria) };
let setAffittata = (id, Affitta) => { return _DATI.setAffittata(id, Affitta) };
let changeBici = (Biciclette) => { return _DATI.changeBici(Biciclette) };
let isAffittata = (id) => { return _DATI.isAffittata(id) };
let getStatusAffittate = () => { return _DATI.getStatusAffittate() };



/*
    Prendendo in ingresso l'ID di una specifica bicicletta restituisce l'indice della cella della categoria della bicicletta

    @param ID della bicicletta della quale si vuole sapere a che categoria è collegata
    @result restituisce l'indice della categoria in cui è presente la bicicletta, altrimenti restituisce -1
*/
export function GetIndexCategoria(id) {
    return _DATI.getCategoria(id, null, 'indice');
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
    Restituisce la bicicletta desiderata

    @param ID della bicicletta di cui si vuole sapere
    @return restituisce l'oggetto bicicletta se viene trovato, altrimenti false
*/
export function GetBiciByID(ID) {
    let risultato = false,
        indici = _DATI.getIndiciBicicletta(ID);
    if (indici[0] != -1) {
        (indici[1] != -1) ? risultato = _DATI[indici[0]].Biciclette[indici[1]] : null;
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
        indiceCategoria = _DATI.getCategoria(null, categoria);
    (indiceCategoria != -1) ? risultato = _DATI[indiceCategoria].Prezzi : null;
    return risultato;
}

/*
    Cambia il valore presente nel parametro Affittata di una determinata bicicletta

    @param ID della bici sulla quale si vuole lavorare
    @param valore che si vuole dare al parametro Affittata
    @return restituisce true se il parametro viene modificato, false se il valore di Affittata era già quello di Affitta
*/
export function SetAffitta(ID, Affitta) {
    let indici = DATI.getIndiciBicicletta(ID),
        risultato = false;
    if (_DATI[indici[0]].Biciclette[indici[1]].Affitta != Affitta) {
        _DATI[indici[0]].Biciclette[indici[1]].Affitta = Affitta;
        risultato = true;
    }
    return risultato;
}

export function ChangeBici(Bici) {
    let indici = DATI.getIndiciBicicletta(Bici.id);
    _DATI[indici[0]].Biciclette[indici[1]] = Bici;
}

/*
    Mi dice se una determinata bici è affittata

    @param ID della bici
*/
export function IsAffittata(ID) {
    let indici = DATI.getIndiciBicicletta(ID),
        risultato = false;
    (_DATI[indici[0]].Biciclette[indici[1]].Affitta) ? risultato = true : null;
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