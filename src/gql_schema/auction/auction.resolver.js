const { ApolloError } = require("apollo-server-errors");

const Auction = require("../../models/Auction.model");
const { verifyToken } = require("../../utils/tokens.utils");

const resolvers = {
  Query: {
    getAuctions: async (parent, args, context, info) => {
      if (args.id) {
        return [await Auction.findById(args.id).populate("history.user")];
      }
      return await Auction.find().populate("history.user");
    },
  },
  Mutation: {
    createAuction: async (parent, args, context, info) => {
      if (!args.access_token)
        throw new ApolloError("Please provide an access token", 400);
      else if (await verifyToken(args.access_token)) {
        const { name, description, start_time, end_time, reward_token, starting_bid } =
          args.auction;
        const auction = new Auction({
          name,
          description,
          start_time,
          end_time,
          reward_token,
          starting_bid,
        });
        await auction.save();
        return auction;
      } else throw new ApolloError("Access Token Expired!", 400);
    },

    addAuctionParticipant: async (parent, args, context, info) => {
      if (!args.access_token)
        throw new ApolloError("Please provide an access token", 400);
      else if (await verifyToken(args.access_token)) {
        const { user_id, auction_id, bid } = args.registerUserToAuction;
        const auction = await Auction.findById(auction_id);
        if (!auction) throw new ApolloError("Invalid Auction ID", 400);
        if (auction.history)
          auction.history.push({ user: user_id, bid_amount: bid });
        else auction.history = [{ user: user_id, bid_amount: bid }];
        await auction.save();
        return auction.populate("history.user");
      } else throw new ApolloError("Access Token Expired!", 400);
    },
  },
};

module.exports = resolvers;
