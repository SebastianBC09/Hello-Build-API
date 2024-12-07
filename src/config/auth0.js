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
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  tokenSigningAlg: 'HS256'
});

const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_DOMAIN,
    secret: process.env.SECRET,
    clientSecret: process.env.AUTH0_CLIENT_SECRET
};

module.exports = { jwtCheck, config };
