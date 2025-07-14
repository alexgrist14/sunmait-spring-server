const ProjectModel = require("../models/projectModel");

const projectController = {
  async getProjects(req, res) {
    try {
      const { search } = req.query;
      const projects = await ProjectModel.getAll(search);

      const projectsWithImageUrls = projects.map((project) => {
        const plain = project.get({ plain: true });

        return {
          ...plain,
          imageUrl: `${req.protocol}://${req.get("host")}/assets/${plain.image}`,
        };
      });

      res.json({
        projects: projectsWithImageUrls,
      });
    } catch (error) {
      console.error("Error getting projects:", error);
      res.status(500).json({
        message: "Failed to get projects",
      });
    }
  },
};

module.exports = projectController;
