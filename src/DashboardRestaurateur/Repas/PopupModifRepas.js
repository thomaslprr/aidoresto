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

export default function ModifierRepas({idresto,idrepas,nm,pri,description,ingredients,cat,changerEtat,ortographe}){




    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));



    const classes = useStyles();
    const [categorie, setCategorie] = useState(cat);
    const [ing,setIng] = useState(ingredients);
    const [prix,setPrix] = useState(pri);
    const [nom,setNom] = useState(nm);
    const [desc, setDesc] = useState(description);



    const [etatAjout, setEtatAjout] = useState(0);

    const boissonCollection = firebase.firestore().collection("restaurant").doc(idresto).collection("repas").doc(idrepas);


    const handleModifierBoisson = () =>{
        setEtatAjout(1);

        boissonCollection.update({
            categorie: categorie,
            ingredients: ing,
            nom: nom,
            prix:prix,
            description: desc
        }).then(function() {
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

            if(nom==""){
                return (<Button disabled={true} color="secondary">
                    Saisissez un nom
                </Button>)
            }
            if(prix==""){
                return (<Button disabled={true} color="secondary">
                    Saisissez un prix
                </Button>)
            }else {


                return (<Button onClick={handleModifierBoisson} color="primary">
                    Modifier
                </Button>)
            }

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
                Repas modifié
            </Button>)
        }
        else if(etatAjout==3){
            return (<Button onClick={handleModifierBoisson}
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






    return (
        <div>
            <Dialog open={true} onClose={()=>changerEtat(0)}  aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{ortographe[0]}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>

                            <TextField
                                required
                                variant="outlined"
                                autoFocus
                                margin="dense"
                                name="nom"
                                id="nom"
                                label={ortographe[1]}
                                type="nom"
                                fullWidth
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
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

                        <Grid item xs={12}>

                            <TextField
                                required
                                variant="outlined"
                                margin="dense"
                                name="description"
                                id="description"
                                label="Description"
                                type="nom"
                                fullWidth
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="annee"
                                variant="outlined"
                                required
                                fullWidth
                                id="annee"
                                label="Ingrédients"
                                value={ing}
                                onChange={(e) => setIng(e.target.value)}
                                size="small"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>changerEtat(0)}  color="primary">
                        Annuler
                    </Button>
                    {chargementBoutonComposant()}
                </DialogActions>
            </Dialog>
        </div>
    );
}
