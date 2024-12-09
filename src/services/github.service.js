const { GraphQLClient } = require('graphql-request');
require('dotenv').config();
class GitHubService {
  constructor(accessToken = process.env.GITHUB_TOKEN) {
    if (!accessToken) {
      throw new Error('Access token is required');
    }

    this.client = new GraphQLClient('https://api.github.com/graphql', {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getUserRepositories() {
    if (!this.client) {
      throw new Error('GitHub client is not initialized');
    }

    const query = `
      query {
        viewer {
          repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
            nodes {
              id
              name
              description
              url
              isPrivate
              stargazerCount
              updatedAt
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    `;

    try {
      const data = await this.client.request(query);
      return data.viewer.repositories.nodes;
    } catch (error) {
      throw new Error(`Failed to fetch repositories: ${error.message}`);
    }
  }

  async searchUserRepositories(searchQuery) {
    if (!this.client) {
      throw new Error('GitHub client is not initialized');
    }

    const query = `
      query($searchQuery: String!) {
        search(
          query: $searchQuery
          type: REPOSITORY
          first: 100
        ) {
          nodes {
            ... on Repository {
              id
              name
              description
              url
              isPrivate
              stargazerCount
              updatedAt
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    `;

    try {
      // Construct the search query to only include user's repositories
      const userSearchQuery = `user:${await this.getCurrentUsername()} ${searchQuery} in:name`;
      const data = await this.client.request(query, { searchQuery: userSearchQuery });
      return data.search.nodes;
    } catch (error) {
      throw new Error(`Failed to search repositories: ${error.message}`);
    }
  }

  async getCurrentUsername() {
    const query = `
      query {
        viewer {
          login
        }
      }
    `;

    try {
      const data = await this.client.request(query);
      return data.viewer.login;
    } catch (error) {
      throw new Error(`Failed to get current username: ${error.message}`);
    }
  }
}

module.exports = GitHubService;
