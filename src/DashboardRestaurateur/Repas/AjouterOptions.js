import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const AjouterOptions = () =>{

    const [tabOptions, setTabOptions] = useState([]);




    const handleChangeOption = () => {

        let option = {nomOption:"",prixOption:""}
        setTabOptions([...tabOptions,option]);


    };

    const handleChangeNomOption = (event,indice) => {
        console.log("voici l'event "+event);
        let tabActuel = [];
        tabActuel = tabOptions;
        tabActuel[indice] = {nomOption:event,prixOption:""};

        setTabOptions(tabActuel);
    };

    const handleChangePrixOption = (event,indice) => {

        let tabActuel = tabOptions;

        tabActuel[indice].prixOption = event.target.value;

        setTabOptions(tabActuel);
    };

    const afficherLesChamps = () => {

        var rows = [];
        for (let i = 0; i < tabOptions.length; i++) {
            // note: we add a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            rows.push(<div key={i}>
                <Grid item xs={12}>
                <TextField
                    required
                    variant="outlined"
                    autoFocus
                    placeholder="Petite"
                    margin="dense"
                    name="nom_option"
                    id="nom_option"
                    label={"Nom de l'option"}
                    type="nom"
                    fullWidth
                    value={tabOptions[i].nomOption}
                    onChange={(e) => handleChangeNomOption(e.target.value,i)}
                />
            </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        variant="outlined"
                        autoFocus
                        placeholder="Petite"
                        margin="dense"
                        name="prix_option"
                        id="prix_option"
                        label={"Prix de l'option"}
                        type="nom"
                        fullWidth
                        value={tabOptions[i].prixOption}
                        onChange={(e) => handleChangePrixOption(e,i)}
                    />
                </Grid>
            </div>);
        }
        return <>{rows}</>;





    };



    return (
        <div>
            <Button color="primary" onClick={handleChangeOption}>Ajouter une option</Button>
            {afficherLesChamps()}
        </div>
    )




};

export default AjouterOptions;
