import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as firebase from 'firebase';
import 'firebase/analytics';

const theme = createMuiTheme({
    palette: {
        primary:{
            main: '#1f62b9'
        },
        secondary: {
            main: '#ff9555'
        }
    }
});

let firebaseConfig = {
    apiKey: "AIzaSyAm9gNIaEiOl0wce4HYHE-WkYo62Kecs0I",
    authDomain: "aidoresto-1bef4.firebaseapp.com",
    databaseURL: "https://aidoresto-1bef4.firebaseio.com",
    projectId: "aidoresto-1bef4",
    storageBucket: "aidoresto-1bef4.appspot.com",
    messagingSenderId: "553349771815",
    appId: "1:553349771815:web:200d381310fcb950f7d402",
    measurementId: "G-D4420PNFVL"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
    <React.StrictMode>
    <App />
  </React.StrictMode>
    </MuiThemeProvider>
        ,
  document.getElementById('root')
);

serviceWorker.register();
