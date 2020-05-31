import { extendObservable } from 'mobx';
import {CompareArrows} from "@material-ui/icons";

class Commande {
    constructor() {
        extendObservable(this,{
            estChoisi: false,
            listeProduit: [],
            commandes: {},
        })
    }

    ajouterProduitListe(produit){

        Commande.listeProduit = Commande.listeProduit.concat(produit);
        console.log(Commande.listeProduit);

    }


    ajouterUnElementAuPanier(produit){

        //Verification présence dans le magasin
        var estPresent = false;
        for(var i = 0; i<Commande.listeProduit.length; i++){
            if (produit.id == Commande.listeProduit[i].id){
                estPresent = true;
            }
        }

        if(!estPresent){
            console.log("L'element n'est pas présent dans la liste des produits du magasin");
            return;
        }

        //Ajout panier
        estPresent = false;
        for (var key in Commande.commandes){
            if (produit.id == key){
                estPresent = true;
            }
        }

        if (estPresent){
            Commande.commandes[produit.id] ++;
        }else {
            Commande.commandes[produit.id] = 1;
        }
    }

}

export default new Commande();