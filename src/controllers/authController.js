const { config } = require('../config/auth0');

const login = (request, response, next) => {
  try {
    const loginUrl = `https://${config.issuerBaseURL}/authorize?` +
      `response_type=code&` +
      `client_id=${config.clientID}&` +
      `redirect_uri=${config.baseURL}/api/auth/callback&` +
      `scope=openid profile email&` +
      `connection=github`;

    response.redirect(loginUrl);
  } catch (error) {
    next(error);
  }
};

const handleCallback = async (request, response, next) => {
  try {
    const { code } = request.query;
    if (!code) {
      throw new Error('No code provided');
    }

    //TODO: Exchange code for token
    // Redirect to frontend with token
    response.redirect(`${process.env.CLIENT_URL}?code=${code}`);
  } catch (error) {
    next(error);
  }
};

const checkStatus = (request, response, next) => {
  try {
    response.status(200).json({
      message: "Authentication status check"
    })
  } catch (error) {
    next(error)
  }
};

const logout = (request, response, next) => {
  try {
      const logoutUrl = `${config.issuerBaseURL}/v2/logout?client_id=${config.clientID}&returnTo=${config.baseURL}`;
  response.redirect(logoutUrl);
  } catch (error) {
    next(error)
  }
};

const getProfile = (request, response, next) => {
  try {
    const userProfile = request.auth;
    response.json({ profile: userProfile });
  } catch (error) {
    next(error)
  }
};

module.exports = {
  login,
  handleCallback,
  checkStatus,
  logout,
  getProfile
};
