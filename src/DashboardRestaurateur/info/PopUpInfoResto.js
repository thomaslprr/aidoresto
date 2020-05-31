import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Typography from "@material-ui/core/Typography";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({id,setAffichage}) {


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
                <DialogTitle id="alert-dialog-slide-title">Code restaurant</DialogTitle>
                <DialogContent>
                    <Typography variant="h3" gutterBottom>
                        {id}
                    </Typography>
                    <DialogContentText id="alert-dialog-slide-description">
                        Voici votre code restaurant ! <br/> Donner ce code à vos clients et ils pourront accéder à votre carte et commander dans votre restaurant depuis leur téléphone. <br/>
                        Pensez à enregistrer des plats et boissons.<br/>
                        Le code est composé de 4 caractères : chiffres et lettres en majuscules.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  color="primary" onClick={()=>setAffichage(false)}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
