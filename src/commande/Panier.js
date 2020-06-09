import React from 'react';
import { Typography, Grid, Box } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import CloseIcon from '@material-ui/icons/Close';
import Commande from "../stores/Commande";
import Button from "@material-ui/core/Button";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import PageFinalisation from "./PageFinalisation";
import Slide from "@material-ui/core/Slide";


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    legende: {
        fontWeight: "bold",
    },
    espace:{
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
    divider: {
        margin: "1em 0",
    },
}));



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Panier = ({open, handleClose, modifNotif, idResto, setCountPanier}) => {

    const classes = useStyles();

    const [finalisation, setFinalisation] = React.useState(false);

    const [refresh, setRefresh] = React.useState(false);

    const handleFinalisation = () => {
        setFinalisation(true);
    };

    const retourFinalisation = () => {
        setFinalisation(false);
    };

    const finDeCommande = (statut) => {

        setFinalisation(false);
        handleClose();

        //Ouvrir notif
        if (statut === "valid"){
            Commande.viderLePanier();
            setCountPanier();
            modifNotif({
                open: true,
                text: "Votre commande a bien été prise en compte",
                color: "success",
            });
        }
        if (statut === "error"){
            modifNotif({
                open: true,
                text: "Erreur lors de l'envoi de la commande, veuillez réessayer",
                color: "error",
            });
        }

    };

    const getStatutBtn = () => {
        return Commande.elementsTotals(idResto) < 1;
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
                    <Grid container spacing={1} className={classes.espace}>
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
                    <Divider className={classes.divider} />
                </Box>

                <List>

                    <ListElements/>

                </List>

                <Divider className={classes.divider} />


                <Typography align="center">
                    Total : {Commande.prixTotal()} €
                </Typography>


                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<NavigateNextIcon/>}
                    onClick={handleFinalisation}
                    disabled={getStatutBtn()}
                >
                    Finaliser ma commande
                </Button>

            </>
        );
    };


    const getContenuPopUp = () => {
        if (finalisation){
            return(
                <PageFinalisation
                    handleFinalisation={handleFinalisation}
                    idResto={idResto}
                    retourFinalisation={retourFinalisation}
                    finDeCommande={finDeCommande} />
            );
        }else {
            return (
                <ContenuCommande />
            );
        }
    };

    const InfoProduit = ({produit}) =>{
        if (produit.categorie && produit.categorie === "menu"){

            let ingredientsString = "";
            let ingredients = [];
            if (produit.entree && produit.entree !== {}){
                ingredients.push(produit.entree);
            }
            if (produit.plat && produit.plat !== {}){
                ingredients.push(produit.plat);
            }
            if (produit.dessert && produit.dessert !== {}){
                ingredients.push(produit.dessert);
            }
            if (produit.boisson && produit.boisson !== {}){
                ingredients.push(produit.boisson);
            }

            for(let i = 0; i < ingredients.length; i++){
                ingredientsString += ingredients[i].nom;
                if (i !== ingredients.length-1){
                    ingredientsString += " - ";
                }
            }

            return (
                <>
                    <Typography align="center">
                        {produit.nom}
                    </Typography>
                    <Typography align="center" variant="subtitle2" color={"textSecondary"}>
                        {ingredientsString}
                    </Typography>
                </>
            );
        }else {
            return (
                <Typography align="center">
                    {produit.nom}
                </Typography>
            );
        }
    };

    const ListElements = () => {

        return (
            <>
                {Commande.listeItems().map( item => (

                    <ListItem>

                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <InfoProduit produit={item}/>
                            </Grid>
                            <Grid item xs={4} alignItems="center">

                                <ButtonGroup variant="text" color="default" aria-label="text primary button group">
                                    <Button
                                        aria-label="reduce"
                                        onClick={() => {
                                            Commande.retraitProduit(item.id);
                                            setRefresh(!refresh);
                                        }}
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </Button>

                                    <Button>
                                        {item.quantite}
                                    </Button>

                                    <Button
                                        aria-label="increase"
                                        onClick={() => {
                                            Commande.ajouterUnElementAuPanier(item);
                                            setRefresh(!refresh);
                                        }}
                                    >
                                        <AddIcon fontSize="small" />
                                    </Button>
                                </ButtonGroup>

                            </Grid>
                            <Grid item xs={2}>
                                <Typography align="center">
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

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>

                {getContenuPopUp()}

            </Dialog>

        </>
    )
};

export default Panier
