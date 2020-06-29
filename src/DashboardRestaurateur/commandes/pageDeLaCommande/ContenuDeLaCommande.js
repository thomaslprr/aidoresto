import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";

function ContenuDeLaCommande({ commande }){

        return(
            <>
                <List>
                    { commande.listeItems.map((item) => (
                        <ListItem>
                            <ListItemIcon>

                            </ListItemIcon>
                            {item.nom}
                        </ListItem>
                    ))}
                </List>
            </>
        )

}

export default ContenuDeLaCommande;
