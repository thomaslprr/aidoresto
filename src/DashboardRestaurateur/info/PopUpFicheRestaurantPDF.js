import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogPDF({setAffichage,boutonTelecharger}) {


    return (
        <div>
            <Dialog
                open={true}
                onClose={()=>setAffichage(false)}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Fiche restaurant</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        N'attendez pas et téléchargez votre fiche restaurant ! <br/><br/>
                        La fiche restaurant est une fiche prête à l'utilisation, il n'y a plus qu'à l'imprimer et l'afficher. <br/><br/>
                        Cette fiche contient toutes les informations qui permettront de connecter vos clients avec votre restaurant.<br/>
                        Elle contient un QR Code permettant d'accéder à votre restaurant, un code à 4 chiffres qui permet d'y accéder également et une
                        mise en page déjà faîte au nom de votre restaurant. <br/><br/>
                        Affichez-la sur vos chevalets de table, au comptoir et partout où vous aurez besoin.<br/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  color="primary" onClick={()=>setAffichage(false)}>
                        Annuler
                    </Button>
                    {boutonTelecharger}
                </DialogActions>
            </Dialog>
        </div>
    );
}
