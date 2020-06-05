import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import ListeComposentMenu from "./ListeComposentsMenu";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));


export default function PageAjoutMenu({handleClose}) {

    const [listeEntrees, setListeEntrees] = React.useState([]);
    const [listePlats, setListePlats] = React.useState([]);
    const [listeDesserts, setListeDesserts] = React.useState([]);
    const [listeBoissons, setListeBoissons] = React.useState([]);

    const getListElements = (type) => {
        if (type === "entrees" && state.entrees){
            return <ListeComposentMenu listeCompo={listeEntrees} txtBtn="une entrée"/>
        }
        if (type === "plats" && state.plats){
            return <ListeComposentMenu listeCompo={listePlats} txtBtn="un plat"/>
        }
        if (type === "desserts" && state.desserts){
            return <ListeComposentMenu listeCompo={listeDesserts} txtBtn="un dessert"/>
        }
        if (type === "boissons" && state.boissons){
            return <ListeComposentMenu listeCompo={listeBoissons} txtBtn="une boisson"/>
        }
    };

    const classes = useStyles();

    const [state, setState] = React.useState({
        entrees: false,
        plats: false,
        desserts: false,
        boissons: false,
    });

    const [nomMenu, setNomMenu] = React.useState("");


    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Ajout d'un menu
                    </Typography>
                </Toolbar>
            </AppBar>

            <TextField
                required
                variant="outlined"
                autoFocus
                margin="dense"
                name="nom"
                id="nom"
                label="Nom du menu"
                type="nom"
                value={nomMenu}
                onChange={(e) => setNomMenu(e.target.value)}
            />

            <List>
                <ListItem>
                    <List>
                        <FormControlLabel
                            control={<Switch
                                checked={state.entrees}
                                onChange={handleChange}
                                name="entrees"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />}
                            label={<Typography variant="h5">Entrée</Typography>}/>

                        {getListElements("entrees")}
                    </List>
                </ListItem>
                <Divider />
                <ListItem>
                    <List>
                        <FormControlLabel
                            control={<Switch
                                checked={state.plats}
                                onChange={handleChange}
                                name="plats"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />}
                            label={<Typography variant="h5">Plat</Typography>}/>

                        {getListElements("plats")}
                    </List>
                </ListItem>
                <Divider />
                <ListItem>
                    <List>
                        <FormControlLabel
                            control={<Switch
                                checked={state.desserts}
                                onChange={handleChange}
                                name="desserts"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />}
                            label={<Typography variant="h5">Déssert</Typography>}/>

                        {getListElements("desserts")}
                    </List>
                </ListItem>
                <Divider />
                <ListItem>
                    <List>
                        <FormControlLabel
                            control={<Switch
                                checked={state.boissons}
                                onChange={handleChange}
                                name="boissons"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />}
                            label={<Typography variant="h5">Boisson</Typography>}/>

                        {getListElements("boissons")}
                    </List>
                </ListItem>
            </List>
        </>
    );
}
