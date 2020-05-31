import {action, computed, decorate, extendObservable, observable} from 'mobx';
import {element} from "prop-types";


class Commande {

    estChoisi = observable.box(false);
    listeProduit = observable.box([]);
    nbProduit = 0;
    commandes = observable.box({});


    constructor() {

        this.estChoisi= false;
        this.listeProduit= [];
        this.commandes= {};

    }

    clearListeProduit(){
        this.listeProduit = [];
        this.nbProduit = 0;
    }

    ajouterProduitListe(produit){

        var aInserer = true;
        for (var i = 0; i < this.nbProduit; i++){
            if(this.listeProduit[i].id == produit.id){
                aInserer = false;
                return;
            }
        }


        if (aInserer){
            this.listeProduit = this.listeProduit.concat(produit);
            this.nbProduit ++;
        }

    }


    ajouterUnElementAuPanier(produit){

        //Verification présence dans le magasin
        var estPresent = false;
        for(var i = 0; i<this.listeProduit.length; i++){
            if (produit.id == this.listeProduit[i].id){
                estPresent = true;
            }
        }

        if(!estPresent){
            console.log("L'element n'est pas présent dans la liste des produits du magasin");
            return;
        }

        //Ajout panier
        estPresent = false;
        for (var key in this.commandes){
            if (produit.id == key){
                estPresent = true;
            }
        }

        if (estPresent){
            this.commandes[produit.id] ++;
        }else {
            this.commandes[produit.id] = 1;
        }
    }


    get articles() {
        return this.listeProduit;
    }


}
decorate(Commande, {
    articlescles: computed
})

export default new Commande();