const { createHandler } = require('graphql-http/lib/use/express');
const { GraphQLError } = require('graphql');
const GITHUB_API_URL = 'https://api.github.com/graphql';
const GITHUB_API_VERSION = '2022-11-28';

const validateGitHubToken = (token) => {
  if (!token) {
    throw new GraphQLError('GitHub token is required');
  }
  return token;
};
const getGitHubHeaders = (token) => ({
  'Authorization': `Bearer ${validateGitHubToken(token)}`,
  'Content-Type': 'application/json',
  'X-GitHub-Api-Version': GITHUB_API_VERSION
});
const createGitHubGraphQLHandler = (schema) => createHandler({
  schema,
  context: (req) => {
    try {
      return {
        headers: getGitHubHeaders(req.token)
      };
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }
});

  module.exports = {
  GITHUB_API_URL,
  createGitHubGraphQLHandler,
  getGitHubHeaders
};
