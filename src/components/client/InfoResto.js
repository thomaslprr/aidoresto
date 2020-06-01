import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import { Typography, Avatar, Grid, Box } from "@material-ui/core";
import firebase from "firebase";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuBookSharpIcon from '@material-ui/icons/MenuBookSharp';import {Menu} from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

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
