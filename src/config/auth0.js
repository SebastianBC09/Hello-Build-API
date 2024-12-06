const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const checkScopes = requiredScopes('read:messages');

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

module.exports = { jwtCheck, checkScopes, config };
