import React, {useEffect, useRef, useState} from 'react';
import * as firebase from "firebase";
import ListeMenu from "./ListeMenus";


const PageMenu = ({idResto}) => {

    return(
        <>

            <ListeMenu idResto={idResto}/>

        </>
    )

};

export default PageMenu;
