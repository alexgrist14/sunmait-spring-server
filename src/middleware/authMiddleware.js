const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

const authMiddleware = {
  verifyAccessToken: (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access token required" });
    }

    jwt.verify(token, jwtConfig.accessTokenSecret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid access token" });
      }
      req.user = user;
      next();
    });
  },

  verifyRefreshToken: (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    jwt.verify(refreshToken, jwtConfig.refreshTokenSecret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }
      req.user = user;
      next();
    });
  },
};

module.exports = authMiddleware;
