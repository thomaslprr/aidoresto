import React, {useEffect} from 'react';
import firebase from "firebase";
import RestoIntrouvable from "./RestoIntrouvable";
import CarteDuResto from "./CarteDuResto";
import {Copyright} from "../PiedDePage/PiedPage";


const PageDuResto = ({ match: {params :{id}} }) => {

    const [loading, setLoading] = React.useState(true);

    const [estUnResto, setEstUnResto] = React.useState(false);

    const [infoResto, setInfoResto] = React.useState({
        nom: "",
        adresse: {},
    });

    const restaurantRef = firebase.firestore().collection("restaurant").doc(id);


    useEffect(()=>{
        verifResto();
    },[id]);

    const verifResto = () => {
        restaurantRef.get().then(function(doc) {
            if (doc.exists) {
                setInfoResto({
                        nom: doc.data().nom,
                        adresse: doc.data().adresse,
                    });
                setEstUnResto(true);
                setLoading(false);
            } else {
                setEstUnResto(true);
                setLoading(false);
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
            setTimeout(() => {verifResto(); }, 100);
        });
    };

    const GetContent = () => {

        if (loading) {
            return (
                <>
                    Chargement ...
                </>
            );
        }else {
            if (estUnResto){
                return (
                    <CarteDuResto idResto={id} infoResto={infoResto}/>
                );
            }else {
                return (
                    <RestoIntrouvable />
                );
            }
        }
    };

    return (
        <>

            <GetContent />

            <Copyright/>

        </>
    )
};

export default PageDuResto
