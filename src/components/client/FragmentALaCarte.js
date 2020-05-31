import React, {Suspense, useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import { Typography, Avatar, Grid, Box } from "@material-ui/core";
import firebase from "firebase";
import PropTypes, {element} from 'prop-types';
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import TemplateBoisson from "./TemplateBoisson";
import TemplateNourriture from "./TemplateNourriture";
import Commande from "../../stores/Commande";



// CSS Style
const useStyle = makeStyles(theme =>({

    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },

    resto:{
        margin: "auto"
    },

    root2: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },

    inline: {
        display: 'inline',
    },

}));


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

const FragmentALaCarte = (props) => {


    useEffect(()=>{
        getData();
    },[]);


    const [resto,setResto] = useState({
        nom: "",
        ville: "",
        tel: ""
    });

    const[dataBoisson, setDataBoisson] = useState([]);
    const[dataEntree, setDataEntree] = useState([]);
    const[dataPlat, setDataPlat] = useState([]);
    const[dataDessert, setDataDessert] = useState([]);


    const classes = useStyle();

    useEffect(()=>{

        const restaurantRef = firebase.firestore().collection("restaurant").doc(props.idResto);

        restaurantRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setResto({
                    nom: doc.data().nom,
                    ville: doc.data().adresse.ville,
                    tel: doc.data().telephone
                });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    },[]);


    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getData = async () =>{

        //Boissons
        var tableau = [];
        setDataBoisson([]);

        await firebase.firestore().collection("restaurant").doc(props.idResto).collection("boisson")
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    var x = {
                        id: doc.id,
                        nom: doc.data().nom,
                        prix: doc.data().prix,
                        volume: doc.data().volume
                    }
                    console.log("BOISSON : "+x.nom);
                    setDataBoisson(dataBoisson => dataBoisson.concat(x));

                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });


        //Entrees
        tableau = [];
        setDataEntree([]);

        await firebase.firestore().collection("restaurant").doc(props.idResto).collection("repas").where("categorie", "==", "Entrée")
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    var x = {
                        id: doc.id,
                        nom: doc.data().nom,
                        prix: doc.data().prix,
                        desc: doc.data().description
                    }
                    setDataEntree(dataEntree => dataEntree.concat(x));

                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

        //plats
        tableau = [];
        setDataPlat([]);

        await firebase.firestore().collection("restaurant").doc(props.idResto).collection("repas").where("categorie", "==", "Déjeuné")
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    var x = {
                        id: doc.id,
                        nom: doc.data().nom,
                        prix: doc.data().prix,
                        desc: doc.data().description
                    }
                    setDataPlat(dataPlat => dataPlat.concat(x));

                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

        //Dessert
        tableau = [];
        setDataDessert([]);

        await firebase.firestore().collection("restaurant").doc(props.idResto).collection("repas").where("categorie", "==", "Dessert")
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    var x = {
                        id: doc.id,
                        nom: doc.data().nom,
                        prix: doc.data().prix,
                        desc: doc.data().description
                    }
                    setDataDessert(dataDessert => dataDessert.concat(x));

                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });


    }

    const ListBoisson = () => {

        dataBoisson.forEach(element => Commande.ajouterProduitListe(element));

        console.log("Data store : ");
        console.log("V 1 : ");
        console.log(Commande.commandes);
        console.log(Commande.articles);

        return (
            <>
            {dataBoisson.map( item => (
                <TemplateBoisson boisson={item} key={item}/>
                ))}
            </>
        );
    }

    const ListEntree = () => {
        dataEntree.forEach(element => Commande.ajouterProduitListe(element));
        return (
            <>
            {dataEntree.map( item => (
                <TemplateNourriture repas={item} key={item}/>
                ))}
            </>
        );
    }
    const ListPlat= () => {
        dataPlat.forEach(element => Commande.ajouterProduitListe(element));
        return (
            <>
            {dataPlat.map( item => (
                <TemplateNourriture repas={item} key={item}/>
                ))}
            </>
        );
    }
    const ListDessert = () => {
        dataDessert.forEach(element => Commande.ajouterProduitListe(element));
        return (
            <>
            {dataDessert.map( item => (
                <TemplateNourriture repas={item} key={item}/>
                ))}
            </>
        );
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="choix des plats">

                    <LinkTab label="Entrée" href="/drafts" {...a11yProps(0)} />
                    <LinkTab label="Plat" href="/trash" {...a11yProps(1)} />
                    <LinkTab label="Dessert" href="/trash" {...a11yProps(2)} />
                    <LinkTab label="Boisson" href="/trash" {...a11yProps(3)} />
                </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>
                <List className={classes.root2}>
                        <Suspense fallback={<div>Chargement ...</div>}>
                            <ListEntree />
                        </Suspense>
                </List>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <List className={classes.root2}>
                    <Suspense fallback={<div>Chargement ...</div>}>
                        <ListPlat />
                    </Suspense>
                </List>
            </TabPanel>

            <TabPanel value={value} index={2}>
                <List className={classes.root2}>
                    <Suspense fallback={<div>Chargement ...</div>}>
                        <ListDessert />
                    </Suspense>
                </List>
            </TabPanel>

            <TabPanel value={value} index={3}>
                <List className={classes.root2}>
                    <Suspense fallback={<div>Chargement ...</div>}>
                        <ListBoisson />
                    </Suspense>
                </List>
            </TabPanel>
        </div>
    );

}

export default FragmentALaCarte