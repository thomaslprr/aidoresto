import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as firebase from "firebase";
import {useHistory} from "react-router";
import {func} from "prop-types";
import ModifierBoisson from "./PopupModifBoisson";
import AlertDialogInscription from "../../creationCompte/Popup";

const useStyles = makeStyles({
    root: {
        minWidth: 250,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function SimpleCardBoisson({nom,prix,volume,categorie,date,id,idresto}) {
    const classes = useStyles();
    const [nm,setNm] = useState(nom);
    const [pri,setPri] = useState(prix);
    const [vol,setVol] = useState(volume);
    const [cat,setCat] = useState(categorie);
    const [idd,setIdd] = useState(id);

    const history = useHistory();

    const handleSupression= () => {
        firebase.firestore().collection("restaurant").doc(idresto).collection("boisson").doc(id).delete().then(
            function(){
                window.location.reload();
            }
        ).catch(function(error){
            console.log(error);
        });
    };

    const [showModal,setShowModal] = useState(0);

    useEffect(()=>{

    },[showModal]);

    const modaleAAfficher = ()=> {
        if(showModal==1){
            return <ModifierBoisson idresto={idresto} idboisson={id} ann={date} cat={categorie} pri={prix} vol={volume} nm={nom} changerEtat={setShowModal}/>;
        }else{
            return <></>
        }
    };


    return (

        <Card className={classes.root}>
            {modaleAAfficher()}
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {categorie}
                </Typography>
                <Typography variant="h5" component="h2">
                    {nom}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {date}
                </Typography>
                <Typography variant="body2" component="p">
                    {prix}€
                    <br />
                    {volume}cL
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={()=>setShowModal(1)}>Modifier</Button>
                <Button size="small" onClick={handleSupression}>Supprimer</Button>

            </CardActions>
        </Card>

    );
}
