import { Prenota, pushCarrelloLocalStorage } from './GestioneInterazione.js';
import * as DomCarrello from './GestioneDOM/CreaDomCarrello.js';

$("#BottonePrenota").click(Prenota);
$("#BottoneCarrello").click(DomCarrello.creaDomCarrello);
$("#BottoneAggiungiCarrello").click(pushCarrelloLocalStorage);