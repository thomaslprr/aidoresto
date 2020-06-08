import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as firebase from "firebase";
import {useHistory} from "react-router";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function RemplirInfo({id,donnee,setAffichage}){


    const [nom,setNom] = useState("");
    const [cp,setCp] = useState("");
    const [ville,setVille] = useState("");
    const [rue,setRue] = useState("");
    const [numero,setNumero] = useState("");
    useEffect(()=>{
        setNom(donnee.nom);
        setCp(donnee.adresse.code_postal);
        setVille(donnee.adresse.ville);
        setRue(donnee.adresse.rue);
        setNumero(donnee.telephone);
    },[])
    const classes = useStyles();
    const restaurantRef = firebase.firestore().collection("restaurant").doc(id);


    const [chargementBouton,setChargementBouton] = useState(0);

    const handleModifResto = (event)=> {
        console.log("clique sur valider");
        setChargementBouton(1);
        event.preventDefault();
        const { nom,numero,adresse,ville,code_postal } = event.target.elements;
        restaurantRef.update({
            nom: nom.value,
            telephone:numero.value,
            adresse:{
                code_postal:code_postal.value,
                pays:"France",
                rue:adresse.value,
                ville:ville.value
            }
        })
            .then(function() {
                console.log("Document successfully written!");
                setChargementBouton(2);
                window.location.reload();

            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
                setChargementBouton(3);
            });
    }

    function chargementBoutonComposant() {
        if(chargementBouton===0){
            return (<Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Compléter les informations
            </Button>)

        }else if(chargementBouton===1){
            return (<Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
            >
                Chargement...
            </Button>)
        }else if(chargementBouton===2){
            return (<Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Modification réussie
            </Button>)
        }
        else if(chargementBouton===3){
            return (<Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
            >
                Echec
            </Button>)
        }

    }

        return(
            <div>
                <div>
                    <Dialog open={true} onClose={()=> setAffichage(false)} aria-labelledby="form-dialog-title">
                        <DialogContent>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <RestaurantMenuIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Votre restaurant
                        </Typography>
                        <form className={classes.form} onSubmit={handleModifResto}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        autoComplete="fname"
                                        name="nom"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="nom"
                                        label="Nom du restaurant"
                                        autoFocus
                                        value={nom}
                                        onChange={(e) => setNom(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="ville"
                                        label="Ville"
                                        name="ville"
                                        autoComplete="ville"
                                        value={ville}
                                        onChange={(e) => setVille(e.target.value)}

                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="code_postal"
                                        label="Code postal"
                                        id="code_postal"
                                        autoComplete="code_postal"
                                        value={cp}
                                        onChange={(e) => setCp(e.target.value)}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="adresse"
                                        label="Rue du restaurant"
                                        id="adresse"
                                        autoComplete="current-password"
                                        value={rue}
                                        onChange={(e) => setRue(e.target.value)}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="numero"
                                        label="Numéro de téléphone"
                                        value={numero}
                                        id="numero"
                                        autoComplete="numero"
                                        onChange={(e) => setNumero(e.target.value)}

                                    />
                                </Grid>
                            </Grid>
                            {chargementBoutonComposant()}

                        </form>
                    </div>
                    <Box mt={5}>
                    </Box>
                </Container>
                        </DialogContent>
                        <DialogActions>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        )
    }


export default RemplirInfo;
