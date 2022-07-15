const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type History {
    user: User
    bid_amount: Int
  }

  type Auction {
    id: ID
    name: String
    description: String
    start_time: String
    end_time: String
    reward_token: String
    starting_bid: Int
    history: [History]
  }

  extend type Query {
    getAuctions(id: ID): [Auction]
  }

  input AuctionInput {
    name: String
    description: String
    start_time: String
    end_time: String
    reward_token: String
    starting_bid: Int
  }

  input AuctionRegistrationInput {
    user_id: ID
    auction_id: ID
    bid: Int
  }

  extend type Mutation {
    createAuction(auction: AuctionInput, access_token: String): Auction
    addAuctionParticipant(
      registerUserToAuction: AuctionRegistrationInput
      access_token: String
    ): Auction
  }
`;

module.exports = typeDefs;
