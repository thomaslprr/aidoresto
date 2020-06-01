import React, {Suspense, useEffect, useState} from 'react';
import { Typography, Avatar, Grid, Box } from "@material-ui/core";
import InfoResto from "./InfoResto";
import Carte from "./Carte";
import clsx from 'clsx';
import {makeStyles} from "@material-ui/core/styles";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Fab from '@material-ui/core/Fab';
import { green } from '@material-ui/core/colors';
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import CloseIcon from '@material-ui/icons/Close';
import Slide from "@material-ui/core/Slide";
import Commande from "../../stores/Commande";
import Button from "@material-ui/core/Button";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from "@material-ui/core/TextField";
import NumberFormat from 'react-number-format';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import * as firebase from "firebase";



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


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
        position: 'relative',
        minHeight: 200,
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: green[700],
        '&:hover': {
            backgroundColor: green[600],
        },
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    legende: {
        fontWeight: "bold",
        marginTop: "1em"
    },
    affichageQuantite: {
        marginLeft: "20px",
        marginRight: "20px",
    },
    button: {
        margin: "auto"
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
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PageClient = ({ match: {params :{id}} }) => {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [finalisation, setFinalisation] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleFinalisation = () => {
        setFinalisation(true);
    };

    const retourFinalisation = () => {
        setFinalisation(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const ContenuCommande = () => {
        return(
            <>

                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Ma Commande
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Typography align="center" className={classes.legende}>
                                Nom
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography align="center" className={classes.legende}>
                                Quantité
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography align="center" className={classes.legende}>
                                Prix
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                </Box>

                <List>

                    <ListElements/>

                </List>

                <Divider />

                <Grid container spacing={1}>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography align="center">
                            Total
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography align="center">
                            {Commande.prixTotal()} €
                        </Typography>
                    </Grid>
                </Grid>

                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<NavigateNextIcon/>}
                    onClick={handleFinalisation}
                >
                    Finaliser ma commande
                </Button>

            </>
        );
    };

    const PageFinalisation = () => {

        const [nom, setNom] = React.useState('');
        const [couverts, setCouverts] = React.useState('');


        const envoieCommande = () => {

            console.log("Envoie Commande : ");
            console.log("nom :"+nom);
            console.log("couverts : "+couverts);

            const commandeData = {
                nom: nom,
                nombreCouverts: couverts,
                listeItems: Commande.listeItems(),
                prixTotal: Commande.prixTotal(),
                date: firebase.firestore.FieldValue.serverTimestamp()
            };


            firebase.firestore().collection("restaurant").doc(id).collection("commandes").add(commandeData).then(function() {
                console.log("Document successfully written!");
            })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });


            setFinalisation(false);
            setOpen(false);
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
                        <IconButton edge="start" color="inherit" onClick={retourFinalisation} aria-label="close">
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Ma Commande
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
                                Après avoir passé commande veuillez vous identifier auprès du personnel.
                            </Typography>
                        </Box>

                        <Box className={classes.inputStyle}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                endIcon={<ShoppingBasketIcon/>}
                                onClick={handleFinalisation}
                            >
                                Commander
                            </Button>
                        </Box>
                    </form>

                </div>

            </>
        );
    };

    const getContenuPopUp = () => {
        if (finalisation){
            return(
                <PageFinalisation/>
            );
        }else {
            return (
                <ContenuCommande />
            );
        }
    }

    const ListElements = () => {

        return (
            <>
                {Commande.listeItems().map( item => (

                    <ListItem>

                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Typography align="center">
                                    {item.nom}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <Button
                                            aria-label="reduce"
                                            onClick={() => {
                                            Commande.retraitProduit(item.id);
                                            setRefresh(!refresh);
                                        }}
                                            >
                                            <RemoveIcon fontSize="small" />
                                        </Button>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Typography align="center" className={classes.affichageQuantite}>
                                            {item.quantite}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            aria-label="increase"
                                            onClick={() => {
                                                Commande.ajouterUnElementAuPanier(item.id);
                                                setRefresh(!refresh);
                                            }}
                                        >
                                            <AddIcon fontSize="small" />
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Grid>
                            <Grid item xs={2}>
                                <Typography align="right">
                                    {item.prix} €
                                </Typography>
                            </Grid>
                        </Grid>

                    </ListItem>

                ))}
            </>
        );
    };

    return (
        <>
            <Box>
                <InfoResto idResto={id}/>
                <Carte idResto={id}/>
            </Box>

            <Fab aria-label='Expand' className={clsx(classes.fab, classes.fabGreen)} onClick={handleClickOpen} color='inherit'>
                <ShoppingCartIcon />
            </Fab>


            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>

               {getContenuPopUp()}

            </Dialog>

        </>
    )
}

export default PageClient
