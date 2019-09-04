import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { KeycloakProvider } from 'react-keycloak';
import { keycloak } from './keycloak-config';

const tokens = JSON.parse(localStorage.getItem('kcTokens') || '{}');

function onKeycloakTokens(tks) {
    localStorage.setItem('kcTokens', JSON.stringify(tks));
    setInterval(() => {
        keycloak.updateToken(10).error(() => keycloak.logout());
    }, 10000);
}

function onKeycloakEvent(event, error) {
    if (event === 'onAuthLogout') {
        localStorage.removeItem('kcTokens');
    }
}

const Root = () => (
    <KeycloakProvider
        keycloak={keycloak}
        initConfig={{ onLoad: 'check-sso', ...tokens }}
        onEvent={onKeycloakEvent}
        onTokens={onKeycloakTokens}>
        <App />
    </KeycloakProvider>
);

ReactDOM.render(<Root />, document.getElementById("root"));

//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
