import React, {useEffect} from 'react';
import {Copyright} from "../../PiedDePage/PiedPage";
import firebase from "firebase";


const PageDuResto = ({ match: {params :{id}} }) => {

    const [loading, setLoading] = React.useState(true);

    const [estUnResto, setEstUnResto] = React.useState(false);

    const restaurantRef = firebase.firestore().collection("restaurant").doc(id);

    useEffect(()=>{
        verifResto();
    },[]);

    const verifResto = () => {
        restaurantRef.get().then(function(doc) {
            if (doc.exists) {
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

    const getContent = () => {

        if (loading) {
            return (
                <>
                    Chargement ...
                </>
            );
        }else {
            if (estUnResto){

            }else {

            }
        }
    };

    return (
        <>

            {getContent}

            <Copyright/>

        </>
    )
};

export default PageDuResto
