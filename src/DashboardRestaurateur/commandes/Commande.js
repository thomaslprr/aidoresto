import React, {useEffect, useRef, useState} from 'react';
import * as firebase from "firebase";
import ListeCommandes from "./ListeCommandes";

const add_minutes =  function (dt, minutes) {
    return new Date(dt.getTime() + minutes*60000);
};

const Commande = ({id}) => {


    const [listeCommande,setListeCommande] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        firebase.firestore().collection("restaurant").doc(id).collection("commandes").where("etat", "in", ['attente', 'en cours']).orderBy("date", "desc")
            .onSnapshot(function(querySnapshot) {

                setListeCommande([]);
                setLoading(false);

                querySnapshot.forEach(function(doc) {

                    let donnee = doc.data();

                    let laDate = new Date(donnee.date.seconds * 1000);
                    let now = new Date();

                    //Affichage commande de moins de 3 heures
                    if (add_minutes(laDate, 60*3).getTime() > now.getTime()) {

                        let commande = {
                            id: doc.id,
                            date: new Date(donnee.date.seconds * 1000),
                            nom: donnee.nom,
                            nombreCouverts: donnee.nombreCouverts,
                            prixTotal: donnee.prixTotal,
                            etat: donnee.etat || '',
                            numTable: donnee.numTable || '',
                            liste: donnee.listeItems,
                            categorie: donnee.categorie,
                        };

                        setListeCommande(listeCommande => listeCommande.concat(commande));
                    }

                });
            });


    },[]);


    if(loading){
        return(
        <div>Chargement...</div>
        );
    }else{
       return  <ListeCommandes key={listeCommande} commandes={listeCommande} idResto={id}/>;
    }

};

export default Commande;
