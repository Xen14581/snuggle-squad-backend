const jwt = require("jsonwebtoken");
const moment = require("moment");
const { ApolloError } = require("apollo-server-errors");

const config = require("../config/config");
const Token = require("../models/Token.model");

const verifyToken = async (token) => {
  if (!token) return false;
  const payload = jwt.verify(token, config.jwt.secret);
  if (payload.exp < moment.unix()) return false;
  return true;
};

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.access_expiry, "hours");
  const accessToken = generateToken(user._id, accessTokenExpires, "Access");

  const refreshTokenExpires = moment().add(config.jwt.refresh_expiry, "hours");
  const refreshToken = generateToken(user._id, refreshTokenExpires, "Refresh");
  await saveToken(refreshToken, user._id, refreshTokenExpires, "Refresh");

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

const renewAccessToken = async (refresh_token) => {
  const token = await Token.findOne({ token: refresh_token });
  if (token) {
    const accessTokenExpires = moment().add(config.jwt.access_expiry, "hours");
    const accessToken = generateToken(token.user, accessTokenExpires, "Access");
    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refresh_token,
        expires: token.expires,
      },
    };
  } else
    throw new ApolloError("Refresh Token Expired! Please login again!", 400);
};

module.exports = { generateAuthTokens, renewAccessToken, verifyToken };
