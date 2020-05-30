import React, {useEffect} from 'react';

function Restaurant({ match: {params :{id}} }){

    useEffect(()=>{
        console.log("data : "+id);
    },[]);

    return (
        <div>
            Restaurant {id}
        </div>
    )
}
export default Restaurant;


