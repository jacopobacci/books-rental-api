const express = require("express");
const router = express.Router();
const users = require("../controllers/users.controller");
const auth = require("../middleware/auth");

router.get("/me", auth, users.me);

router.post("/", users.register);

module.exports = router;
