const express = require("express");
const bodyParser = require("body-parser");
const projects = require("./mock/projects");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("src/public"));

const users = [{ username: "admin", password: "1234" }];

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.json({
      success: true,
      message: "Authentication successful",
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  }
});

app.get("/api/projects", (req, res) => {
  const { search } = req.query;
  const PORT = 3111;

  let result = projects;

  if (search) {
    result = projects.filter((project) =>
      project.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  const projectsWithImageUrls = result.map((project) => ({
    ...project,
    imageUrl: `http://localhost:${PORT}/assets/${project.image}`,
  }));

  res.json({
    success: true,
    data: projectsWithImageUrls,
  });
});

module.exports = app;
