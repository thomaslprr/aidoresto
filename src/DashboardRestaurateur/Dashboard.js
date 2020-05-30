import React, {useEffect, useState} from 'react';
import SideBar from "./Sidebar";
import Information from "./info/Information";
function Dashboard({ match: {params :{id}} , type}){


    return(
        <div>
        <SideBar id={id} type={type} module={<Information id={id}/>}/>
        </div>
    )


}

export default Dashboard;
