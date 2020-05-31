import React, {useCallback, useEffect, useState} from 'react';
import * as firebase from "firebase";
import Grid from "@material-ui/core/Grid";
import SimpleCardRepas from "./CarteRepas";

const ListeRepas = ({id,categorie,texteAucuneQuantite,texteUnOuUne}) => {

    const [listeRepas,setListeRepas] = useState([]);
    const [aucunRepas,setAucunRepas] = useState(true);
    const [loading,setLoading] = useState(true);

    useEffect(()=> {
        setAucunRepas(true);
        const listeRepas = firebase.firestore().collection("restaurant").doc(id).collection("repas").where("categorie","==",categorie);

        listeRepas.get().then(function (doc) {
            setLoading(false);
            let lb = [];
            for(let i =0; i< doc.docs.length ; i++){
                setAucunRepas(false);
                let donneesRepas = doc.docs[i].data();
                let data = {
                    id:doc.docs[i].id,
                    id_resto: id,
                    nom: donneesRepas.nom,
                    prix: donneesRepas.prix,
                    categorie: donneesRepas.categorie,
                    ingredients : donneesRepas.ingredients,
                    description: donneesRepas.description
                }
                lb.push(data);
            };
            setListeRepas(lb);
            console.log("liste des repas ! ");
            console.log(lb);


        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    },[categorie]);

    const msgAucuneBoisson = () => {
        if(aucunRepas){
            return <div>Votre restaurant ne présente {texteAucuneQuantite}, ajoutez-en {texteUnOuUne}.</div>
        }
    }

    if(loading){
        return <div>Chargement...</div>
    }else {
        return (
            <div>
                {msgAucuneBoisson()}
                <Grid container spacing={3}>

                    {listeRepas.map(({id, categorie, ingredients, description, nom, prix,id_resto}) =>
                        <Grid item xs key={id}>
                            <SimpleCardRepas
                                idresto={id_resto}
                                id={id}
                                nom={nom}
                                prix={prix}
                                categorie={categorie}
                                description={description}
                                ingredients={ingredients}
                            />
                        </Grid>
                    )}
                </Grid>
            </div>

        )
    }


};

export default ListeRepas;
