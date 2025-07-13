const pool = require("../config/db");

const ProjectModel = {
  async getAll(search = "") {
    try {
      let query = "SELECT * FROM projects";
      const params = [];

      if (search) {
        query += " WHERE LOWER(title) LIKE $1";
        params.push(`%${search.toLowerCase()}%`);
      }

      query += " ORDER BY title";

      const result = await pool.query(query, params);
      return result.rows;
    } catch (error) {
      console.error("Error getting projects:", error);
      throw error;
    }
  },
};

module.exports = ProjectModel;
