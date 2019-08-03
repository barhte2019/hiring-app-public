import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
    "principal-attribute": "user1",
    "realm": "demo",
    "url": "http://localhost:8080/auth",
    "ssl-required": "external",
    "resource": "rhteclient",
    "public-client": true,
    "clientId": "rhteclient"
});
