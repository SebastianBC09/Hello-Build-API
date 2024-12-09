const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');
const { auth0 } = require('../config/environment');

const jwksClient = jwksRsa({
  jwksUri: `https://${auth0.domain}/.well-known/jwks.json`,
  cache: true,
  rateLimit: true
});

const getKey = (header, callback) => {
  jwksClient.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
};

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, getKey, {
    audience: auth0.audience,
    issuer: `https://${auth0.domain}/`,
    algorithms: ['RS256']
  }, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
