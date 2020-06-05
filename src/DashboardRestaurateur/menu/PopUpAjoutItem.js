import React from 'react';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import clsx from "clsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import ListeComposentMenu from "./ListeComposentsMenu";



export default function PopUpAjoutItem({open, handleClose, type, ajouter}){

    const [nom, setNom] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [quantite, setQuantite] = React.useState(0);


    const getLabelNom = () =>{
        if (type === "entrees"){
            return "Nom de l'entrée";
        }
        if (type === "plats"){
            return "Nom du plats";
        }
        if (type === "desserts"){
            return "Nom du dessert";
        }
        if (type === "boissons"){
            return "Nom de la boisson";
        }
    };

    const getTitre = () =>{
        if (type === "entrees"){
            return "Ajout d'une entrée";
        }
        if (type === "plats"){
            return  "Ajout d'un plat";
        }
        if (type === "desserts"){
            return  "Ajout d'un dessert";
        }
        if (type === "boissons"){
            return  "Ajout d'une boisson";
        }
    };

    const getVolumeIndic = () =>{
        if (type === "boissons"){
            return "cL";
        }else{
            return "g";
        }
    };
    const getVolumeLabel = () =>{
        if (type === "boissons"){
            return "Volume";
        }else{
            return "Quantité";
        }
    };


    return(
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{getTitre()}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>

                        <Grid item xs={8}>
                            <TextField
                                required
                                variant="outlined"
                                autoFocus
                                margin="dense"
                                name="nom"
                                id="nom"
                                label={getLabelNom()}
                                type="nom"
                                fullWidth
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                label={getVolumeLabel()}
                                name="quantite"
                                id="quantite"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">{getVolumeIndic()}</InputAdornment>,
                                }}
                                variant="outlined"
                                size="small"
                                value={quantite}
                                onChange={(e) => setQuantite(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                id="desc"
                                name="desc"
                                variant="outlined"
                                size="small"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />

                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Annuler
                    </Button>
                    <Button onClick={ajouter} color="primary">
                        Ajouter
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
