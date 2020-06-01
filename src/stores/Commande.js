import {action, computed, decorate, extendObservable, observable} from 'mobx';
import {element} from "prop-types";


class Commande {

    listeProduit = observable.box([]);
    nbProduit = 0;
    commandes = observable.box({});


    constructor() {

        if ('dateModif' in localStorage) {

            if(Date.now() < parseInt(localStorage.getItem('dateModif'), 10)) {

                if ('commande' in localStorage) {
                    this.commandes = JSON.parse(localStorage.getItem('commande'));
                } else {
                    this.commandes = {};
                }

                if ('listeProduit' in localStorage) {
                    this.listeProduit = JSON.parse(localStorage.getItem('listeProduit'));
                } else {
                    this.listeProduit = [];
                }

            }else {
                localStorage.clear();
                this.commandes = {};
                this.listeProduit = [];
            }
        }else{
            this.commandes = {};
            this.listeProduit = [];
        }

        this.nbProduit = 0;
    }

    sauvegardePanier(){
        localStorage.setItem('commande', JSON.stringify(this.commandes));
        localStorage.setItem('dateModif', ''+(Date.now()+(3600*1000)) );
    }

    clearListeProduit(){
        this.listeProduit = [];
        this.nbProduit = 0;
    }

    ajouterProduitListe(produit){

        var aInserer = true;
        var present = false;
        for (var i = 0; i < this.nbProduit; i++){
            if(this.listeProduit[i].id == produit.id){
                aInserer = false;
            }
        }

        if (aInserer){
            this.listeProduit = this.listeProduit.concat(produit);
            this.nbProduit ++;
        }else {

            //Suppression de l'ancien
            for (let i = 0; i < this.listeProduit.length; i++){
                if (this.listeProduit[i].id === produit.id){
                    this.listeProduit.splice(i, 1);
                    break;
                }
            }

            //Ajout du nouveau
            this.listeProduit = this.listeProduit.concat(produit);
        }

        localStorage.setItem('listeProduit', JSON.stringify(this.listeProduit));
        localStorage.setItem('dateModif', ''+(Date.now()+(3600*1000)) );

    }

    prixTotal(){
        var items = this.listeItems();

        var total = 0;

        items.forEach( element => total += (element.prix * element.quantite));

        return total;
    }

    ajouterUnElementAuPanier(id){

        //Verification présence dans le magasin
        var estPresent = false;
        for(var i = 0; i<this.listeProduit.length; i++){
            if (id == this.listeProduit[i].id){
                estPresent = true;
            }
        }

        if(!estPresent){
            console.log("L'element n'est pas présent dans la liste des produits du magasin");
            return;
        }

        //Ajout panier
        estPresent = false;
        for (let key in this.commandes){
            if (id === key){
                estPresent = true;
            }
        }

        if (estPresent){
            this.commandes[id] ++;
        }else {
            this.commandes[id] = 1;
        }

        this.sauvegardePanier();
    }

    retraitProduit(id){

        for (let key in this.commandes){
            if (id == key){
                if (this.commandes[id] > 1){
                    this.commandes[id]--;
                }else {
                    delete this.commandes[id];
                }
            }
        }

        this.sauvegardePanier();
    }


    get articles() {
        return this.listeProduit;
    }

    quantiteItem(itemId){
        for (var key in this.commandes){
            if (itemId == key){
                return this.commandes[itemId];
            }
        }
        return 0;
    }

    listeItems(){

        // Retourne la commande (Objets + Quantite)
        var items = [];

        for (let idItem in this.commandes){

            for(var i = 0; i<this.listeProduit.length; i++){

                if (idItem == this.listeProduit[i].id){

                    var obj = Object.assign({}, this.listeProduit[i]);
                    var quantite = { quantite: this.quantiteItem(idItem)};

                    var res = Object.assign(obj,quantite);

                    items.push(res);
                    break;
                }
            }
        }

        console.log(items);
        return items;

    }

}
decorate(Commande, {
    articlescles: computed
})

export default new Commande();