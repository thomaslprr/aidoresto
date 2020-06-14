import React, {useEffect} from 'react';
import SideBar from "./Sidebar";
import Information from "./info/Information";
import {useHistory} from "react-router";
function Dashboard({ match: {params :{id}} , type}){

    const history = useHistory();

    useEffect(()=>{

        if(!(id===sessionStorage.getItem('idResto'))){
            if(sessionStorage.getItem('isConnected')){
                history.push("/dashboard/"+sessionStorage.getItem('idResto'));
                console.log("Il est connecté");

            }else{
                history.push("/login");
            }

        }

    },[]);

    return(
        <div>
            <SideBar id={id} type={type} module={<Information id={id}/>}/>
        </div>
    )


}

export default Dashboard;
