const { auth } = require('express-oauth2-jwt-bearer');

const jwtCheck = auth({
  audience: 'https://api.hello-build.com',
  issuerBaseURL: 'https://dev-z0d7qop2x7xnoumm.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

module.exports = jwtCheck;
