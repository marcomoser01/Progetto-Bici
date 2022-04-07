import { callFunction as callFunctionInterazioni } from './GestioneInterazione.js';
import { creaDomCarrello } from './GestioneDOM/CreaDomCarrello.js';
import { callCreaDivMenu } from './ClassDati.js';


let prenota = () => { return callFunctionInterazioni('prenota') }


$("#BottonePrenota").click(prenota);
$("#BottoneCarrello").click(creaDomCarrello);
$("#BottoneHome").click(callCreaDivMenu);