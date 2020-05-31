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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PageClient = ({ match: {params :{id}} }) => {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [liste, setListe] = React.useState([]);

    const handleClickOpen = () => {
        console.log(Commande.listeItems());
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                            <Grid item xs={3}>
                                <Typography align="center">
                                    {item.quantite}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
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
            <Box>
                <InfoResto idResto={id}/>
                <Carte idResto={id}/>
            </Box>

            <Fab aria-label='Expand' className={clsx(classes.fab, classes.fabGreen)} onClick={handleClickOpen} color='inherit'>
                <ShoppingCartIcon />
            </Fab>


            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
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
                        <Grid item xs={3}>
                            <Typography align="center" className={classes.legende}>
                                Quantitée
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
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

            </Dialog>

        </>
    )
}

export default PageClient
