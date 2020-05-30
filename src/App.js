import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignUp from "./CreationCompteRestaurateur";
import {Route, Router} from "react-router";
import Home from "./Home";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";

function App() {
  return (
      <AuthProvider>
          <BrowserRouter>
              <PrivateRoute exact path="/" component={Home}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/signup" component={SignUp}/>
          </BrowserRouter>
      </AuthProvider>

  );
}

export default App;
