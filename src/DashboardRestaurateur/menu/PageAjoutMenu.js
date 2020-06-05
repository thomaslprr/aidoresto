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

    const classes = useStyles();

    const [state, setState] = React.useState({
        entrees: false,
        plats: false,
        desserts: false,
        boissons: false,
    });


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

            <List>
                <ListItem>
                    <Typography variant="h5">Entrée</Typography>
                    <Switch
                        checked={state.entrees}
                        onChange={handleChange}
                        name="entrees"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <Typography variant="h5">Plat</Typography>
                    <Switch
                        checked={state.plats}
                        onChange={handleChange}
                        name="plats"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </ListItem>
            </List>
        </>
    );
}
