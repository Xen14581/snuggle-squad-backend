const { ApolloError } = require("apollo-server-express");
const User = require("../../models/User.model");
const {
  generateAuthTokens,
  renewAccessToken,
} = require("../../utils/tokens.utils");

const resolvers = {
  Query: {
    getUser: async (parent, args, context, info) => {
      if (args.id) {
        return await User.findById(args.id);
      }
    },
  },
  Mutation: {
    registerUser: async (parent, args, context, info) => {
      const { wallet_address } = args.user;
      let user = await User.findOne({ wallet_address });
      if (!user) {
        user = new User({ wallet_address });
        await user.save();
      }
      user.tokens = await generateAuthTokens(user);
      return user;
    },

    renewAccessToken: async (parent, args, context, info) => {
      if (args.refresh_token) return renewAccessToken(args.refresh_token);
      else throw new ApolloError("Please provide refresh token!", 400);
    },
  },
};

module.exports = resolvers;
