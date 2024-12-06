const { config } = require('../config/auth0');

const login = (request, response) => {
  const loginUrl = `${config.issuerBaseURL}/authorize?response_type=code&client_id=${config.clientID}&redirect_uri=${config.baseURL}/api/auth/callback&scope=openid profile email`;
  response.redirect(loginUrl);
};

const handleCallback = async (request, response) => {
  const { code } = request.query;
  res.redirect('/');
};

const logout = (request, response) => {
  const logoutUrl = `${config.issuerBaseURL}/v2/logout?client_id=${config.clientID}&returnTo=${config.baseURL}`;
  response.redirect(logoutUrl);
};

const getProfile = (request, response) => {
  const userProfile = request.auth;
  response.json({ profile: userProfile });
};

module.exports = {
  login,
  handleCallback,
  logout,
  getProfile
};
