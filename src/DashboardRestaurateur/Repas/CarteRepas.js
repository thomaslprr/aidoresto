import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as firebase from "firebase";
import {useHistory} from "react-router";
import ModifierRepas from "./PopupModifRepas";


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

export default function SimpleCardRepas({nom,prix,ingredients,categorie,description,id,idresto}) {
    const classes = useStyles();
    const [nm,setNm] = useState(nom);
    const [pri,setPri] = useState(prix);
    const [ingre,setIngre] = useState(ingredients);
    const [cat,setCat] = useState(categorie);
    const [desc,setDesc] = useState(description);
    const [idd,setIdd] = useState(id);

    const history = useHistory();

    const handleSupression= () => {
        firebase.firestore().collection("restaurant").doc(idresto).collection("repas").doc(id).delete().then(
            function(){
                window.location.reload();
            }
        ).catch(function(error){
            console.log(error);
        });
    };

    const [showModal,setShowModal] = useState(0);


    const modaleAAfficher = ()=> {
        if(showModal==1){
            return <ModifierRepas idresto={idresto} idrepas={id} ingredients={ingre} cat={categorie} pri={prix} description={desc} nm={nom} changerEtat={setShowModal}/>;
        }else{
            return <></>
        }
    };


    return (

        <Card className={classes.root}>
            {modaleAAfficher()}
            <CardContent>
                <Typography variant="h5" component="h2">
                    {nom}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {description} <br/><br/>{ingredients}
                </Typography>
                <Typography variant="body2" component="p">
                    {prix}€
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={()=>setShowModal(1)}>Modifier</Button>
                <Button size="small" onClick={handleSupression}>Suprimer</Button>

            </CardActions>
        </Card>

    );
}
