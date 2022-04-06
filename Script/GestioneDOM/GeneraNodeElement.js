//Devo spostare in questo file tutte le funzioni comuni tra CreaDomCarrello e ModifyDom
import { IndiceBiciInCarrello } from '../GestioneInterazione.js';
import { callFunction as callFunctionDati } from './../ClassDati.js';
import { callFunction as callFunctionEventListener } from './GeneraEventListener.js';


export function callFunction(nomeFunzione, ...arg) {
    let risultato;
    try {
        let funzione = eval(nomeFunzione);
        risultato = funzione(...arg);
    } catch (e) {
        risultato = e;
    }
    return risultato;
}


/*
    Crea il div per la bicicletta singola, con l'immagine e il modello
    @param bicicletta --> gli passo un oggetto bicicletta, contenente l'ID, il Modello e l'immagine
    @param grayScale --> se non voglio che l'immagine abbia degli eventListener e che sia colorata passare false
    @return --> restituisce un div element node
*/
function creaDivBiciclettaSingola(bicicletta, grayScale = true) {
    let divBici = CreaDOMDivBici(bicicletta, grayScale);
    divBici.appendChild(CreaDOMImmagine(bicicletta, grayScale), null);
    divBici.appendChild(CreaDOMModello(bicicletta));
    return divBici;
}

function CreaDOMDivBici(bicicletta, grayScale = true) {
    let divBici = document.createElement('div');
    divBici.setAttribute('id', 'ID-bici-' + bicicletta.ID);
    divBici.setAttribute('class', 'div-bicicletta');
    if (grayScale) {
        divBici.addEventListener('click', () => { callFunctionEventListener('clickBicicletta', bicicletta.ID) });
        divBici.addEventListener('mouseover', () => { callFunctionEventListener('mouseoverBicicletta', bicicletta.ID) });
        divBici.addEventListener('mouseout', () => { callFunctionEventListener('mouseoutBicicletta', bicicletta.ID) });
    }
    return divBici;
}

function CreaDOMImmagine(bicicletta, grayScale = true) {
    let img = document.createElement('img');
    img.setAttribute('class', 'img-biciletta');
    img.setAttribute('id', 'id-img-' + bicicletta.ID);
    img.src = bicicletta.Immagine;
    if (IndiceBiciInCarrello(bicicletta.ID) == -1 || !grayScale) {
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

function creaDivNomePrezzo(Categoria, Prezzi) {
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

function cambiaScalaGrigi(id, value) {

    let DOMimmagine = document.getElementById('id-img-' + id);
    DOMimmagine.style.filter = "grayscale(" + value + ")";

}

function hiddenPrenota() {
    let prenota = document.getElementById('BottonePrenota');
    if (prenota.getAttribute("hidden")) {
        prenota.removeAttribute("hidden");
    } else {
        prenota.setAttribute("hidden", "hidden");
    }

}

function removeAllChildNodes(id) {
    let div = document.getElementById(id);
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function creaRadioBottonPrice(bicicletta, scelte) {
    let Form = document.createElement('form'),
        fasciaPrezzi = callFunctionDati('getPrice', null, bicicletta.ID);

    for (let item of Object.keys(fasciaPrezzi)) {
        Form.appendChild(createDivRadio(bicicletta.ID, [item, fasciaPrezzi[item]], scelte));
    }
    Form.setAttribute('id', 'id-RadioButton-' + bicicletta.ID);

    return Form;
}

function createDivRadio(id, prezzo, scelte) {
    let label = document.createElement('label');
    let input = document.createElement('input');

    input.setAttribute('type', 'radio');
    input.setAttribute('class', 'input-radio');
    input.setAttribute('id', 'radio-ID-' + id + '-Prezzo-' + prezzo[0]);
    input.setAttribute('name', 'prezzo');
    input.addEventListener('change', () => { callFunctionEventListener('onchangeRadioButton', id, prezzo[0], scelte) });
    label.appendChild(input);
    label.appendChild(document.createTextNode(prezzo[0] + ":\t" + prezzo[1]));

    return label;
}