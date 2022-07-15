const { ApolloError } = require("apollo-server-errors");

const Raffle = require("../../models/Raffle.model");
const { verifyToken } = require("../../utils/tokens.utils");

const resolvers = {
  Query: {
    getRaffle: async (parent, args, context, info) => {
      if (args.id) {
        return [await Raffle.findById(args.id).populate("participants")];
      }
      return await Raffle.find().populate("participants");
    },
  },
  Mutation: {
    createRaffle: async (parent, args, context, info) => {
      if (!args.access_token)
        throw new ApolloError("Please provide an access token", 400);
      else if (await verifyToken(args.access_token)) {
        const {
          name,
          description,
          ticket_count,
          ticket_price,
          start_time,
          end_time,
          reward_token,
        } = args.raffle;
        const raffle = new Raffle({
          name,
          description,
          ticket_count,
          ticket_price,
          start_time,
          end_time,
          reward_token,
        });
        await raffle.save();
        return raffle;
      } else throw new ApolloError("Access Token Expired!", 400);
    },

    addRaffleParticipant: async (parent, args, context, info) => {
      if (!args.access_token)
        throw new ApolloError("Please provide an access token", 400);
      else if (await verifyToken(args.access_token)) {
        const { user_id, raffle_id } = args.registerUserToRaffle;
        const raffle = await Raffle.findById(raffle_id);
        if (!raffle) throw new ApolloError("Invalid Raffle ID", 400);
        if (raffle.participants) raffle.participants.push(user_id);
        else raffle.participants = [user_id];
        await raffle.save();
        return raffle.populate("participants");
      } else throw new ApolloError("Access Token Expired!", 400);
    },
  },
};

module.exports = resolvers;
