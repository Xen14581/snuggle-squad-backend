const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  wallet_address: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("users", UserSchema);
module.exports = User;
