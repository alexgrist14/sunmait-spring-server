const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Company = sequelize.define(
  "Company",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    industry: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING },
    contact_email: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    enable_advanced: { type: DataTypes.BOOLEAN },
    advanced_type: { type: DataTypes.STRING },
    advanced_note: { type: DataTypes.STRING },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

module.exports = Company;
