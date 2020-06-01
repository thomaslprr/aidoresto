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

        const envoieCommande = () => {

            setFinalisation(false);
            setOpen(false);
        }

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
                <Box>

                    <form className={classes.form} onSubmit={envoieCommande}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Votre nom"
                            name="nom"
                            autoFocus
                        />
                    </form>


                </Box>

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
