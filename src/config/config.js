const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

module.exports = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGODB_URL,
  jwt: {
    secret: process.env.JWT_SECRET,
    access_expiry: process.env.JWT_ACCESS_EXPIRY_HOURS,
    refresh_expiry: process.env.JWT_REFRESH_EXPIRY_HOURS,
  },
};
