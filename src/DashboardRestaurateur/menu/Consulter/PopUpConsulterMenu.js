import React from 'react';
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";




export default function PopUpConsulter({menu, open, handleClose}){


    return(
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    <Typography variant="h5" component="h2">
                        {menu.nom} -  {menu.prix} €
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h6" component="h2">
                        Entrées
                    </Typography>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Fermer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
