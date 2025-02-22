import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import * as firebase from "firebase";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";

const AjouterOptions = ({idResto, idRepas, open, handleClose}) =>{


    const [listeOptions, setListeOptions] = useState([]);
    const [nomOption, setNomOption] = useState('');
    const [prixOption, setPrixOption] = useState('');
    const [descOption, setDescOption] = useState('');
    const [loading, setLoading] = useState(false);

    const refCollection = firebase.firestore().collection("restaurant").doc(idResto).collection("repas").doc(idRepas).collection("options");

    useEffect(()=> {

            refCollection.onSnapshot(function(querySnapshot) {

                setListeOptions([]);

                querySnapshot.forEach(function(doc) {

                    let data = doc.data();

                    let option = {
                        id: doc.id,
                        nom: data.nom ?? '',
                        prix: data.prix ?? '',
                        desc: data.desc ?? '',
                    };

                    setListeOptions(listeOptions => listeOptions.concat(option));

                });
            });
    },[]);


    const supprimerOption = (option) => {
        refCollection.doc(option.id).delete();
    };

    const ajoutOption = () =>{
      if( nomOption !== '' && prixOption !== '' && !loading){
          setLoading(true);
          refCollection.add({
              nom: nomOption,
              prix: prixOption,
              desc: descOption
          }).then( () =>{
                  setLoading(false);
                  setNomOption('');
                  setDescOption('');
                  setPrixOption('');
            }
          );
      }
    };

    const ListeOptions = () =>{

        return (

            <List>
                {listeOptions.map((element) =>
                    <ListItem>
                        <ListItemText
                            primary={element.nom+"  -  "+element.prix+" €"}
                            secondary={element.desc}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={()=> supprimerOption(element)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )}
            </List>

        )
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Variantes</DialogTitle>

            <DialogContent>

                <ListeOptions/>

                <Grid container spacing={1}>
                    <Grid item xs={9} >
                        <TextField
                            value={nomOption}
                            onChange={(e) => setNomOption(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="nom"
                            label="Nom"
                            name="nom"
                            autoComplete="name"
                        />
                    </Grid>
                    <Grid item xs={3} >
                        <TextField
                            value={prixOption}
                            onChange={(e) => setPrixOption(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="prix"
                            label="Prix"
                            name="prix"
                            autoComplete="number"
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            value={descOption}
                            onChange={(e) => setDescOption(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="desc"
                            label="Description"
                            name="desc"
                        />
                    </Grid>
                </Grid>
                <Button color="primary" onClick={ajoutOption}>Ajouter</Button>

            </DialogContent>
        </Dialog>
    )




};

export default AjouterOptions;
