const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Card {
    id: ID
    name: String
    description: String
    amount: Int
  }

  type Query {
    hello: String
    getAllCards: [Card]
  }

  input CardInput {
    name: String
    description: String
    amount: Int
  }

  type Mutation {
    createCard(card: CardInput): Card
  }
`;

module.exports = typeDefs;
