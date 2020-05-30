import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import { Typography, Avatar, Grid, Box } from "@material-ui/core";
import InfoResto from "../InfoResto";
import Carte from "./Carte";


// CSS Style
const useStyle = makeStyles(theme =>({

    avatar:{
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin: theme.spacing(1)
    }

}));

const PageClient = ({ match: {params :{id}} }) => {

    return (
        <Box>
            <InfoResto idResto={id}/>
            <Carte idResto={id}/>
        </Box>
    )
}

export default PageClient