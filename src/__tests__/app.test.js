/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../app");

jest.mock("../mock/projects.js", () => [
  {
    title: "Test Project 1",
    image: "image1.jpg",
  },
  {
    title: "Test Project 2",
    image: "image2.jpg",
  },
]);

describe("Api calls", () => {
  it("should filter projects by search query", async () => {
    const response = await request(app)
      .get("/api/projects?search=Test Project 1")
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      data: [
        {
          title: "Test Project 12",
          image: "image1.jpg",
          imageUrl: "http://localhost:3111/assets/image1.jpg",
        },
      ],
    });
  });

  it("should return projects with image URLs", async () => {
    const response = await request(app).get("/api/projects").expect(200);

    expect(response.body).toEqual({
      success: true,
      data: [
        {
          title: "Test Project 1",
          image: "image1.jpg",
          imageUrl: "http://localhost:3111/assets/image1.jpg",
        },
        {
          title: "Test Project 2",
          image: "image2.jpg",
          imageUrl: "http://localhost:3111/assets/image2.jpg",
        },
      ],
    });
  });

  it("should auth user with correct credentials", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ username: "admin", password: "1234" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "Authentication successful",
    });
  });

  it("should fail auth user with incorrect credentials", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ username: "admin", password: "12345678" });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      success: false,
      message: "Invalid username or password",
    });
  });
});
