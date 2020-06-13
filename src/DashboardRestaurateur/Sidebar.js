import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as firebase from "firebase";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CakeIcon from '@material-ui/icons/Cake';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import SendIcon from '@material-ui/icons/Send';
import { useHistory } from "react-router-dom";
import Information from "./info/Information";
import SpaIcon from '@material-ui/icons/Spa';
import Boisson from "./boissons/Boisson";
import Repas from "./Repas/Repas";
import ListeBoissons from "./boissons/ListeBoissons";
import ListeRepas from "./Repas/ListeRepas";
import Commande from "./commandes/Commande";
import {Copyright} from "../PiedDePage/PiedPage";
import PageMenu from "./menu/PageMenu";
import PopUpDeconnexion from "./PopupDeconnexion";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function texteAAfficher(id){
    let txt = ": ";

    switch (id) {
        case 0:
            txt+="Général";
            break;
        case 1:
            txt+="Vos commandes";
            break;
        case 2:
            txt+="Boissons";
            break;
        case 3:
            txt+="Entrées";
            break;
        case 4:
            txt+="Plats";
            break;
        case 5:
            txt+="Desserts";
            break;
        case 6:
            txt+="Menus";
            break;
        case 7:
            txt+="Informations";
            break;
        case 8:
            txt+="Déconnexion";
            break;
        case undefined:
            return "";
    }
    return txt;
}




function SideBar(props) {

    function recupererModule(id){
        let orto;
        switch(id){
            case 0:
                return <><Typography paragraph>
                    Bienvenue sur la page de gestion de votre restaurant.<br/><br/>
                    Vous trouverez à gauche les différentes catégories à remplir afin que vos clients puissent voir les services que vous proposez.<br/><br/>
                    La rubrique "informations" doit être remplie avant de pouvoir commencer à faire quoi que ce soit. <br/><br/>

                    Bon courage et prenez soin de vous ! ❤️
                </Typography>
                    <br/><br/><br/>
                <Copyright/>
                    </>
                break;
            case 1:
                return <Commande id={props.id}/>
            case 2:
                return <><Boisson id={props.id}/><br/><ListeBoissons id={props.id}/></>;
                break;
            case 3:
                 orto = ["entrée", "la", "ajoutée","une"];
                return <><Repas id={props.id} categoriee={"Entrée"} orthographe={orto}/><br/>
                        <ListeRepas
                            id={props.id}
                            categorie="Entrée"
                            texteAucuneQuantite={"aucune entrée"}
                            texteUnOuUne={"une"}
                        />

                        </>;
                break;
            case 4:
                 orto = ["repas", "le", "ajouté","un"];
                return <><Repas id={props.id} categoriee={"Déjeuné"} orthographe={orto}/><br/>
                        <ListeRepas
                            id={props.id}
                            categorie="Déjeuné"
                            texteAucuneQuantite={"aucun repas"}
                            texteUnOuUne={"un"}
                        />
                        </>;
                break;
            case 5:
                orto = ["dessert", "le", "ajouté","un"];
                return <><Repas id={props.id} categoriee={"Dessert"} orthographe={orto}/><br/>
                        <ListeRepas
                            id={props.id}
                            categorie="Dessert"
                            texteAucuneQuantite={"aucun dessert"}
                            texteUnOuUne={"un"}
                        />
                        </>;
                break;

            case 6:
                return <PageMenu idResto={props.id}/>;
                break;

            case 7:
                return <Information id={props.id}/>;
                break;
            case 8:
                return <PopUpDeconnexion id={props.id} />;
                break;
        }
    }

    const [restaurant, setRestaurant] = useState();


    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const history = useHistory();

    function changerOnglet(id,clickVal){
        history.push('/dashboard/'+id+'/'+clickVal);
    }

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <List>
                <ListItem button onClick={()=> changerOnglet(props.id,"commandes") }>
                    <ListItemIcon><SendIcon color={"secondary"}/></ListItemIcon>
                    <ListItemText primary="Mes commandes" />
                </ListItem>
            </List>
            <Divider />
            <List>
                    <ListItem button onClick={()=> changerOnglet(props.id,"boissons") }>
                    <ListItemIcon><LocalBarIcon/></ListItemIcon>
                    <ListItemText primary="Boissons" />
                    </ListItem>

                    <ListItem button onClick={()=> changerOnglet(props.id,"entrees") }>
                    <ListItemIcon><SpaIcon/></ListItemIcon>
                    <ListItemText primary="Entrées" />
                    </ListItem>

                    <ListItem button onClick={()=> changerOnglet(props.id,"repas") }>
                    <ListItemIcon><FastfoodIcon/></ListItemIcon>
                    <ListItemText primary="Plats" />
                    </ListItem >

                    <ListItem button onClick={()=> changerOnglet(props.id,"dessert") }>
                    <ListItemIcon><CakeIcon/></ListItemIcon>
                    <ListItemText primary="Desserts" />
                    </ListItem>

                    <ListItem button onClick={()=> changerOnglet(props.id,"menus") }>
                    <ListItemIcon><MenuBookIcon/></ListItemIcon>
                    <ListItemText primary="Menus" />
                    </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={()=> changerOnglet(props.id,"info") }>
                <ListItemIcon><InfoIcon/></ListItemIcon>
                <ListItemText primary="Informations" />
            </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={()=> changerOnglet(props.id,"deconnexion") }>
                    <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                    <ListItemText primary="Déconnexion" />
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            HELPORESTO - Gérer mon restaurant {texteAAfficher(props.type)}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {recupererModule(props.type)}

                </main>
            </div>
        );
}

SideBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default SideBar;
