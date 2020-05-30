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

}));

const TemplateNourriture = ({repas}) => {

    const classes = useStyle();

    return (

        <ListItem alignItems="flex-start">

            <ListItemText
                primary={repas.nom}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            {repas.prix+"€ "}
                        </Typography>
                        {repas.desc}
                    </React.Fragment>
                }
            />
        </ListItem>

    )
}

export default TemplateNourriture
