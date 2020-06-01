import React, {useEffect, useState} from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Badge from "@material-ui/core/Badge";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Commande from "../../stores/Commande";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";



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
    volume: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    item: {

        margin: "1em"
    },
    compteur: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            marginBottom: theme.spacing(2),
        },
        '& .MuiBadge-root': {
            marginRight: theme.spacing(4),
        },
        margin: "0 auto",
    },

}));

const TemplateBoisson = ({boisson}) => {

    const classes = useStyle();

    const [count, setCount] = React.useState(Commande.quantiteItem(boisson.id));
    const [invisible, setInvisible] = React.useState(false);


    const getLabel = () => {
        var label = "";

        if (boisson.volume != null && boisson.volume != ""){
            label += boisson.volume+" cL";
            if (boisson.date != null && boisson.date != ""){
                label += "  -  "+boisson.date;
            }
        }else {
            if (boisson.date != null && boisson.date != ""){
                label += boisson.date;
            }
        }

        return label;
    }

    return (

        <Grid item xs key={boisson.id}>

            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {boisson.nom}
                    </Typography>

                    <Typography className={classes.pos} color="textSecondary">
                        {getLabel()}
                    </Typography>

                    <Typography variant="h6" component="p">
                        {boisson.prix} €
                    </Typography>
                </CardContent>
                <CardActions>

                    <div className={classes.compteur}>
                        <div>

                            <ButtonGroup color="primary" aria-label="text primary button group">
                                <Button
                                    aria-label="reduce"
                                    onClick={() => {
                                        if (count > 0){
                                            setCount(Math.max(count - 1, 0));
                                            Commande.retraitProduit(boisson.id);
                                        }

                                    }}
                                >
                                    <RemoveIcon fontSize="small" />
                                </Button>

                                <Button>
                                    {count}
                                </Button>

                                <Button
                                    aria-label="increase"
                                    onClick={() => {
                                        setCount(count + 1);
                                        Commande.ajouterUnElementAuPanier(boisson.id);
                                    }}
                                >
                                    <AddIcon fontSize="small" />
                                </Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </CardActions>
            </Card>

        </Grid>

    )
}

export default TemplateBoisson
