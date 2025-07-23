"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const countResult = await queryInterface.sequelize.query(
      'SELECT COUNT(*) FROM "Companies";'
    );
    const companyCount = parseInt(countResult[0][0].count, 10);

    if (companyCount > 0) return;

    const companies = [
      {
        name: "TechCorp",
        industry: "Technology",
        address: "123 Silicon Valley",
        contact_email: "info@techcorp.com",
        description: "Leading provider of tech solutions.",
        enable_advanced: true,
        advanced_type: "AI",
        advanced_note: "Focused on machine learning",
        created_at: new Date(),
      },
      {
        name: "HealthPlus",
        industry: "Healthcare",
        address: "45 Wellness Blvd",
        contact_email: "contact@healthplus.com",
        description: "Innovations in personal healthcare.",
        enable_advanced: false,
        created_at: new Date(),
      },
      {
        name: "EduSoft",
        industry: "Education",
        address: "9 Knowledge Road",
        contact_email: "hello@edusoft.com",
        description: "eLearning platform developer.",
        enable_advanced: true,
        advanced_type: "Cloud",
        advanced_note: "Uses AWS",
        created_at: new Date(),
      },
    ];

    const insertedCompanies = await queryInterface.bulkInsert(
      "Companies",
      companies,
      { returning: true }
    );

    const tasks = [
      {
        company_id: insertedCompanies[0].id,
        name: "Build platform",
        status: "in progress",
        created_at: new Date(),
      },
      {
        company_id: insertedCompanies[0].id,
        name: "Hire engineers",
        status: "todo",
        created_at: new Date(),
      },
      {
        company_id: insertedCompanies[1].id,
        name: "Design UX",
        status: "done",
        created_at: new Date(),
      },
      {
        company_id: insertedCompanies[2].id,
        name: "Launch MVP",
        status: "todo",
        created_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Tasks", tasks);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Tasks", null, {});
    await queryInterface.bulkDelete("Companies", null, {});
  },
};
