const axios = require('axios');
const { auth0 } = require('../config/environment');

exports.handleCallback = async (req, res, next) => {
  try {
    const { code } = req.body;

    // Exchange code for tokens
    const tokenResponse = await axios.post(`https://${auth0.domain}/oauth/token`, {
      grant_type: 'authorization_code',
      client_id: auth0.clientId,
      client_secret: auth0.clientSecret,
      code,
      redirect_uri: auth0.callbackUrl
    });

    res.json(tokenResponse.data);
  } catch (error) {
    next(error);
  }
};

exports.getUserProfile = async (req, res) => {
  res.json({ user: req.user });
};
