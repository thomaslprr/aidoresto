import React from "react";
import Commande from "../stores/Commande";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {Box, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import {makeStyles} from "@material-ui/core/styles";
import NumberFormat from "react-number-format";
import firebase from "firebase";



const useStyles = makeStyles((theme) => ({

    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    inputStyle:{
        margin: "2em 3em",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    typedContainer:{
        position: "absolute",
        top:"50%",
        left:"50%",
        transform: "translate(-50%, -50%)",
        width: "100vw",
        textAlign: "center",
        zIndex: 1
    }
}));


function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
        />
    );
}


const PageFinalisation = (props) => {

    const classes = useStyles();

    const [nom, setNom] = React.useState('');
    const [couverts, setCouverts] = React.useState('');
    const [numTable, setNumTable] = React.useState('');


    const envoieCommande = () => {

        const commandeData = {
            nom: nom,
            nombreCouverts: couverts,
            listeItems: Commande.listeItems(),
            prixTotal: Commande.prixTotal(),
            date: firebase.firestore.FieldValue.serverTimestamp(),
            etat: "attente",
            numTable: numTable
        };


        firebase.firestore().collection("restaurant").doc(props.idResto).collection("commandes").add(commandeData).then(function() {
            console.log("Document successfully written!");
            props.finDeCommande("valid");
        }).catch(function(error) {
            console.error("Error writing document: ", error);
            setTimeout(() => {envoieCommande(); }, 250);
        });

    };

    const modifCouvert = (event) => {
        setCouverts(event.target.value);
    };
    const modifNom = (event) => {
        setNom(event.target.value);
    };
    const modifNumTable = (event) => {
        setNumTable(event.target.value);
    };

    return(
        <>

            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={props.retourFinalisation} aria-label="close">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Finalisation de la commande
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box className={classes.typedContainer}>

                <Box className={classes.inputStyle}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        onChange={modifNom}
                        value={nom}
                        id="nom"
                        label="Votre nom"
                        name="nom"
                    />
                </Box>

                <Box className={classes.inputStyle}>
                    <TextField
                        variant="outlined"
                        label="Nombre de couverts"
                        value={couverts}
                        onChange={modifCouvert}
                        name="couverts"
                        id="couverts"
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                        required
                    />
                </Box>

                <Box className={classes.inputStyle}>
                    <TextField
                        variant="outlined"
                        label="Numéro de la table"
                        value={numTable}
                        onChange={modifNumTable}
                        name="numTable"
                        id="numTable"
                    />
                </Box>

                <Box className={classes.inputStyle}>
                    <Typography variant="subtitle2">
                        Après avoir passé votre commande veuillez vous identifier auprès du personnel.
                    </Typography>
                </Box>

                <Box className={classes.inputStyle}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        endIcon={<ShoppingBasketIcon/>}
                        onClick={envoieCommande}
                    >
                        Commander
                    </Button>
                </Box>


            </Box>

        </>
    );
};

export default PageFinalisation