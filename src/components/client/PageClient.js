import React, {useEffect} from 'react';
import { Typography, Avatar, Grid, Box } from "@material-ui/core";
import InfoResto from "./InfoResto";
import Carte from "./Carte";
import clsx from 'clsx';
import {makeStyles} from "@material-ui/core/styles";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Fab from '@material-ui/core/Fab';
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
import ButtonGroup from "@material-ui/core/ButtonGroup";
import blue from "@material-ui/core/colors/blue";
import {Copyright} from "../../PiedDePage/PiedPage";
import Badge from "@material-ui/core/Badge";
import PageFinalisation from "./Commande/PageFinalisation";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: blue[900],
        '&:hover': {
            backgroundColor: blue[600],
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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PageClient = ({ match: {params :{id}} }) => {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [finalisation, setFinalisation] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);
    const [notif, setNotif] = React.useState({
        open: false,
        text: "",
        color: "",
    });

    const [elementsPanier, setElementsPanier] = React.useState(Commande.elementsTotals(id));

    const setCountPanier = () => {
        if(elementsPanier !==  Commande.elementsTotals(id)){
            setElementsPanier(Commande.elementsTotals(id));
        }
    };

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

    const handleCloseNotif = () => {
        setNotif({
            open: false,
            text: "",
            color: "",
        });
    };

    const finDeCommande = (statut) => {

        setFinalisation(false);
        setOpen(false);

        //Ouvrir notif
        if (statut === "valid"){
            setNotif({
                open: true,
                text: "Votre commande a bien été prise en compte",
                color: "success",
            });
        }
        if (statut === "error"){
            setNotif({
                open: true,
                text: "Erreur lors de l'envoi de la commande, veuillez réessayer",
                color: "error",
            });
        }

    }

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
                    idResto={id}
                    retourFinalisation={retourFinalisation}
                    finDeCommande={finDeCommande} />
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
                                            Commande.ajouterUnElementAuPanier(item.id);
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
            <Snackbar open={notif.open} autoHideDuration={5000} onClose={handleCloseNotif}>
                <Alert onClose={handleCloseNotif} severity={notif.color}>
                    {notif.text}
                </Alert>
            </Snackbar>

            <Box>
                <InfoResto idResto={id}/>
                <Carte idResto={id} setCountPanier={setCountPanier}/>
            </Box>

            <Fab aria-label='Expand' className={clsx(classes.fab, classes.fabGreen)} onClick={handleClickOpen} color='inherit'>
                <Badge badgeContent={elementsPanier} color="error">
                    <ShoppingCartIcon />
                </Badge>
            </Fab>


            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>

               {getContenuPopUp()}

            </Dialog>
            <Copyright/>

        </>
    )
}

export default PageClient
