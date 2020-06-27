import React, {useEffect} from 'react';
import firebase from "firebase";
import PulseLoader from "react-spinners/PulseLoader";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";

function ContenuPageCommande({ idResto, idCommande}){

    const [loading, setLoading] = React.useState(true);
    const [commande, setCommande] = React.useState({});


    useEffect(()=>{

        firebase.firestore().collection("restaurant").doc(idResto).collection("commandes").doc(idCommande)
            .onSnapshot(function(doc) {

                setCommande(doc.data());
                setLoading(false);

                console.log(doc.data());
            });

    },[]);

    const LbStatutCommande = () =>{
        if (commande.etat === "attente"){
            return(
                <Typography variant={"h5"}  style={{display: 'inline-block'}} color={"secondary"}>
                    En attente de validation
                </Typography>
            )
        }
        if (commande.etat === "en cours"){
            return(
                <Typography variant={"h5"}  style={{display: 'inline-block'}} color={"primary"}>
                    En cours
                </Typography>
            )
        }
        if (commande.etat === "fini"){
            return(
                <Typography variant={"h5"}  style={{display: 'inline-block', color:"#43a047"}}>
                    Terminé
                </Typography>
            )
        }
        if (commande.etat === "refusé"){
            return(
                <Typography variant={"h5"}  style={{display: 'inline-block'}} color={"error"}>
                    Refusé
                </Typography>
            )
        }
        return (
            <Typography variant={"h5"}  style={{display: 'inline-block'}} color={"secondary"}>
                {commande.etat}
            </Typography>
        );
    };

    if (loading){
        return(
            <div
                style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            >

                <PulseLoader loading={true} color={"#1f62b9"} size={20}/>

            </div>
        )
    }else{
        console.log(commande);

        let dateCommande = commande.date ? commande.date.toDate() : null;
        console.log(dateCommande);

        if (commande){
            return(
                <>

                    <Typography variant={"h4"} color={"primary"}>
                        Commande de {commande.nom} - {commande.prixTotal} €
                    </Typography>

                    <Typography variant={"subtitle1"} color={"textSecondary"}>
                        le {dateCommande.toLocaleString()}
                    </Typography>

                    <Typography variant={"h5"} style={{marginTop:"25px"}}>
                        Contenu de la commande
                    </Typography>


                    <Typography variant={"h5"}  style={{display: 'inline-block', marginRight:"10px"}}>
                        Statut de la commande :
                    </Typography>
                    <LbStatutCommande />


                </>
            )
        }else{
            return(
                <h3>
                    Erreur: Impossible de trouver cette commande
                </h3>
            )
        }
    }

}

export default ContenuPageCommande;
