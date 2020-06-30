import React, {useEffect} from 'react';
import {firestore} from "firebase/app";
import RestoIntrouvable from "./RestoIntrouvable";
import CarteDuResto from "./CarteDuResto";
import {Copyright} from "../PiedDePage/PiedPage";
import PulseLoader from "react-spinners/PulseLoader";


const PageDuResto = ({ match: {params :{id}} }) => {

    const [loading, setLoading] = React.useState(true);

    const [estUnResto, setEstUnResto] = React.useState(false);

    const [infoResto, setInfoResto] = React.useState({
        nom: "",
        adresse: {},
    });

    const restaurantRef = firestore().collection("restaurant").doc(id);


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
                    <div
                        style={{
                            position: 'absolute', left: '50%', top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    >

                        <PulseLoader loading={true} color={"#1f62b9"} size={20}/>

                    </div>
                </>
            );
        }else {
            if (estUnResto){
                return (
                    <>
                        <CarteDuResto idResto={id} infoResto={infoResto}/>
                        <Copyright/>
                    </>
                );
            }else {
                return (
                    <>
                        <RestoIntrouvable />
                        <Copyright/>
                    </>
                );
            }
        }
    };

    return (
        <>
            <GetContent />
        </>
    )
};

export default PageDuResto
