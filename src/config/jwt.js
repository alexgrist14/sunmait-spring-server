require("dotenv").config();

module.exports = {
  accessTokenSecret: process.env.JWT_ACCESS_SECRET,
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
  accessTokenExpiry: "1d",
  refreshTokenExpiry: "7d",
};
