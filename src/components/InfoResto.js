import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import { Typography, Avatar, Grid, Box } from "@material-ui/core";
import firebase from "firebase";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";


// CSS Style
const useStyle = makeStyles(theme =>({

    resto:{
        margin: "auto"
    }

}));

const InfoResto = (props) => {

    const [resto,setResto] = useState({
        nom: "",
        ville: "",
        tel: ""
    });

    const classes = useStyle();

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


    const [value, setValue] = useState("Menu");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography className={classes.resto} variant="h6" color="inherit">
                    {resto.nom}, {resto.ville}
                </Typography>
            </Toolbar>
        </AppBar>

    )
}

export default InfoResto