const { config } = require('../config/auth0');

const login = (request, response, next) => {
  try {
    const state = Buffer.from(JSON.stringify({
      returnTo: request.query.returnTo || '/'
    })).toString('base64');

    const loginUrl = `https://${config.issuerBaseURL}/authorize?` +
      `response_type=code&` +
      `client_id=${config.clientID}&` +
      `redirect_uri=${config.baseURL}/api/auth/callback&` +
      `scope=openid profile email read:user read:repo&` +
      `connection=github&` +
      `state=${state}`;

    response.redirect(loginUrl);
  } catch (error) {
    next(error);
  }
};

const handleCallback = async (request, response, next) => {
  try {
    const { code, state } = request.query;

    if (!code) {
      throw new Error('No authorization code received');
    }

    // Exchange the authorization code for tokens
    const tokenResponse = await fetch(`https://${config.issuerBaseURL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: config.clientID,
        client_secret: config.clientSecret,
        code,
        redirect_uri: `${config.baseURL}/api/auth/callback`
      })
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.json();
      throw new Error(error.error_description || 'Token exchange failed');
    }

    const tokens = await tokenResponse.json();

    // Get management token and user info in parallel
    const [managementToken, userInfo] = await Promise.all([
      getManagementToken(),
      getUserInfo(tokens.access_token)
    ]);

    // Get GitHub token
    const githubToken = await getGithubToken(userInfo.sub, managementToken);

    // Build redirect URL with all tokens
    const redirectUrl = new URL(process.env.CLIENT_URL);
    redirectUrl.searchParams.set('access_token', tokens.access_token);
    redirectUrl.searchParams.set('id_token', tokens.id_token);
    redirectUrl.searchParams.set('github_token', githubToken);

    // If state exists, decode and add returnTo path
    if (state) {
      try {
        const stateData = JSON.parse(Buffer.from(state, 'base64').toString());
        if (stateData.returnTo) {
          redirectUrl.searchParams.set('returnTo', stateData.returnTo);
        }
      } catch (e) {
        console.warn('Failed to parse state:', e);
      }
    }

    response.redirect(redirectUrl.toString());
  } catch (error) {
    console.error('Callback error:', error);
    const errorMessage = encodeURIComponent(error.message || 'Authentication failed');
    response.redirect(`${process.env.CLIENT_URL}/login?error=${errorMessage}`);
  }
};

const getUserInfo = async (accessToken) => {
  const response = await fetch(`https://${config.issuerBaseURL}/userinfo`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  return response.json();
};

const getManagementToken = async () => {
  const response = await fetch(`https://${config.issuerBaseURL}/oauth/token`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: config.clientID,
      client_secret: config.clientSecret,
      audience: `https://${config.issuerBaseURL}/api/v2/`
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error_description || 'Failed to obtain management token');
  }

  const data = await response.json();
  return data.access_token;
};

const getGithubToken = async (userId, managementToken) => {
  const response = await fetch(`https://${config.issuerBaseURL}/api/v2/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${managementToken}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  const user = await response.json();
  const githubIdentity = user.identities?.find(i => i.provider === 'github');

  if (!githubIdentity?.access_token) {
    throw new Error('GitHub token not found in user profile');
  }

  return githubIdentity.access_token;
};

const logout = (request, response, next) => {
  try {
    const returnTo = encodeURIComponent(process.env.CLIENT_URL);
    const logoutUrl = `https://${config.issuerBaseURL}/v2/logout?` +
      `client_id=${config.clientID}&` +
      `returnTo=${returnTo}`;

    response.redirect(logoutUrl);
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

const getProfile = (request, response, next) => {
  try {
    const userProfile = request.auth;
    if (!userProfile) {
      return response.status(401).json({ message: 'No user profile found' });
    }
    response.json({ profile: userProfile });
  } catch (error) {
    next(error);
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
