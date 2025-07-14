const bcrypt = require("bcrypt");
const User = require("./user");

const UserModel = {
  async findByUsername(username) {
    try {
      return await User.findOne({ where: { username } });
    } catch (error) {
      console.error("Error finding user by username:", error);
      throw error;
    }
  },

  async createUser(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await User.create({
        username: userData.username,
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        age: userData.age,
      });

      const plainUser = user.get({ plain: true });
      delete plainUser.password;
      return plainUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
};

module.exports = UserModel;
