import React, {useEffect, useState} from 'react';
import SideBar from "./Sidebar";
import Information from "./Information";
function Dashboard({ match: {params :{id}} , type}){

    useEffect(()=>{
        console.log("Voici ce que je recois : ");
        console.log(type)
    })

    return(
        <div>
        <SideBar id={id} type={type} module={<Information id={id}/>}/>
        </div>
    )


}

export default Dashboard;
