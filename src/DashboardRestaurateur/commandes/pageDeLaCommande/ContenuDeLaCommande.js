import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CakeIcon from '@material-ui/icons/Cake';
import BoissonIcon from '@material-ui/icons/LocalBar';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EntreeIcon from '@material-ui/icons/Spa';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    titreItem:{
        fontSize: "19px",
        display: 'inline-block'
    },
    prix:{
        display: 'inline-block',
        marginLeft: "15px",
        fontSize: "19px",
        color: "#000"
    }
}));

function ContenuDeLaCommande({ commande }){

    const classes = useStyles();

    const GetIcone = ({item}) =>{
        if (item.type && item.type === "menu"){
            return (
                <MenuBookIcon/>
            )
        }
        if (item.categorie){
            if (item.categorie === "Entrée"){
                return(
                    <EntreeIcon/>
                )
            }
            if (item.categorie === "Déjeuné"){
                return (
                    <FastfoodIcon/>
                )
            }
            if (item.categorie === "Dessert"){
                return (
                    <CakeIcon/>
                )
            }else{
                return(
                    <BoissonIcon/>
                )
            }
        }else{
            return(
                <>
                </>
            )
        }
    }

    return(
        <>
            <List>
                { commande.listeItems.map((item) => (
                    <ListItem>
                        <ListItemIcon color="primary" >
                            <GetIcone item={item}/>
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <>
                                    <Typography variant="subtitle1" color={"primary"} className={classes.titreItem}>
                                        {item.nom}
                                    </Typography>
                                    <Typography variant="subtitle1" color={"textSecondary"} className={classes.prix}>
                                        {item.prix} €
                                    </Typography>
                                </>
                            }
                            secondary={
                                <Typography variant="subtitle1" >
                                    x {item.quantite}
                                </Typography>
                            }/>

                    </ListItem>
                ))}
            </List>
        </>
    );

}

export default ContenuDeLaCommande;
