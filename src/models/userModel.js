const pool = require("../config/db");
const bcrypt = require("bcrypt");

const UserModel = {
  async findByUsername(username) {
    try {
      const result = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error finding user by username:", error);
      throw error;
    }
  },

  async createUser(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const result = await pool.query(
        `INSERT INTO users 
         (username, password, first_name, last_name, age) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING id, username, first_name, last_name, age, created_at`,
        [
          userData.username,
          hashedPassword,
          userData.firstName,
          userData.lastName,
          userData.age,
        ]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
};

module.exports = UserModel;
