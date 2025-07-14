/* eslint-disable no-undef */
const authController = require("../controllers/authController");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const request = require("supertest");
const app = require("../app");

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../models/userModel");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
};

describe("authController register", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register new user and return a token", async () => {
    const req = {
      body: {
        username: "testuser",
        password: "pass1234",
        firstName: "Test",
        lastName: "User",
        age: 25,
      },
    };
    const res = mockResponse();

    UserModel.findByUsername.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue("hashedPassword");
    UserModel.createUser.mockResolvedValue({
      id: 1,
      username: "testuser",
    });

    jwt.sign
      .mockReturnValueOnce("mockAccessToken")
      .mockReturnValueOnce("mockRefreshToken");

    await authController.register(req, res);

    expect(UserModel.findByUsername).toHaveBeenCalledWith("testuser");
    expect(UserModel.createUser).toHaveBeenCalled();
    expect(jwt.sign).toHaveBeenCalledTimes(2);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      accessToken: "mockAccessToken",
      refreshToken: "mockRefreshToken",
    });
  });

  it("should return 400 status code if user already exists", async () => {
    const req = {
      body: {
        username: "existing",
        password: "pass1234",
        firstName: "Test",
        lastName: "User",
        age: 25,
      },
    };
    const res = mockResponse();

    UserModel.findByUsername.mockResolvedValue({ id: 1 });

    await authController.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Username already exists",
    });
  });

  it("should return 500 status code when error occurs", async () => {
    const req = { body: {} };
    const res = mockResponse();

    UserModel.findByUsername.mockRejectedValue(new Error("DB error"));

    await authController.register(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: expect.any(Error) });
  });
});

describe("authController login", () => {
  it("should login user and return a token", async () => {
    const req = {
      body: {
        username: "testuser",
        password: "pass1234",
      },
    };
    const res = mockResponse();

    UserModel.findByUsername.mockResolvedValue({
      id: 1,
      username: "testuser",
      password: "hashedPass",
    });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign
      .mockReturnValueOnce("mockAccessToken")
      .mockReturnValueOnce("mockRefreshToken");

    await authController.login(req, res);

    expect(res.json).toHaveBeenCalledWith({
      accessToken: "mockAccessToken",
      refreshToken: "mockRefreshToken",
    });
  });

  it("should return 401 status code if user was not found", async () => {
    const req = { body: { username: "none", password: "1234" } };
    const res = mockResponse();

    UserModel.findByUsername.mockResolvedValue(null);

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
  });

  it("should fail auth user with incorrect credentials", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ username: "admin", password: "12345678" });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Invalid credentials",
    });
  });
});
