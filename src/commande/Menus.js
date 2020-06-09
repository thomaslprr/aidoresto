import React from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import MenuCard from "./MenuCard";
import PageChoixMenu from "./PageChoixMenu";

const useStyles = makeStyles({
    liste: {
        marginTop: "1rem",
    },
});

export default function Menus({listeMenus, setCountPanier}) {

    const classes = useStyles();

    //creation du menu
    const [openAjout, setOpenAjout] = React.useState(false);
    const [menuChoisit, setMenuChoisit] = React.useState({});

    const ouvrirPageAjout = (menu) => {
        setMenuChoisit(menu);
        setOpenAjout(true);
    };

    const fermerPageAjout = () => {
        setMenuChoisit({});
        setOpenAjout(false);
        setCountPanier();
    };

    const GetContent = () => {
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
                                  ouvrirChoix={ouvrirPageAjout}
                              />
                          </Grid>
                      )}
                  </Grid>
                  <PageChoixMenu
                      open={openAjout}
                      handleClose={fermerPageAjout}
                      menu={menuChoisit}
                  />
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