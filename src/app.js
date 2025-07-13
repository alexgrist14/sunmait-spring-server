const express = require("express");
const bodyParser = require("body-parser");
const apiLogger = require("./middleware/apiLogger");
const cors = require("cors");
const pool = require("./config/db");
const authController = require("./controllers/authController");
const authMiddleware = require("./middleware/authMiddleware");
const projectController = require("./controllers/projectController");
const { validateUser } = require("./middleware/validationMiddleware");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(apiLogger);
app.use(express.static("src/public"));

app.post("/api/signup", validateUser, authController.register);
app.post("/api/login", authController.login);
app.post(
  "/api/refresh-token",
  authMiddleware.verifyRefreshToken,
  authController.refreshToken
);
app.get(
  "/api/projects",
  authMiddleware.verifyAccessToken,
  projectController.getProjects
);

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database", err.stack);
  } else {
    console.log("Connected to the database:", res.rows);
  }
});

module.exports = app;
