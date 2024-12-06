const GITHUB_API_URL = 'https://api.github.com/graphql';
const GITHUB_API_VERSION = '2022-11-28';
const { createHandler } = require('"graphql-http/lib/use/express"');

const getGitHubHeaders = (token) => ({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': GITHUB_API_VERSION
});

const createGitHubGraphQLHandler = (schema) =>
  createHandler({
    schema,
    context: (req) => {
      return {
        headers: getGitHubHeaders(req.token)
      }
    }
  });

  module.exports = {
    GITHUB_API_URL,
    createGitHubGraphQLHandler,
    getGitHubHeaders
};
