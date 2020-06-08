import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import { Typography, Avatar, Grid, Box } from "@material-ui/core";
import PropTypes from 'prop-types';
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import FragmentALaCarte from "./FragmentALaCarte";
import InfosResto from "../../stores/InfosResto";


// CSS Style
const useStyle = makeStyles(theme =>({

    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },

    resto:{
        margin: "auto"
    }

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

const Carte = (props) => {

    console.log("Carte : "+props.idResto);

    const classes = useStyle();

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>

            <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
                textColor="primary"
                indicatorColor="primary"
            >

                <LinkTab label="A la carte" href="/trash" {...a11yProps(1)} />

                <LinkTab label="Menu" href="/drafts" {...a11yProps(0)} />

            </Tabs>

            <TabPanel value={value} index={0}>
                <Box>
                    <FragmentALaCarte idResto={props.idResto} setCountPanier={props.setCountPanier}/>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box>
                    Bientôt disponible
                </Box>
            </TabPanel>


        </div>
    );

}

export default Carte
