import { Prenota, AggiungiACarrello } from './GestioneScelte.js';
import * as DomCarrello from './CreaDomCarrello.js';

$("#BottonePrenota").click(Prenota);
$("#BottoneCarrello").click(DomCarrello.creaDomCarrello);
$("#BottoneAggiungiCarrello").click(AggiungiACarrello);