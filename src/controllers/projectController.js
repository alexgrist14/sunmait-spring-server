const ProjectModel = require("../models/projectModel");

const projectController = {
  async getProjects(req, res) {
    try {
      const { search } = req.query;
      const projects = await ProjectModel.getAll(search);

      const projectsWithImageUrls = projects.map((project) => ({
        ...project,
        imageUrl: `${req.protocol}://${req.get("host")}/assets/${project.image}`,
      }));

      res.json({
        success: true,
        data: projectsWithImageUrls,
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
