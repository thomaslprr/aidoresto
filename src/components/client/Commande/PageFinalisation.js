import React from "react";
import Commande from "../../../stores/Commande";
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
        marginBottom: "3em",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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


    const envoieCommande = () => {

        const commandeData = {
            nom: nom,
            nombreCouverts: couverts,
            listeItems: Commande.listeItems(),
            prixTotal: Commande.prixTotal(),
            date: firebase.firestore.FieldValue.serverTimestamp(),
            etat: "attente"
        };


        firebase.firestore().collection("restaurant").doc(props.idResto).collection("commandes").add(commandeData).then(function() {
            console.log("Document successfully written!");
        })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });


        props.finDeCommande();

    }

    const modifCouvert = (event) => {
        setCouverts(event.target.value);
    };
    const modifNom = (event) => {
        setNom(event.target.value);
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

            <div className={classes.paper}>

                <form className={classes.form} onSubmit={envoieCommande}>

                    <Box className={classes.inputStyle}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            onChange={modifNom}
                            value={nom}
                            id="nom"
                            label="Votre nom"
                            name="nom"
                            autoFocus
                        />
                    </Box>

                    <Box className={classes.inputStyle}>
                        <TextField
                            variant="outlined"
                            label="Nombre de couverts"
                            value={couverts}
                            onChange={modifCouvert}
                            name="couverts"
                            id="formatted-numberformat-input"
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                            }}
                            required
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
                            onClick={props.handleFinalisation}
                        >
                            Commander
                        </Button>
                    </Box>
                </form>

            </div>

        </>
    );
};

export default PageFinalisation