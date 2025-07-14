/* eslint-disable no-undef */
const projectController = require("../controllers/projectController");
const ProjectModel = require("../models/projectModel");

jest.mock("../models/projectModel");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
};

describe("projectControllers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return project list with imageUrl", async () => {
    const req = {
      query: {},
      protocol: "http",
      get: (header) => {
        if (header === "host") return "localhost:3000";
      },
    };
    const res = mockResponse();

    const mockProjects = [
      { id: 1, title: "Test", image: "img1.jpg" },
      { id: 2, title: "Demo", image: "img2.png" },
    ];

    ProjectModel.getAll.mockResolvedValue(mockProjects);

    await projectController.getProjects(req, res);

    expect(ProjectModel.getAll).toHaveBeenCalledWith(undefined);
    expect(res.json).toHaveBeenCalledWith({
      projects: [
        {
          id: 1,
          title: "Test",
          image: "img1.jpg",
          imageUrl: "http://localhost:3000/assets/img1.jpg",
        },
        {
          id: 2,
          title: "Demo",
          image: "img2.png",
          imageUrl: "http://localhost:3000/assets/img2.png",
        },
      ],
    });
  });

  it("should pass search param to ProjectModel", async () => {
    const req = {
      query: { search: "data" },
      protocol: "https",
      get: () => "sunmait.com",
    };
    const res = mockResponse();

    ProjectModel.getAll.mockResolvedValue([]);

    await projectController.getProjects(req, res);

    expect(ProjectModel.getAll).toHaveBeenCalledWith("data");
  });

  it("should return 500 with any error", async () => {
    const req = {
      query: {},
      protocol: "http",
      get: () => "localhost",
    };
    const res = mockResponse();

    ProjectModel.getAll.mockRejectedValue(new Error("DB error"));

    await projectController.getProjects(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Failed to get projects",
    });
  });
});
