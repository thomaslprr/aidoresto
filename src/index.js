import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase');
require('firebase/firestore');

const app = firebase.initializeApp({
    apiKey: "AIzaSyAm9gNIaEiOl0wce4HYHE-WkYo62Kecs0I",
    authDomain: "aidoresto-1bef4.firebaseapp.com",
    databaseURL: "https://aidoresto-1bef4.firebaseio.com",
    projectId: "aidoresto-1bef4",
    storageBucket: "aidoresto-1bef4.appspot.com",
    messagingSenderId: "553349771815",
    appId: "1:553349771815:web:200d381310fcb950f7d402",
    measurementId: "G-D4420PNFVL"
});
export default app;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
