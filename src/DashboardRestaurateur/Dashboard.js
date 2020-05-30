import React from 'react';
import SideBar from "./Sidebar";
function Dashboard({ match: {params :{id}} }){

    return(
        <div>
        <SideBar id={id}/>
        </div>
    )


}

export default Dashboard;
