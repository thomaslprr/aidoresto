import React, {useState} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from "@material-ui/core/Button";
import {element} from "prop-types";
import PopUpAjoutItem from "./PopUpAjoutItem";

const ListeComposentMenu = ({listeCompo, type, txtBtn, setListElements}) => {

    const [listeComposent,setListeComposent] = useState(listeCompo);
    const [popUpAjout,setPopUpAjout] = useState(false);


    const ajoutElement = (element) =>{

        setPopUpAjout(false);
        setListElements(type, listeCompo.concat(element));

    };

    return (

        <>
            <List>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={()=>{ setPopUpAjout(true) }}
                    startIcon={<AddCircleOutlineIcon/>}
                >
                    Ajouter {txtBtn}
                </Button>

                <ListItem>
                    test
                </ListItem><ListItem>
                    test
                </ListItem><ListItem>
                    test
                </ListItem>
                {listeCompo.map((element) =>
                    <ListItem>
                        <ListItemText
                            primary={element.nom+"  -  "+element.quantite}
                            secondary='la description'
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )}
            </List>

            <PopUpAjoutItem type={type} open={popUpAjout} handleClose={() => setPopUpAjout(false)}/>

        </>

    );


};

export default ListeComposentMenu;
