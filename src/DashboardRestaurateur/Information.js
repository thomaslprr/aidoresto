import React, {useEffect, useState} from 'react';
import * as firebase from "firebase";
import Typography from "@material-ui/core/Typography";
import AlerteInfoPasRempli from "./AlerteInfoPasRempli";
import RemplirInfo from "./RemplirInfo";


const Information = ({id}) => {

    const [restaurantInfo,setRestaurantInfo]=useState("");
    const [loading, setLoading] = useState(true);
    const [rempli,setRempli] = useState(false);

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

    if(!rempli){
        return(
            <div>
            <AlerteInfoPasRempli/>
            <RemplirInfo id={id}/>
            </div>
        );
    }
    if(!loading){
        return(
            <div>
                <Typography variant="h2" gutterBottom>{restaurantInfo.nom}</Typography>

            </div>
        );
    }else{
        return(
            <div>Chargement...</div>
        )
    }
};

export default Information;
