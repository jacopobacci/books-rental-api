const express = require("express");
const router = express.Router();
const rentals = require("../controllers/rentals.controller");
const auth = require("../middleware/auth");

router.get("/", rentals.get);

router.post("/", auth, rentals.create);

module.exports = router;
