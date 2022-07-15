const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Card = mongoose.model("cards", CardSchema);
module.exports = Card;