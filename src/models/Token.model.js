const mongoose = require("mongoose");

const config = require("../config/config");

const tokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

tokenSchema.index(
  { expires: 1 },
  { expireAfterSeconds: config.jwt.refresh_expiry * 60 * 60 }
);

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
