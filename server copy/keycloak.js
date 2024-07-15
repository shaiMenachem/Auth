import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import config from './config/index.js';

// Disable strict SSL checking (only for local development with self-signed certificates)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const kcAdminClient = new KeycloakAdminClient({
  baseUrl: config.keycloak.baseUrl,
  realmName: config.keycloak.masterRealm,
});

export async function authenticate() {
  await kcAdminClient.auth({
    grantType: 'client_credentials',
    clientId: config.keycloak.clientId,
    clientSecret: config.keycloak.clientSecret,
  });
}

export default { kcAdminClient, authenticate };
