import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {Auth0Provider} from "@auth0/auth0-react";
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <Auth0Provider
    domain="tangible-development.us.auth0.com"
    clientId="m094XPAtPxKs9PTo5LsscZKBKsTnzU5J"
    redirectUri={window.location.origin}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById('root')
);
