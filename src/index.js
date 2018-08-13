import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import * as admin from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json'

import { store } from './store';

import App from './screens/App';

import './styles/index.css';

const config = {
  apiKey: "AIzaSyBTwJSnVOsAs9edMWm0eExfPp7YtbQu_Iw",
  authDomain: "youdo-app.firebaseapp.com",
  databaseURL: "https://youdo-app.firebaseio.com",
  projectId: "youdo-app",
  storageBucket: "",
  messagingSenderId: "548923706767"
};
firebase.initializeApp(config);


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
