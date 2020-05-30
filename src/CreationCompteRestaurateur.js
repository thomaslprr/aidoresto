import React, {useCallback} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {withRouter} from "react-router";
import app from "./index";
import firebase from "firebase";
import UserStore from "./stores/UserStore";


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

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUp = ({ history }) => {

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    const generationId = () => {
        const listeChar = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"];
        var id = "";

        for(var i = 0; i < 4; i++){
            id += listeChar[getRandomInt(listeChar.length)];
        }
        console.log(id);
        return id;
    }

    const verifIdLibre = async (id) =>{
        var dispo = true;
        await firebase.firestore().collection("restaurant").where("code_resto", "==", id)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    dispo = false;
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        return dispo;
    }

    const creationCompteFirebase = async (idUser) => {

        //Genreation ID
        var idOk = false;
        var id;

        while(!idOk){
            id = generationId();
            idOk = await verifIdLibre(id);
        }

        console.log("Id final : "+id);
        //Creation Profil vide avec ID

        firebase.firestore().collection("restaurant").doc(idUser).set({
            adresse: {
                code_postal: "",
                pays: "",
                rue: "",
                ville: ""
            },
            code_resto: id,
            nom: "",
            telephone: ""
        });

    }

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value).then((result) => {
                        const user = result.user;
                        creationCompteFirebase(user.uid);
                    });
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);


    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Créer mon compte restaurateur
                </Typography>
                <form className={classes.form} onSubmit={handleSignUp}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Adresse mail"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Mot de passe"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Valider
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                J'ai déjà un compte restaurateur : se connecter
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
export default withRouter(SignUp);
