/* eslint-disable no-undef */
const projectController = require("../controllers/projectController");
const ProjectModel = require("../models/projectModel");

jest.mock("../models/projectModel");

const mockRequest = (query = {}) => ({
  query,
  protocol: "http",
  get: () => "localhost:3111",
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn();
  return res;
};

describe("projectController.getProjects", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return projects with imageUrl", async () => {
    ProjectModel.getAll.mockResolvedValue([
      {
        get: () => ({
          id: 1,
          title: "Spring Boot",
          image: "spring-boot.svg",
          description: "desc",
          created_at: "2025-07-14T13:01:21.491Z",
        }),
      },
    ]);

    const req = mockRequest({ search: "" });
    const res = mockResponse();

    await projectController.getProjects(req, res);

    expect(ProjectModel.getAll).toHaveBeenCalledWith("");
    expect(res.json).toHaveBeenCalledWith({
      projects: [
        {
          id: 1,
          title: "Spring Boot",
          image: "spring-boot.svg",
          description: "desc",
          created_at: "2025-07-14T13:01:21.491Z",
          imageUrl: "http://localhost:3111/assets/spring-boot.svg",
        },
      ],
    });
  });

  it("should return 500 status code on error", async () => {
    ProjectModel.getAll.mockRejectedValue(new Error("DB error"));

    const req = mockRequest();
    const res = mockResponse();

    await projectController.getProjects(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Failed to get projects",
    });
  });
});
