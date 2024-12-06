const { auth } = require('express-oauth2-jwt-bearer');

const requiredEnvVars = [
  'AUTH0_DOMAIN',
  'AUTH0_CLIENT_ID',
  'AUTH0_CLIENT_SECRET',
  'BASE_URL',
  'CLIENT_URL'
];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

const jwtCheck = auth({
  audience: 'https://api.hello-build.com',
  issuerBaseURL: 'https://dev-z0d7qop2x7xnoumm.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_DOMAIN,
    secret: process.env.SECRET
};

module.exports = { jwtCheck, config };
