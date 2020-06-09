import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import VisibilityIcon from '@material-ui/icons/Visibility';
import PopUpConsulterMenu from "../DashboardRestaurateur/menu/Consulter/PopUpConsulterMenu";


const useStyles = makeStyles({
    root: {
        minWidth: 250,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function MenuCard({menu}) {

    const classes = useStyles();

    const [openAfficher, setOpenAfficher] = React.useState(false);

    const fermerPopUp = () => {
        setOpenAfficher(false);
    };

    return (

        <>
            <Card className={classes.root}>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={10}>
                            <Typography variant="h5" component="h2">
                                {menu.nom}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} alignContent="center">
                            <Button color="primary" onClick={() => {setOpenAfficher(true);}}>
                                <VisibilityIcon/>
                            </Button>
                        </Grid>
                    </Grid>
                    <Typography className={classes.pos} color="textSecondary">
                        {menu.prix} €
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={()=>{}}>Ajouter</Button>
                </CardActions>
            </Card>

            <PopUpConsulterMenu open={openAfficher} menu={menu} handleClose={fermerPopUp} />

        </>
    );
}