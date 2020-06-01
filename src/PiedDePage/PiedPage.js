import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React, {useState} from "react";

import PopUpMentionLegale from "./PopUpMentionLegales";
import Button from "@material-ui/core/Button";



export function Copyright() {

    const  [afficherMentionLegale,setAfficherMentionLegale] = useState(false);

    const AfficherPopUpMentionLegale = () =>{
        if(afficherMentionLegale){
            return <PopUpMentionLegale  setOpenn={setAfficherMentionLegale}/>;
        }else{
            return <></>;
        }

    };

    return (
        <>
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit">
                Helporesto
            </Link>{' - '}
            {new Date().getFullYear()}
        </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
               contact@helporesto.fr - 06 29 14 29 60
            </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
            {AfficherPopUpMentionLegale()}
     <Button color="inherit"  onClick={()=>setAfficherMentionLegale(true)}>
        Mentions légales
     </Button>{' '}
    </Typography>
        </>

    );
}
