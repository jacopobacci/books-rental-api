const express = require("express");
const router = express.Router();
const genres = require("../controllers/genres.controller");
const auth = require("../middleware/auth");

router.post("/", auth, genres.create);
router.put("/:id", auth, genres.update);
router.get("/", genres.get);
router.delete("/:id", genres.delete);

module.exports = router;
