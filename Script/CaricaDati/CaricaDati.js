import { uploadDati } from "./CaricaFuzioniDati.js";
import { getDati, pushDati } from './Firebase.js';
/*
let _DATI = [],
    _pathBici = "../Dati/Biciclette.json";

let arrayPromise = [
        $.getJSON(_pathBici, (dati) => { _DATI = dati; })
    ];

//Prende i dati dai file json e li carica in _DATI. Successivamente manda i dati a GestioneDati e fa creare il menu.
Promise.all(arrayPromise).then(() => {
    getDati().then((values)=>{
        console.log(values);
    });
    uploadDati(_DATI);
});
*/