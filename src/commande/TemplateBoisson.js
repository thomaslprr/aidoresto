import React from 'react';
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Commande from "../stores/Commande";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";



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
    prix:{
        textAlign: "right",
    }

}));

const TemplateBoisson = ({boisson, setCountPanier}) => {

    const classes = useStyle();

    const [count, setCount] = React.useState(Commande.quantiteItem(boisson.id));
    const [invisible, setInvisible] = React.useState(false);

    const [openOptions, setOpenOptions] = React.useState(false);

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
    };

    const GetActions = () =>{

        if (boisson.options.length > 0){
            return (
                <>
                    <Dialog open={openOptions} onClose={() => setOpenOptions(false)}>
                        <DialogTitle>{boisson.nom}</DialogTitle>


                            {boisson.options.map((element) =>{

                                let customItem = {
                                    id: boisson.id + element.nom + element.desc + element.prix,
                                    nom: boisson.nom +" - "+element.nom,
                                    prix: element.prix,
                                    desc: element.desc ?? boisson.desc
                                };

                                return(
                                    <>
                                        <Card className={classes.root}>
                                            <CardContent>
                                                <Grid container>
                                                    <Grid item xs={10}>
                                                        <Typography variant="h6" component="h2">
                                                            {element.nom}
                                                        </Typography>
                                                    </Grid>

                                                    <Grid item xs={2}>
                                                        <Typography variant="h6" component="p" className={classes.prix} color="primary">
                                                            {element.prix} €
                                                        </Typography>
                                                    </Grid>
                                                </Grid>

                                                <Typography className={classes.pos} color="textSecondary">
                                                    {element.desc}
                                                </Typography>


                                            </CardContent>
                                            <CardActions>

                                                <Button
                                                    aria-label="increase"
                                                    onClick={() => {
                                                        Commande.ajouterUnElementAuPanier(customItem);
                                                        setCountPanier();
                                                    }}
                                                    endIcon={<AddIcon fontSize="small" />}
                                                    className={classes.compteur}
                                                    color="primary"
                                                >
                                                    Ajouter
                                                </Button>

                                            </CardActions>
                                        </Card>
                                    </>
                                );
                            })}

                    </Dialog>

                    <div className={classes.compteur}>
                        <Button color="primary" onClick={()=>{setOpenOptions(true)}}>Voir les options</Button>
                    </div>
                </>
            );
        }else {
            return (
                <div className={classes.compteur}>
                    <div>

                        <ButtonGroup color="primary" aria-label="text primary button group">
                            <Button
                                aria-label="reduce"
                                onClick={() => {
                                    if (count > 0){
                                        setCount(Math.max(count - 1, 0));
                                        Commande.retraitProduit(boisson.id);
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
                                    Commande.ajouterUnElementAuPanier(boisson);
                                    setCountPanier();
                                }}
                            >
                                <AddIcon fontSize="small" />
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            );
        }

    };

    return (

        <Grid item xs key={boisson.id}>

            <Card className={classes.root}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={10}>
                            <Typography variant="h6" component="h2">
                                {boisson.nom}
                            </Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <Typography variant="h6" component="p" className={classes.prix} color="primary">
                                {boisson.prix} €
                            </Typography>
                        </Grid>
                    </Grid>

                    <Typography className={classes.pos} color="textSecondary">
                        {getLabel()}
                    </Typography>


                </CardContent>
                <CardActions>

                    <GetActions/>

                </CardActions>
            </Card>

        </Grid>

    )
}

export default TemplateBoisson
