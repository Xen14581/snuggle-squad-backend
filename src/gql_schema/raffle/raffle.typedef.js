const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Raffle {
    id: ID
    name: String
    description: String
    ticket_count: Int
    ticket_price: Int
    start_time: String
    end_time: String
    reward_token: String
    participants: [User]
  }

  extend type Query {
    getRaffle(id: ID): [Raffle]
  }

  input RaffleInput {
    name: String
    description: String
    ticket_count: Int
    ticket_price: Int
    start_time: String
    end_time: String
    reward_token: String
  }

  input RegistrationInput {
    user_id: ID
    raffle_id: ID
  }

  extend type Mutation {
    createRaffle(raffle: RaffleInput, access_token: String): Raffle
    addRaffleParticipant(
      registerUserToRaffle: RegistrationInput
      access_token: String
    ): Raffle
  }
`;

module.exports = typeDefs;
