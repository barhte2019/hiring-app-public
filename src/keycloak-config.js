import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
    "principal-attribute": "preferred_username",
    "realm": window._env_.SSO_REALM,
    "url":  window._env_.SSO_URL,
    "ssl-required": "external",
    "resource": window._env_.SSO_CLIENT,
    "public-client": true,
    "clientId": window._env_.SSO_CLIENT,
    "enable-cors": true
});
