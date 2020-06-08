import React, {useEffect, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import firebase from "firebase";


const RestoIntrouvable = ({idResto}) => {

    const[dataBoisson, setDataBoisson] = useState([]);
    const[dataEntree, setDataEntree] = useState([]);
    const[dataPlat, setDataPlat] = useState([]);
    const[dataDessert, setDataDessert] = useState([]);

    useEffect(()=>{
        getElementsCarte();
    },[]);

    const getElementsCarte = () => {

        firebase.firestore().collection("restaurant").doc(props.idResto).collection("boisson")
            .onSnapshot(function(querySnapshot) {

                setDataBoisson([]);

                querySnapshot.forEach(function(doc) {
                    let boisson = {
                        id: doc.id,
                        date: doc.data().date,
                        nom: doc.data().nom,
                        prix: doc.data().prix,
                        volume: doc.data().volume
                    }
                    setDataBoisson(dataBoisson => dataBoisson.concat(boisson));
                });
            });

        firebase.firestore().collection("restaurant").doc(props.idResto).collection("repas").where("categorie", "==", "Entrée")
            .onSnapshot(function(querySnapshot) {

                setDataEntree([]);

                querySnapshot.forEach(function(doc) {
                    let entree = {
                        id: doc.id,
                        nom: doc.data().nom,
                        prix: doc.data().prix,
                        desc: doc.data().description
                    };
                    setDataEntree(dataEntree => dataEntree.concat(entree));
                });
            });

        firebase.firestore().collection("restaurant").doc(props.idResto).collection("repas").where("categorie", "==", "Déjeuné")
            .onSnapshot(function(querySnapshot) {

                setDataPlat([]);

                querySnapshot.forEach(function(doc) {
                    let plat = {
                        id: doc.id,
                        nom: doc.data().nom,
                        prix: doc.data().prix,
                        desc: doc.data().description
                    };
                    setDataPlat(dataPlat => dataPlat.concat(plat));
                });
            });

        firebase.firestore().collection("restaurant").doc(props.idResto).collection("repas").where("categorie", "==", "Dessert")
            .onSnapshot(function(querySnapshot) {

                setDataDessert([]);

                querySnapshot.forEach(function(doc) {
                    let dessert = {
                        id: doc.id,
                        nom: doc.data().nom,
                        prix: doc.data().prix,
                        desc: doc.data().description
                    };
                    setDataDessert(dataDessert => dataDessert.concat(dessert));
                });
            });

    };

    return (
        <>
            <Typography variant="h5">
                Cette page restaurant n'est pas attribué.
            </Typography>
        </>
    )
};

export default RestoIntrouvable
