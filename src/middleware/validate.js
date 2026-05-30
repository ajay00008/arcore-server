const { body, validationResult } = require("express-validator");

const lookupValidation = [
  body("lat")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be between -90 and 90"),
  body("lng")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be between -180 and 180"),
];

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Invalid coordinates",
      details: errors.array().map((e) => e.msg),
    });
  }

  next();
}

module.exports = { lookupValidation, handleValidationErrors };
