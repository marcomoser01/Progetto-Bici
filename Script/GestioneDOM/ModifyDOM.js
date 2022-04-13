import * as GeneraNodeElement from './GeneraNodeElement.js';
import * as Carrello from '../Carrello.js';


let _CARRELLO;

/*
    Modifica il DOM della pagina inserendo il menù, caricato dinamicamento da un file json
    @dati --> dati delle biciclette per poter creare il menù
*/
export function creaDivMenu(dati) {
    _CARRELLO = Carrello.exportCarrello();
    GeneraNodeElement.removeAllChildNodes("div-catalogo");
    GeneraNodeElement.hiddenPrenota(true);
    _CARRELLO.getLocalStorage();
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
    DOMCategoria.appendChild(GeneraNodeElement.creaDivNomePrezzo(categoria.Categoria, categoria.Prezzi));
    DOMCategoria.appendChild(divContenitoreBiciclette);


    return DOMCategoria;
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

        divRow.appendChild(GeneraNodeElement.creaDivBiciclettaSingola(item));
    }
    if (divRow.childNodes.length > 0) {
        divBiciclette.appendChild(divRow);
        divRow = document.createElement('div');
    }
    return divBiciclette;
}