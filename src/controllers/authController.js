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
    const tokenResponse = await fetch(`https://${config.issuerBaseURL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: config.clientID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code,
        redirect_uri: `${config.baseURL}/api/auth/callback`,
        scope: 'openid profile email read:user read:repo'  // Add GitHub scopes
      })
    });
    const tokens = await tokenResponse.json();
    const userResponse = await fetch(`https://${config.issuerBaseURL}/userinfo`, {
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`
      }
    });
    const userInfo = await userResponse.json();
    const managementToken = await getManagementToken();
    const githubToken = await getGithubToken(userInfo.sub, managementToken);
    response.redirect(
      `${process.env.CLIENT_URL}?` +
      `access_token=${tokens.access_token}&` +
      `id_token=${tokens.id_token}&` +
      `github_token=${githubToken}`
    );
  } catch (error) {
    next(error);
  }
};

const getManagementToken = async () => {
  const response = await fetch(`https://${config.issuerBaseURL}/oauth/token`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: config.clientID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: `https://${config.issuerBaseURL}/api/v2/`
    })
  });
  const data = await response.json();
  return data.access_token;
};

const getGithubToken = async (userId, managementToken) => {
  const response = await fetch(`https://${config.issuerBaseURL}/api/v2/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${managementToken}`
    }
  });
  const user = await response.json();
  return user.identities.find(i => i.provider === 'github').access_token;
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
  getManagementToken,
  getGithubToken,
  checkStatus,
  logout,
  getProfile
};
