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
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));


export default function PageAjoutMenu({handleClose, idResto}) {

    const [listeEntrees, setListeEntrees] = React.useState([]);
    const [listePlats, setListePlats] = React.useState([]);
    const [listeDesserts, setListeDesserts] = React.useState([]);
    const [listeBoissons, setListeBoissons] = React.useState([]);


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
        entrees: false,
        plats: false,
        desserts: false,
        boissons: false,
    });

    const [nomMenu, setNomMenu] = React.useState("");
    const [prixMenu, setPrixMenu] = React.useState(0);


    const ajouterMenu = () =>{

        // Conditions envoie du menu
        if (nomMenu === ''){
            //TODO notif en cas de champs vides

        }else {
            //envoie des données sur firestore:
            const refCollection = firebase.firestore().collection("restaurant").doc(idResto).collection("menus");

            let dataMenu = {
                boissons: state.boissons ? listeBoissons : [],
                entrees: state.entrees ? listeEntrees : [],
                desserts: state.desserts ? listeDesserts : [],
                plats: state.plats ? listePlats : [],
                prix: prixMenu,
                nom: nomMenu,
            }

            refCollection.add(dataMenu).then(function() {
                console.log("Document successfully written!");
                //TODO Notif succes, bouton envoie bloquer, attendre 3s et fermer la pop up

                //Provisoire
                handleClose();
            })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                    //TODO notif erreur reessayer de 3s rester sur la pop up
                });

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
                        Ajout d'un menu
                    </Typography>
                </Toolbar>
            </AppBar>

            <TextField
                required
                variant="outlined"
                autoFocus
                margin="dense"
                name="nom"
                id="nom"
                label="Nom du menu"
                type="nom"
                value={nomMenu}
                onChange={(e) => setNomMenu(e.target.value)}
            />

            <List>
                <ListItem>
                    <List>
                        <FormControlLabel
                            control={<Switch
                                checked={state.entrees}
                                onChange={handleChange}
                                name="entrees"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />}
                            label={<Typography variant="h5">Entrée</Typography>}/>

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
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />}
                            label={<Typography variant="h5">Plat</Typography>}/>

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
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />}
                            label={<Typography variant="h5">Dessert</Typography>}/>

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
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />}
                            label={<Typography variant="h5">Boisson</Typography>}/>

                        {getListElements("boissons")}
                    </List>
                </ListItem>
            </List>
            <TextField
                required
                variant="outlined"
                autoFocus
                margin="dense"
                name="prix"
                id="prix"
                label="Prix du menu"
                value={prixMenu}
                onChange={(e) => setPrixMenu(e.target.value)}
            />
            <GreenButton
                startIcon={<SaveIcon/>}
                onClick={ajouterMenu}
            >
                Enregistrer le menu
            </GreenButton>

        </>
    );
}
