import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import MentionsLegales from "./MentionsLegales";

const PopUpMentionLegale = ({setOpenn}) => {
    const [scroll, setScroll] = React.useState('paper');

    const descriptionElementRef = React.useRef(null);


    return (
        <div>
            <Dialog
                open={true}
                onClose={()=>setOpenn(false)}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Mentions légales</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <MentionsLegales/>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setOpenn(false)} color="primary">
                        Fermer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default PopUpMentionLegale;
