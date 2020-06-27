import React, {useEffect} from "react";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



const SelectCategorieRepas = ({filtre,changerFiltre}) => {

    const [categorie, setCategorie] = React.useState('');

    const handleChange = (event) => {
        let cat = event.target.value;
        changerFiltre(cat);

        setCategorie(cat);
    };

    useEffect(()=>{

        setCategorie(filtre);

    },[]);

    return (
        <div>

            <FormControl variant="outlined" fullWidth={true}>
                <InputLabel id="demo-simple-select-outlined-label">Catégorie</InputLabel>
                <Select
                    labelId="categorie_repas"
                    id="categorie_repas"
                    value={categorie}
                    onChange={handleChange}
                    label="Catégorie"
                    style={{width:65+'vw'}}
                >
                    <MenuItem value="">
                        Tout
                    </MenuItem>
                    <MenuItem value="Viande">Viande</MenuItem>
                    <MenuItem value="Poisson">Poisson</MenuItem>
                    <MenuItem value="Pizza">Pizza</MenuItem>
                    <MenuItem value="Salade">Salade</MenuItem>
                    <MenuItem value="Hamburger">Hamburger</MenuItem>
                    <MenuItem value="Pâtes">Pâtes</MenuItem>
                    <MenuItem value="Autre">Autre</MenuItem>
                </Select>
            </FormControl>
        </div>
    )



};

export default  SelectCategorieRepas;
