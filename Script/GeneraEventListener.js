import * as GeneraNodeElement from './GestioneDOM/GeneraNodeElement.js';
import * as ClassDati from './ClassDati.js';
import * as Carrello from './Carrello.js';




export function clickBicicletta(id) {
    if (ClassDati.isAffittata(id)) {
        alert("La bici è già stata prenotata");
    } else {
        let indiceElemento = Carrello.indiceBiciInCarrello(id);
        if (indiceElemento == -1) {
            Carrello.addElementInCarrelloByID(id);
            GeneraNodeElement.cambiaScalaGrigi(id, 1);
        } else {
            Carrello.spliceCarrello(id);
            GeneraNodeElement.cambiaScalaGrigi(id, 0);
        }
    }
}

export function mouseoverBicicletta(id) {
    if (!imgIsGray(id)) {
        GeneraNodeElement.cambiaScalaGrigi(id, 1);
    }
}

export function mouseoutBicicletta(id) {
    if (imgIsGray(id)) {
        if (!ClassDati.isAffittata(id) && Carrello.indiceBiciInCarrello(id) == -1) {
            GeneraNodeElement.cambiaScalaGrigi(id, 0);
        }
    }
}

export function imgIsGray(id) {
    let DOMimmagine = document.getElementById('id-img-' + id);
    return (DOMimmagine.style.filter == "grayscale(1)") ? true : false;
}

export function onchangeRadioButton(id, fasciaOraria) {
    Carrello.changeCarrello(id, fasciaOraria);
}