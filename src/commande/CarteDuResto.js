import React, {useEffect, useState} from 'react';
import firebase from "firebase";
import HeaderPageCommande from "./HeaderPageCommande";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Typography} from "@material-ui/core";
import PropTypes from "prop-types";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import ALaCarte from "./ALaCarte";
import Snackbar from "@material-ui/core/Snackbar";
import Commande from "../stores/Commande";
import clsx from "clsx";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Fab from "@material-ui/core/Fab";
import blue from "@material-ui/core/colors/blue";
import Panier from "./Panier";
import MuiAlert from '@material-ui/lab/Alert';
import Menus from "./Menus";


const useStyle = makeStyles(theme =>({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    resto:{
        margin: "auto"
    },
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
}));


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

const CarteDuResto = ({idResto, infoResto}) => {

    const classes = useStyle();

    //tabValue
    const [value, setValue] = useState(0);
    const handleChangementTab = (event, newValue) => {
        setValue(newValue);
    };

    const[dataBoisson, setDataBoisson] = useState([]);
    const[dataEntree, setDataEntree] = useState([]);
    const[dataPlat, setDataPlat] = useState([]);
    const[dataDessert, setDataDessert] = useState([]);

    const [dataMenu, setDataMenus] = useState([]);

    //Statut panier
    const[panierOuver, setPanierOuver] = useState(false);

    const [elementsPanier, setElementsPanier] = React.useState(Commande.elementsTotals(idResto));

    const setCountPanier = () => {
        if(elementsPanier !==  Commande.elementsTotals(idResto)){
            setElementsPanier(Commande.elementsTotals(idResto));
        }
    };

    const [notif, setNotif] = React.useState({
        open: false,
        text: "",
        color: "",
    });

    const handleOpenPanier = () => {
        setPanierOuver(true);
    };
    const handleClosePanier = () => {
        setPanierOuver(false);
    };

    const modifNotif = (newNotif) => {
      setNotif(newNotif);
    };

    const handleCloseNotif = () => {
        setNotif({
            open: false,
            text: "",
            color: "",
        });
    };

    useEffect(()=>{
        getElementsCarte();
    },[]);

    const getElementsCarte = () => {

        firebase.firestore().collection("restaurant").doc(idResto).collection("boisson")
            .onSnapshot(function(querySnapshot) {

                setDataBoisson([]);

                querySnapshot.forEach(function(doc) {
                    let boisson = {
                        id: doc.id,
                        date: doc.data().date,
                        nom: doc.data().nom,
                        prix: doc.data().prix,
                        volume: doc.data().volume
                    };
                    setDataBoisson(dataBoisson => dataBoisson.concat(boisson));
                });
            });

        firebase.firestore().collection("restaurant").doc(idResto).collection("repas").where("categorie", "==", "Entrée")
            .onSnapshot(function(querySnapshot) {

                setDataEntree([]);

                querySnapshot.forEach(function(doc) {
                    let entree = {
                        id: doc.id,
                        nom: doc.data().nom,
                        prix: doc.data().prix,
                        desc: doc.data().description
                    };
                    setDataEntree(dataEntree => dataEntree.concat(entree));
                });
            });

        firebase.firestore().collection("restaurant").doc(idResto).collection("repas").where("categorie", "==", "Déjeuné")
            .onSnapshot(function(querySnapshot) {

                setDataPlat([]);

                querySnapshot.forEach(function(doc) {
                    let plat = {
                        id: doc.id,
                        nom: doc.data().nom,
                        prix: doc.data().prix,
                        desc: doc.data().description
                    };
                    setDataPlat(dataPlat => dataPlat.concat(plat));
                });
            });

        firebase.firestore().collection("restaurant").doc(idResto).collection("repas").where("categorie", "==", "Dessert")
            .onSnapshot(function(querySnapshot) {

                setDataDessert([]);

                querySnapshot.forEach(function(doc) {
                    let dessert = {
                        id: doc.id,
                        nom: doc.data().nom,
                        prix: doc.data().prix,
                        desc: doc.data().description
                    };
                    setDataDessert(dataDessert => dataDessert.concat(dessert));
                });
            });


        let refCollectionMenus = firebase.firestore().collection("restaurant").doc(idResto).collection("menus");
        refCollectionMenus.onSnapshot(function(querySnapshot) {

            setDataMenus([]);

            let lb = [];

            querySnapshot.forEach(function(doc) {

                let donneesMenu = doc.data();
                let data = {
                    id: doc.id,
                    id_resto: idResto,
                    nom: donneesMenu.nom,
                    prix: donneesMenu.prix,
                    entrees: donneesMenu.entrees,
                    plats: donneesMenu.plats,
                    desserts: donneesMenu.desserts,
                    boissons: donneesMenu.boissons
                };
                lb.push(data);
            });

            setDataMenus(lb);
        });

    };

    return (
        <>
            <Snackbar open={notif.open} autoHideDuration={5000} onClose={handleCloseNotif}>
                <Alert onClose={handleCloseNotif} severity={notif.color}>
                    {notif.text}
                </Alert>
            </Snackbar>

            <HeaderPageCommande infoResto={infoResto} />

            <div className={classes.root}>

                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChangementTab}
                    aria-label="nav tabs example"
                    textColor="primary"
                    indicatorColor="primary"
                >

                    <LinkTab label="A la carte" href="/trash" {...a11yProps(1)} />

                    <LinkTab label="Menu" href="/drafts" {...a11yProps(0)} />

                </Tabs>

                <TabPanel value={value} index={0}>
                    <Box>
                        <ALaCarte
                            idResto={idResto}
                            setCountPanier={setCountPanier}
                            entrees={dataEntree}
                            plats={dataPlat}
                            desserts={dataDessert}
                            boissons={dataBoisson}
                        />
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box>
                        <Menus listeMenus={dataMenu}/>
                    </Box>
                </TabPanel>

            </div>

            <Panier
                open={panierOuver}
                idResto={idResto}
                handleClose={handleClosePanier}
                modifNotif={modifNotif}
            />

            <Fab aria-label='Expand' className={clsx(classes.fab, classes.fabGreen)} onClick={handleOpenPanier} color='inherit'>
                <Badge badgeContent={elementsPanier} color="error">
                    <ShoppingCartIcon />
                </Badge>
            </Fab>
        </>
    )
};

export default CarteDuResto
