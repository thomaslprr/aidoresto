import React, {useEffect, useState} from 'react';
import { Typography, Avatar, Grid, Box } from "@material-ui/core";
import InfoResto from "./InfoResto";
import Carte from "./Carte";



const PageClient = ({ match: {params :{id}} }) => {

    return (
        <Box>
            <InfoResto idResto={id}/>
            <Carte idResto={id}/>
        </Box>
    )
}

export default PageClient
