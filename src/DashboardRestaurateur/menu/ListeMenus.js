import React, {useCallback, useEffect, useState} from 'react';
import * as firebase from "firebase";
import Grid from "@material-ui/core/Grid";
import CarteMenu from "./CarteMenu";

const ListeMenu = ({idResto}) => {

    const [listeMenus,setListeMenus] = useState([]);
    const [aucunMenu,setAucunMenu] = useState(true);
    const [loading,setLoading] = useState(true);

    useEffect(()=> {

        const refCollection = firebase.firestore().collection("restaurant").doc(idResto).collection("menus");

        refCollection.get().then(function (doc) {
            setLoading(false);
            let lb = [];
            for(let i =0; i< doc.docs.length ; i++){
                setAucunMenu(false);
                let donneesMenu = doc.docs[i].data();
                let data = {
                    id: doc.docs[i].id,
                    id_resto: idResto,
                    nom: donneesMenu.nom,
                    prix: donneesMenu.prix,
                    entrees: donneesMenu.entrees,
                    plats: donneesMenu.plats,
                    desserts: donneesMenu.dessert,
                    boissons: donneesMenu.boissons
                }
                lb.push(data);
            };
            setListeMenus(lb);
            console.log("liste des menus ! ");
            console.log(lb);


        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    },[idResto])

    const msgAucunMenu = () => {
        if(aucunMenu){
            return <div>Votre restaurant ne présente aucun menu, ajoutez-en un.</div>
        }
    }

    if(loading){
        return <div>Chargement...</div>
    }else {
        return (
            <div>
                {msgAucunMenu()}
                <Grid container spacing={3}>

                    {listeMenus.map((menu) =>
                        <Grid item xs key={menu.id}>
                            <CarteMenu
                                menu={menu}
                            />
                        </Grid>
                    )}
                </Grid>
            </div>

        )
    }


};

export default ListeMenu;
