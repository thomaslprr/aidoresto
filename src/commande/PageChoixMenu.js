import React from 'react';
import { Typography, Box } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MenuCard from "./MenuCard";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    button: {
        margin: "auto"
    },
    indication: {
        marginTop: "1em"
    },
    itemsSelect: {
        margin:"1em",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
    },
}));



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const PageChoixMenu = ({menu, handleClose, open}) => {

    const classes = useStyles();

    const getStatutBtn = () => {
        return false;
    };

    const [selectedEntree, setSelectedEntree] = React.useState("");
    const [selectedPlat, setSelectedPlat] = React.useState("");
    const [selectedDessert, setSelectedDessert] = React.useState("");
    const [selectedBoisson, setSelectedBoisson] = React.useState("");

    const Selecteur = ({nom, val, handleChange, texte, listeItem}) =>{
      return (
          <>
              <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id={"item-selector-"+nom}>{nom}</InputLabel>
                  <Select
                      labelId={"item-selector-"+nom}
                      id={"select-"+nom}
                      value={val}
                      onChange={handleChange}
                  >

                      {listeItem.map((item) =>
                          <MenuItem value={item.nom+item.desc+item.quantite}>
                              {item.nom}
                          </MenuItem>
                      )}

                  </Select>
              </FormControl>
          </>
      );
    };

    return (
        <>

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>

                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {menu.nom} - {menu.prix} €
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Typography variant="h6" align="center" className={classes.indication}>
                    Choisissez le contenu de votre menu
                </Typography>

                <Box>

                    <Selecteur
                        nom="Entrée"
                        texte="une entrée"
                        val={selectedEntree}
                        handleChange={(event) => {
                            setSelectedEntree(event.target.value);
                        }}
                        listeItem={menu.entrees}
                    />

                </Box>


                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<NavigateNextIcon/>}
                    onClick={()=>{ }}
                    disabled={getStatutBtn}
                >
                    Ajouter le menu à la commande
                </Button>

            </Dialog>

        </>
    )
};

export default PageChoixMenu
