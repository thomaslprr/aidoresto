import React, {useEffect} from "react";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



const SelectCategorieBoisson = ({filtre,changerFiltre}) => {

    const [categorie, setCategorie] = React.useState('');

    const handleChange = (event) => {
        let cat = event.target.value;
        changerFiltre(cat);

        setCategorie(cat);
    };

    useEffect(()=>{

       setCategorie(filtre);

    },filtre);

    return (
        <div>

            <FormControl variant="outlined" fullWidth={true}>
                <InputLabel id="demo-simple-select-outlined-label">Catégorie</InputLabel>
                <Select
                    labelId="categorie_boisson"
                    id="categorie_boisson"
                    value={categorie}
                    onChange={handleChange}
                    label="Catégorie"
                    style={{width:65+'vw'}}
                >
                    <MenuItem value="">
                        Tout
                    </MenuItem>
                    <MenuItem value="Boisson fraîche">Boisson fraîche</MenuItem>
                    <MenuItem value="Boisson chaude">Boisson chaude</MenuItem>
                    <MenuItem value="Cocktail avec alcool">Cocktail avec alcool</MenuItem>
                    <MenuItem value="Cocktail sans alcool">Cocktail sans alcool</MenuItem>
                    <MenuItem value="Alcool">Alcool</MenuItem>
                </Select>
            </FormControl>
        </div>
    )



};

export default  SelectCategorieBoisson;
