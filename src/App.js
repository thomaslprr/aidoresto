import React from 'react';
import './App.css';
import SignUp from "./CreationCompteRestaurateur";
import {Route, Router, Switch} from "react-router";
import Home from "./Home";
import {BrowserRouter} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PageClient from "./components/PageClient";
import {AuthProvider} from "./login/Auth";
import LoginRestaurateur from "./login/LoginRestaurateur";
import Dashboard from "./DashboardRestaurateur/Dashboard";

function App() {
  return (
      <AuthProvider>
          <BrowserRouter>
              <Switch>
              <Route exact path="/" component={Home}/>
                  <Route exact path="/login" component={LoginRestaurateur}/>
                  <Route exact path="/signup" component={SignUp}/>
                  <Route exact path="/test/:id" render={props => <PageClient {...props} />} />
                  <Route exact path="/dashboard/:id" render={props => <Dashboard {...props} />} />
              </Switch>
          </BrowserRouter>
      </AuthProvider>

  );
}

export default App;
