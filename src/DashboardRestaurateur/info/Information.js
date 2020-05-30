import React, {useEffect, useState} from 'react';
import * as firebase from "firebase";
import Typography from "@material-ui/core/Typography";
import AlerteInfoPasRempli from "./AlerteInfoPasRempli";
import RemplirInfo from "./RemplirInfo";
import Button from "@material-ui/core/Button";


const Information = ({id}) => {

    const [restaurantInfo,setRestaurantInfo]=useState("");
    const [loading, setLoading] = useState(true);
    const [rempli,setRempli] = useState(false);

    const [affichage, setAffichage] = useState(false);


    useEffect(()=>{
        console.log("data : "+id);

        const restaurantRef = firebase.firestore().collection("restaurant").doc(id);

        restaurantRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setRestaurantInfo(doc.data());
                setLoading(false);
                if(doc.data().nom!=""){
                    setRempli(true);
                }



            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    },[]);

    function ouvrirPageModif(){
        setAffichage(true);
    }
    function affichageBoutton(texte){
        if(affichage){
            return <div></div>
        }else{
            return <Button color="primary" onClick={ouvrirPageModif}>{texte} les informations de mon restaurant</Button>

        }
    }

    if(!loading){
        if(!rempli){
            return(
                <div>
                    <AlerteInfoPasRempli/>
                    <RemplirInfo id={id} donnee={restaurantInfo} affichage={affichage}/>
                    {affichageBoutton("Compléter")}
                </div>
            );
        }else{
            return(
                <div>
                    <Typography variant="h2" gutterBottom>{restaurantInfo.nom}</Typography>
                    <Typography variant="h4" gutterBottom>{restaurantInfo.adresse.rue}, {restaurantInfo.adresse.ville} {restaurantInfo.adresse.code_postal}</Typography>
                    <Typography variant="h5" gutterBottom>{restaurantInfo.telephone}</Typography>
                    <RemplirInfo id={id} donnee={restaurantInfo} affichage={affichage}  />
                    {affichageBoutton("Modifier")}
                </div>
            );
        }

    }else{
        return(
            <div>Chargement...</div>
        )
    }
};

export default Information;
