import { creaDomCarrello } from './GestioneDOM/CreaDomCarrello.js';
import { callCreaDivMenu, setAllPrenotabili } from './ClassDati.js';
import { Prenota } from './Prenotazioni.js';




$("#BottonePrenota").click(Prenota);
$("#BottoneCarrello").click(creaDomCarrello);
$("#BottoneHome").click(callCreaDivMenu);
$("#bottone-reset").click(setAllPrenotabili);