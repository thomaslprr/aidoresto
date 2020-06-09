import React from 'react';
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Commande from "../stores/Commande";


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
        margin:'0 auto',
    },
    prix:{
        textAlign: "right",
    }

}));

const TemplateNourriture = ({repas, setCountPanier}) => {

    const [count, setCount] = React.useState(Commande.quantiteItem(repas.id));
    const [invisible, setInvisible] = React.useState(false);

    const classes = useStyle();

    return (


        <Grid item xs key={repas.id}>

            <Card className={classes.root}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={10}>
                            <Typography variant="h6" component="h2">
                                {repas.nom}
                            </Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <Typography variant="h6" component="p" className={classes.prix} color="primary">
                                {repas.prix} €
                            </Typography>
                        </Grid>
                    </Grid>

                    <Typography className={classes.desc} color="textSecondary" gutterBottom>
                        {repas.desc}
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
                                            Commande.retraitProduit(repas.id);
                                            setCountPanier();
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
                                        Commande.ajouterUnElementAuPanier(repas);
                                        setCountPanier();
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
