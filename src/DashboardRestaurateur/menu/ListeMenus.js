import React, {useEffect, useState} from 'react';
import * as firebase from "firebase";
import Grid from "@material-ui/core/Grid";
import CarteMenu from "./CarteMenu";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    liste: {
        marginTop: "1rem",
    },
});


const ListeMenu = ({idResto}) => {

    const [listeMenus,setListeMenus] = useState([]);
    const [aucunMenu,setAucunMenu] = useState(true);
    const [loading,setLoading] = useState(true);

    const classes = useStyles();

    useEffect(()=> {


        const refCollection = firebase.firestore().collection("restaurant").doc(idResto).collection("menus");


        refCollection.onSnapshot(function(querySnapshot) {

            setListeMenus([]);
            setLoading(false);

            let lb = [];

            querySnapshot.forEach(function(doc) {

                let donneesMenu = doc.data();
                let data = {
                    id: doc.id,
                    id_resto: idResto,
                    nom: donneesMenu.nom,
                    prix: donneesMenu.prix,
                    entrees: donneesMenu.entrees,
                    plats: donneesMenu.plats,
                    desserts: donneesMenu.desserts,
                    boissons: donneesMenu.boissons
                };
                lb.push(data);
            });

            if (lb.length === 0){
                setAucunMenu(true);
            }else {
                setAucunMenu(false);
            }

            setListeMenus(lb);
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
                <Grid container spacing={3} className={classes.liste}>

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
