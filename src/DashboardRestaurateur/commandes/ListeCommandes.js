import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


function Row({laCom}) {

    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    const getTime = (date) =>{
        var heure = "";

        heure += date.getHours()+":";

        if (heure.length === 2){
            heure = "0"+heure;
        }

        var min = " "+date.getMinutes();

        if (min.length === 2){
            heure += "0"+date.getMinutes();
        }else {
            heure += date.getMinutes();
        }

        return heure;

    }

    return (
        <div>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {laCom.nom}
                </TableCell>
                <TableCell align="right">{laCom.numTable}</TableCell>
                <TableCell align="right">{laCom.nombreCouverts}</TableCell>
                <TableCell align="right">{getTime(laCom.date)}</TableCell>
                <TableCell align="right">{laCom.prixTotal}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Commande
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Plat</TableCell>
                                        <TableCell align="right">Quantité</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {laCom.liste.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell component="th" scope="row">
                                                {item.nom}
                                            </TableCell>
                                            <TableCell align="right">{item.quantite}</TableCell>
                                            <TableCell align="right">
                                                {item.prix}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </div>
    );
}



function createData(nom, numTable, nombreCouvert, dateCommande, prixTotal, etat) {
    return {
        nom,
        numTable,
        nombreCouvert,
        dateCommande,
        prixTotal,
        etat,
        history: [
            { date: '2020-01-05', customerId: '11091700', amount: 3 },
            { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
        ],
    };
}

export default function ListeCommandes({commandes}) {

    const [commande,setCommande] = useState([]);

    useEffect(()=>{

        setCommande(commandes);

    },[commandes]);


    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Nom</TableCell>
                        <TableCell align="right">Table</TableCell>
                        <TableCell align="right">Couvert</TableCell>
                        <TableCell align="right">Heure</TableCell>
                        <TableCell align="right">Prix</TableCell>
                        <TableCell align="right">Etat</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { commande.map((row) => (
                        <Row laCom={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
