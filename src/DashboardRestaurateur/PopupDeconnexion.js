import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import {useHistory} from "react-router";



const PopUpDeconnexion = ({id}) => {

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });



    const history = useHistory();

    const deconnection = () => {


            if(sessionStorage.getItem('isConnected')){
                window.sessionStorage.removeItem('isConnected');
                window.sessionStorage.removeItem('idResto');
                history.push("/login");
            }else{
                history.push("/login");
            }

    };

    return (

        <div>
            <Dialog
                open={true}
                onClose={()=>console.log("")}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Êtes-vous sûr(e) de vouloir vous déconnecter ?</DialogTitle>
                <DialogActions>
                    <Button  color="primary" onClick={()=> history.push("/dashboard/"+sessionStorage.getItem('idResto'))}>
                        Annuler
                    </Button>
                    <Button  color="secondary" onClick={()=>deconnection()}>
                        Se déconnecter
                    </Button>
                </DialogActions>
            </Dialog>
        </div>


    )



}
export default PopUpDeconnexion;
