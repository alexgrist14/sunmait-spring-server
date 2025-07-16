const Joi = require("joi");

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

module.exports = Joi.object({
  username: Joi.string().min(3).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters long",
  }),

  password: Joi.string().pattern(passwordRegex).required().messages({
    "string.empty": "Password is required",
    "string.pattern.base":
      "Password must contain at least 1 letter and 1 number, and be at least 4 characters long",
  }),

  repeatPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords must match",
    "string.empty": "Repeat password is required",
  }),

  firstName: Joi.string().min(3).required().messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least 3 characters long",
  }),

  lastName: Joi.string().min(3).required().messages({
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 3 characters long",
  }),

  age: Joi.number().integer().greater(0).required().messages({
    "number.base": "Age must be a number",
    "number.greater": "Age must be greater than 0",
    "any.required": "Age is required",
  }),
});
