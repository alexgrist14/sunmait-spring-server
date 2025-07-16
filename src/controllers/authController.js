const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const jwtConfig = require("../config/jwt");
const bcrypt = require("bcrypt");

const authController = {
  async register(req, res) {
    try {
      const { username, password, firstName, lastName, age } = req.body;

      const existingUser = await UserModel.findByUsername(username);
      if (existingUser) {
        return res.status(400).json({
          message: "Username already exists",
        });
      }

      const newUser = await UserModel.createUser({
        username,
        password,
        firstName,
        lastName,
        age,
      });

      const accessToken = jwt.sign(
        { userId: newUser.id, username: newUser.username },
        jwtConfig.accessTokenSecret,
        { expiresIn: jwtConfig.accessTokenExpiry }
      );

      const refreshToken = jwt.sign(
        { userId: newUser.id },
        jwtConfig.refreshTokenSecret,
        { expiresIn: jwtConfig.refreshTokenExpiry }
      );

      res.status(201).json({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({
        message: error,
      });
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          message: "Username and password are required",
        });
      }

      const user = await UserModel.findByUsername(username);
      if (!user) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      const accessToken = jwt.sign(
        { userId: user.id, username: user.username },
        jwtConfig.accessTokenSecret,
        { expiresIn: jwtConfig.accessTokenExpiry }
      );

      const refreshToken = jwt.sign(
        { userId: user.id },
        jwtConfig.refreshTokenSecret,
        { expiresIn: jwtConfig.refreshTokenExpiry }
      );

      res.json({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        message: error,
      });
    }
  },

  async refreshToken(req, res) {
    try {
      const { userId } = req.user;

      const accessToken = jwt.sign({ userId }, jwtConfig.accessTokenSecret, {
        expiresIn: jwtConfig.accessTokenExpiry,
      });

      res.json({
        accessToken,
      });
    } catch (error) {
      console.error("Refresh token error:", error);
      res.status(500).json({
        message: error,
      });
    }
  },
};

module.exports = authController;
