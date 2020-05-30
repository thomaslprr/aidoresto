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
import SendIcon from '@material-ui/icons/Send';

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



function SideBar(props) {

    const [restaurant, setRestaurant] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        console.log("data : "+props.id);

        const restaurantRef = firebase.firestore().collection("restaurant").doc(props.id);

        restaurantRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setRestaurant(doc.data());
                setLoading(false);


            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    },[]);

    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <List>
                <ListItem button>
                    <ListItemIcon><SendIcon color={"secondary"}/></ListItemIcon>
                    <ListItemText primary="Vos commandes" />
                </ListItem>
            </List>
            <Divider />
            <List>
                    <ListItem button>
                    <ListItemIcon><LocalBarIcon/></ListItemIcon>
                    <ListItemText primary="Boissons" />
                    </ListItem>

                    <ListItem button>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary="Entrées" />
                    </ListItem>

                    <ListItem button>
                    <ListItemIcon><FastfoodIcon/></ListItemIcon>
                    <ListItemText primary="Repas" />
                    </ListItem >

                    <ListItem button>
                    <ListItemIcon><CakeIcon/></ListItemIcon>
                    <ListItemText primary="Dessert" />
                    </ListItem>

                    <ListItem button>
                    <ListItemIcon><MenuBookIcon/></ListItemIcon>
                    <ListItemText primary="Menus" />
                    </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button>
                <ListItemIcon><InfoIcon/></ListItemIcon>
                <ListItemText primary="Informations" />
            </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    if(!loading){
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
                            HELPORESTO - Gérer mon restaurant
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
                    <Typography paragraph>
                        Bienvenue sur la page de gestion de votre restaurant.<br/><br/>
                        Vous trouverez à gauche les différentes catégories à remplir afin que vos clients puissent voir les services que vous proposez.<br/><br/>
                        La rubrique "informations" doit être remplie avant de pouvoir commencer à faire quoi que ce soit. <br/><br/>

                        Bon courage et prenez soin de vous ! ❤️
                    </Typography>
                </main>
            </div>
        );
    }else{
            return <div>Chargement...</div>
    }
}

SideBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default SideBar;
