const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller");
const validateMdw = require("../middleware/validate");

router.post("/", validateMdw(validate), auth.login);

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(250).required().email(),
    password: new passwordComplexity(),
  });
  return schema.validate(req);
}

module.exports = router;
