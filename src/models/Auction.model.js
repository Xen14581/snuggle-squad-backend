const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "users",
  },
  bid_amount: {
    type: Number,
    required: true,
  },
});

const AuctionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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
  starting_bid: {
    type: Number,
    required: true,
  },
  history: {
    type: [historySchema],
  },
});

const Auction = mongoose.model("auctions", AuctionSchema);
module.exports = Auction;
