const express = require("express");
const bodyParser = require("body-parser");
const apiLogger = require("./middleware/apiLogger");
const cors = require("cors");
const authController = require("./controllers/authController");
const authMiddleware = require("./middleware/authMiddleware");
const projectController = require("./controllers/projectController");
const { validateUser } = require("./middleware/validationMiddleware");
const companyController = require("./controllers/companyController");

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

app.get("/api/companies", companyController.getAll);
app.get("/api/companies/:id", companyController.getOne);
app.post("/api/companies", companyController.create);
app.patch("/api/companies/:id", companyController.update);

module.exports = app;
