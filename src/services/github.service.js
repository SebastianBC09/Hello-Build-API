const { GraphQLClient } = require('graphql-request');

class GitHubService {
  constructor() {
    this.client = null;
  }

  initialize(accessToken) {
    this.client = new GraphQLClient('https://api.github.com/graphql', {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getUserRepositories() {
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

  async searchRepositories(query) {
    const searchQuery = `
      query($searchQuery: String!) {
        viewer {
          repositories(first: 100, query: $searchQuery) {
            nodes {
              id
              name
              description
              url
              isPrivate
              stargazerCount
              updatedAt
            }
          }
        }
      }
    `;

    try {
      const data = await this.client.request(searchQuery, { searchQuery: query });
      return data.viewer.repositories.nodes;
    } catch (error) {
      throw new Error(`Failed to search repositories: ${error.message}`);
    }
  }
}

module.exports = new GitHubService();
