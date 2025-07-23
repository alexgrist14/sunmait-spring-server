const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const Company = require("./company");

const Task = sequelize.define(
  "Task",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

Company.hasMany(Task, { foreignKey: "company_id", onDelete: "CASCADE" });
Task.belongsTo(Company, { foreignKey: "company_id" });

module.exports = Task;
