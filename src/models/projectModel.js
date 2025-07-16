const { Op } = require("sequelize");
const Project = require("./project");

const ProjectModel = {
  async getAll(search = "") {
    try {
      const where = search
        ? {
            title: {
              [Op.iLike]: `%${search}%`,
            },
          }
        : {};

      return await Project.findAll({ where, order: [["title", "ASC"]] });
    } catch (error) {
      console.error("Error getting projects:", error);
      throw error;
    }
  },
};

module.exports = ProjectModel;
