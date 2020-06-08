import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuBookSharpIcon from '@material-ui/icons/MenuBookSharp';import {Menu} from "@material-ui/icons";


const useStyle = makeStyles(theme =>({

    resto:{
        margin: "auto"
    }

}));

const HeaderPageCommande = ({infoResto}) => {

    const classes = useStyle();

    const getHeader = () =>{
        let affichage = " "+infoResto.nom.toUpperCase();
        if (infoResto.adresse.ville !== "" || infoResto.adresse.ville !== null){
            affichage += ", "+infoResto.adresse.ville;
        }
        return affichage;
    };

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
};

export default HeaderPageCommande
