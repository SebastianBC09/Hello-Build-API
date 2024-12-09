const GET_USER_REPOSITORIES = `
  query($first: Int!, $after: String) {
    viewer {
      repositories(first: $first, after: $after, orderBy: {field: UPDATED_AT, direction: DESC}) {
        nodes {
          id
          name
          description
          url
          primaryLanguage {
            name
            color
          }
          isPrivate
          updatedAt
          stargazerCount
        }
        pageInfo {
          hasNextPage
          endCursor
        }
        totalCount
      }
    }
  }
`;

const SEARCH_REPOSITORIES = `
  query($query: String!, $first: Int!) {
    search(query: $query, type: REPOSITORY, first: $first) {
      edges {
        node {
          ... on Repository {
            id
            name
            description
            url
            stargazerCount
            primaryLanguage {
              name
              color
            }
            isPrivate
            updatedAt
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

module.exports = {
    GET_USER_REPOSITORIES,
    SEARCH_REPOSITORIES
};
