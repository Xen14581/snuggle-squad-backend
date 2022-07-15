const Card = require("../../models/Card.model");

const resolvers = {
  Query: {
    hello: () => {
      return "hello world3";
    },
    getAllCards: async () => {
      return await Card.find();
    },
  },
  Mutation: {
    createCard: async (parent, args, context, info) => {
      const { name, description, amount } = args.card;
      const card = new Card({ name, description, amount });
      await card.save();
      return card;
    },
  },
};

module.exports = resolvers;
