require('dotenv').config();

module.exports = {
  port: process.env.PORT || 8080,
  nodeEnv: process.env.NODE_ENV || 'development',
  auth0: {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    audience: process.env.AUTH0_AUDIENCE,
    callbackUrl: `${process.env.BASE_URL}/api/auth/callback`
  },
  urls: {
    baseUrl: process.env.BASE_URL,
    clientUrl: process.env.CLIENT_URL
  },
  cors: {
    origin: process.env.CORS_ORIGIN
  }
};
