const Company = require("../models/company");
const Task = require("../models/task");

const companyController = {
  async getAll(req, res) {
    const companies = await Company.findAll({ include: Task });
    res.json(companies.map((c) => c.get({ plain: true })));
  },

  async getOne(req, res) {
    const company = await Company.findByPk(req.params.id, { include: Task });
    if (!company) return res.status(404).json({ message: "Not found" });
    res.json(company.get({ plain: true }));
  },

  async create(req, res) {
    const { Tasks, ...companyData } = req.body;

    const company = await Company.create(companyData);
    if (Array.isArray(Tasks)) {
      for (const task of Tasks) {
        await Task.create({ ...task, company_id: company.id });
      }
    }

    const full = await Company.findByPk(company.id, { include: Task });
    res.status(201).json(full.get({ plain: true }));
  },

  async update(req, res) {
    const { id } = req.params;
    const { Tasks, ...companyData } = req.body;

    const company = await Company.findByPk(id);
    if (!company) return res.status(404).json({ message: "Not found" });

    await company.update(companyData);
    if (Array.isArray(Tasks)) {
      await Task.destroy({ where: { company_id: id } });
      for (const task of Tasks) {
        await Task.create({ ...task, company_id: id });
      }
    }

    const updated = await Company.findByPk(id, { include: Task });
    res.json(updated.get({ plain: true }));
  },
};

module.exports = companyController;
