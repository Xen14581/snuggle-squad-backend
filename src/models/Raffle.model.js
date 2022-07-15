const mongoose = require("mongoose");

const RaffleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  ticket_count: {
    type: Number,
    required: true,
  },
  ticket_price: {
    type: Number,
    required: true,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
  reward_token: {
    type: String,
    required: true,
  },
  participants: {
    type: [mongoose.Types.ObjectId],
    ref: "users",
  },
});

const Raffle = mongoose.model("raffles", RaffleSchema);
module.exports = Raffle;
