const sequelize = require("../config/sequelize");
const CompanyNotFoundError = require("../errors/CompanyNotFoundError");
const Company = require("../models/company");
const Task = require("../models/task");

const companyController = {
  async getAll(req, res) {
    const companies = await Company.findAll({ include: Task });
    res.json(companies);
  },

  async getOne(req, res) {
    try {
      const company = await Company.findByPk(req.params.id, {
        include: Task,
        rejectOnEmpty: new CompanyNotFoundError(),
      });
      res.json(company.get({ plain: true }));
    } catch (error) {
      if (error instanceof CompanyNotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  },

  async create(req, res) {
    const { Tasks, ...companyData } = req.body;
    try {
      const result = await sequelize.transaction(async (t) => {
        const company = await Company.create(companyData, { transaction: t });
        if (Array.isArray(Tasks)) {
          const tasksData = Tasks.map((task) => ({
            ...task,
            company_id: company.id,
          }));
          await Task.bulkCreate(tasksData, { transaction: t });
        }
        return await Company.findByPk(company.id, {
          include: Task,
          transaction: t,
        });
      });
      res.status(201).json(result.get({ plain: true }));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { Tasks, ...companyData } = req.body;
    try {
      const result = await sequelize.transaction(async (t) => {
        const company = await Company.findByPk(id, {
          transaction: t,
          rejectOnEmpty: new CompanyNotFoundError(),
        });
        await company.update(companyData, { transaction: t });

        if (Array.isArray(Tasks)) {
          await Task.destroy({
            where: { company_id: id },
            transaction: t,
          });

          const tasksData = Tasks.map((task) => ({
            ...task,
            company_id: id,
          }));
          await Task.bulkCreate(tasksData, { transaction: t });
        }

        return await Company.findByPk(id, {
          include: Task,
          transaction: t,
        });
      });
      res.json(result.get({ plain: true }));
    } catch (error) {
      if (error instanceof CompanyNotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  },
};

module.exports = companyController;
