import React, {useEffect, useState} from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";


const useStyle = makeStyles(theme =>({

    inline: {
        display: 'inline',
    },

    item: {

        margin: "1em"
    }

}));

const TemplateBoisson = ({boisson}) => {

    const classes = useStyle();

    return (

        <>
            <ListItem className={classes.item} alignItems="flex-start">

                <ListItemText
                    primary={boisson.nom}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {boisson.prix+"€ "}
                            </Typography>
                            {boisson.volume+" cl"}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    )
}

export default TemplateBoisson
