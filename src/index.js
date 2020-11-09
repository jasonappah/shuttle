import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import { FirebaseAppProvider } from 'reactfire';

var firebaseConfig = {
  apiKey: "AIzaSyAJWjAVVzVCYz3SIjd1k8yryuuEfMSERw8",
  authDomain: "shuttle-87812.firebaseapp.com",
  databaseURL: "https://shuttle-87812.firebaseio.com",
  projectId: "shuttle-87812",
  storageBucket: "shuttle-87812.appspot.com",
  messagingSenderId: "511076742812",
  appId: "1:511076742812:web:74054c3600f0e8fd9cdf59"
};

// Enable Concurrent Mode
// https://reactjs.org/docs/concurrent-mode-adoption.html#enabling-concurrent-mode
ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
  <GeistProvider>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
  <CssBaseline />
  <App />
  </FirebaseAppProvider>
  </GeistProvider>
</React.StrictMode>);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
