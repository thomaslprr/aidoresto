import {computed, decorate, observable} from 'mobx';

class Commande {

    //Panier d'article
    commandes = observable.box([]);
    idResto = "";


    constructor() {

        //On récupère les éléments du panier si cela fait moins de 1h et le resto et le meme
        if ('dateModif' in localStorage) {

            if(Date.now() < parseInt(localStorage.getItem('dateModif'), 10)) {

                if ('commande' in localStorage) {
                    this.commandes = JSON.parse(localStorage.getItem('commande'));
                } else {
                    this.commandes = {};
                }

                if ('idResto' in localStorage){
                    this.idResto = localStorage.getItem('idResto');
                }


            }else {
                this.suppressionLocalData();
            }
        }else{
            this.suppressionLocalData();
        }

    }

    //Sauvegarde dans le local storage
    sauvegardePanier(){
        localStorage.setItem('commande', JSON.stringify(this.commandes));
        localStorage.setItem('dateModif', ''+(Date.now()+(3600*1000)) );
    }

    suppressionLocalData(){
        this.idResto = "";
        this.commandes = [];
        localStorage.clear();
    }


    prixTotal(){
        let total = 0;

        this.commandes.forEach( element => total += (parseFloat(element.prix.replace(',', '.')) * element.quantite));

        return total.toFixed(2);
    }

    elementsTotals(idDuResto){

        if (this.idResto === "" || idDuResto === this.idResto){
            this.idResto = idDuResto;
            localStorage.setItem('idResto', this.idResto );
        }else {
            this.suppressionLocalData();
        }

        let count = 0;

        this.commandes.forEach( element => count += element.quantite);

        return count;
    }

    ajouterUnElementAuPanier(element){

        //Ajout panier
        let estPresent = false;
        for (let i = 0; i < this.commandes.length; i++){
            if (element.id === this.commandes[i].id){
                estPresent = true;
                this.commandes[i].quantite ++;
            }
        }

        if (!estPresent){
            let item = element;
            item.quantite = 1;
            item.type = "aLaCarte";
            this.commandes.push(item);
        }

        this.sauvegardePanier();
    }

    ajouterUnMenu(menu){
        //Ajout panier
        let estPresent = false;
        for (let i = 0; i < this.commandes.length; i++){
            if (menu.id === this.commandes[i].id){
                estPresent = true;
                this.commandes[i].quantite ++;
            }
        }

        if (!estPresent){
            let item = menu;
            item.quantite = 1;
            item.type = "menu";
            this.commandes.push(item);
        }

        this.sauvegardePanier();
    }

    arrayRemove(arr, item) {
        return arr.filter(function(ele){ return (ele.id !== item.id ); });
    }

    listeItems(){
        return this.commandes;
    }

    retraitProduit(id){

        let modifArr = false;
        let newArray;

        for (let i = 0; i < this.commandes.length; i++){
            if (id === this.commandes[i].id){
                if (this.commandes[i].quantite > 1){
                    console.log(this.commandes[i].quantite);
                    this.commandes[i].quantite--;
                    console.log(this.commandes[i].quantite);
                }else {
                    newArray = this.arrayRemove(this.commandes, this.commandes[i]);
                    modifArr = true;
                }
            }
        }

        if (modifArr){
            this.commandes = newArray;
        }

        this.sauvegardePanier();
    }


    quantiteItem(itemId){
        for (let i = 0; i < this.commandes.length; i++){
            if (itemId === this.commandes[i].id){
                return this.commandes[i].quantite;
            }
        }
        return 0;
    }

    viderLePanier(){
        this.commandes = [];
        this.sauvegardePanier();
    }

}
decorate(Commande, {
    articlescles: computed
});

export default new Commande();