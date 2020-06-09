import React from 'react';
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";



export default function PopUpConsulter({menu, open, handleClose}){

    const ListeElements = ({liste, nomElement}) => {
        if (liste.length === 0){
            return (
               <>
               </>
            );
        }else {
           return (
               <>
                   <Typography variant="h6" component="h2">
                       {nomElement}
                   </Typography>
                   <List>
                   {liste.map((item) =>
                       <ListItem>
                           {item.nom}
                       </ListItem>
                   )}
                   </List>
                   <Divider/>
               </>
           );
        }
    };

    return(
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    <Typography variant="h5" component="h2">
                        {menu.nom} -  {menu.prix} €
                    </Typography>
                </DialogTitle>
                <DialogContent>

                    <ListeElements liste={menu.entrees} nomElement="Entrées"/>

                    <ListeElements liste={menu.plats} nomElement="Plats"/>

                    <ListeElements liste={menu.desserts} nomElement="Desserts"/>

                    <ListeElements liste={menu.boissons} nomElement="Boissons"/>

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
