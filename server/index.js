import express from 'express';
import https from 'https';
import fs from 'fs';
import { kcAdminClient, authenticate } from './keycloak.js';

const app = express();
app.use(express.json());

app.post('/check-credentials', async (req, res) => {
  const { clientId, clientSecret } = req.body;

  try {
    await authenticate();
    // Get clients
    const clients = await kcAdminClient.clients.find({ realm: 'master' });
    console.log()

    // Find the client by clientId
    const client = clients.find(client => client.clientId === clientId);
    console.log(client)
    if (!client) {
      return res.status(404).json({ valid: false, message: 'Client not found' });
    }

    // Get the client secret
    const clientSecretResponse = await kcAdminClient.clients.getClientSecret({
      id: client.id,
      realm: 'master'
    });

    // Check if the provided client secret matches the stored client secret
    if (clientSecretResponse.value === clientSecret) {
      res.status(200).json({ valid: true, message: 'Client credentials are valid' });
    } else {
      res.status(401).json({ valid: false, message: 'Invalid client secret' });
    }
  } catch (error) {
    res.status(500).json({ valid: false, error: error.message });
  }
});


const PORT = 443;
const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.cert')
};

const server = https.createServer(options, app);
server.listen(443, () => {
  console.log('Server running on https://localhost:443/');
});