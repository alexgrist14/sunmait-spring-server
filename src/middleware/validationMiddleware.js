const userSchema = require("../schemas/userSchema");

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.reduce((acc, curr) => {
        const key = curr.context.key;
        acc[key] = curr.message;
        return acc;
      }, {});

      return res.status(400).json({
        errors,
      });
    }

    next();
  };
}

module.exports = {
  validateUser: validate(userSchema),
};
