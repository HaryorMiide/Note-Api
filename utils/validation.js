const { body, validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors);
    return next({ errors: errors.array() });
  }
  next();
};

const validationRules = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Title is required for note")
      .isLength({ min: 3 })
      .withMessage("Minimum of three characters"),
    body("content")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Minimum if five characters"),
  ];
};

module.exports = { validationRules, validate };
