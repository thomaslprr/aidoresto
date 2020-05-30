import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../index.js";
import { AuthContext } from "./Auth.js";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const LoginClient = ({ history }) => {


    const [openDialog, setOpenDialog] = React.useState(false);
    const [infoPopUp, setInfoPopUp] = React.useState({
        titre: "",
        desc: "",
        valid: false,
    });
    const [docId, setDocId] = React.useState("");

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const allerPageResto = () => {
        history.push("/restaurant/"+docId);
    }

    const getBoutonValid = () => {
      return infoPopUp.valid ?
          <Button onClick={allerPageResto} color="primary" autoFocus>
            Oui
          </Button> : null
    };

    const handleLoginClient = useCallback(
        async event => {
            event.preventDefault();
            const { code_resto } = event.target.elements;
            const adresse = "/dashboard/"+code_resto.value;

            console.log(code_resto.value);

            var res = false;
            var result;

            await firebase.firestore().collection("restaurant").where("code_resto", "==", code_resto.value)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        res = true;
                        result = doc.data();
                        setDocId(doc.id);
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });

            if(res){
                console.log(docId);
                setInfoPopUp({
                    titre: result.nom+", "+result.adresse.ville,
                    desc: "Voulez vous consultez la carte de ce restaurant ?",
                    valid: true
                });

            }else{
                console.log("pas de résultat");
                setInfoPopUp({
                    titre: "Impossible de trouver le restaurant",
                    desc: "Ce code ne correspond à aucun restaurant",
                    valid: false
                });
            }
            handleClickOpen();

        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    /**
     if (currentUser) {
        return <Redirect to="/" />;
    }*/

    const CHARACTER_LIMIT = 4;
    const [codeResto, setCodeResto] = React.useState("");

    const handleChange = (event) => {
        setCodeResto(event.target.value.toUpperCase());
    };

    const classes = useStyles();

    return (
        <>
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Passer une commande
                        </Typography>
                        <form className={classes.form} onSubmit={handleLoginClient}>
                            <TextField
                                value={codeResto}
                                variant="outlined"
                                margin="normal"
                                inputProps={{
                                    maxLength: CHARACTER_LIMIT
                                }}
                                helperText={`${codeResto.length}/${CHARACTER_LIMIT}`}
                                onChange={handleChange}
                                required
                                fullWidth
                                id="code_resto"
                                label="Code restaurant"
                                name="code_resto"
                                autoComplete="email"
                                autoFocus
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Accéder au restaurant
                            </Button>

                            <Box mt={4}>
                                <Link href="/signup">
                                    <Button
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        className={classes.submit}
                                    >
                                        Je suis un restaurateur
                                    </Button>
                                </Link>
                            </Box>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>

            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">{infoPopUp.titre}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {infoPopUp.desc}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Retour
                    </Button>

                    {getBoutonValid()}

                </DialogActions>
            </Dialog>
        </>
    );
};

export default withRouter(LoginClient);
