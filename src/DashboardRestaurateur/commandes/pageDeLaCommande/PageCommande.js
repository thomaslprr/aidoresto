import React, {useEffect} from 'react';
import SideBar from "../../Sidebar";
import Information from "../../info/Information";
import {useHistory} from "react-router";


function PageCommande({ match: {params :{id, idCommande}}}){

    const history = useHistory();

    useEffect(()=>{

        if(sessionStorage.getItem('isConnected')){

            if(id===sessionStorage.getItem('idResto')){

                console.log("id de la commande : "+idCommande);

            }else {

                history.push("/dashboard/"+sessionStorage.getItem('idResto'));

            }

        }else{
            history.push("/login");
        }


    },[]);

    return(
        <div>
            <SideBar idResto={id} idCommande={idCommande} type={9} module={<Information id={id}/>}/>
        </div>
    )


}

export default PageCommande;
