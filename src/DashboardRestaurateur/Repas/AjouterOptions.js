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

const AjouterOptions = ({idResto, idRepas, open, handleClose}) =>{


    const [listeOptions, setListeOptions] = useState([]);

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

    const ListeOptions = () =>{

        return (
            <>

                {listeOptions.map((element) =>
                    <ListItem>
                        <ListItemText
                            primary={element.nom+"  -  "+element.prix}
                            secondary={element.desc}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={()=> supprimerOption(element)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )}

            </>
        )
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Variantes</DialogTitle>

            <DialogContent>

                <ListeOptions/>
                <Button color="primary" onClick={()=>{ }}>Ajouter</Button>

            </DialogContent>
        </Dialog>
    )




};

export default AjouterOptions;
