import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import {firestore} from "firebase/app";
import RedButton from "../../utils/ColoredButtons/RedButton";
import GreenButton from "../../utils/ColoredButtons/GreenButton";

const useRowStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    button:{
        margin: "2em 1em",
    },
    bold:{
        fontWeight: "bold",
    },
}));


function Row({laCom, id}) {

    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    const setEtatCommande = (etatDeLaCommande) => {

        firestore().collection("restaurant").doc(id).collection("commandes").doc(laCom.id).update(
            {
                etat: etatDeLaCommande
            }
        ).then(function() {
            console.log("Document successfully written!");
        })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
    };


    const affichageBoutton = (etat) => {

        if (etat === "attente"){
            return (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<DoneIcon />}
                        onClick={validerCommande}
                    >
                        Valider
                    </Button>

                    <RedButton
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        onClick={refuserCommande}
                    >
                        Refuser
                    </RedButton>
                </>
            );

        }

        if(etat === "en cours"){
            return (
                <GreenButton
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<DoneIcon />}
                    onClick={terminerCommande}
                >
                    Terminer
                </GreenButton>
            );
        }



    };

    const validerCommande = () => {
        setEtatCommande("en cours");
    };

    const terminerCommande = () => {
        setEtatCommande("fini");
    };

    const refuserCommande = () => {
        setEtatCommande("refusé");
    };

    const getTime = (date) =>{
        var heure = "";

        heure += date.getHours()+":";

        if (heure.length === 2){
            heure = "0"+heure;
        }

        var min = " "+date.getMinutes();

        if (min.length === 2){
            heure += "0"+date.getMinutes();
        }else {
            heure += date.getMinutes();
        }

        return heure;

    };

    const GetInfoMenu = (item) =>{

        console.log(item.item);

        if (item.item.type && item.item.type === "menu"){

            let ingredients = [];

            if (item.item.entree){
                let x = item.item.entree;
                x.text = "Entrée";
                ingredients.push(x);
            }if (item.item.plat){
                let x = item.item.plat;
                x.text = "Plat";
                ingredients.push(x);
            }if (item.item.dessert){
                let x = item.item.dessert;
                x.text = "Dessert";
                ingredients.push(x);
            }if (item.item.boisson){
                let x = item.item.boisson;
                x.text = "Boisson";
                ingredients.push(x);
            }


            return (

                <>
                {ingredients.map((ing) => (
                    <Typography variant="subtitle2" color="textSecondary">
                        {ing.text} : {ing.nom} {ing.quantite}
                    </Typography>
                    ))}

                </>
            );
        }else{
            return(
              <>
              </>
            );
        }
    };


    return (
        <>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row"><Typography variant="h6" color="primary" className={classes.bold}>{laCom.nom}</Typography></TableCell>
                <TableCell align="right"><Typography variant="h6">{laCom.numTable}</Typography></TableCell>
                <TableCell align="right"><Typography variant="h6" color="primary">{laCom.nombreCouverts}</Typography></TableCell>
                <TableCell align="right"><Typography variant="h6">{getTime(laCom.date)}</Typography></TableCell>
                <TableCell align="right"><Typography variant="h6" color="primary">{laCom.prixTotal} €</Typography></TableCell>
                <TableCell align="right"><Typography variant="h6">{laCom.etat}</Typography></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography gutterBottom component="div">
                                Détail
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.bold} align="center">Nom</TableCell>
                                        <TableCell className={classes.bold} align="center">Quantité</TableCell>
                                        <TableCell className={classes.bold} align="center">Prix</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <br/>
                                    {laCom.liste.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell component="th" scope="row" align="center">
                                                <Typography variant="body1">
                                                    {item.nom}
                                                </Typography>
                                                <GetInfoMenu item={item}/>
                                            </TableCell>
                                            <TableCell align="center">{item.quantite}</TableCell>
                                            <TableCell align="center">
                                                {item.prix} €
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <br/>
                                    <TableRow>
                                        {affichageBoutton(laCom.etat)}
                                    </TableRow>
                                    <br/>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}


export default function ListeCommandes({commandes, idResto}) {

    const [commande,setCommande] = useState([]);

    useEffect(()=>{

        setCommande(commandes);

    },[commandes]);

    const classes = useRowStyles();

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell><Typography variant="h6" className={classes.bold}>Nom</Typography></TableCell>
                        <TableCell align="right"><Typography variant="h6" className={classes.bold}>Table</Typography></TableCell>
                        <TableCell align="right"><Typography variant="h6" className={classes.bold}>Couverts</Typography></TableCell>
                        <TableCell align="right"><Typography variant="h6" className={classes.bold}>Heure</Typography></TableCell>
                        <TableCell align="right"><Typography variant="h6" className={classes.bold}>Prix</Typography></TableCell>
                        <TableCell align="right"><Typography variant="h6" className={classes.bold}>Etat</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { commande.map((row) => (
                        <Row laCom={row} id={idResto} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
