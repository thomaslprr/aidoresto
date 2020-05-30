import React, {useCallback, useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import clsx from "clsx";
import * as firebase from "firebase";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    }
}));

export default function Boisson({id}){



    const [values, setValues] = React.useState({
        amount: ''
    });

    const handleChange2 = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

        const [open, setOpen] = useState(false);

        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

    const classes = useStyles();
    const [categorie, setCategorie] = useState('');
    const [annee,setAnnee] = useState("");
    const [prix,setPrix] = useState("");
    const [nom,setNom] = useState("");
    const [volume, setVolume] = useState("");

    const handleChange = (event) => {
        setCategorie(event.target.value);
    };


    const [etatAjout, setEtatAjout] = useState(0);

    const boissonCollection = firebase.firestore().collection("restaurant").doc(id).collection("boisson");


    useEffect(()=> {
        console.log(categorie);
    },[categorie]);

    const handleAjouterBoisson = () =>{
        setEtatAjout(1);
          const boissonData = {
            categorie: categorie,
            date: annee,
            nom: nom,
            prix:prix,
            volume: volume
        };
        boissonCollection.add(boissonData).then(function() {
            console.log("Document successfully written!");
            setEtatAjout(2);
            window.location.reload();
        })
         .catch(function(error) {
             console.error("Error writing document: ", error);
             setEtatAjout(3);
         });

    };

    function chargementBoutonComposant() {
        if(etatAjout==0){
            return (<Button onClick={handleAjouterBoisson} color="primary">
                Ajouter
            </Button>)

        }else if(etatAjout==1){
            return (<Button
                type="submit"
                variant="contained"
                className={classes.submit}
            >
                Chargement...
            </Button>)
        }else if(etatAjout==2){
            return (<Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Boisson ajoutée
            </Button>)
        }
        else if(etatAjout==3){
            return (<Button onClick={handleAjouterBoisson}
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
            >
                Erreur
            </Button>)
        }
    }

    function champDate (){
        if(categorie=="Alcool"){
            return <Grid item xs={4}>
                <TextField
                    autoComplete="fname"
                    name="annee"
                    variant="outlined"
                    required
                    fullWidth
                    id="annee"
                    label="Année"
                    value={annee}
                    onChange={(e) => setAnnee(e.target.value)}
                    size="small"
                />
            </Grid>
        }else{
                return <></>
            }
    }


        return (
            <div>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Ajouter une boisson
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Boisson</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Ajouter une boisson à votre catalogue afin de la proposer à vos clients.
                        </DialogContentText>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="categorie">Catégorie</InputLabel>
                                    <Select
                                        labelId="categorie_"
                                        id="categorie"
                                        name="categorie"
                                        value={categorie}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Boisson fraîche">Boisson fraîche</MenuItem>
                                        <MenuItem value="Boisson chaude">Boisson chaude</MenuItem>
                                        <MenuItem value="Cocktail avec alcool">Cocktail avec alcool</MenuItem>
                                        <MenuItem value="Cocktail sans alcool">Cocktail sans alcool</MenuItem>
                                        <MenuItem value="Alcool">Alcool</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        <Grid item xs={8}>

                        <TextField
                            required
                            variant="outlined"
                            autoFocus
                            margin="dense"
                            name="nom"
                            id="nom"
                            label="Nom de la boisson"
                            type="nom"
                            fullWidth
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                        />
                        </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    required
                                    label="Volume"
                                    name="volume"
                                    id="volume"
                                    className={clsx(classes.margin, classes.textField)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">cL</InputAdornment>,
                                    }}
                                    variant="outlined"
                                    size="small"
                                    value={volume}
                                    onChange={(e) => setVolume(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    required
                                    label="Prix"
                                    id="prix"
                                    name="prix"
                                    className={clsx(classes.margin, classes.textField)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                    }}
                                    variant="outlined"
                                    size="small"
                                    value={prix}
                                    onChange={(e) => setPrix(e.target.value)}
                                />

                            </Grid>

                            {champDate()}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Annuler
                        </Button>
                        {chargementBoutonComposant()}
                    </DialogActions>
                </Dialog>
            </div>
        );
}
