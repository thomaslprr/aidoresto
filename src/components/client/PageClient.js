import React, {useEffect, useState} from 'react';
import { Typography, Avatar, Grid, Box } from "@material-ui/core";
import InfoResto from "./InfoResto";
import Carte from "./Carte";
import clsx from 'clsx';
import {makeStyles} from "@material-ui/core/styles";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Fab from '@material-ui/core/Fab';
import { green } from '@material-ui/core/colors';


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
}));

const PageClient = ({ match: {params :{id}} }) => {

    const classes = useStyles();

    return (
        <>
        <Box>
            <InfoResto idResto={id}/>
            <Carte idResto={id}/>
        </Box>

        <Fab aria-label='Expand' className={clsx(classes.fab, classes.fabGreen)} color='inherit'>
            <ShoppingCartIcon />
        </Fab>
        </>
    )
}

export default PageClient
