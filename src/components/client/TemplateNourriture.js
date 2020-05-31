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
import Badge from "@material-ui/core/Badge";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Box from "@material-ui/core/Box";
import Commande from "../../stores/Commande";


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
    },

}));

const TemplateNourriture = ({repas}) => {

    const [count, setCount] = React.useState(Commande.quantiteItem(repas.id));
    const [invisible, setInvisible] = React.useState(false);

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
                    <Box m={2} />
                    <div className={classes.compteur}>
                        <div>
                            <Badge
                                color="primary"
                                badgeContent={count}/>
                            <ButtonGroup>
                                <Button
                                    aria-label="reduce"
                                    onClick={() => {
                                        if (count > 0){
                                            setCount(Math.max(count - 1, 0));
                                            Commande.retraitProduit(repas.id);
                                        }

                                    }}
                                >
                                    <RemoveIcon fontSize="small" />
                                </Button>
                                <Button
                                    aria-label="increase"
                                    onClick={() => {
                                        setCount(count + 1);
                                        Commande.ajouterUnElementAuPanier(repas.id);
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

export default TemplateNourriture
