const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Repository {
    id: ID!
    name: String!
    description: String
    url: String!
    stargazerCount: Int!
    primaryLanguage: Language
    isPrivate: Boolean!
    updatedAt: String!
  }

  type Language {
    name: String!
    color: String
  }

  type Query {
    repositories: [Repository]!
    search(query: String!): [Repository]!
  }
`);

module.exports = schema;
