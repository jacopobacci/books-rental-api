const express = require("express");
const router = express.Router();
const books = require("../controllers/books.controller");

router.post("/", books.create);

module.exports = router;
