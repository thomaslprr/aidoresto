import React, {useEffect, useRef, useState} from 'react';
import * as firebase from "firebase";
import ListeCommandes from "./ListeCommandes";

const Commande = ({id}) => {


    const [listeCommande,setListeCommande] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        firebase.firestore().collection("restaurant").doc(id).collection("commandes")
            .onSnapshot(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {

                    setLoading(false);
                    let donnee = doc.data();
                    let commande = {
                        date: donnee.date,
                        nom: donnee.nom,
                        nombreCouverts: donnee.nombreCouverts,
                        prixTotal:donnee.prixTotal,
                        etat:donnee.etat || '',
                        numTable: donnee.numTable || ''
                    };
                    listeCommande.push(commande);
                    //let lc = listeCommande;
                    //lc.push(commande);
                    //setListeCommande(lc);
                });
            });


    },[])


    if(loading){
        return(
        <div>Chargement...</div>
        );
    }else{
       return  <ListeCommandes key={listeCommande} commandes={listeCommande}/>;
    }

};

export default Commande;
