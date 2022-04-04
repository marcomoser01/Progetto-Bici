//Devo gestire che le bici che sono già presenti in carrello vengano già in grigio

export { CreaDivMenu, CambiaScalaGrigi }
import { IsAffittata } from './ClassDati.js';
import { IndiceBiciInCarrello, AddElementInCarrello, SpliceCarrello, pullCarrello } from './GestioneScelte.js';



/*
    Modifica il DOM della pagina inserendo il menù, caricato dinamicamento da un file json
    @dati --> dati delle biciclette per poter creare il menù
*/
function CreaDivMenu(dati) {
    pullCarrello();
    let divCatalogo = document.getElementById('div-catalogo');

    for (let item of dati) {
        divCatalogo.insertBefore(CreaParagrafiCategorie(item, 'div'), null);
    }

}

/*
    Crea un element node da specificare contenente le categorie
    @categorie --> array contenete il nome delle categorie
    @tag --> tipo di tag in cui si vogliono inserire i paragrafi, se non inserito è stato impostato div di default
    @return --> restituisce l'element node specificato contenente la lista dei paragrafi

*/
function CreaParagrafiCategorie(categoria, tag = 'div') {
    let DOMCategoria,
        divContenitoreBiciclette;

    DOMCategoria = document.createElement(tag);
    DOMCategoria.setAttribute('class', tag + '-categorie');
    DOMCategoria.setAttribute('id', 'id-' + categoria.Categoria);


    divContenitoreBiciclette = CreaDivBiciclette(categoria.Biciclette, 2);
    divContenitoreBiciclette.setAttribute('class', 'div-contenitoreBiciclette');
    divContenitoreBiciclette.setAttribute('id', 'contenitore-' + categoria.Categoria);
    DOMCategoria.appendChild(CreaDivNomePrezzo(categoria.Categoria, categoria.Prezzi));
    DOMCategoria.appendChild(divContenitoreBiciclette);


    return DOMCategoria;
}

function CreaDivNomePrezzo(Categoria, Prezzi) {
    let div = document.createElement('div'),
        nomeCategoria = document.createElement('h1');

    nomeCategoria.setAttribute('id', 'id-' + Categoria);
    nomeCategoria.setAttribute('class', 'h1-categorie');
    nomeCategoria.innerText = Categoria;
    div.appendChild(nomeCategoria);
    div.appendChild(CreaParagrafoPrezzi(Prezzi, Categoria));
    div.setAttribute('class', 'class-Nome-Prezzo');
    return div;
}

/*
    Crea il paragrafo DOM dei prezzi
    @prezzi --> oggetto contenente i prezzi
    @categoria --> categoria di cui si stanno scrivendo i prezzi
    @return restituise un element node contenete i prezzi con class e id specificati
*/
function CreaParagrafoPrezzi(prezzi, categoria) {
    let paragrafoPrezzi = document.createElement('p');
    let s = "";
    paragrafoPrezzi.setAttribute('class', 'p-prezzi');
    paragrafoPrezzi.setAttribute('id', 'id-prezzi-' + categoria);
    for (let key of Object.keys(prezzi)) {
        s += '$' + prezzi[key] + ' / ' + key + '\t|\t';
    }
    s = s.substring(0, s.length - 3);
    paragrafoPrezzi.innerText = s;
    return paragrafoPrezzi;
}

/*
    Crea il div per un array di biciclette, con l'immagine e il modello. La lista delle biciclette viene suddivisa in nRow numero di righe volute
    @biciclette --> array di biciclette da inserire
    @nRow --> numero di righe sulle quali si vuole suddividere il div. Inserire false se lo si vuole fare tutto su una riga
    @return --> restituisce un div element node
*/
function CreaDivBiciclette(biciclette, nRow) {
    let divBiciclette = document.createElement('div');
    let divRow = document.createElement('div');
    divRow.setAttribute('class', 'div-RowGrid');
    for (let item of biciclette) {
        if (nRow != "false") {
            if (divRow.childNodes.length == nRow) {
                divBiciclette.appendChild(divRow);
                divRow = document.createElement('div');
                divRow.setAttribute('class', 'div-RowGrid');
            }
        }

        divRow.appendChild(CreaDivBiciclettaSingola(item));
    }
    if (divRow.childNodes.length > 0) {
        divBiciclette.appendChild(divRow);
        divRow = document.createElement('div');
    }
    return divBiciclette;
}

/*
    Crea il div per la bicicletta singola, con l'immagine e il modello
    @bicicletta --> gli passo un oggetto bicicletta, contenente l'ID, il Modello e l'immagine
    @return --> restituisce un div element node
*/
function CreaDivBiciclettaSingola(bicicletta) {
    let divBici = CreaDOMDivBici(bicicletta);
    divBici.appendChild(CreaDOMImmagine(bicicletta), null);
    divBici.appendChild(CreaDOMModello(bicicletta));
    return divBici;
}



function CreaDOMDivBici(bicicletta) {
    let divBici = document.createElement('div');
    divBici.setAttribute('id', 'ID-bici-' + bicicletta.ID);
    divBici.setAttribute('class', 'div-bicicletta');
    divBici.addEventListener('click', () => { ClickBicicletta(bicicletta.ID) });
    divBici.addEventListener('mouseover', () => { MouseoverBicicletta(bicicletta.ID) });
    divBici.addEventListener('mouseout', () => { MouseoutBicicletta(bicicletta.ID) });
    return divBici;
}

function CreaDOMImmagine(bicicletta) {
    let img = document.createElement('img');
    img.setAttribute('class', 'img-biciletta');
    img.setAttribute('id', 'id-img-' + bicicletta.ID);
    img.src = bicicletta.Immagine;
    if (IndiceBiciInCarrello(bicicletta.ID) == -1) {
        img.style.filter = "grayscale(0)";
    } else {
        img.style.filter = "grayscale(1)";
    }
    return img;
}

function CreaDOMModello(bicicletta) {
    let modello = document.createElement('p');
    modello.setAttribute('class', 'p-Modello');
    modello.setAttribute('id', 'id-p-' + bicicletta.ID);
    modello.innerText = bicicletta.Modello;
    return modello;
}




function ClickBicicletta(id) {
    if (IsAffittata(id)) {
        alert("La bici è già stata prenotata");
    } else {
        let indiceElemento = IndiceBiciInCarrello(id);
        if (indiceElemento == -1) {
            AddElementInCarrello(id);
            CambiaScalaGrigi(id, 1);
        } else {
            SpliceCarrello(indiceElemento);
            CambiaScalaGrigi(id, 0);
        }
    }
}

function MouseoverBicicletta(id) {
    if (!ImgIsGray(id)) {
        CambiaScalaGrigi(id, 1);
    }
}

function MouseoutBicicletta(id) {
    if (ImgIsGray(id)) {
        if (!IsAffittata(id) && IndiceBiciInCarrello(id) == -1) {
            CambiaScalaGrigi(id, 0);
        }
    }
}

function CambiaScalaGrigi(id, value) {

    let DOMimmagine = document.getElementById('id-img-' + id);
    DOMimmagine.style.filter = "grayscale(" + value + ")";

}

function ImgIsGray(id) {
    let DOMimmagine = document.getElementById('id-img-' + id);
    return (DOMimmagine.style.filter == "grayscale(1)") ? true : false;
}