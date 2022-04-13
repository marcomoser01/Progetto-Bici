import * as ClassDati from '../ClassDati.js';
import * as GeneraEventListener from '../GeneraEventListener.js';
import * as Carrello from '../Carrello.js';






/*
    Crea il div per la bicicletta singola, con l'immagine e il modello
    @param bicicletta --> gli passo un oggetto bicicletta, contenente l'ID, il Modello e l'immagine
    @param grayScale --> se non voglio che l'immagine abbia degli eventListener e che sia colorata passare false
    @return --> restituisce un div element node
*/
export function creaDivBiciclettaSingola(bicicletta, grayScale = true) {
    let divBici = CreaDOMBicicletta(bicicletta, grayScale);
    divBici.appendChild(CreaDOMImmagine(bicicletta, grayScale), null);
    divBici.appendChild(CreaDOMModello(bicicletta));
    return divBici;
}

function CreaDOMBicicletta(bicicletta, grayScale = true) {
    let divBici = document.createElement('div');
    divBici.setAttribute('id', 'ID-bici-' + bicicletta.ID);
    divBici.setAttribute('class', 'div-bicicletta');
    if (grayScale) {
        divBici.addEventListener('click', () => { GeneraEventListener.clickBicicletta(bicicletta.ID) });
        divBici.addEventListener('mouseover', () => { GeneraEventListener.mouseoverBicicletta(bicicletta.ID) });
        divBici.addEventListener('mouseout', () => { GeneraEventListener.mouseoutBicicletta(bicicletta.ID) });
    }
    return divBici;
}

function CreaDOMImmagine(bicicletta, grayScale = true) {
    let img = document.createElement('img');
    img.setAttribute('class', 'img-biciletta');
    img.setAttribute('id', 'id-img-' + bicicletta.ID);
    img.src = bicicletta.Immagine;
    if (ClassDati.isAffittata(bicicletta.ID)) {
        img.style.filter = "grayscale(1)";
    } else if (Carrello.indiceBiciInCarrello(bicicletta.ID) == -1 || !grayScale) {
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

export function creaDivNomePrezzo(Categoria, Prezzi) {
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
    Prende in ingresso l'id di una bicicletta ed il valore che si vuole dare al grayscale e dopo aver selezionato il dom della bicicletta cambia la tonalità
*/
export function cambiaScalaGrigi(id, value) {

    let DOMimmagine = document.getElementById('id-img-' + id);
    DOMimmagine.style.filter = "grayscale(" + value + ")";

}

/*
    La funzione fa l'hidden sul bottone prenota in base al valore in ingresso

    @param value --> passare true se si vuole nascondere il bottone, oppure false se lo si volesse rendere visibile
*/
export function hiddenPrenota(value) {
    let prenota = document.getElementById('BottonePrenota'),
        pCostoTotale = document.getElementById('p-PrezzoTotale');

    if (!value) {
        prenota.removeAttribute('hidden');
        pCostoTotale.removeAttribute('hidden');
    } else {
        prenota.setAttribute('hidden', 'hidden');
        pCostoTotale.setAttribute('hidden', 'hidden');
    }
}

/*
    Preso in ingresso un id di un node element, rimuove tutti gli elementi al suo interno
*/
export function removeAllChildNodes(id) {
    let div = document.getElementById(id);
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

export function creaRadioBottonPrice(bicicletta) {
    let Form = document.createElement('form'),
        fasciaPrezzi = ClassDati.getPrice(null, bicicletta.ID);

    for (let item of Object.keys(fasciaPrezzi)) {
        Form.appendChild(createDivRadio(bicicletta, [item, fasciaPrezzi[item]]));
    }
    Form.setAttribute('id', 'id-RadioButton-' + bicicletta.ID);

    return Form;
}

function createDivRadio(bicicletta, prezzo) {
    let label = document.createElement('label');
    let input = document.createElement('input');

    input.setAttribute('type', 'radio');
    input.setAttribute('class', 'input-radio');
    input.setAttribute('id', 'radio-ID-' + bicicletta.ID + '-Prezzo-' + prezzo[0]);
    input.setAttribute('name', 'prezzo');
    input.addEventListener('change', () => { GeneraEventListener.onchangeRadioButton(bicicletta.ID, prezzo[0]) });

    if (prezzo[0] == bicicletta.FasciaOraria) {
        input.setAttribute('checked', true);
    }

    label.appendChild(input);
    label.appendChild(document.createTextNode(prezzo[0] + ":\t" + prezzo[1]));

    return label;
}

/*
    Controlla che le bici che sono prenota siano grige e quelle non prenotate siano colorate
*/
export function aggiornaMenu() {
    let satusAffittate = ClassDati.getStatusAffittate();

    for (let item of satusAffittate) {
        cambiaScalaGrigi(item.ID, item.Valore);
    }
}