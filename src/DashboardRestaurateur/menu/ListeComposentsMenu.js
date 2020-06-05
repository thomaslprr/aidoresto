import React, {useState} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "../../utils/ColoredButtons/GreenButton";

const ListeComposentMenu = ({listeCompo, txtBtn}) => {

    const [listeComposent,setListeComposent] = useState(listeCompo);


    return (
        <div>
            <Button>
                Ajouter {txtBtn}
            </Button>
            <List>
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
        </div>

    );


};

export default ListeComposentMenu;
