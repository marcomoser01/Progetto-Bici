import * as GestioneInterazione from './GestioneInterazione.js';
import { creaDomCarrello } from './GestioneDOM/CreaDomCarrello.js';
import { callCreaDivMenu, setAllPrenotabili } from './ClassDati.js';


let prenota = () => { return GestioneInterazione.prenota() }


$("#BottonePrenota").click(prenota);
$("#BottoneCarrello").click(creaDomCarrello);
$("#BottoneHome").click(callCreaDivMenu);
$("#bottone-reset").click(setAllPrenotabili);