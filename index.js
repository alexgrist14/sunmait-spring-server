const app = require("./src/app");
const sequelize = require("./src/config/sequelize");
const initTestData = require("./src/mock/projects");

sequelize
  .sync({ alter: true })
  .then(async () => {
    console.log("Database synced");
    await initTestData();
    app.listen(process.env.PORT || 3000, () => {
      console.log(
        `Server running on http://localhost:${process.env.PORT || 3000}`
      );
    });
  })
  .catch((err) => {
    console.error("Database sync error:", err);
  });
