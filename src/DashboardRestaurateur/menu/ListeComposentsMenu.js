import React, {useState} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from "@material-ui/core/Button";
import PopUpAjoutItem from "./PopUpAjoutItem";

const ListeComposentMenu = ({listeCompo, type, txtBtn, setListElements}) => {


    const [popUpAjout,setPopUpAjout] = useState(false);

    function arrayRemove(arr, item) {
        return arr.filter(function(ele){ return (ele.nom !== item.nom || ele.desc !== item.desc || ele.quantite !== item.quantite); });
    }

    const removeElement = (element) =>{
        let liste = arrayRemove(listeCompo, element);
        setListElements(type, liste);
    }


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

                {listeCompo.map((element) =>
                    <ListItem>
                        <ListItemText
                            primary={element.nom+"  -  "+element.quantite}
                            secondary={element.desc}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={()=> removeElement(element)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )}
            </List>

            <PopUpAjoutItem type={type} open={popUpAjout} handleClose={() => setPopUpAjout(false)} ajouter={ajoutElement}/>

        </>

    );


};

export default ListeComposentMenu;
