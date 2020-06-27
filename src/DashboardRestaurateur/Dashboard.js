import React, {useEffect} from 'react';
import SideBar from "./Sidebar";
import Information from "./info/Information";
import {useHistory} from "react-router";
function Dashboard({ match: {params :{id}} , type}){

    const history = useHistory();

    useEffect(()=>{

        if(sessionStorage.getItem('isConnected')){

            if(!(id===sessionStorage.getItem('idResto'))){

                history.push("/dashboard/"+sessionStorage.getItem('idResto'));

            }

        }else{
            history.push("/login");
        }

    },[]);

    return(
        <div>
            <SideBar id={id} type={type} module={<Information id={id}/>}/>
        </div>
    )


}

export default Dashboard;
