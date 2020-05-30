
import React, {useCallback, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InfoIcon from '@material-ui/icons/Info';
import * as firebase from "firebase";


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


function RemplirInfo({id}){
    const classes = useStyles();
    const restaurantRef = firebase.firestore().collection("restaurant").doc(id);


    const [remplir,setRemplir] = useState(false);
    const handleModifResto = useCallback(
        async event => {
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
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            },
        []
    );


    if(!remplir){
        return(
            <Button onClick={()=>setRemplir(true)} variant="contained" color="primary">
                Compléter les informations de mon restaurant
            </Button>
        )
    }else{
        return(
            <div>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <InfoIcon />
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
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="numero"
                                        label="Numéro de téléphone"
                                        id="numero"
                                        autoComplete="numero"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Enregistrer les informations
                            </Button>

                        </form>
                    </div>
                    <Box mt={5}>
                    </Box>
                </Container>

            </div>
        )
    }

}

export default RemplirInfo;
