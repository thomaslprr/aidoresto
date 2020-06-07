import React from 'react';
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";



export default function PopUpConsulter({menu, open, handleClose}){

    const ListeElements = ({liste, textElement}) => {
        if (liste.length === 0){
            return (
                "Il n'y a "+textElement+" proposé dans ce menu."
            )
        }else {
           return (
               <List>
               {liste.map((item) =>
                   <ListItem>
                       {item.nom}
                   </ListItem>
               )}
               </List>
           );
        }
    };

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
                    <ListeElements liste={menu.entrees} textElement="aucune entrée"/>
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
