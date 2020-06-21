import React, {Suspense, useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import { Typography, Grid, Box } from "@material-ui/core";
import PropTypes from 'prop-types';
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TemplateBoisson from "./TemplateBoisson";
import TemplateNourriture from "./TemplateNourriture";
import Commande from "../stores/Commande";
import SelectCategorieBoisson from "./SelectCategorieBoisson";



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

const ALaCarte = ({entrees, plats, desserts, boissons, idResto, setCountPanier}) => {

    const classes = useStyle();

    const [filtreBoisson, setFiltreBoisson] = useState("");

    //valueTab
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const ListBoisson = () => {

        console.log("Liste des boissons");
        console.log(boissons);
        let res = boissons
            .filter(boisson => (boisson.categorie === filtreBoisson || filtreBoisson === ""));

        console.log(res);

        return (
            <>
                <SelectCategorieBoisson
                    filtre={filtreBoisson}
                    changerFiltre={setFiltreBoisson}

                /><br/><br/><br/><br/>
                <Grid container spacing={3}>
                {res.map( item => (
                    <TemplateBoisson boisson={item} setCountPanier={setCountPanier}/>
                ))}
                </Grid>
            </>
        );
    };

    const ListEntree = () => {
        return (
            <>
                {entrees.map( item => (
                    <TemplateNourriture repas={item} setCountPanier={setCountPanier}/>
                ))}
            </>
        );
    };

    const ListPlat= () => {
        return (
            <>
                {plats.map( item => (
                    <TemplateNourriture repas={item} setCountPanier={setCountPanier}/>
                ))}
            </>
        );
    };

    const ListDessert = () => {
        return (
            <>
                {desserts.map( item => (
                    <TemplateNourriture repas={item} setCountPanier={setCountPanier} />
                ))}
            </>
        );
    };

    return (
        <>
            <div className={classes.root}>

                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="choix des plats"
                    indicatorColor="secondary"
                    textColor="secondary"
                >

                    <LinkTab label="Entrée" href="/drafts" {...a11yProps(0)} />
                    <LinkTab label="Plat" href="/trash" {...a11yProps(1)} />
                    <LinkTab label="Dessert" href="/trash" {...a11yProps(2)} />
                    <LinkTab label="Boisson" href="/trash" {...a11yProps(3)} />
                </Tabs>



                <TabPanel value={value} index={0}>
                    <Grid container spacing={3}>
                        <Suspense fallback={<div>Chargement ...</div>}>
                            <ListEntree />
                        </Suspense>
                    </Grid>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <Grid container spacing={3}>
                        <Suspense fallback={<div>Chargement ...</div>}>
                            <ListPlat />
                        </Suspense>
                    </Grid>
                </TabPanel>

                <TabPanel value={value} index={2}>
                    <Grid container spacing={3}>
                        <Suspense fallback={<div>Chargement ...</div>}>
                            <ListDessert />
                        </Suspense>
                    </Grid>
                </TabPanel>

                <TabPanel value={value} index={3}>
                    <Grid container spacing={3}>
                        <Suspense fallback={<div>Chargement ...</div>}>
                            <ListBoisson />
                        </Suspense>
                    </Grid>
                </TabPanel>
            </div>
        </>
    );

};

export default ALaCarte
