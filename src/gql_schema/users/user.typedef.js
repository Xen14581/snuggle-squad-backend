const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID
    wallet_address: String
  }

  type Token {
    token: String
    expires: String
  }

  type Tokens {
    access: Token
    refresh: Token
  }

  type UserWithTokens {
    id: ID
    wallet_address: String
    tokens: Tokens
  }

  extend type Query {
    getUser(id: ID): User
  }

  input UserInput {
    wallet_address: String
  }

  extend type Mutation {
    registerUser(user: UserInput): UserWithTokens
    renewAccessToken(refresh_token: String): Tokens
  }
`;

module.exports = typeDefs;
