import React, {useState} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from "@material-ui/core/Button";

const ListeComposentMenu = ({listeCompo, txtBtn}) => {

    const [listeComposent,setListeComposent] = useState(listeCompo);


    return (

        <List>
            <Button
                variant="outlined"
                color="primary"
                onClick={()=>{ }}
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


    );


};

export default ListeComposentMenu;
