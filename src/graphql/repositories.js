const GET_USER_REPOSITORIES = `
  query {
    viewer {
      repositories(first: $first, after: $after)) {
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
  query($query: String!) {
    search(query: $query, type: REPOSITORY, last: 10) {
      nodes {
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
        }
      }
    }
  }
`;


module.exports = {
    GET_USER_REPOSITORIES,
    SEARCH_REPOSITORIES
};
