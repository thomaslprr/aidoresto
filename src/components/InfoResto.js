import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import { Typography, Avatar, Grid, Box } from "@material-ui/core";
import firebase from "firebase";


// CSS Style
const useStyle = makeStyles(theme =>({

    avatar:{
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin: theme.spacing(1)
    }

}));

const InfoResto = (props) => {

    const [resto,setResto] = useState({
        nom: "",
        ville: "",
        tel: ""
    });

    useEffect(()=>{

        const restaurantRef = firebase.firestore().collection("restaurant").doc(props.idResto);

        restaurantRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setResto({
                    nom: doc.data().nom,
                    ville: doc.data().adresse.ville,
                    tel: doc.data().telephone
                });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    },[]);

    const classes = useStyle();

    return (
        <Box>
            <Typography variant="h4">
                {resto.nom}, {resto.ville}
            </Typography>
        </Box>
    )
}

export default InfoResto