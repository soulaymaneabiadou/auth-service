const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
  }
  
  type AuthData {
    statusCode: Int!
    success: Boolean!
    token: String!
  }

  input UserInput {
    name: String
    email: String!
    password: String!
  }

  type RootQuery {
    login(user: UserInput!): AuthData!
    getMe: User!
  }

  type RootMutation {
    register(user: UserInput!): AuthData!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
