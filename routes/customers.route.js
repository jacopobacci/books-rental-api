const express = require("express");
const router = express.Router();
const customers = require("../controllers/customers.controller");
const auth = require("../middleware/auth");
const validateMdw = require("../middleware/validate");
const { validate } = require("../models/customer.model");

router.post("/", [auth, validateMdw(validate)], customers.create);
router.get("/", customers.get);

module.exports = router;
