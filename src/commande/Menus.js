import React from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import MenuCard from "./MenuCard";

const useStyles = makeStyles({
    liste: {
        marginTop: "1rem",
    },
});

export default function Menus({listeMenus}) {

    const classes = useStyles();

    var GetContent = () => {
        if (listeMenus === null || listeMenus.length === 0){
            return (
              <Typography variant="h5">
                  Le restaurant n'affiche aucun menu.
              </Typography>
            );
        }else {
            return (
              <>
                  <Grid container spacing={3} className={classes.liste}>

                      {listeMenus.map((menu) =>
                          <Grid item xs key={menu.id}>
                              <MenuCard
                                  menu={menu}
                              />
                          </Grid>
                      )}
                  </Grid>
              </>
            );
        }
    };

    return (

        <>
            <GetContent/>
        </>

    );
}