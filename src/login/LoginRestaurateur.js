import React, {useCallback, useState} from "react";
import { withRouter } from "react-router";
import Background from '../image/resto1.jpg';
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
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AlertDialogInscription from "../creationCompte/Popup";
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import {Copyright} from "../PiedDePage/PiedPage";
import {auth} from 'firebase/app';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${Background})`,
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
    },
}));


const LoginRestaurateur = ({ history }) => {

    const [showModal,setShowModal] = useState(0);


    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await auth()
                    .signInWithEmailAndPassword(email.value, password.value).then((result) => {
                        const user = result.user;
                        sessionStorage.setItem('isConnected',true);
                        window.sessionStorage.setItem('idResto',user.uid)
                        setShowModal(2);
                        history.push("/dashboard/"+user.uid);

                    });
            } catch (error) {
                console.log(error);
                setShowModal(1);
            }
        },
        [history]
    );

    /**
    if (currentUser) {
        return <Redirect to="/" />;
    }*/

    const classes = useStyles();
    const msgErreur = <>Impossible de se connecter !<br/>• Vérifiez votre connection internet <br/> • Assurez-vous que l'adresse mail saisie et le mot de passe soient corrects</>
    const afficherModale = ()=> {
        if(showModal===1){
            return  <AlertDialogInscription etat={1} changerEtat={setShowModal} msgErreur={msgErreur}/>


        }
    }

    return (
        <>
            {afficherModale()}
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <RestaurantMenuIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Se connecter en tant que restaurateur
                    </Typography>
                    <form className={classes.form} onSubmit={handleLogin}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Adresse mail"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Se souvenir de moi"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Se connecter
                        </Button>
                        <Grid container>
                            <Grid item xs>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    <Typography variant="subtitle1">Vous n'avez pas de compte restaurateur ? S'inscrire</Typography>
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={4}>
                            <Link href="/">
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                            >
                                Je souhaite passer une commande
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
            </>
    );
};

export default withRouter(LoginRestaurateur);
