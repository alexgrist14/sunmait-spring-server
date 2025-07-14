const Project = require("../models/project");

const testProjects = [
  {
    title: "Spring Boot",
    image: "spring-boot.svg",
    description:
      "Takes an opinionated view of building Spring applications and gets you up and running as quickly as possible.",
  },
  {
    title: "Spring Framework",
    image: "spring-framework.svg",
    description:
      "Provides core support for dependency injection, transaction management, web apps, data access, messaging, and more.",
  },
  {
    title: "Spring Data",
    image: "spring-data.svg",
    description:
      "Provides a consistent approach to data access – relational, non-relational, map-reduce, and beyond.",
  },
  {
    title: "Spring Cloud",
    image: "spring-cloud.svg",
    description:
      "Provides a set of tools for common patterns in distributed systems. Useful for building and deploying microservices.",
  },
  {
    title: "Spring Cloud Data Flow",
    image: "spring-data-flow.svg",
    description:
      "Provides an orchestration service for composable data microservice applications on modern runtimes.",
  },
  {
    title: "Spring Security",
    image: "spring-security.svg",
    description:
      "Protects your application with comprehensive and extensible authentication and authorization support.",
  },
  {
    title: "Spring Authorization",
    image: "spring-authorization-server.svg",
    description:
      "Provides a secure, light-weight, and customizable foundation for building OpenID Connect 1.0 Identity Providers and OAuth2 Authorization Server products.",
  },
  {
    title: "Spring for GraphQL",
    image: "spring-graphql.svg",
    description:
      "Spring for GraphQL provides support for Spring applications built on GraphQL Java.",
  },
  {
    title: "Spring Session",
    image: "spring-security.svg",
    description:
      "Protects your application with comprehensive and extensible authentication and authorization support.",
  },
];

async function initTestData() {
  try {
    const count = await Project.count();
    if (count === 0) {
      await Project.bulkCreate(testProjects);
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = initTestData;
