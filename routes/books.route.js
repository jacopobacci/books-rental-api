const express = require("express");
const router = express.Router();
const books = require("../controllers/books.controller");
const validateMdw = require("../middleware/validate");
const auth = require("../middleware/auth");
const { validate } = require("../models/book.model");

router.post("/", [auth, validateMdw(validate)], books.create);
router.put("/:id", [auth, validateMdw(validate)], books.update);
router.delete("/:id", [auth, validateMdw(validate)], books.delete);

module.exports = router;
