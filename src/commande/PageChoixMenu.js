import React from 'react';
import { Typography, Box } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Slide from "@material-ui/core/Slide";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Commande from "../stores/Commande";


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    button: {
        margin: "auto"
    },
    indication: {
        marginTop: "1em",
        marginBottom: "1em",
    },
    itemsSelect: {
        margin:"1em",
    },
    formControl: {
        margin: "1em 0",
        minWidth: 300,
    },
}));



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const PageChoixMenu = ({menu, handleClose, open}) => {

    const classes = useStyles();

    const [selectedEntree, setSelectedEntree] = React.useState("");
    const [selectedPlat, setSelectedPlat] = React.useState("");
    const [selectedDessert, setSelectedDessert] = React.useState("");
    const [selectedBoisson, setSelectedBoisson] = React.useState("");

    //Vérifie que tout les champs sont select
    const getStatutBtn = () => {

        if (menu && menu.entrees && menu.entrees.length > 0 && selectedEntree === ""){
            return true;
        }

        if (menu && menu.plats && menu.plats.length > 0 && selectedPlat === ""){
            return true;
        }

        if (menu && menu.desserts && menu.desserts.length > 0 && selectedDessert === ""){
            return true;
        }

        if (menu && menu.boissons && menu.boissons.length > 0 && selectedBoisson === ""){
            return true;
        }

        return false;
    };

    const getValue = (type) =>{
        let rep;
        if (type === "entree" && selectedEntree !== ""){
            for (let i = 0; i < menu.entrees.length; i++){
                if (selectedEntree === menu.entrees[i].nom+menu.entrees[i].desc+menu.entrees[i].quantite){
                    rep = menu.entrees[i];
                }
            }
        }if (type === "plat" && selectedEntree !== ""){
            for (let i = 0; i < menu.plats.length; i++){
                if (selectedPlat === menu.plats[i].nom+menu.plats[i].desc+menu.plats[i].quantite){
                    rep = menu.plats[i];
                }
            }
        }if (type === "dessert" && selectedEntree !== ""){
            for (let i = 0; i < menu.desserts.length; i++){
                if (selectedDessert === menu.desserts[i].nom+menu.desserts[i].desc+menu.desserts[i].quantite){
                    rep = menu.desserts[i];
                }
            }
        }if (type === "boisson" && selectedEntree !== ""){
            for (let i = 0; i < menu.boissons.length; i++){
                if (selectedBoisson === menu.boissons[i].nom+menu.boissons[i].desc+menu.boissons[i].quantite){
                    rep = menu.boissons[i];
                }
            }
        }
        return rep;
    };

    const ajoutMenuPanier = () =>{
        let menuCommande = {
            nom: menu.nom,
            id: menu.id+selectedEntree+selectedPlat+selectedDessert+selectedBoisson,
            prix: menu.prix,
            entree: getValue("entree"),
            plat: getValue("plat"),
            dessert: getValue("dessert"),
            boissons: getValue("boisson")
        };

        Commande.ajouterUnMenu(menuCommande);

        handleClose();
    };

    const Selecteur = ({nom, val, handleChange, listeItem}) =>{

        const getItemText = (item) =>{
            if (item.quantite !== null && item.quantite !== ""){
                return item.nom+" - "+item.quantite;
            }else {
                return item.nom;
            }
        };

        if (listeItem.length > 0) {
            return (
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                >
                    <Grid item>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id={"item-selector-" + nom}>{nom}</InputLabel>
                        <Select
                            labelId={"item-selector-" + nom}
                            id={"select-" + nom}
                            value={val}
                            onChange={handleChange}
                            label={nom}
                        >

                            {listeItem.map((item) =>
                                <MenuItem value={item.nom + item.desc + item.quantite}>
                                    {getItemText(item)}
                                </MenuItem>
                            )}

                        </Select>
                    </FormControl>
                    </Grid>
                </Grid>
            );
        }else {
            return (
              <>
              </>
            );
        }
    };

    return (
        <>

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>

                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {menu.nom} - {menu.prix} €
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Typography variant="h6" align="center" className={classes.indication}>
                    Choisissez le contenu de votre menu
                </Typography>

                <Box>

                    <Selecteur
                        nom="Entrée"
                        val={selectedEntree}
                        handleChange={(event) => {
                            setSelectedEntree(event.target.value);
                        }}
                        listeItem={menu.entrees}
                    />

                    <Selecteur
                        nom="Plat"
                        val={selectedPlat}
                        handleChange={(event) => {
                            setSelectedPlat(event.target.value);
                        }}
                        listeItem={menu.plats}
                    />

                    <Selecteur
                        nom="Dessert"
                        val={selectedDessert}
                        handleChange={(event) => {
                            setSelectedDessert(event.target.value);
                        }}
                        listeItem={menu.desserts}
                    />

                    <Selecteur
                        nom="Boisson"
                        val={selectedBoisson}
                        handleChange={(event) => {
                            setSelectedBoisson(event.target.value);
                        }}
                        listeItem={menu.boissons}
                    />

                </Box>


                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<NavigateNextIcon/>}
                    onClick={ajoutMenuPanier}
                    disabled={getStatutBtn()}
                >
                    Ajouter le menu à la commande
                </Button>

            </Dialog>

        </>
    )
};

export default PageChoixMenu
