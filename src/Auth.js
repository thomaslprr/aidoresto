import * as React from "react";
import {useState} from "react";
import {useEffect} from "react";
import app from "./index";
export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(()=> {
        app.auth().onAuthStateChanged(setCurrentUser);
    },[]);

    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );

};

