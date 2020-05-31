import React, {useCallback, useEffect, useState} from 'react';
import * as firebase from "firebase";
import CarteBoisson from "./CarteBoisson";
import Grid from "@material-ui/core/Grid";

const ListeBoissons = ({id}) => {

    const [listeBoissons,setListeBoissons] = useState([]);
    const [aucuneBoison,setAucuneBoisson] = useState(true);
    const [loading,setLoading] = useState(true);

    useEffect(()=> {

        const listeBoisson = firebase.firestore().collection("restaurant").doc(id).collection("boisson");

        listeBoisson.get().then(function (doc) {
            setLoading(false);
            let lb = [];
            for(let i =0; i< doc.docs.length ; i++){
                setAucuneBoisson(false);
                let donneesBoisson = doc.docs[i].data();
                let data = {
                    id:doc.docs[i].id,
                    id_resto: id,
                    nom: donneesBoisson.nom,
                    prix: donneesBoisson.prix,
                    categorie: donneesBoisson.categorie,
                    date : donneesBoisson.date,
                    volume: donneesBoisson.volume
                }
                lb.push(data);
            };
            setListeBoissons(lb);
            console.log("liste des boissons ! ");
            console.log(lb);


        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    },[])

    const msgAucuneBoisson = () => {
        if(aucuneBoison){
            return <div>Votre restaurant ne présente aucune boisson, ajoutez-en une.</div>
        }
    }

    if(loading){
        return <div>Chargement...</div>
    }else {
        return (
            <div>
                {msgAucuneBoisson()}
                <Grid container spacing={3}>

                    {listeBoissons.map(({id, categorie, volume, date, nom, prix,id_resto}) =>
                        <Grid item xs key={id}>
                            <CarteBoisson
                                idresto={id_resto}
                                id={id}
                                nom={nom}
                                prix={prix}
                                categorie={categorie}
                                date={date}
                                volume={volume}
                            />
                        </Grid>
                    )}
                </Grid>
            </div>

        )
    }


};

export default ListeBoissons;
