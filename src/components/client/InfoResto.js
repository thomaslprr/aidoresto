import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import { Typography, Avatar, Grid, Box } from "@material-ui/core";
import firebase from "firebase";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuBookSharpIcon from '@material-ui/icons/MenuBookSharp';import {Menu} from "@material-ui/icons";



// CSS Style
const useStyle = makeStyles(theme =>({

    resto:{
        margin: "auto"
    }

}));

const InfoResto = (props) => {

    const [resto,setResto] = React.useState({
        nom: "",
        ville: ""
    });

    const classes = useStyle();

    useEffect(()=>{


        const restaurantRef = firebase.firestore().collection("restaurant").doc(props.idResto);

        restaurantRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());

                InfoResto.nom = doc.data().nom;
                InfoResto.adresse = doc.data().adresse;
                InfoResto.tel = doc.data().telephone;
                InfoResto.code_resto = doc.data().code_resto;
                InfoResto.estChoisi = true;

                setResto({
                   nom: doc.data().nom,
                   ville: doc.data().adresse.ville
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

    const getHeader = () =>{

        if(InfoResto.estChoisi){
            return " "+InfoResto.nom.toUpperCase()+", "+InfoResto.adresse.ville;
        }

    }

    return (

        <AppBar position="static">
            <Toolbar>

                    <MenuBookSharpIcon />
                <Typography className={classes.title} variant="h6" noWrap>
                        {getHeader()}
                </Typography>
            </Toolbar>
        </AppBar>

    )
}

export default InfoResto
