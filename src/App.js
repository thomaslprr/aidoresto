import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignUp from "./CreationCompteRestaurateur";
import {Route, Router, Switch} from "react-router";
import Home from "./Home";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Login from "./LoginRestaurateur";
import Restaurant from "./Restaurant";

function App() {
  return (
      <AuthProvider>
          <BrowserRouter>
              <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/signup" component={SignUp}/>
              <Route exact path="/dashboard/:id" render={props => <Restaurant {...props} />} />
              </Switch>
          </BrowserRouter>
      </AuthProvider>

  );
}

export default App;
