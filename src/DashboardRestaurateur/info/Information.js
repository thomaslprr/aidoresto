import React, {useEffect, useState} from 'react';
import * as firebase from "firebase";
import Typography from "@material-ui/core/Typography";
import AlerteInfoPasRempli from "./AlerteInfoPasRempli";
import RemplirInfo from "./RemplirInfo";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';


const Information = ({id}) => {

    const [restaurantInfo,setRestaurantInfo]=useState("");
    const [loading, setLoading] = useState(true);
    const [rempli,setRempli] = useState(false);

    const [affichage, setAffichage] = useState(false);


    useEffect(()=>{
        console.log("data : "+id);

        const restaurantRef = firebase.firestore().collection("restaurant").doc(id);

        restaurantRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setRestaurantInfo(doc.data());
                setLoading(false);
                if(doc.data().nom!=""){
                    setRempli(true);
                }



            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    },[]);

    function ouvrirPageModif(){
        setAffichage(true);
    }
    function affichageBoutton(etape,texte){

            if(etape==1){
                if(affichage){
                    return <div>
                            <AlerteInfoPasRempli/>
                            <RemplirInfo id={id} donnee={restaurantInfo} affichage={affichage}/>
                        </div>
                }else{
                    return <div>
                        <AlerteInfoPasRempli/>
                        <RemplirInfo id={id} donnee={restaurantInfo} affichage={affichage}/>
                        <Button color="primary" onClick={ouvrirPageModif}>Compléter les informations de mon restaurant</Button>
                    </div>
                }

            }else{
                if(affichage){
                    return      <RemplirInfo id={id} donnee={restaurantInfo} affichage={affichage}  />

                }
                return <div><Typography variant="h2" gutterBottom>{restaurantInfo.nom}</Typography>
                    <Typography variant="h4" gutterBottom>{restaurantInfo.adresse.rue}, {restaurantInfo.adresse.ville} {restaurantInfo.adresse.code_postal}</Typography>
                    <Typography variant="h5" gutterBottom>{restaurantInfo.telephone}</Typography>
                    <Typography variant="h5" gutterBottom>Votre code restaurant

                        <Chip label= {restaurantInfo.code_resto} color="primary" icon={<RestaurantMenuIcon />} clickable/>

                    </Typography>
                    <Button color="primary" onClick={ouvrirPageModif}>Modifier les informations de mon restaurant</Button>
                    <RemplirInfo id={id} donnee={restaurantInfo} affichage={affichage}  /></div>
            }


    }

    if(!loading){
        if(!rempli){
            return(
                <div>
                    {affichageBoutton(1,"Compléter")}
                </div>
            );
        }else{
            return(
                <div>

                    {affichageBoutton(2,"Modifier")}
                </div>
            );
        }

    }else{
        return(
            <div>Chargement...</div>
        )
    }
};

export default Information;
