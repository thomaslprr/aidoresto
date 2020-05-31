import React, {useEffect, useState} from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";


const useStyle = makeStyles(theme =>({
    root: {
        minWidth: 250,
    },
    inline: {
        display: 'inline',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    desc: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    item: {

        margin: "1em"
    }

}));

const TemplateNourriture = ({repas}) => {

    const classes = useStyle();

    return (

        <Grid item xs key={repas.id}>

            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {repas.nom}
                    </Typography>
                    <Typography className={classes.desc} color="textSecondary" gutterBottom>
                        {repas.desc}
                    </Typography>
                    <Typography variant="h6" component="p">
                        {repas.prix} €
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button color="primary" size="small" onClick={console.log("click")}>Ajouter</Button>
                </CardActions>
            </Card>

        </Grid>

    )
}

export default TemplateNourriture
