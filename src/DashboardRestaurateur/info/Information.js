import React, {useEffect, useState} from 'react';
import * as firebase from "firebase";
import Typography from "@material-ui/core/Typography";
import AlerteInfoPasRempli from "./AlerteInfoPasRempli";
import RemplirInfo from "./RemplirInfo";
import Button from "@material-ui/core/Button";
import PopUpInfoResto from "./PopUpInfoResto";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import {makeStyles} from "@material-ui/styles";
import QRCode from 'qrcode.react';
import {BlobProvider, PDFDownloadLink} from "@react-pdf/renderer";
import PDFResto from "./PDFResto";
import PopUpFicheRestaurantPDF from "./PopUpFicheRestaurantPDF";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
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

const Information = ({id}) => {

    const [restaurantInfo,setRestaurantInfo]=useState("");
    const [loading, setLoading] = useState(true);
    const [rempli,setRempli] = useState(false);

    const classes = useStyles();

    const [affichage, setAffichage] = useState(false);

    const [adresse,setAdresse] = useState("");

    const [qrcode_adresse,setQrcode_adresse] = useState();



    useEffect(()=>{

        setTimeout(() => {getData(); }, 300);

    },[]);


    const getData = () => {
        const restaurantRef = firebase.firestore().collection("restaurant").doc(id);

        restaurantRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setRestaurantInfo(doc.data());
                setLoading(false);
                if(doc.data().nom!=""){
                    setRempli(true);
                    setAdresse(doc.data().adresse.rue+", "+doc.data().adresse.ville+" "+doc.data().adresse.code_postal);
                }

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
            setTimeout(() => {getData(); }, 300);
        });
    };

    const [afficherCode,setAfficherCode] = useState(false);

    const openCodeResto = () => {

        if(afficherCode){
            return <PopUpInfoResto id={restaurantInfo.code_resto} setAffichage={setAfficherCode}/>
        }else{
            return <div></div>
        }

    };

    const openModifInfo = () => {
        if(affichage){
            return  <RemplirInfo id={id} donnee={restaurantInfo} setAffichage={setAffichage} />
        }else{
            return <div></div>
        }

    }

    const [afficherQrCode, setAfficherQrCode] = useState(false);

    const downloadQR = () => {
        const canvas = document.getElementById(id);
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");

        let downloadLink = document.createElement(<PDFDownloadLink document={PDFResto(restaurantInfo.nom,adresse,pngUrl,restaurantInfo.code_resto)} fileName="somename.pdf">
            {({ blob, url, loading, error }) => {
                return ("Clique");
            }}
        </PDFDownloadLink>);
        //downloadLink.href = pngUrl;
        //downloadLink.download = "QR Code "+restaurantInfo.nom+".png";
        //document.body.appendChild(downloadLink);
        //downloadLink.click();
        //document.body.removeChild(downloadLink);
    };

    const afficherBoutton= () => {
        if(afficherQrCode){
            const canvas = document.getElementById(id);
            const pngUrl = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");

            let DownloadLink = (<PDFDownloadLink document={PDFResto(restaurantInfo.nom,adresse,pngUrl,restaurantInfo.code_resto)} fileName={"Fiche restaurant "+restaurantInfo.nom+".pdf"}>
                {({ blob, url, loading, error }) => {
                    return <Button color="secondary">Télécharger votre fiche restaurant</Button>;
                }}
            </PDFDownloadLink>);
            return <PopUpFicheRestaurantPDF setAffichage={setAfficherQrCode} boutonTelecharger={DownloadLink}/>
        }else{
            return <></>
        }


    };





    function affichageBoutton(etape){


        if(etape==1){

            return (<div>
                <AlerteInfoPasRempli/>
                <Button color="secondary" onClick={()=>setAffichage(true)}>Compléter les informations de mon restaurant</Button>
                {openModifInfo()}
            </div>);


        }else{

            return (<div>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {restaurantInfo.nom}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {restaurantInfo.adresse.rue}, {restaurantInfo.adresse.ville} {restaurantInfo.adresse.code_postal}
                        </Typography>
                        <Typography variant="button" display="block" gutterBottom>
                            {restaurantInfo.telephone}
                        </Typography>
                        <QRCode
                            renderAs={'canvas'}
                            id={id}
                            value={"www.helporesto.fr/restaurant/"+id}
                            size={200}
                            level={"H"}
                            includeMargin={true}
                        />
                        <div>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" onClick={()=>setAfficherCode(true)}>VOIR VOTRE CODE RESTAURANT</Button>
                        <Button color="secondary" onClick={()=>setAfficherQrCode(true)}>Fiche restaurant</Button>
                        {afficherBoutton()}
                    </CardActions>
                </Card>
                {openCodeResto()}
                <Button color="primary" onClick={()=>setAffichage(true)}>Modifier les informations de mon restaurant</Button>
                {openModifInfo()}
            </div>);


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
