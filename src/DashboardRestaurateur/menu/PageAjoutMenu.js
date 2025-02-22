import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import ListeComposentMenu from "./ListeComposentsMenu";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import GreenButton from "../../utils/ColoredButtons/GreenButton";
import SaveIcon from '@material-ui/icons/Save';
import {firestore} from "firebase/app";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    save:{
        justifyContent: 'center',
        margin: "1rem 0"
    },
    header:{
        marginBottom: "0.5rem",
    }
}));


export default function PageAjoutMenu({handleClose, idResto, menu}) {

    const [listeEntrees, setListeEntrees] = React.useState(menu ? menu.entrees ? menu.entrees : [] : []);
    const [listePlats, setListePlats] = React.useState(menu ? menu.plats ? menu.plats : [] : []);
    const [listeDesserts, setListeDesserts] = React.useState(menu ? menu.desserts ? menu.desserts : [] : []);
    const [listeBoissons, setListeBoissons] = React.useState(menu ? menu.boissons ? menu.boissons : [] : []);


    const getListElements = (type) => {
        if (type === "entrees" && state.entrees){
            return <ListeComposentMenu listeCompo={listeEntrees} txtBtn="une entrée" setListElements={setListElements} type="entrees"/>
        }
        if (type === "plats" && state.plats){
            return <ListeComposentMenu listeCompo={listePlats} txtBtn="un plat" setListElements={setListElements} type="plats"/>
        }
        if (type === "desserts" && state.desserts){
            return <ListeComposentMenu listeCompo={listeDesserts} txtBtn="un dessert" setListElements={setListElements} type="desserts"/>
        }
        if (type === "boissons" && state.boissons){
            return <ListeComposentMenu listeCompo={listeBoissons} txtBtn="une boisson" setListElements={setListElements} type="boissons"/>
        }
    };

    const setListElements = (type, elements) => {
        if (type === "entrees"){
            setListeEntrees(elements);
        }
        if (type === "plats" && state.plats){
            setListePlats(elements);
        }
        if (type === "desserts" && state.desserts){
            setListeDesserts(elements);
        }
        if (type === "boissons" && state.boissons){
            setListeBoissons(elements);
        }
    };

    const classes = useStyles();

    const [state, setState] = React.useState({
        entrees: menu ? menu.entrees ? menu.entrees.length > 0 :false : false,
        plats: menu ? menu.plats ? menu.plats.length > 0 :false : false,
        desserts: menu ? menu.desserts ? menu.desserts.length > 0 :false : false,
        boissons: menu ? menu.boissons ? menu.boissons.length > 0 :false : false,
    });

    const [nomMenu, setNomMenu] = React.useState(menu ? menu.nom ?? "" : "");
    const [prixMenu, setPrixMenu] = React.useState(menu ? menu.prix ?? "" : "");


    const ajouterMenu = () =>{

        // Conditions envoie du menu
        if (nomMenu === ''){
            //TODO notif en cas de champs vides

        }else {
            //envoie des données sur firestore:
            const refCollection = firestore().collection("restaurant").doc(idResto).collection("menus");

            let dataMenu = {
                boissons: state.boissons ? listeBoissons : [],
                entrees: state.entrees ? listeEntrees : [],
                desserts: state.desserts ? listeDesserts : [],
                plats: state.plats ? listePlats : [],
                prix: prixMenu,
                nom: nomMenu,
            }

            if (menu){
                refCollection.doc(menu.id).update(dataMenu).then(function() {
                    console.log("Modifier avec succes");
                    //TODO Notif succes, bouton envoie bloquer, attendre 3s et fermer la pop up

                    //Provisoire
                    handleClose();
                }).catch(function(error) {
                    console.error("Error writing document: ", error);
                    //TODO notif erreur reessayer de 3s rester sur la pop up
                });
            }else {
                refCollection.add(dataMenu).then(function() {
                    console.log("Inserer avec succes");
                    //TODO Notif succes, bouton envoie bloquer, attendre 3s et fermer la pop up

                    //Provisoire
                    handleClose();
                }).catch(function(error) {
                    console.error("Error writing document: ", error);
                    //TODO notif erreur reessayer de 3s rester sur la pop up
                });
            }

        }
    };


    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        { menu ? "Modification du menu" : "Ajout d'un menu"}
                    </Typography>
                </Toolbar>
            </AppBar>

            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Grid container spacing={3} className={classes.header}>
                        <Grid item xs={9}>
                            <TextField
                                required
                                variant="outlined"
                                autoFocus
                                margin="dense"
                                name="nom"
                                id="nom"
                                label="Nom du menu"
                                type="nom"
                                fullWidth
                                value={nomMenu}
                                onChange={(e) => setNomMenu(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                required
                                variant="outlined"
                                fullWidth
                                autoFocus
                                margin="dense"
                                name="prix"
                                id="prix"
                                label="Prix du menu"
                                value={prixMenu}
                                onChange={(e) => setPrixMenu(e.target.value)}
                            />
                        </Grid>
                    </Grid>

                <List>
                    <ListItem>
                        <List>
                            <FormControlLabel
                                control={<Switch
                                    checked={state.entrees}
                                    onChange={handleChange}
                                    name="entrees"
                                    color="primary"
                                />}
                                label={<Typography variant="h5">Entrée </Typography>}
                                labelPlacement="start"/>

                            {getListElements("entrees")}
                        </List>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <List>
                            <FormControlLabel
                                control={<Switch
                                    checked={state.plats}
                                    onChange={handleChange}
                                    name="plats"
                                    color="primary"
                                />}
                                label={<Typography variant="h5">Plat</Typography>}
                                labelPlacement="start"/>

                            {getListElements("plats")}
                        </List>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <List>
                            <FormControlLabel
                                control={<Switch
                                    checked={state.desserts}
                                    onChange={handleChange}
                                    name="desserts"
                                    color="primary"
                                />}
                                label={<Typography variant="h5">Dessert</Typography>}
                                labelPlacement="start"/>

                            {getListElements("desserts")}
                        </List>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <List>
                            <FormControlLabel
                                control={<Switch
                                    checked={state.boissons}
                                    onChange={handleChange}
                                    name="boissons"
                                    color="primary"
                                />}
                                label={<Typography variant="h5">Boisson</Typography>}
                                labelPlacement="start"/>

                            {getListElements("boissons")}
                        </List>
                    </ListItem>
                </List>

                    <Grid container className={classes.save}>
                        <GreenButton
                            startIcon={<SaveIcon/>}
                            onClick={ajouterMenu}
                        >
                            Enregistrer le menu
                        </GreenButton>
                    </Grid>

                </Paper>
            </main>

        </>
    );
}
