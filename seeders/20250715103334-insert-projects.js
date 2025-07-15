"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const count = await queryInterface.sequelize.query(
      'SELECT COUNT(*) FROM "Projects";'
    );
    const projectCount = parseInt(count[0][0].count, 10);

    if (projectCount === 0) {
      await queryInterface.bulkInsert("Projects", [
        {
          title: "Spring Boot",
          image: "spring-boot.svg",
          description:
            "Takes an opinionated view of building Spring applications and gets you up and running as quickly as possible.",
          created_at: new Date(),
        },
        {
          title: "Spring Framework",
          image: "spring-framework.svg",
          description:
            "Provides core support for dependency injection, transaction management, web apps, data access, messaging, and more.",
          created_at: new Date(),
        },
        {
          title: "Spring Data",
          image: "spring-data.svg",
          description:
            "Provides a consistent approach to data access – relational, non-relational, map-reduce, and beyond.",
          created_at: new Date(),
        },
        {
          title: "Spring Cloud",
          image: "spring-cloud.svg",
          description:
            "Provides a set of tools for common patterns in distributed systems. Useful for building and deploying microservices.",
          created_at: new Date(),
        },
        {
          title: "Spring Cloud Data Flow",
          image: "spring-data-flow.svg",
          description:
            "Provides an orchestration service for composable data microservice applications on modern runtimes.",
          created_at: new Date(),
        },
        {
          title: "Spring Security",
          image: "spring-security.svg",
          description:
            "Protects your application with comprehensive and extensible authentication and authorization support.",
          created_at: new Date(),
        },
        {
          title: "Spring Authorization",
          image: "spring-authorization-server.svg",
          description:
            "Provides a secure, light-weight, and customizable foundation for building OpenID Connect 1.0 Identity Providers and OAuth2 Authorization Server products.",
          created_at: new Date(),
        },
        {
          title: "Spring for GraphQL",
          image: "spring-graphql.svg",
          description:
            "Spring for GraphQL provides support for Spring applications built on GraphQL Java.",
          created_at: new Date(),
        },
        {
          title: "Spring Session",
          image: "spring-security.svg",
          description:
            "Protects your application with comprehensive and extensible authentication and authorization support.",
          created_at: new Date(),
        },
      ]);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Projects", null, {});
  },
};
