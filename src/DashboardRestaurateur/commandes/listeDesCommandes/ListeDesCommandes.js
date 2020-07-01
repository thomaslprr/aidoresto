import React, {useEffect, useState, forwardRef} from 'react';
import * as firebase from "firebase";
import PulseLoader from "react-spinners/PulseLoader";
import MaterialTable from 'material-table';
import '@material-ui/icons';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import VisibilityIcon from '@material-ui/icons/Visibility';
import {useHistory} from "react-router";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function ListeDesCommandes({idResto}){

    const [commandes, setCommandes] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        { title: 'Nom', field: 'name' },
        { title: 'Couverts', field: 'couverts' },
        { title: 'Date de la commande', field: 'date'},
        { title: 'Prix', field: 'prix', type: 'numeric'},
        { title: 'Etat', field: 'etat'},
    ];

    const history = useHistory();

    useEffect(()=>{

        firebase.firestore().collection("restaurant").doc(idResto).collection("commandes").orderBy("date", "desc")
            .onSnapshot(function(querySnapshot) {

                setCommandes([]);
                setLoading(false);

                querySnapshot.forEach(function(doc) {

                    let donnee = doc.data();

                    let commande = {
                        id: doc.id,
                        name: donnee.nom,
                        couverts: donnee.nombreCouverts,
                        date: new Date(donnee.date.seconds * 1000).toLocaleString(),
                        nom: donnee.nom,
                        prix: donnee.prixTotal,
                        etat: donnee.etat || '',
                    };

                    setCommandes(listeCommande => listeCommande.concat(commande));

                });
            });

    },[]);

    if (loading){
        return(
            <div
                style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            >

                <PulseLoader loading={true} color={"#1f62b9"} size={20}/>

            </div>
        )
    }else{
        return(
            <>
                <MaterialTable
                    icons={tableIcons}
                    title="Liste des commandes"
                    columns={columns}
                    data={commandes}
                    actions={[
                        {
                            icon: () => <VisibilityIcon />,
                            tooltip: 'Consulter',
                            onClick: (event, rowData) =>{history.push("/dashboard/"+idResto+"/commandes/"+rowData.id);},
                        }
                    ]}
                    options={{
                        actionsColumnIndex: -1
                    }}
                />
            </>
        )
    }

}

export default ListeDesCommandes;
