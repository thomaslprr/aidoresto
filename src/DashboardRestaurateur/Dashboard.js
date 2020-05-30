import React, {useEffect} from 'react';
import SideBar from "./Sidebar";
function Dashboard({ match: {params :{id}} , type}){

    useEffect(()=>{
        console.log("Voici ce que je recois : ");
        console.log(type)
    })

    return(
        <div>
        <SideBar id={id} type={type}/>
        </div>
    )


}

export default Dashboard;
