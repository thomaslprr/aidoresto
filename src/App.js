import React from 'react';
import './App.css';
import SignUp from "./creationCompte/CreationCompteRestaurateur";
import {Route, Switch} from "react-router";
import Home from "./Home";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./login/Auth";
import LoginRestaurateur from "./login/LoginRestaurateur";
import Dashboard from "./DashboardRestaurateur/Dashboard";
import PageDuResto from "./commande/PageDuResto";

function App() {
  return (
      <AuthProvider>
          <BrowserRouter>
              <Switch>
              <Route exact path="/" component={Home}/>
                  <Route exact path="/login" component={LoginRestaurateur}/>
                  <Route exact path="/signup" component={SignUp}/>
                  <Route exact path="/restaurant/:id" render={props => <PageDuResto {...props} />} />


                  <Route exact path="/dashboard/:id" render={props => <Dashboard {...props} type={0}/>} />
                  <Route exact path="/dashboard/:id/commandes" render={props => <Dashboard {...props} type={1} />} />
                  <Route exact path="/dashboard/:id/boissons" render={props => <Dashboard {...props} type={2} />} />
                  <Route exact path="/dashboard/:id/entrees" render={props => <Dashboard {...props} type={3} />} />
                  <Route exact path="/dashboard/:id/repas" render={props => <Dashboard {...props} type={4} />} />
                  <Route exact path="/dashboard/:id/dessert" render={props => <Dashboard {...props} type={5} />} />
                  <Route exact path="/dashboard/:id/menus" render={props => <Dashboard {...props} type={6} />} />
                  <Route exact path="/dashboard/:id/info" render={props => <Dashboard {...props} type={7} />} />
                  <Route exact path="/dashboard/:id/deconnexion" render={props => <Dashboard {...props} type={8} />} />


              </Switch>
          </BrowserRouter>
      </AuthProvider>

  );
}

export default App;
