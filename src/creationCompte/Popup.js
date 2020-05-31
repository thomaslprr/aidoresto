import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {useHistory} from "react-router";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogInscription({etat,changerEtat}) {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        changerEtat(0);
    };

    const history = useHistory();


    const connection = () => {
        history.push("/login");
    }


    if(etat==1){
        return (
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Erreur</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Impossible d'effectuer l'inscription, veuillez vérifier votre connection internet. <br/>
                        Réessayez, si le problème persiste contactez nous.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Fermer
                    </Button>

                </DialogActions>
            </Dialog>
        )
    }else{
        return(
            <Dialog
                open={true}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Succès</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Votre inscription en tant que restaurateur a été effectué avec succès !<br/>
                        N'attendez plus, connectez-vous et créez la carte de votre restaurant.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={connection} color="primary">
                        Se connecter
                    </Button>
                </DialogActions>
            </Dialog>
        )
    };

}
