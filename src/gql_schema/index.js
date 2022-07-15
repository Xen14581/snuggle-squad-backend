const { buildSubgraphSchema } = require("@apollo/subgraph");

const cardSchema = require("./cards");
const raffleSchema = require("./raffle");
const UserSchema = require("./users");
const AuctionSchema = require("./auction");

const schema = buildSubgraphSchema([
  cardSchema,
  raffleSchema,
  UserSchema,
  AuctionSchema,
]);

module.exports = schema;
