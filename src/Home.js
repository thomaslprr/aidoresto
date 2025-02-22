import React from "react";
import LoginClient from "./login/LoginClient";

function Home(){

    return(
        <div className="App">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
            <LoginClient/>
        </div>
    );

}
export default Home;
