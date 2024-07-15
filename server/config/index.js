const config = {
  keycloak: {
    baseUrl: `http://${process.env.keycloakIp}:8000`,
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret
  },
};

export default config;
